'use strict';

angular.module('backtesterclientApp')
.directive('jobDetails', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJob: '=job'
        },
        templateUrl: 'views/job-details-template.html'
    };
}])
.directive('jobOrders', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobOrders: '=orders'
        },
        templateUrl: 'views/job-orders-template.html'
    };
}])
.directive('jobTrades', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobTrades: '=trades'
        },
        templateUrl: 'views/job-trades-template.html'
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
        templateUrl: 'views/job-alerts-template.html'
    };
}]);
