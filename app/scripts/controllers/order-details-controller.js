'use strict';

angular.module('backtesterclientApp')
.controller('OrderDetailsCtrl', ['$stateParams', 'JobsService', function ($stateParams, JobsService) {

    var self = this;

    self.order = null;

    var jobName = $stateParams.jobName;
    var orderId = parseInt($stateParams.orderId);

    if (jobName && orderId) {
        JobsService.getOrder(jobName, orderId, function (order) {
            self.order = order;
        });
    }

}])
.controller('OrderDetailsPopupCtrl', ['$uibModalInstance', 'jobName', 'order', function ($uibModalInstance, jobName, order) {

    var self = this;

    self.order = order;

    self.detailsLink = '#/jobs/' + jobName + '/orders/view/' + order.OrderId;

    self.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
