'use strict';

angular.module('backtesterclientApp')
.controller('AlertDetailsCtrl', ['$stateParams', 'JobsService', function ($stateParams, JobsService) {

    var self = this;

    self.alert = null;

    var jobName = $stateParams.jobName;
    var alertId = $stateParams.alertId;

    if (jobName && alertId) {
        JobsService.getAlert(jobName, alertId, function (alert) {
            self.alert = alert;
        });
    }

}])
.controller('AlertDetailsPopupCtrl', ['$uibModalInstance', 'jobName', 'alert', function ($uibModalInstance, jobName, alert) {

    var self = this;

    self.alert = alert;

    self.detailsLink = '#/jobs/' + jobName + '/alerts/view/' + alert.AlertId;

    self.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
