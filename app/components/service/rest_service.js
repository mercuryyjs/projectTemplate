/**
 * @author zhouhua
 *
 * @date
 * 2016/4/22.
 *
 * @description
 * 本文件提供两个服务，分别是restService和restUrl。
 *
 *1.  restService服务提供与服务器之间的rest接口通信服务，主要处理接口的通用消息规范。
 *    restUrl服务提供从资源名称到URI的转换服务，根据运行环境的不同，转换的方式不一样。
 *2. 前后端通信规范为："code": "112",
 "message": "客户端错误啊",
 "time": 1470306175848,
 "body": {
                                 "total":"6",
                                 "faqList":"常见问题"
                              }
 code：存放错误码，通过首个数字判断错误类型，
 0表示成功，
 1表示业务错误：返回后台处理的业务错误信息，信息放在message字段里，
 2表示：客户端错误：入参错误
 3表示用户状态错误：没有权限访问，返回到首页或者登录页
 4表示服务器错误，
 $rootScope.restServerTime = res.time;   //获取服务器时间
 *
 *3. restUrl服务定义了一个接口函数getUrl，以资源名称为参数，返回URI。
 * 在$rootScope.env没有定义或等于'development'（开发环境）时，getUrl将返回restapp Nodejs Express服务器上的资源地址；
 * 其他情况下，restUrl服务将到$rootScope.restInterfaceUrls对象以资源名称为键名去寻找对应的URI地址。
 * 定义$rootScope.restInterfaceUrls的例子如下：
 *
 ```
 $rootScope.restInterfaceUrls = {
       "index": '/restapi/index',
       "sessions": '/restapi/login',
       "captcha": '/restapi/captcha',
       "users": '/restapi/users',
       ...
     };
 *
 * 4. restService服务对外提供两个接口和一个全局配置约定：
 * * 两个接口：
 *    1）. request：发起一个RESTFul请求，如果返回正常，调用回调函数处理返回结果。
 *    2）. promiseRequest：发起一个RESTFul请求，如果返回正常，返回一个promise对象，
 *    该promise对象的then函数可以接受两个回调函数作为参数，第一个处理成功返回的结果，第二个处理失败返回的结果
 *5. 接口的数据格式为（后台返回的数据格式，本地模拟的数据格式可参照此格式）：
 *    var restRes = {
        "code": "112",
        "message": "客户端错误啊",
       "body": {
           "total":"6",
          "faqList":"常见问题"
         }
      }
 *
 * @example: 1.对应controller中注入：
 *            2. controller中调用restService，
 *               restService.promiseRequest(restUrl.getUrl('faqs'), 'GET', null).then(function (body) {
                    console.log("RES:"+JSON.stringify(body));      //处理成功的回调函数，body即为后台返回的数据
               },function (res) {
                    console.log("MSG:"+JSON.stringify(res));        //处理失败的回调函数，res即为返回的错误信息，
                                                                 格式为{ "message":"后台返回的错误信息","code":后台返回的错误码}
                })
 */

'use strict';

angular.module('frontierApp')

  .factory('restService', ['$q', '$resource', '$location', '$rootScope', '$sce', '$cookieStore', function ($q, $resource, $location, $rootScope, $sce, $cookieStore) {
    var restReceive = {
      /**
       *处理从后台返回的结果，处理是正常通信成功、服务器异常、业务异常、参数错误等
       * @returns {{message: string, code: *}}
       */
      process: function (res, successFunc, restUrl, method, data) {
        if (angular.isNumber(res.code)) {//res是后台返回的所有数据，完成code的类型转换
          res.code = res.code.toString();    //如果是数字格式，将其转换为字符串格式
        }
        ;
        var codeType = res.code.substring(0, 1);//codeType根据返回code的首位数字进行判断，0：标识成功，1，标识异常
        var callbackResult = {
          'message': '',//重新封装返回的结果，
          'code': res.code,
          'codeType': codeType
        };
        $rootScope.restServerTime = res.time;   //获取服务器时间
        $rootScope.restErrorTitle = '';        //初始化，error页面显示数据
        $rootScope.restErrorInterface = '';
        $rootScope.restErrorCode = '';
        $rootScope.restErrorMessage = '';

        if (codeType == '0') {
          //codeType= 0,返回成功
          var key = res.body ? res.body.key : null;//res.body.key对开发是屏蔽的
          if (key) {
            // set key to cookie, expired after 30 days
            setCookie('key', key, 30);//将key存放在cookie中
          }
          callbackResult.message = 'success';
          if (typeof(successFunc) === 'function') {
            successFunc(res.body);                       //如果有处理正常返回的结果的回调函数，优先用回调函数处理
            return callbackResult;
          } else {
            return callbackResult;
          }
        } else if (codeType == '1') {
          callbackResult.message = res.message;
          if (res.code == '100008') {//100008 ,session 过期
            $rootScope.faildModal.show(res.message, function () {
              $location.path('/login');
            });
          } else {
            $rootScope.faildModal.show(res.message);
          }
          return callbackResult;

        } else if (codeType == '2') {

          return callbackResult;
        } else if (codeType == '3') {

          return callbackResult;
        } else if (codeType == '4') {
          //codeType= 1,服务器异常
        } else {

          return callbackResult;

        }
      },
      /**
       * 通信失败，后台没有返回数据的情况
       * @returns {{message: string, code: *}}
       */
      processError: function (errorRes, errorFunc, restUrl, method) {
        var callbackResult = {
          'message': '',
          'code': errorRes.code
        };
        $rootScope.restErrorTitle = '';   //初始化，error页面显示数据
        $rootScope.restErrorInterface = '';
        $rootScope.restErrorCode = '';
        $rootScope.restErrorMessage = '';
        if (typeof(errorFunc) === 'function') {//错误的时候运行回调
          //@TODO
          errorFunc(errorRes);
        } else {
          //console.log("访问接口失败")
          callbackResult.message = '通信失败！访问接口失败!';
          $rootScope.restErrorTitle = '您所访问的资源不存在，请您检查是否输入了正确的访问地址！';
          $rootScope.restErrorInterface = restUrl + ':' + method;
          $rootScope.restErrorCode = errorRes.code;
          $rootScope.restErrorMessage = errorRes.message;
          //$location.path('/error');
          return callbackResult;

        }
      }
    };

    var setCookie = function (key, value, expireDays) {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + expireDays);
      document.cookie = 'key=' + value + ';expires=' + expireDate.toGMTString();
    };

    var getCookie = function (key) {
      // get value from cookie
      var value = null;
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=');
        if (start != -1) {
          start = start + 4;
          var end = document.cookie.indexOf(';', start);
          if (end == -1) {
            end = document.cookie.length;
          }
          value = document.cookie.substring(start, end);
        }
      }
      return value;
    };

    var prepareRequest = function (restUrl, method, data, resourceObj) {
      var methodArray = ['GET', 'DELETE', 'HEAD', 'POST', 'PUT'];
      var noPayloadMethods = ['GET', 'DELETE', 'HEAD'];//没有请求体的
      if (!restUrl || methodArray.indexOf(method) === -1) {
        return null;
      }

      // get key from cookie
      var key = getCookie('key');//key是在res.body中的key
      var restParam = {};
      var restData = {};

      if (noPayloadMethods.indexOf(method) !== -1) {
        if (key) {
          restParam.key = key;//在请求的时候要带着？？？？
        }
        restParam.data = (data === null) ? null : JSON.stringify(data);
      } else {
        if (key) {
          restData.key = key;
        }
        if (data !== null) {
          restData = data;
        } else {
          restData = null;
        }
      }

      var restResource = resourceObj(restUrl, {}, {//resourceObj是回调函数，用来发送请求，$resource服务，第三个参数可以调用，$resource返回的是一个约定
        action: {
          method: method
        }
      });
      restResource.restData = restData;
      restResource.restParam = restParam;
      return restResource;
    };
    /*
     * json 转 url string 参数
     *
     */
    var jsonToUrlStr = function (data) {
      var strArr = [];
      for (var m in data) {
        strArr.push(m + '=' + data[m]);
      }
      return strArr.join('&');
    };

    var restService = {
      /**
       * @ngdoc function
       * @name restService.request
       * @module restService
       * @kind function
       *
       * @description
       * 用回调函数处理restful请求正常返回的结果。
       *
       * 使用例子：
       ```
       var elm = ...;
       var $rootScope = angular.injector(['ng']).get('$rootScope');
       var processFunc = function(body) {
             var captcha = "data:image/png;base64," + body.imageBase64;
             elm.find('img').attr('src', captcha);
             $rootScope.captchaId = body.captchaId;
           }
       restService.request(restUrl.getUrl('captcha'), 'GET', data, processFunc);
       ```
       *
       * @param {String} restUrl 资源URI
       * @param {String} method 请求方法，可以'POST'、'GET'、'PUT'、'DELETE'中的其中之一
       * @param {Object} data 请求中带的数据
       * @param {Function} processFunc 处理返回结果的回调函数，参数为从服务器返回的JSON数据
       * @returns null
       */
      request: function (restUrl, method, data, processFunc) {
        var restResource = prepareRequest(restUrl, method, data, $resource);//用$resource来处理发送请求
        if (!restResource) {
          return;
        }

        var restData = restResource.restData;
        var restParam = restResource.restParam;

        restResource.action(restParam, restData, function (res) {
          restReceive.process(res, processFunc, restUrl, method, data);
        }, function (errorRes) {
          restReceive.processError(errorRes, function () {}, restUrl, method);
        });
      },

      /**
       * @ngdoc function
       * @name restService.promiseRequest
       * @module restService
       * @kind function
       *
       * @description
       * 发起一个restful请求，如果返回正常，返回一个promise对象，该promise对象的then函数接受两个回调函数：
       *    1. 第一个函数处理成功返回的结果，第二个函数处理服务器返回的错误消息。
       *    2. 成功返回的结果可能是JSON对象或者是null，如果是null则表示无需向客户端返回数据。
       *    3. 失败返回的结果是JSON对象，{ "message":"账号不存在","code":32}，message中放入错误信息，code放入服务器返回的code码。
       *
       *
       * 使用例子：
       ```
       var elm = ...;
       var $rootScope = angular.injector(['ng']).get('$rootScope');
       restService.promiseRequest(restUrl.getUrl('faqs'), 'GET', data).then(function (body) {
         $scope.faqList = body;                              //成功返回的回调函数
        },function (erroRes) {
          console.log("MSG:"+JSON.stringify(erroRes));        //返回错误的回调函数
        })
       ```
       *
       * @param {String} restUrl 资源URI
       * @param {String} method 请求方法，可以'POST'、'GET'、'PUT'、'DELETE'中的其中之一
       * @param {Object} data 请求中带的数据
       * @returns {Promise} a promise object
       */
      promiseRequest: function (restUrl, method, data) {
        var d = $q.defer();

        //如果是远程访问接口，且是GET，DELETE方法，将入参放在URL里面
        if ($rootScope.env == 'product' && (method == 'GET' || method == 'DELETE')) {
          if (data != null) {
            restUrl = restUrl + '?' + jsonToUrlStr(data);
            data = null;
          }
        }
        ;

        //对URL进行encode
        restUrl = encodeURI(restUrl);

        var restResource = prepareRequest(restUrl, method, data, $resource);
        if (!restResource) {
          return;
        }
        var restData = restResource.restData;
        var restParam = restResource.restParam;

        restResource.action(restParam, restData, function (res) {
          var callbackResult = restReceive.process(res, null, restUrl, method, data);
          /**
           * 把返回到页面的错误信息存到cookie中,防止刷新，rootScope中的数据丢失
           */
          $cookieStore.put('restServiceError', {
            'title': $rootScope.restErrorTitle,
            'message': $rootScope.restErrorMessage,
            'code': $rootScope.restErrorCode,
            'interface': $rootScope.restErrorInterface
          });

          if (callbackResult.message == 'success') {
            d.resolve(res.body);
          } else {
            d.reject(callbackResult);
          }
          ;
        }, function (errorRes) {
          var errorCallbackResult = restReceive.processError(errorRes, null, restUrl, method);
          /**
           * 把返回到页面的错误信息存到cookie中,防止刷新，rootScope中的数据丢失
           */
          $cookieStore.put('restServiceError', {
            'title': $rootScope.restErrorTitle,
            'message': $rootScope.restErrorMessage,
            'code': $rootScope.restErrorCode,
            'interface': $rootScope.restErrorInterface
          });
          d.reject(errorCallbackResult);
        });
        return d.promise;
      },

      /**
       * @ngdoc function
       * @name restService.processRes
       * @module restService
       * @kind function
       *
       * @description: 处理后台返回的结果函数
       */
      processRes: function (res, restUrl, method) {
        return restReceive.process(res, null, restUrl, method);
      }
    };
    return restService;
  }])

  .factory('restUrl', ['$location', '$rootScope', '$cookieStore', function ($location, $rootScope, $cookieStore) {
    var restUrl = {
      getUrl: function (resourceName) {
        if ($rootScope.env == 'development') {
          var baseUrl = '/restapi/';
          if ($rootScope.system) {
            baseUrl += $rootScope.system + '/';
          }
          return baseUrl + resourceName;
        } else {
          if (!angular.isDefined($rootScope.restInterfaceUrls) || !angular.isDefined($rootScope.restInterfaceUrls[resourceName])) {

            $rootScope.restErrorTitle = '您所访问的资源不存在，请您检查是否输入了正确的访问地址！';
            $rootScope.restErrorInterface = '';
            $rootScope.restErrorCode = '';
            $rootScope.restErrorMessage = '';
            /**
             * 把返回到页面的错误信息存到cookie中,防止刷新，rootScope中的数据丢失
             */
            $cookieStore.put('restServiceError', {
              'title': $rootScope.restErrorTitle,
              'message': $rootScope.restErrorMessage,
              'code': $rootScope.restErrorCode,
              'interface': $rootScope.restErrorInterface
            });
            $rootScope.restErrorModal.show($rootScope.restErrorTitle, $rootScope.restErrorCode, $rootScope.restErrorInterface);
            //$location.path('/error');
            throw 'The REST interface of \'' + resourceName + '\' is not defined!';
          }
          return $rootScope.restInterfaceUrls[resourceName];
        }
      }
    };
    return restUrl;
  }]);
