/**
 * Created by Yjs on 2018/1/2.
 */
'use strict';
angular.module('frontierApp', [
  'frontierApp.sidebar',
  'frontierApp.demo'
])
  .config(['$urlRouterProvider', '$httpProvider', '$logProvider', function ($urlRouterProvider, $httpProvider, $logProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.withCredentials = true;
    $urlRouterProvider.otherwise('/sidebar/demoAdd');
    $logProvider.debugEnabled(false);
  }])
  .controller('RootController', ['$rootScope', '$scope', '$timeout', '$location', '$state','$log', function ($rootScope, $scope, $timeout, $location,$state,$log) {
    var devEnvirement = 'test', baseUrl = '';//develop developOnline product productOnline
    if (devEnvirement === 'dev') {
      baseUrl = 'http://10.139.4.33:9082';
    } else if (devEnvirement === 'test') {
      baseUrl = 'http://223.105.4.162:9082';// developOnline baseurl
      // baseUrl = 'http://10.139.9.82:9086';// developOnline baseurl
    } else if (devEnvirement === 'product') {
      baseUrl = 'http://112.35.26.70:9082';// productOnlin baseurl
    }
    $rootScope.restInterfaceUrls = {};
  }]);
