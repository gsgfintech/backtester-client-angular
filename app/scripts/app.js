'use strict';

angular.module('backtesterclientApp', ['ngAnimate', 'ngCookies', 'ngFileUpload', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'SignalR', 'toaster', 'ui.router', 'ui.bootstrap', 'uiSwitch'])
//.constant('serverEndpoint', 'https://backtest.gsg.capital:10100/')
.constant('serverEndpoint', 'http://localhost:53855/')
.constant('systemsServiceEndpoint', 'https://tryphon.gsg.capital:6582/')
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl',
        url: '/'
    }).state('jobs', {
        templateUrl: 'views/jobs.html',
        controller: 'JobsCtrl',
        controllerAs: 'jobsCtrl',
        url: '/jobs'
    }).state('job-details', {
        templateUrl: 'views/job-details.html',
        controller: 'JobDetailsCtrl',
        controllerAs: 'jobDetailsCtrl',
        url: '/jobs/:jobName/:activeTab'
    }).state('workers', {
        templateUrl: 'views/backtester-workers.html',
        controller: 'BacktesterWorkersCtrl',
        controllerAs: 'backtesterWorkersCtrl',
        url: '/workers'
    }).state('worker-details', {
        templateUrl: 'views/worker-details.html',
        controller: 'BacktesterWorkerDetailsCtrl',
        controllerAs: 'workerDetailsCtrl',
        url: '/workers/:workerName'
    });

    $urlRouterProvider.otherwise('/');
}]);
