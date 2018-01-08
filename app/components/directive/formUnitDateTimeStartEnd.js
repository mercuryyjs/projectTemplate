/**
 * Created by Yjs on 2018/1/5.
 */
angular.module('frontierApp')
  .directive('formUnitDateTimeStartEnd', [function () {
    return {
      restrict: 'E',
      scope: {
        label: '@',
        startId: '@',
        startPlaceholder: '@',
        inputStartModel: '=',
        endId: '@',
        endPlaceholder: '@',
        inputEndModel: '='
      },
      templateUrl: '../manage/modules/templates/formUnitDateTimeStartEnd.html',
      controller: ['$scope', function ($scope) {
        if (typeof $scope.startPlaceholder === 'undefined' || $scope.startPlaceholder === '') {
          $scope.startPlaceholder = '开始时间';
        }
        if (typeof $scope.endPlaceholder === 'undefined' || $scope.endPlaceholder === '') {
          $scope.startPlaceholder = '结束时间';
        }
        if (typeof $scope.startId === 'undefined' || $scope.startId === '') {
          $scope.startId = 'startTime';
        }
        if (typeof $scope.endId === 'undefined' || $scope.endId === '') {
          $scope.endId = 'endTime';
        }
      }]
    };
  }]);
