'use strict';

angular.module('backtesterclientApp')
.directive('orderDetails', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestOrder: '=order'
        },
        templateUrl: 'views/order-details-template.html'
    };
}]);
