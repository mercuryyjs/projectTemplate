/**
 * Created by Yjs on 2018/1/2.
 */
angular.module('frontierApp.demo')
  .controller('DemoAddController', ['$rootScope', '$scope', '$log', '$filter', '$timeout', function ($rootScope, $scope, $log, $filter, $timeout) {
    $scope.title = '';
    $scope.submit = function () {
      console.log($scope.title);
      console.log($scope.company1);
      console.log($scope.company2);
      console.log($scope.company3);
      console.log($scope.date);
      console.log($scope.company5);
    };
    $scope.company1 = {};
    $scope.company2 = {};
    $scope.company3 = {};
    $scope.company4 = {name: '苏州分公司', id: 3};
    // $scope.company5 = [{name: '集团公司', id: 1}];
    // $scope.company5 = [];
    $scope.companyList1 = [
      {name: '移动集团移动集团移动集团', id: 1},
      {name: '北京分公司', id: 2},
      {name: '苏州分公司', id: 3},
      {name: '上海分公司', id: 4}
    ];
    $scope.companyList2 = [
      {name: '移动集团', id: 1},
      {name: '北京分公司', id: 2},
      {name: '苏州分公司', id: 3},
      {name: '上海分公司', id: 4}
    ];
    $scope.companyList3 = [
      {name: '移动集团', id: 1},
      {name: '北京分公司', id: 2},
      {name: '苏州分公司', id: 3},
      {name: '上海分公司', id: 4}
    ];
    $scope.companyList4 = [
      {name: '移动集团', id: 1},
      {name: '北京分公司', id: 2},
      {name: '苏州分公司', id: 3},
      {name: '上海分公司', id: 4}
    ];
    $scope.companyList5 = [
      {name: '移动集团', id: 1},
      {name: '北京分公司', id: 2},
      {name: '苏州分公司', id: 3},
      {name: '上海分公司', id: 4}
    ];
    $scope.company5 = null;
    $scope.reset = function () {
      $scope.title = '';
      $scope.company1 = {};
      $scope.company2 = {};
      $scope.company3 = {};
      $scope.company4 = {};
    };
    $scope.date = new Date();
    $scope.date2 = new Date();
    $scope.reverse = false;
    $scope.orderChange = function (str, set) {
      set = $filter('orderBy')(set, str, $scope.reverse);
      $scope.reverse = !$scope.reverse;
    };
  }]);
