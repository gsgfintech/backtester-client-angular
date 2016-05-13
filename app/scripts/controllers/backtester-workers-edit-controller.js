'use strict';

angular.module('backtesterclientApp')
.controller('BacktesterWorkersEditCtrl', ['$uibModalInstance', 'worker', function ($uibModalInstance, worker) {

    var self = this;

    self.worker = worker;

    self.submit = function () {
        console.log('Closing modal with worker:', self.worker);
        $uibModalInstance.close(self.worker);
    };

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
