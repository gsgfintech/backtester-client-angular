'use strict';

angular.module('backtesterclientApp')
.controller('BacktesterWorkersAddCtrl', ['$uibModalInstance', 'SystemsConfigsService', function ($uibModalInstance, SystemsConfigsService) {

    var self = this;

    self.name = null;
    self.backtestDBName = null;
    self.backtestDBHost1 = null;
    self.backtestDBPort1 = null;
    self.backtestDBHost2 = null;
    self.backtestDBPort2 = null;
    self.marketDataDBName = null;
    self.marketDataDBHost1 = null;
    self.marketDataDBPort1 = null;
    self.marketDataDBHost2 = null;
    self.marketDataDBPort2 = null;
    self.controllerEndpoint = null;
    self.monitoringEndpoint = null;
    self.slackWebHook = null;

    self.submit = function () {
        var worker = new SystemsConfigsService();
        worker.Name = self.name;
        worker.SystemType = 'BacktesterWorker';
        worker.BacktestDBName = self.backtestDBName;
        worker.BacktestDBHost1 = self.backtestDBHost1;
        worker.BacktestDBPort1 = self.backtestDBPort1;
        worker.BacktestDBHost2 = self.backtestDBHost2;
        worker.BacktestDBPort2 = self.backtestDBPort2;
        worker.MarketDataDBName = self.marketDataDBName;
        worker.MarketDataDBHost1 = self.marketDataDBHost1;
        worker.MarketDataDBPort1 = self.marketDataDBPort1;
        worker.MarketDataDBHost2 = self.marketDataDBHost2;
        worker.MarketDataDBPort2 = self.marketDataDBPort2;
        worker.ControllerEndpoint = self.controllerEndpoint;
        worker.MonitoringEndpoint = self.monitoringEndpoint;
        worker.SlackWebHook = self.slackWebHook;

        console.log('Closing modal with worker:', worker);
        $uibModalInstance.close(worker);
    };

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
