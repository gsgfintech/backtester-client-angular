'use strict';

angular.module('backtesterclientApp')
.controller('MainCtrl', ['BacktesterWorkersService', function (BacktesterWorkersService) {

    var self = this;

    self.workers = BacktesterWorkersService.workers();

    self.showWorkerStatusDetails = function (name) {
        BacktesterWorkersService.showStatusDetails(name);
    };

    self.getAttributeValue = function (workerName, attributeName) {
        return BacktesterWorkersService.getAttributeValue(workerName, attributeName);
    };

}]);
