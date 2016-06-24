'use strict';

angular.module('backtesterclientApp')
.directive('jobDetails', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJob: '=job'
        },
        templateUrl: 'views/job-details-template.html',
        controller: ['$scope', function ($scope) {
            $scope.formatParamName = function (name) {
                return name.replace('Param', '');
            };
        }]
    };
}])
.directive('jobOrders', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobDay: '=day',
            backtestJobOrders: '=orders'
        },
        templateUrl: 'views/job-orders-template.html',
        controller: ['$scope', 'CommonsService', 'JobsService', function ($scope, CommonsService, JobsService) {
            $scope.formatRate = function (cross, rate) {
                return CommonsService.formatRate(cross, rate);
            };

            $scope.shortenOrigin = function (origin) {
                return CommonsService.shortenOrigin(origin);
            };

            $scope.shortenStatus = function (status) {
                return CommonsService.shortenStatus(status);
            };

            $scope.shortenType = function (type) {
                return CommonsService.shortenType(type);
            };

            $scope.showOrderDetails = function (orderId) {
                JobsService.showOrderDetails($scope.backtestJobName, $scope.backtestJobDay, orderId);
            };
        }]
    };
}])
.directive('jobTrades', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobDay: '=day',
            backtestJobTrades: '=trades'
        },
        templateUrl: 'views/job-trades-template.html',
        controller: ['$scope', 'CommonsService', 'JobsService', function ($scope, CommonsService, JobsService) {
            $scope.formatRate = function (cross, rate) {
                return CommonsService.formatRate(cross, rate);
            };

            $scope.showTradeDetails = function (tradeId) {
                JobsService.showTradeDetails($scope.backtestJobName, $scope.backtestJobDay, tradeId);
            };
        }]
    };
}])
.directive('jobAlerts', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobDay: '=day',
            backtestJobAlerts: '=alerts'
        },
        templateUrl: 'views/job-alerts-template.html',
        controller: ['$scope', 'JobsService', function ($scope, JobsService) {
            $scope.showAlertDetails = function (alertId) {
                JobsService.showAlertDetails($scope.backtestJobName, $scope.backtestJobDay, alertId);
            };
        }]
    };
}]);
