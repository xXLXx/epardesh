(function() {
    'use strict';

    angular
            .module('app')
            .factory('mLoginRegiServices', mLoginRegiServices);

    mLoginRegiServices.$inject = ['$http', 'serviceUrl'];
    function mLoginRegiServices($http, serviceUrl) {
        var service = {};
        service.mRegister = mRegister;
        service.mLogin = mLogin;
        service.mChangePassword = mChangePassword;
        service.mUpdatePassword = mUpdatePassword;
        service.mForgotPassword = mForgotPassword;
        service.mPlan = mPlan;
        service.topPaidProfile = topPaidProfile;
        service.verifyEmail = verifyEmail;
        service.mChkEmail = mChkEmail;

        return service;
        function mRegister(data) {
            return $http.post(serviceUrl + 'register_matrimony_user', data);
        }
        function mLogin(data) {
            return $http.post(serviceUrl + 'login_matrimony_user', data);
        }
        function mChangePassword(data) {
            return $http.post(serviceUrl + 'change_matrimony_password', data);
        }
        function mUpdatePassword(data) {
            return $http.post(serviceUrl + 'update_matrimony_password', data);
        }
        function mForgotPassword(data) {
            return $http.post(serviceUrl + 'forgot_matrimony_password', data);
        }
        function mPlan(data) {
            return $http.post(serviceUrl + 'view_matrimony_plans', data);
        }
        function topPaidProfile(data) {
            return $http.post(serviceUrl + 'view_top_profiles', data);
        }
        function verifyEmail(data) {
            return $http.post(serviceUrl + 'verify_email_otp', data);
        }
        function mChkEmail(data) {
            return $http.post(serviceUrl + 'matrimony_check_email', data);
        }
    }

})();