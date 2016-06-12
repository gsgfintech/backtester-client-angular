'use strict';

angular.module('backtesterclientApp')
.controller('JobsCtrl', ['BacktesterWorkersService', 'JobsService', function (BacktesterWorkersService, JobsService) {

    var self = this;

    function reloadJobs() {
        self.pendingJobs = JobsService.getPendingJobs();
    }

    self.pendingJobs = JobsService.getPendingJobs();

    self.showJobDetails = function (jobName) {
        JobsService.showJobDetails(jobName);
    };

    self.showWorkerDetails = function (name) {
        BacktesterWorkersService.showWorkerDetails(name);
    };

    self.createJob = function () {
        JobsService.createJob(reloadJobs, reloadJobs);
    };

    self.deleteJob = function (jobName) {
        JobsService.deleteJob(jobName, reloadJobs, reloadJobs);
    };

}]);
