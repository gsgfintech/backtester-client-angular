'use strict';

angular.module('backtesterclientApp')
.controller('JobsCtrl', ['$rootScope', 'BacktesterWorkersService', 'JobsService', function ($rootScope, BacktesterWorkersService, JobsService) {

    var self = this;

    function reloadJobs() {
        self.pendingJobs = JobsService.getPendingJobs();
        self.inactiveJobs = JobsService.getInactiveJobs();
    }

    self.pendingJobs = JobsService.getPendingJobs();
    self.inactiveJobs = JobsService.getInactiveJobs();

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

    // Event handlers
    $rootScope.$on('reloadJobRequestedEvent', function () {
        reloadJobs();
    });

}]);
