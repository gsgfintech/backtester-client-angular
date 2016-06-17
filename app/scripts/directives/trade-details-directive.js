'use strict';

angular.module('backtesterclientApp')
.directive('tradeDetails', [function () {
    return {
        restrict: 'E',
        scope: {
            backtestTrade: '=trade'
        },
        templateUrl: 'views/trade-details-template.html'
    };
}]);
