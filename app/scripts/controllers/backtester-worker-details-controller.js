'use strict';

angular.module('backtesterclientApp')
.controller('BacktesterWorkerDetailsCtrl', ['$stateParams', 'BacktesterWorkersService', function ($stateParams, BacktesterWorkersService) {

    var self = this;

    self.worker = null;

    var workerName = $stateParams.workerName;

    if (workerName) {
        BacktesterWorkersService.getWorkerByName(workerName, function (worker) {
            self.worker = worker;
        }, function (err) {
            console.error(err);
        });
    }

}])
.controller('BacktesterWorkerDetailsPopupCtrl', ['$uibModalInstance', 'worker', function ($uibModalInstance, worker) {

    var self = this;

    self.worker = worker;

    self.detailsLink = '#/workers/' + worker.Name;

    self.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
