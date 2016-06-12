'use strict';

angular.module('backtesterclientApp')
.factory('CommonsService', ['PopupService', function (PopupService) {

    function notifyError(errMsg, cb) {
        console.error(errMsg);
        PopupService.showError(errMsg);

        if (cb) {
            cb(errMsg);
        }
    }

    function notifySuccess(msg, cb) {
        console.log(msg);
        PopupService.showSuccess(msg);

        if (cb) {
            cb(msg);
        }
    }

    function handleDbActionResult(result, successCb, errCb) {
        if (result.Success) {
            notifySuccess(result.Message, successCb);
        } else {
            notifyError(result.Message, errCb);
        }
    }

    return {
        handleDbActionResult: handleDbActionResult
    };
}]);
