'use strict';

angular.module('backtesterclientApp')
.controller('JobDetailsCtrl', ['$rootScope', '$location', '$state', '$stateParams', 'JobsService', function ($rootScope, $location, $state, $stateParams, JobsService) {

    var self = this;

    self.job = null;

    self.jobName = $stateParams.jobName;

    var tabs = ['info'];
    var subTabs = ['alerts', 'orders', 'trades', 'positions'];

    function findActiveTabIndex() {
        var activeTab = $stateParams.activeTab || 'info';

        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] === activeTab) {
                self.activeTabIndex = i;
            }
        }
    }

    self.updateActiveSubTab = function (activeSubTab) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] === activeSubTab) {
                self.activeSubTabIndex = i;
            }
        }
    }

    function setJob() {
        JobsService.getJobByName(self.jobName, function (job) {
            self.job = job;

            tabs = ['info'].concat(job.Output.map(function (output) {
                return output.Day;
            }));

            findActiveTabIndex();
        });
    }

    self.activeTabIndex = 0;
    self.activeSubTabIndex = 0;

    self.updateLocation = function (location) {
        $location.path('/jobs/' + self.jobName + '/' + location);
        $state.go('job-details', { jobName: self.jobName, activeTab: location });
    };

    self.activeJobs = JobsService.getActiveJobs();
    self.inactiveJobs = JobsService.getInactiveJobs();

    if (self.jobName) {
        setJob();
    }

    // Event handlers
    $rootScope.$on('jobsService.jobUpdatedEvent', function (event, data) {
        if (data.jobName === self.jobName || data.jobName === 'all') {
            setJob();
        }
    });

}])
.controller('JobDetailsPopupCtrl', ['$uibModalInstance', 'job', function ($uibModalInstance, job) {

    var self = this;

    self.job = job;

    self.detailsLink = '#/jobs/' + job.Name + '/info';

    self.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
