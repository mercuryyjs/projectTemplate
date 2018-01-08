/**
 * Created by Yjs on 2018/1/2.
 */
angular.module('frontierApp.demo')
  .controller('DemoAddController', ['$rootScope', '$scope', '$log', function ($rootScope, $scope, $log) {
    $scope.title = '';
    $scope.submit = function () {
      console.log($scope.title);
      console.log($scope.company1);
      console.log($scope.company2);
      console.log($scope.company3);
      console.log($scope.date);
    };
    $scope.company1 = {};
    $scope.company2 = {};
    $scope.company3 = {};
    $scope.company4 = {name: '苏州分公司', id: 3};
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
    $scope.reset = function () {
      $scope.title = '';
      $scope.company1 = {};
      $scope.company2 = {};
      $scope.company3 = {};
      $scope.company4 = {};
    };
    $scope.date = new Date();
    $scope.date2 = new Date();
  }]);
