'use strict';

angular.module('backtesterclientApp')
.directive('jobAllTrades', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobAllTrades: '=trades'
        },
        templateUrl: 'views/job-all-trades-template.html',
        controller: [function () {
        }]
    };
}]);
