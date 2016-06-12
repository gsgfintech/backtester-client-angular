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
}]);
