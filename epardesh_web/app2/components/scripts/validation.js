//******* Configurations variables and Functions *******//
settimeout = 1000 * 5;

function showError(message) {
    $(".alert-danger").html("*" + message);
    $(".alert-danger").show().focus();
    $("html, body").animate({scrollTop: 0});
    setTimeout(function() {
        $(".alert-danger").html("");
        $(".alert-danger").hide();
    }, settimeout);
}

function showSuccess(message) {
    $(".alert-success").html(message);
    $(".alert-success").show();
    $("html, body").animate({scrollTop: 0});
    setTimeout(function() {
        $(".alert-success").html("");
        $(".alert-success").hide();
    }, settimeout);
}

function validateselect(type, value) {
      if (value == 0|| value =='0') {
        showError(type + " should be choose");
        return false;
    }
    else
        return true;
}
function ifBlank(type, value) {
    if (value == '' || (/^\s*$/.test(value))) {
        showError(type + " can not be empty");
        return false;
    }
    else
        return true;
}
function ifValidName(type, value) {
    var testName = /^[A-Z]/;
    if (!(testName.test(value))) {
        showError(type + " should be valid");
        return false;
    }
    else
        return true;
}

function ifMatch(type, value1, value2) {
    if (value1 != value2) {
        showError(type + " do not match");
        return false;
    }
    else
        return true;
}

function ifValidEmail(type, value) {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (!(testEmail.test(value))) {
        showError(type + " should be valid");
        return false;
    }
    else
        return true;
}

function ifNumeric(type, value) {

    if (isNaN(value) == true) {
        showError(type + " should be valid");
        return false;
    }
    else
        return true;
}
function validateWebsiteUrl(type, value) {
    var matches = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!(matches.test(value))) {
        showError(type + " should be valid");
        return false;
    }
    else
        return true;
}
function formatDateToDDMMYYYY(fdate){
    var dd = fdate.getDate();
    if (dd < 10) {
        dd = "0" + dd;
    }
    var mm = parseInt(fdate.getMonth()) + parseInt(1);
    if (mm < 10) {
        mm = "0" + mm;
    }
    var yyyy = fdate.getFullYear();
    var event_date = dd + "-" + mm + "-" + yyyy;
    return event_date;
}

//***** Bootsrap Input Mask MSIE *****//
jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();