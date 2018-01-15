/**
 * Created by Yjs on 2018/1/10.
 * dropdown:数组类型
 * selectedModel:数组类型：
 *    1-新建：''或null;2-编辑：以逗号连接的字符串
 * type:下拉选项中是否增加“请选择”选项，0-添加（非必选）和不设置type或其他-（不添加）必选
 */
angular.module('frontierApp')
  .filter('selectResult', [function () {
    return function (input, dropdown) {
      if (!angular.isArray(dropdown)) {
        throw new Error('dropdown must be an array!');
      }
      var s = '';
      if (input === null || typeof input === 'undefined') {
        return '请选择';
      } else {
        if (typeof input === 'number') {
          input = input + '';
        }
        var inputArray = input.split(',');
        for (var i = 0; i < inputArray.length; i++) {
          for (var j = 0; j < dropdown.length; j++) {
            if (parseInt(dropdown[j].id) === parseInt(inputArray[i])) {
              s += dropdown[j].name + ',';
            }
          }
        }
        return s.substring(0, s.length - 1);
      }
    };
  }])
  .directive('formUnitSelectMultiple', [function () {
    return {
      restrict: 'E',
      scope: {
        ngId: '@',
        label: '@',
        type: '@', // 0-非必选，其他必选
        dropdown: '=',
        selectedModel: '=' // 以逗号连接的字符串，存储下拉选项的id
      },
      templateUrl: '../manage/modules/templates/formUnitSelectMultiple.html',
      replace: true,
      link: function (scope, element, attr) {
      },
      controller: ['$scope', function ($scope) {
        /**
         * 数据初始化
         */
        (function init () {
          if (!angular.isArray($scope.dropdown)) {
            throw new Error('dropdown must be an array！');
          } else {
            if (parseInt($scope.type) === 0) {
              $scope.dropdown.unshift({name: '请选择', id: null});
            }
            $scope.dropdownCopy = angular.copy($scope.dropdown);
          }
          if (typeof $scope.selectedModel === 'number') {
            $scope.selectedModel = $scope.selectedModel + '';
          }
          if (typeof $scope.selectedModel === 'string') {
            if ($scope.selectedModel === '') { // 新建
              $scope.selectedModel = null;
            } else {
              if ($scope.selectedModel.length > 0) { // 编辑
                var selectedModelArray = $scope.selectedModel.split(',');
                for (var i = 0; i < selectedModelArray.length; i++) { // 处理选中状态
                  for (var j = 0; j < $scope.dropdown.length; j++) {
                    if ($scope.dropdown[j].id === selectedModelArray[i]) {
                      $scope.dropdown[j].selected = true;
                    }
                  }
                }
              }
            }
          } else {
            $scope.selectedModel = null;
          }
        })();
        /**
         *监控selectedModel变化
         */
        $scope.$watch('selectedModel', function (newValue, oldValue) {
          if ($scope.selectedModel === '') {
            $scope.selectedModel = null;
          }
          $scope.dropdown = angular.copy($scope.dropdownCopy);
          var selectedModelArray = [];
          if ($scope.selectedModel !== null) {
            selectedModelArray = $scope.selectedModel.split(',');
          } else {
            selectedModelArray = [null];
          }
          if (selectedModelArray.length > 0) {
            for (var i = 0; i < selectedModelArray.length; i++) {
              for (var j = 0; j < $scope.dropdown.length; j++) {
                if (selectedModelArray[i] === null) {
                  if ($scope.dropdown[j].id === null) {
                    $scope.dropdown[j].selected = true;
                  }
                } else {
                  if (parseInt($scope.dropdown[j].id) === parseInt(selectedModelArray[i])) {
                    $scope.dropdown[j].selected = true;
                  }
                }
              }
            }
          }
        });
        /**
         * 选中某个选项：1.支持多选；2.选中和取消选中
         * @param $event
         * @param item
         */
        $scope.selectItem = function ($event, item) {
          $event.stopPropagation();
          if (item.id === null) {
            $scope.selectedModel = null;
          } else {
            if ($scope.selectedModel === null) { // 首次点击
              $scope.selectedModel = item.id + '';
              return;
            }
            if ($scope.selectedModel.length > 0) {
              var selectedModelArray = $scope.selectedModel.split(',');
              var isExist = false;
              var existIndex = null;
              for (var i = 0; i < selectedModelArray.length; i++) {
                if (parseInt(selectedModelArray[i]) === parseInt(item.id)) {
                  isExist = true;
                  existIndex = i;
                  break;
                }
              }
              if (isExist) {
                selectedModelArray.splice(existIndex, 1);
              } else {
                selectedModelArray.push(item.id);
              }
              $scope.selectedModel = selectedModelArray.join(',');
            }
          }
        };
      }]
    };
  }]);
