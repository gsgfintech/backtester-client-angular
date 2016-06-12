'use strict';

angular.module('backtesterclientApp')
.controller('BacktesterWorkersAddCtrl', ['$uibModalInstance', function ($uibModalInstance) {

    var self = this;

    self.worker = {
        Name: null,
        Config: {}
    };

    self.submit = function () {
        console.log('Closing modal with worker:', self.worker);
        $uibModalInstance.close(self.worker);
    };

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
