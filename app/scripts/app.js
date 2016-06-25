'use strict';

angular.module('backtesterclientApp', ['ngAnimate', 'ngCookies', 'ngFileUpload', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'SignalR', 'toaster', 'ui.router', 'ui.bootstrap', 'uiSwitch'])
//.constant('serverEndpoint', 'https://backtest.gsg.capital:10100/')
.constant('serverEndpoint', 'http://localhost:53855/')
.constant('systemsServiceEndpoint', 'https://tryphon.gsg.capital:6582/')
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('jobs', {
        templateUrl: 'views/jobs.html',
        controller: 'JobsCtrl',
        controllerAs: 'jobsCtrl',
        url: '/jobs'
    }).state('job-details', {
        templateUrl: 'views/job-details.html',
        controller: 'JobDetailsCtrl',
        controllerAs: 'jobDetailsCtrl',
        url: '/jobs/:jobName/:activeTab'
    }).state('order-details', {
        templateUrl: 'views/order-details-view.html',
        controller: 'OrderDetailsCtrl',
        controllerAs: 'orderDetailsCtrl',
        url: '/jobs/:jobName/orders/view/:orderId'
    }).state('trade-details', {
        templateUrl: 'views/trade-details-view.html',
        controller: 'TradeDetailsCtrl',
        controllerAs: 'tradeDetailsCtrl',
        url: '/jobs/:jobName/trades/view/:tradeId'
    }).state('alert-details', {
        templateUrl: 'views/alert-details-view.html',
        controller: 'AlertDetailsCtrl',
        controllerAs: 'alertDetailsCtrl',
        url: '/jobs/:jobName/alerts/view/:alertId'
    }).state('search', {
        templateUrl: 'views/job-search.html',
        controller: 'JobSearchCtrl',
        controllerAs: 'jobSearchCtrl',
        url: '/search/'
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

    $urlRouterProvider.otherwise('/jobs');
}]);
