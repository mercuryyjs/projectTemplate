/**
 * @module  选择日期插件指令
 * *配置参数如下：
 * 1.ng-model:获取点击选取的日期，非必填
 * 2.min-date：最小日期，非必填
 * 2.max-date：最大日期，非必填
 * 3.配置参数：（非必填）
 *     $scope.dateFormat = {
            format: 'YYYY/MM/DD',//日期格式，中间的-，可以为任意字符
            istime: false,//是否显示时间
            isclear: true,//是否显示清空
            issure: true,//是否显示确认
            fixed: false,//是否固定在可视区域
            istoday: false,//是否显示今天
            icon:true                //默认有日期图标
            skin:"blue"              //默认blue，blue，green,red,dodgerblue,default
        }
 * <div date-picker ng-model="startTime" max-date="{{endTime}}" min-date="{{startTime}}" >
 * 如果没有模板颜色样式，请官方下载解压放到相应位置。
 *@example
 *<div class="historyChoose">
 *<span>日期筛选：</span>
 *<input type="text"  date-picker class="laydate-icon" name="startTime" id="startDateTime" ng-model="startTime" max-date="{{endTime}}" placeholder="开始时间"/>
 *<input type="text"  date-picker class="laydate-icon" name="endTime" id="endDateTime" ng-model="endTime" min-date="{{startTime}}" placeholder="结束时间"/>
 *</div>
 */

angular.module('frontierApp')
  .directive('datePicker', ['$parse', '$http', '$sce', '$state', '$timeout', '$interval', function ($parse, $http, $sce, $state, $timeout, $interval) {
    return {
      require: '?^ngModel',
      restrict: 'A',
      scope: {
        ngModel: '=',
        maxDate: '@',
        minDate: '@',
        fomt: '=fomt'
      },
      link: function (scope, element, attr, ngModel) {
        console.log(ngModel);
        var _date = null, _config = {};
        //默认初始化时间控件配置
        scope.conf = {
          format: 'YYYY-MM-DD hh:mm',//日期格式
          istime: true,//是否显示时间
          isclear: false,//是否显示清空
          issure: true,//是否显示确认
          fixed: true,//是否固定在可视区域
          istoday: false,//是否显示今天
          icon: false,
        };
        element.addClass('laydate-icon');   //默认有laydate-icon图标
        if (scope.fomt != undefined) {
          scope.conf = scope.fomt;
        }
        if (scope.conf.skin) {
          laydate.skin(scope.conf.skin);
        } else {
          laydate.skin('blue');             //默认为蓝色
        }
        if (scope.conf.icon == false) {
          element.removeClass('laydate-icon');
        }
        // 渲染模板完成后执行
        $timeout(function () {
          // 初始化参数
          _config = {
            elem: '#' + attr.id,
            format: attr.hasOwnProperty('format') && attr.format ? attr.format : 'YYYY-MM-DD',//设置日期格式
            max: attr.hasOwnProperty('maxDate') ? attr.maxDate : '',
            min: attr.hasOwnProperty('minDate') ? attr.minDate : '',
            istime: scope.conf.istime,//是否显示时间
            isclear: scope.conf.isclear,//是否显示清空
            issure: scope.conf.issure,//是否显示确认
            fixed: scope.conf.fixed,//是否固定在可视区域
            istoday: scope.conf.istoday,//是否显示今天
            choose: function (data) {
              scope.$apply(setViewValue);
            },
            clear: function () {
              ngModel.$setViewValue(null);
            }
          };
          // 初始化
          _date = laydate(_config);
          // 监听日期最大值
          if (attr.hasOwnProperty('maxDate')) {
            attr.$observe('maxDate', function (val) {
              _config.max = val;
            });
          }
          // 监听日期最小值
          if (attr.hasOwnProperty('minDate')) {
            attr.$observe('minDate', function (val) {
              _config.min = val;
            });
          }
          // 模型值同步到视图上
          ngModel.$render = function () {
            element.val(ngModel.$viewValue || '');
          };
          // 监听元素上的事件
          element.on('blur keyup change', function () {
            scope.$apply(setViewValue);
          });
          setViewValue();
          // 更新模型上的视图值
          function setViewValue () {
            var val = element.val();
            ngModel.$setViewValue(val);
          }
        }, 0);
      }
    };

  }]);

