'use strict';

angular.module('backtesterclientApp')
.controller('TradeDetailsCtrl', ['$stateParams', 'JobsService', function ($stateParams, JobsService) {

    var self = this;

    self.trade = null;

    var jobName = $stateParams.jobName;
    var tradeId = $stateParams.tradeId;

    if (jobName && tradeId) {
        JobsService.getTrade(jobName, tradeId, function (trade) {
            self.trade = trade;
        });
    }

}])
.controller('TradeDetailsPopupCtrl', ['$uibModalInstance', 'jobName', 'trade', function ($uibModalInstance, jobName, trade) {

    var self = this;

    self.trade = trade;

    self.detailsLink = '#/jobs/' + jobName + '/trades/view/' + trade.TradeId;

    self.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
