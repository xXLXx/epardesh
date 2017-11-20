var config = {};

config.appSettings = {};
// config.appSettings.serviceUrl = 'http://54.172.109.78:4000/';
config.appSettings.serviceUrl = 'http://54.203.0.61:4000/';
//if(!localStorage.getItem('lStatus'))
//{
//   localStorage.setItem('lStatus', 0);
//}
//config.appSettings.loginStatus = localStorage.getItem('lStatus');


function active(link) {
    $(document).ready(function() {
        $(".menu").removeClass("active");
        $("." + link).addClass("active");
        $("html, body").animate({scrollTop: 0});
    });
}
settimeout = 30000;
function showError(message) {
    $(".alert-red").html("*" + message);
    $(".alert-red").show().focus();
    setTimeout(function() {
        $(".alert-red").html("");
        $(".alert-red").hide();
    }, settimeout);
}

function showSuccess(message) {
    console.log("hihihih");
    console.log(message);
    $(".alert-green").html(message);
    $(".alert-green").show();
    setTimeout(function() {
        $(".alert-green").html("");
        $(".alert-green").hide();
    }, settimeout);
}

function showCustomSuccess(message) {
    console.log("showCustomSuccess");
    console.log(message);
    $(".alert-success-msg").html(message);
    $(".alert-success-msg").show();
    setTimeout(function() {
        $(".alert-success-msg").html("");
        $(".alert-success-msg").hide();
    }, settimeout);
}

function showCustomError(message) {
    $(".alert-error-msg").html("*" + message);
    $(".alert-error-msg").show().focus();
    setTimeout(function() {
        $(".alert-error-msg").html("");
        $(".alert-error-msg").hide();
    }, settimeout);
}

function showErrorValidation(message) {
    $(".alert-red").html("*" + message);
    $(".alert-red").show().focus();
    $("html, body").animate({scrollTop: 0});
    setTimeout(function() {
        $(".alert-red").html("");
        $(".alert-red").hide();
    }, 10000);
}
function ifBlank(type, value) {
    if (value == '' || (/^\s*$/.test(value))) {
        showError(type + " Can Not Be Empty");
        return false;
    }
    else
        return true;
}


function ifMatch(type, value1, value2) {
    if (value1 != value2) {
        showError(type + " Do Not Match");
        return false;
    }
    else
        return true;
}

function ifValidEmail(type, value) {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (!(testEmail.test(value))) {
        showError(type + " Should Be Valid");
        return false;
    }
    else
        return true;
}

function ifValidPhone(type, value) {
    var testPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (!(testPhone.test(value))) {
        showError(type + " Should Be Valid");
        return false;
    }
    else
        return true;
}

function ifNumeric(type, value) {

    if (isNaN(value) == true) {
        showError(type + " Should Be Valid");
        return false;
    }
    else
        return true;
}





