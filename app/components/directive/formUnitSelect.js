/**
 * Created by Yjs on 2018/1/4.
 */
angular.module('frontierApp')
  .directive('formUnitSelect', [function () {
    return {
      restrict: 'E',
      scope: {
        label: '@',
        type: '@', // 1-全部；2，-请选择
        dropdown: '=',
        selectedModal: '='
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
          if (!($scope.selectedModal instanceof Object)) {
            $scope.selectedModal = {};
          }
          if (!$scope.selectedModal.hasOwnProperty('id') || $scope.selectedModal.id === null) { // 新建的情况
            if (parseInt($scope.type) === 1) {
              $scope.selectedModal = {name: '全部', id: null};
            } else {
              $scope.selectedModal = {name: '请选择', id: null};
            }
          } else { // 编辑
            for (var key in $scope.dropdown) {
              if ($scope.dropdown[key].id === $scope.selectedModal.id) {
                $scope.dropdown[key].selected = true;
                break;
              }
            }
          }
        } else {
          $scope.dropdown = [];
          $scope.selectedModal = {name: '请选择', id: null};
        }

        // 搜索重置
        $scope.$watch('selectedModal.id', function (newValue, oldValue) {
          if (typeof $scope.selectedModal.id === 'undefined') {
            if (parseInt($scope.type) === 1) {
              $scope.selectedModal = {name: '全部', id: null};
            } else {
              $scope.selectedModal = {name: '请选择', id: null};
            }
          }
          for (var key in $scope.dropdown) {
            if ($scope.dropdown[key].id === $scope.selectedModal.id) {
              $scope.dropdown[key].selected = true;
            } else {
              $scope.dropdown[key].selected = false;
            }
          }
        });
        $scope.selectItem = function (item) {
          $scope.selectedModal = item;
        };
      }]
    };
  }]);
