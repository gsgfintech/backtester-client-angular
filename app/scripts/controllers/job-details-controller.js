'use strict';

angular.module('backtesterclientApp')
.controller('JobDetailsCtrl', ['$stateParams', 'JobsService', function ($stateParams, JobsService) {

    var self = this;

    self.job = null;

    var jobName = $stateParams.jobName;

    if (jobName) {
        JobsService.getJobByName(jobName, function (job) {
            self.job = job;
        }, function (err) {
            console.error('Failed to retrieve job', jobName, ':', err);
        });
    }

}])
.controller('JobDetailsPopupCtrl', ['$uibModalInstance', 'job', function ($uibModalInstance, job) {

    var self = this;

    self.job = job;

    self.detailsLink = '#/jobs/' + job.Name;

    self.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
