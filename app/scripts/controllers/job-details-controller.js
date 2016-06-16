'use strict';

angular.module('backtesterclientApp')
.controller('JobDetailsCtrl', ['$location', '$state', '$stateParams', 'JobsService', function ($location, $state, $stateParams, JobsService) {

    var self = this;

    self.job = null;

    var jobName = $stateParams.jobName;

    var tabs = ['info', 'alerts', 'orders', 'trades', 'positions'];

    function findActiveTabIndex() {
        var activeTab = $stateParams.activeTab || 'info';

        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i] === activeTab) {
                self.activeTabIndex = i;
            }
        }
    }

    self.activeTabIndex = 0;

    self.updateLocation = function (location) {
        $location.path('/jobs/' + jobName + '/' + location);
        $state.go('job-details', { jobName: jobName, activeTab: location });
    };

    findActiveTabIndex();

    if (jobName) {
        JobsService.getJobByName(jobName, function (job) {
            self.job = job;
        });
    }

}])
.controller('JobDetailsPopupCtrl', ['$uibModalInstance', 'job', function ($uibModalInstance, job) {

    var self = this;

    self.job = job;

    self.detailsLink = '#/jobs/' + job.Name + '/info';

    self.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
