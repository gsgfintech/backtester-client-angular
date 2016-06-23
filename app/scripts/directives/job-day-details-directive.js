'use strict';

angular.module('backtesterclientApp')
.directive('jobDayDetails', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestStatus: '=status'
        },
        templateUrl: 'views/job-day-details-template.html'
    };
}]);
