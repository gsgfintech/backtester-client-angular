'use strict';

angular.module('backtesterclientApp')
.controller('BacktesterWorkersCtrl', ['$uibModal', 'BacktesterWorkersService', 'JobsService', function ($uibModal, BacktesterWorkersService, JobsService) {

    var self = this;

    self.workers = BacktesterWorkersService.workers();

    self.add = function () {
        BacktesterWorkersService.addWorkerConfig();
    };

    self.delete = function (name) {
        BacktesterWorkersService.deleteWorker(name);
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

    self.workerAcceptJobs = function (name) {
        BacktesterWorkersService.workerAcceptJobs(name);
    };

    self.workerRejectJobs = function (name) {
        BacktesterWorkersService.workerRejectJobs(name);
    };

    self.showWorkerDetails = function (name) {
        BacktesterWorkersService.showWorkerDetails(name);
    };

    self.showJobDetails = function (jobName) {
        JobsService.showJobDetails(jobName);
    };

}]);
