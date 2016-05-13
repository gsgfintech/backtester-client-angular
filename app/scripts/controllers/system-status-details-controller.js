'use strict';

angular.module('backtesterclientApp')
.controller('SystemStatusDetailsCtrl', ['$uibModalInstance', 'system', function ($uibModalInstance, system) {

    var self = this;

    self.system = system;

    self.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
