'use strict';

angular.module('backtesterclientApp')
.directive('workerConfigEdit', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestWorker: '=worker'
        },
        templateUrl: 'views/worker-config-edit-template.html'
    };
}]);
