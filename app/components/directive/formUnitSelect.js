/**
 * Created by Yjs on 2018/1/4.
 * type:数字类型：
 *    1-全部：用于搜索
 *    其他-请选择：用于创建数据或者修改。其中又分必填和选填两种情况
 *
 */
angular.module('frontierApp')
  .directive('formUnitSelect', [function () {
    return {
      restrict: 'E',
      scope: {
        ngId: '@',
        label: '@',
        type: '@', //0-非必选，增加“请选择”选项
        dropdown: '=',
        selectedModel: '=' //字符串类型，返回所选id
      },
      templateUrl: '../manage/modules/templates/formUnitSelect.html',
      replace: true,
      controller: ['$scope', function ($scope) {
        (function init () {
          if (angular.isArray($scope.dropdown)) {
            if (parseInt($scope.type) === 0) { // 搜索的情况
              $scope.dropdown.unshift({
                name: '请选择',
                id: null
              });
            }
            $scope.dropdownCopy = angular.copy($scope.dropdown);
          } else {
            throw new Error('dropdown must be an array!');
          }
          if (typeof $scope.selectedModel === 'string') {
            if ($scope.selectedModel === '') { //新建
              $scope.selectedModel = null;
            } else {
              for (var key in $scope.dropdown) {
                if ($scope.selectedModel === null) {
                  if ($scope.dropdown[key].id === null) {
                    $scope.dropdown[key].selected = true;
                    break;
                  }
                } else {
                  if (parseInt($scope.dropdown[key].id) === parseInt($scope.selectedModel)) {
                    $scope.dropdown[key].selected = true;
                    break;
                  }
                }
              }
            }
          } else {
            $scope.selectedModel = null;
          }
        })();

        // 搜索重置
        $scope.$watch('selectedModel', function (newValue, oldValue) {
          $scope.dropdown = angular.copy($scope.dropdownCopy);
          for (var key in $scope.dropdown) {
            if ($scope.selectedModel === null) {
              if ($scope.dropdown[key].id === null) {
                $scope.dropdown[key].selected = true;
                break;
              }
            } else {
              if (parseInt($scope.dropdown[key].id) === parseInt($scope.selectedModel)) {
                $scope.dropdown[key].selected = true;
                break;
              }
            }
          }
        });
        $scope.selectItem = function ($event, item) {
          if (item.id === null) {
            $scope.selectedModel = null;
          } else {
            $scope.selectedModel = item.id + '';
          }
        };
      }]
    };
  }]);
