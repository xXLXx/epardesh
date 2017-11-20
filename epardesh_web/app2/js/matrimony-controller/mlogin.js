(function () {
    'use strict';
    var controllerId = 'mLogin';
    angular
            .module('app')
            .controller(controllerId, mLogin);
    mLogin.$inject = ['$scope', '$auth', '$state', '$stateParams', '$sessionStorage', '$timeout', 'loginRegiServices', 'mLoginRegiServices'];
    function mLogin($scope, $auth, $state, $stateParams, $sessionStorage, $timeout, loginRegiServices, mLoginRegiServices) {
        var vm = this;
        vm.login = login;
        vm.forgotPassword = forgotPassword;
        vm.updatePassword = updatePassword;
        vm.doNotMatch = false;
        
        
        if (localStorage.getItem('m_user_token')) {
            $state.go('matrimony_profile');
            return false;
        }
        
        vm.loginObj = {
            email: null,
            password: null
        }
        vm.forgotObj = {
            email: null,
        }
        vm.updateObj = {
            activation_code: $stateParams.token,
            new_password: null,
        }
        function updatePassword() {
            if (vm.updateObj.new_password != vm.c_password) {
                vm.doNotMatch = true;
                return false;
            }
            mLoginRegiServices.mUpdatePassword(vm.updateObj).success(function (response) {
                console.log(response);
                if (response.status == 105) {
                    localStorage.setItem('p_completed', response.data.profile_completed_percentage);
                    showSuccess("Password updated successfully");
                    $timeout(function () {
                        $state.go('mlogin');
                    }, 2000);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }
        function forgotPassword() {
            mLoginRegiServices.mForgotPassword(vm.forgotObj).success(function (response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Check your email");
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }

        function login() {
            mLoginRegiServices.mLogin(vm.loginObj).success(function (response) {
                console.log("After login");
                console.log(response);
                if (response.status == 105) {
                    showSuccess("login successfully..");
                    localStorage.setItem('m_user_token', response.data.access_token);
                    localStorage.setItem('m_user_id', response.data.id);
                    localStorage.setItem('m_user_name', response.data.first_name);
                    localStorage.setItem('m_user_email', response.data.email);
                    localStorage.setItem('m_user_l_name', response.data.last_name);
                    localStorage.setItem('m_user_profile_id',response.data.profile_id);
                    
                    if(response.data.plan_id < 4){
                        localStorage.setItem('m_user_type', "free");
                    }
                    else if(response.data.plan_id > 6){
                        localStorage.setItem('m_user_type', "platinum");
                    }
                    else{
                        localStorage.setItem('m_user_type', "gold");
                    }
                    localStorage.setItem('m_user_mobile', response.data.mobile);
                    localStorage.setItem('p_completed', response.data.profile_completed_percentage);
                    localStorage.setItem('first_login', 1);
                    localStorage.setItem("mActivePlanID", response.data.plan_id)
                    $timeout(function () {
                        $state.go('mhome');
                    }, 2000);
                }
                else {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        }

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
                    .then(function (response) {
                        console.log('facebook gmail login');
                        console.log(response.data.data);
                        console.log(response.data.data.access_token);
                        if (response.data.status == 105) {
                            
                    localStorage.setItem('m_user_token', response.data.data.access_token);
                    localStorage.setItem('m_user_id', response.data.data.id);
                    localStorage.setItem('m_user_name', response.data.data.first_name);
                    localStorage.setItem('m_user_email', response.data.data.email);
                    localStorage.setItem('m_user_l_name', response.data.data.last_name);
                    localStorage.setItem('m_user_profile_id',response.data.data.profile_id);
                    localStorage.setItem('m_user_type', "free");
//                    if(response.data.plan_id < 4){
//                        localStorage.setItem('m_user_type', "free");
//                    }
//                    else if(response.data.plan_id > 6){
//                        localStorage.setItem('m_user_type', "platinum");
//                    }
//                    else{
//                        localStorage.setItem('m_user_type', "gold");
//                    }
//                    localStorage.setItem('m_user_mobile', response.data.mobile);
//                    localStorage.setItem('p_completed', response.data.profile_completed_percentage);
                    localStorage.setItem('first_login', 1);
                    localStorage.setItem("mActivePlanID", '0')
                            
                            
                            $timeout(function () {
                                $state.go('mhome');
                            }, 2000);
                        }

                        else {
                            showError(response['message']);
                            return false;
                        }
                    })
                    .catch(function (error) {
                        if (error.error) {
                            console.log(error.error);
                        } else if (error.data) {
                            // HTTP response error from server
                            console.log(error.data.message, error.status);
                        } else {
                            console.log(error);
                        }
                    });
        }
        $("#send").click(function () {
            var email = $("#email1").val();
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            vm.forgotData = {
                'email': email,
            }
            mLoginRegiServices.mForgotPassword(vm.forgotData).success(function (response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Check your email");
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        });
    }
})();