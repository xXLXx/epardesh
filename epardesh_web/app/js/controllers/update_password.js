(function() {
    'use strict';
    var controllerId = 'update';
    angular
            .module('app')
            .controller(controllerId, update);
    update.$inject = ['$scope', '$state', '$stateParams','$timeout','loginRegiServices'];
    function update($scope, $state, $stateParams,$timeout,loginRegiServices) {
        $("html, body").animate({scrollTop: 0}, 600);
        var vm = this;
        $("#update_pass").click(function() {
            var new_password = $("#new_password").val();
            var cpassword = $("#cpassword").val();
            console.log("password"+ new_password);
            if (ifBlank("Password", new_password) == false)
                return false;
            if (ifBlank("Confirm password", cpassword) == false)
                return false;
            if (ifMatch("Passwords", new_password, cpassword) == false)
                return false;
            vm.updateObj = {
                "new_password": new_password,
                "activation_code": $stateParams.token,
            }
            loginRegiServices.updatepassword(vm.updateObj).success(function(response) {
                 console.log(response);
                if (response.status == 105) {
                    showSuccess("updated successfully..");
                   $timeout(function() {
                        $state.go('login');
                    }, 1500)
                }
                else {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        });
        
         $('body').removeClass('modal-open');
$('.modal-backdrop').remove();
    }
})();