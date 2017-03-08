'use strict';

angular.module('backtesterclientApp')
.directive('jobUnrealizedPnls', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestJobName: '=name',
            backtestJobUnrealizedPnls: '=pnls'
        },
        templateUrl: 'views/job-unrealized-pnls-template.html',
        controller: [function () {
        }]
    };
}]);
