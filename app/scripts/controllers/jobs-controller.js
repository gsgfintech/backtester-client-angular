'use strict';

angular.module('backtesterclientApp')
.controller('JobsCtrl', ['$rootScope', 'BacktesterWorkersService', 'JobsService', function ($rootScope, BacktesterWorkersService, JobsService) {

    var self = this;

    self.activeJobsPanelTitle = 'Active Jobs';

    function loadJobs() {
        JobsService.loadJobs();
    }

    self.activeJobs = JobsService.getActiveJobs();
    self.inactiveJobs = JobsService.getInactiveJobs();

    self.showWorkerDetails = function (name) {
        BacktesterWorkersService.showWorkerDetails(name);
    };

    self.createJob = function () {
        JobsService.createJob();
    };

    loadJobs();

}]);
