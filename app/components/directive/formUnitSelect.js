/**
 * Created by Yjs on 2018/1/4.
 */
angular.module('frontierApp')
  .directive('formUnitSelect', [function () {
    return {
      restrict: 'E',
      scope: {
        ngId: '@',
        label: '@',
        type: '@', // 1-全部；2，-请选择
        dropdown: '=',
        selectedModel: '='
      },
      templateUrl: '../manage/modules/templates/formUnitSelect.html',
      replace: true,
      controller: ['$scope', function ($scope) {
        if (angular.isArray($scope.dropdown)) {
          if (parseInt($scope.type) === 1) { // 搜索的情况
            $scope.dropdown.unshift({
              name: '全部',
              id: null
            });
          } else if (parseInt($scope.type) === 2) {
            $scope.dropdown.unshift({
              name: '请选择',
              id: null
            });
          }
          if (!($scope.selectedModel instanceof Object)) {
            $scope.selectedModel = {};
          }
          if (!$scope.selectedModel.hasOwnProperty('id') || $scope.selectedModel.id === null) { // 新建的情况
            if (parseInt($scope.type) === 1) {
              $scope.selectedModel = {name: '全部', id: null};
            } else {
              $scope.selectedModel = {name: '请选择', id: null};
            }
          } else { // 编辑
            for (var key in $scope.dropdown) {
              if ($scope.dropdown[key].id === $scope.selectedModel.id) {
                $scope.dropdown[key].selected = true;
                break;
              }
            }
          }
        } else {
          $scope.dropdown = [];
          $scope.selectedModel = {name: '请选择', id: null};
        }

        // 搜索重置
        $scope.$watch('selectedModel.id', function (newValue, oldValue) {
          if (typeof $scope.selectedModel.id === 'undefined') {
            if (parseInt($scope.type) === 1) {
              $scope.selectedModel = {name: '全部', id: null};
            } else {
              $scope.selectedModel = {name: '请选择', id: null};
            }
          }
          for (var key in $scope.dropdown) {
            if ($scope.dropdown[key].id === $scope.selectedModel.id) {
              $scope.dropdown[key].selected = true;
            } else {
              $scope.dropdown[key].selected = false;
            }
          }
        });
        $scope.selectItem = function (item) {
          $scope.selectedModel = item;
        };
      }]
    };
  }]);
