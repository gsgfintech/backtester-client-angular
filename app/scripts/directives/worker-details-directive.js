'use strict';

angular.module('backtesterclientApp')
.directive('workerDetails', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestWorker: '=worker'
        },
        templateUrl: 'views/worker-details-template.html'
    };
}]);
