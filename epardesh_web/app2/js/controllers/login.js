(function() {
    'use strict';
    var controllerId = 'login';
    angular
            .module('app')
            .controller(controllerId, login);
    login.$inject = ['$scope', '$auth', '$state', '$sessionStorage', '$timeout', 'loginRegiServices'];
    function login($scope, $auth, $state, $sessionStorage, $timeout, loginRegiServices) {
        var vm = this;
        localStorage.setItem('utype', 1);
        $("input[name='radio1']").click(function() {
            if ($("#reg_user").is(":checked")) {
                localStorage.setItem('utype', 1);
                console.log(localStorage.getItem('utype'));
            }
            if ($("#reg_business").is(":checked")) {
                localStorage.setItem('utype', 2);
                console.log(localStorage.getItem('utype'));
            }
        });
        $("#log").click(function() {
            $(".issign").hide();
            $(".islogin").show();
            var email = $("#email").val();
            var password = $("#password").val();
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            if (ifBlank("Password", password) == false)
                return false;
            vm.logData = {
                'email': email,
                'password': password,
            }
            loginRegiServices.login(vm.logData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("login successfully..");
                    localStorage.setItem('a_token', response.data.access_token);
                    localStorage.setItem('user_id', response.data.id);
                    localStorage.setItem('user_name', response.data.first_name);
                    localStorage.setItem('user_l_name', response.data.last_name);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('phone', response.data.phone);
                    localStorage.setItem('business', response.data.business_name);
                    localStorage.setItem('user_type', response.data.user_type);
//                    var a_token=localStorage.getItem("a_token");
//                    console.log(a_token);
                    var usertype = localStorage.getItem("user_type");
                    console.log(usertype);
                        $timeout(function() {
                            $state.go('home');
                        }, 2000);
                   
//                    else {
//                        $timeout(function() {
//                            $state.go('setting');
//                        }, 2000);
//                    }
                }
                else {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        });
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                    .then(function(response) {
                console.log('facebook gmail login');
                console.log(response.data.data);
                console.log(response.data.data.access_token);
                if (response.data.status == 105) {
                    console.log("user 1");
                    localStorage.setItem('user_id', response.data.data.id);
                    localStorage.setItem('access_token', response.data.data.access_token);
                    localStorage.setItem('email', response.data.data.email);
                    localStorage.setItem('phone', response.data.data.phone);
                    localStorage.setItem('business', response.data.data.business_name);
                    localStorage.setItem('user_name', response.data.data.first_name);
                    localStorage.setItem('status', response.data.data.status);
                    localStorage.setItem('user_type', response.data.data.user_type);
                    vm.user_type_status = localStorage.getItem('user_type');
                    vm.user_status = localStorage.getItem('status');
                    if (vm.user_status == "login") {
                        console.log("login user");
                        console.log(vm.user_type_status);
                        if (vm.user_type_status == 1) {
                            $timeout(function() {
                                $state.go('home');
                            }, 2000);
                        }
                        else if (vm.user_type_status == 2) {
                            $timeout(function() {
                                $state.go('home');
                            }, 2000);
                        }
                    }
                    else if (vm.user_status === "signup") {
                        vm.fgData = {
                            'email': localStorage.getItem('email'),
                            'user_type': 2,
                        }
                        loginRegiServices.updateusertype(vm.fgData).success(function(response) {
                            console.log(response);
                            if (response.status == 105) {
                                console.log("ok");
                                vm.user_status = response.data.status;
                                vm.user_type_status = response.data.user_type;
                                if (vm.user_status == "login") {
                                    if (vm.user_type_status == 1) {
                                        console.log("user type" + vm.user_type_status);
                                        $timeout(function() {
                                            $state.go('home');
                                        }, 2000);
                                    }
                                    else if (vm.user_type_status == 2) {
                                        console.log("user type" + vm.user_type_status);
                                        $timeout(function() {
                                            $state.go('home');
                                        }, 2000);
                                    }
                                }

                            }
                        });
                    }
                }
                else {
                    showError(response['message']);
                    return false;
                }
            })
            . catch (function(error) {
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
        $("#send").click(function() {
            var email = $("#email1").val();
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            vm.forgotData = {
                'email': email,
            }
            loginRegiServices.forgotPassword(vm.forgotData).success(function(response) {
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