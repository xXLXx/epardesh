/**
 * Created by 75way Technologies on 17/03/2016 AD.
 */
exports.somethingWentWrongError = function (res) {

    var errResponse = {
        status: constant.responseStatus.ERROR_IN_EXECUTION,
        message: constant.responseMessage.ERROR_IN_EXECUTION,
        data: {}
    }
    sendData(errResponse,res);
};

exports.sendSuccessData = function (data,res) {

    var successResponse = {
        status: constant.responseStatus.SHOW_DATA,
        message: "",
        data: data
    };
    sendData(successResponse,res);
};

exports.invalidAccessTokenError = function (res) {

    var errResponse = {
        status: constant.responseStatus.INVALID_ACCESS_TOKEN,
        message: constant.responseMessage.INVALID_ACCESS_TOKEN,
        data: {}
    }
    sendData(errResponse,res);
};

exports.parameterMissingError = function (res) {

    var errResponse = {
        status: constant.responseStatus.PARAMETER_MISSING,
        message: constant.responseMessage.PARAMETER_MISSING,
        data: {}
    }
    sendData(errResponse,res);
};

exports.sendErrorMessage = function (msg,res) {

    var errResponse = {
        status: constant.responseStatus.SHOW_ERROR_MESSAGE,
        message: msg,
        data: {}
    };
    sendData(errResponse,res);
};

exports.successStatusMsg = function (msg,res) {

    var successResponse = {
        status: constant.responseStatus.SHOW_MESSAGE,
        message: msg,
        data: {}
    };

    sendData(successResponse,res);
};


exports.sendData = function (data,res) {
    sendData(data,res);
};


function sendData(data,res)
{
    res.type('json');
    res.jsonp(data);
}
