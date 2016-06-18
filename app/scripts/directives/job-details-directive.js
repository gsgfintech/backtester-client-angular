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
            backtestJobOrders: '=orders'
        },
        templateUrl: 'views/job-orders-template.html',
        controller: ['$scope', 'JobsService', function ($scope, JobsService) {
            $scope.showOrderDetails = function (orderId) {
                JobsService.showOrderDetails($scope.backtestJobName, orderId);
            };
        }]
};
}])
.directive('jobTrades', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobTrades: '=trades'
        },
        templateUrl: 'views/job-trades-template.html',
        controller: ['$scope', 'JobsService', function ($scope, JobsService) {
            $scope.showTradeDetails = function (tradeId) {
                JobsService.showTradeDetails($scope.backtestJobName, tradeId);
            };
        }]
    };
}])
.directive('jobPositions', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobPositions: '=positions'
        },
        templateUrl: 'views/job-positions-template.html'
    };
}])
.directive('jobAlerts', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobAlerts: '=alerts'
        },
        templateUrl: 'views/job-alerts-template.html',
        controller: ['$scope', 'JobsService', function ($scope, JobsService) {
            $scope.showAlertDetails = function (alertId) {
                JobsService.showAlertDetails($scope.backtestJobName, alertId);
            };
        }]
};
}]);
