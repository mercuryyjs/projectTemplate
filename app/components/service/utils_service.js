/**
 * Created by Yjs on 2018/1/16.
 */
angular.module('frontierApp')
  .factory('utilsService', ['$rootScope', function ($rootScope) {
    var utilsService = {};
    /**
     * 过滤空对象
     * @param str
     * @returns {*}
     */
    utilsService.getString = function (str) {
      if (str == null || str == 'null' || str == undefined) {
        return '';
      } else {
        return str;
      }
    };
    /**
     * 获取字符串长度,汉字长度为2
     * @param strTemp
     * @returns {number}
     */
    utilsService.getLength = function (strTemp) {
      var i, sum;
      sum = 0;
      for (i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 128)) {
          sum = sum + 1;
        } else {
          sum = sum + 2;
        }
      }
      return sum;
    };

    /**
     * 将时间戳转换成时间字符串'yyyy-MM-dd hh:mm:ss'
     * @param stamp
     * @returns {string}
     */
    utilsService.getDateStrFromTimeStamp = function (stamp) {
      if (isNaN(parseInt(stamp))) {
        return null;
      }
      var date = new Date(stamp);
      return date.getFullYear() + '-' + adjustTime(date.getMonth() + 1) + '-' + adjustTime(date.getDate()) + ' ' + adjustTime(date.getHours()) + ':' + adjustTime(date.getMinutes()) + ':' + adjustTime(date.getSeconds());
    };
    /**
     * 将时间字符串转换成时间戳
     * 支持yyyy-MM-dd hh:mm:ss
     *     yyyy-MM-dd hh:mm
     *     yyyy-MM-dd
     * 处理方式支持IE浏览器
     * @param str
     * @returns {*}
     */
    utilsService.getTimeStampFromDateStr = function (str) {
      var dateTimeReg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      var dateTimeNoSecondReg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d$/;
      var dateReg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      var isDateTime = dateTimeReg.test(str);
      var isDateTimeNoSecond = dateTimeNoSecondReg.test(str);
      var isDate = dateReg.test(str);
      if (!isDateTime && !isDate && !isDateTimeNoSecond) {
        return '';
      } else {
        if (isDateTime || isDateTimeNoSecond) {
          var dateTimeArr = str.split(' ');
          var dateArr = dateTimeArr[0].split('-');
          var timeArr = dateTimeArr[1].split(':');
          if(isDateTime){
            return new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1], timeArr[2]).getTime();
          }else{
            return new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1], 0).getTime();
          }
        }
        if (isDate) {
          var dateArr = str.split('-');
          return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]).getTime();
        }
      }
    };

    /*
     * 调整时间格式
     * */
    function adjustTime (param) {
      return param < 10 ? '0' + param : param;
    }

    return utilsService;
  }]);
