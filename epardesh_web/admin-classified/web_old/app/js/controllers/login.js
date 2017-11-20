(function() {
    'use strict';
    var controllerId = 'login';
    angular
            .module('app')
            .controller(controllerId, login);
    login.$inject = ['$scope', '$state', '$timeout', 'loginRegiServices'];
    function login($scope, $state, $timeout, loginRegiServices) {
        var vm = this;
        $("#log").click(function() {
            var user_name = $("#email").val();
            var password = $("#password").val();
            if (ifBlank("Email", user_name) == false)
                return false;
            if (ifValidEmail("Email", user_name) == false)
                return false;
            if (ifBlank("Password", password) == false)
                return false;
            if (ifBlank("Password", password) === true)
            {
                $(".alert-red").css("display", "none");
            }
            vm.logData = {
                'user_name': user_name,
                'password': password,
            }
            loginRegiServices.login(vm.logData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Login Successful! Redirecting...");
                    localStorage.setItem('a_token', response.data.access_token);
                    localStorage.setItem('lStatus', 1);
                    config.appSettings.loginStatus = localStorage.getItem('lStatus');
                    $timeout(function() {
                        $state.go('category');
                    }, 1500);
                }
                else
                {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        });

    }
})();