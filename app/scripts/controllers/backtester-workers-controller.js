'use strict';

angular.module('backtesterclientApp')
.controller('BacktesterWorkersCtrl', ['$uibModal', 'BacktesterWorkersService', function ($uibModal, BacktesterWorkersService) {

    var self = this;

    self.workers = BacktesterWorkersService.workers();

    self.add = function () {
        BacktesterWorkersService.addWorkerConfig();
    };

    self.delete = function (config) {
        BacktesterWorkersService.deleteWorkerConfig(config);
    };

    self.edit = function (worker) {
        BacktesterWorkersService.editWorkerConfig(worker);
    };

    self.start = function (name) {
        BacktesterWorkersService.startWorker(name);
    };

    self.stop = function (name) {
        BacktesterWorkersService.stopWorker(name);
    };


    self.restart = function (name) {
        BacktesterWorkersService.restartWorker(name);
    };

    self.startJob = function (name) {
        BacktesterWorkersService.workerAcceptJobs(name);
    };

    self.stopJob = function (name) {
        BacktesterWorkersService.workerRejectJobs(name);
    };

    self.getAttributeValue = function (workerName, attributeName) {
        return BacktesterWorkersService.getAttributeValue(workerName, attributeName);
    };

}]);
