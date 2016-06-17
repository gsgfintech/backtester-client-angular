'use strict';

angular.module('backtesterclientApp')
.directive('alertDetails', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestAlert: '=alert'
        },
        templateUrl: 'views/alert-details-template.html'
    };
}]);
