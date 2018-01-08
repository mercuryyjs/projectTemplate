/**
 * Created by Yjs on 2018/1/5.
 */
angular.module('frontierApp')
  .directive('formUnitDateTimePicker', [function () {
    return {
      restrict: 'E',
      scope: {
        ngId: '@',
        label: '@',
        placeholder: '@',
        inputModel: '='
      },
      templateUrl: '../manage/modules/templates/formUnitDateTimePicker.html'
    };
  }]);
