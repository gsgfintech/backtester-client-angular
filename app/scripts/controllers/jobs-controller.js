'use strict';

angular.module('backtesterclientApp')
.controller('JobsCtrl', ['$rootScope', 'BacktesterWorkersService', 'JobsService', function ($rootScope, BacktesterWorkersService, JobsService) {

    var self = this;

    function loadJobs() {
        JobsService.loadJobs();
    }

    self.activeJobs = JobsService.getActiveJobs();
    self.inactiveJobs = JobsService.getInactiveJobs();

    self.showJobDetails = function (jobName) {
        JobsService.showJobDetails(jobName);
    };

    self.showWorkerDetails = function (name) {
        BacktesterWorkersService.showWorkerDetails(name);
    };

    self.createJob = function () {
        JobsService.createJob();
    };

    self.deleteJob = function (jobName) {
        JobsService.deleteJob(jobName);
    };

    loadJobs();

}]);
