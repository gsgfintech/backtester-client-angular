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

    function formatRate(cross, rate) {
        if (!rate) {
            return null;
        } else if (cross.indexOf('JPY') > -1) {
            return rate.toFixed(3);
        } else {
            return rate.toFixed(5);
        }
    }

    function parseBool(value) {
        value = value.toLowerCase();

        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        } else {
            console.error('Unable to parse value', value, 'as a boolean');
            return null;
        }
    }

    function shortenOrigin(origin) {
        if (origin === 'PositionOpen') {
            return 'PO';
        } else if (origin === 'PositionDouble') {
            return 'PD';
        } else if (origin === 'PositionClose') {
            return 'PC';
        } else if (origin === 'PositionClose_ContStop') {
            return 'PCS';
        } else if (origin === 'PositionClose_ContLimit') {
            return 'PCL';
        } else if (origin === 'PositionClose_TE') {
            return 'PCT';
        } else if (origin === 'PositionClose_CircuitBreaker') {
            return 'PCB';
        } else if (origin === 'PositionReverse_Close') {
            return 'PRC';
        } else if (origin === 'PositionReverse_Open') {
            return 'PRO';
        } else {
            return origin;
        }
    }

    function shortenSide(side) {
        return side.substring(0, 1);
    }

    function shortenType(type) {
        if (!type) {
            return null;
        } else if (type === 'MARKET') {
            return 'MKT';
        } else if (type === 'STOP') {
            return 'STP';
        } else if (type === 'LIMIT') {
            return 'LMT';
        } else if (type === 'TRAILING_STOP') {
            return 'TRAIL';
        } else {
            return type;
        }
    }

    function shortenStatus(status) {
        if (!status) {
            return null;
        } else if (status === 'Submitted') {
            return 'Sbtd';
        } else if (status === 'Filled') {
            return 'Fld';
        } else if (status === 'Cancelled') {
            return 'Cxld';
        } else {
            return status;
        }
    }

    return {
        formatRate: formatRate,
        handleDbActionResult: handleDbActionResult,
        parseBool: parseBool,
        shortenOrigin: shortenOrigin,
        shortenSide: shortenSide,
        shortenStatus: shortenStatus,
        shortenType: shortenType
    };
}]);
