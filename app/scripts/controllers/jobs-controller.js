'use strict';

angular.module('backtesterclientApp')
.controller('JobsCtrl', ['JobsService', 'JobsStatusService', 'StratFileUploadService', function (JobsService, JobsStatusService, StratFileUploadService) {

    var self = this;

    self.uploading = false;
    self.fileToUpload = null;

    self.upload = function () {
        self.uploading = true;

        var formData = new FormData();

        formData.append('test', self.fileToUpload);

        StratFileUploadService.save(formData, function (result) {
            console.log(result);

            self.uploading = false;
        });
    };

}]);
