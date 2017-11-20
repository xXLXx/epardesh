(function() {
    'use strict';
    var controllerId = 'header';

    angular
            .module('app')
            .controller(controllerId, header);
     header.$inject = ['$scope', '$timeout', '$state', 'headerservices'];
    function header($scope, $timeout, $state, headerservices) {
          var vm = this;
          vm.logout = logout;
             function logout() {
            
            localStorage.clear();
            
            $state.go('home');
        }
          
          
          
          
//        vm.changepassword = changepassword;
// /********* ************change password*************************/
        $("#change_pass").click(function() {
            var pass_old = $("#p_old").val();
            var pass_new = $("#p_new").val();
            var con_password = $("#c_password").val();
            if (ifBlank("Old Password", pass_old) == false)
                return false;
            if (ifBlank("Old Password", pass_old) == true)
                {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
            if (ifBlank("New Password", pass_new) == false)
                return false;
            if (ifBlank("New Password", pass_new) == true)
                {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
            if (ifBlank("Confirm Password", con_password) == false)
                return false;
            if (ifBlank("Confirm Password", con_password) == true)
                {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
            if (ifMatch("Passwords", pass_new, con_password) == false)
                return false;
            if (ifBlank("Passwords", pass_new, con_password) == true)
                {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
            var a_token = localStorage.getItem("a_token");
            vm.changeData = {
                'old_password': pass_old,
                'new_password': pass_new,
                'access_token': a_token,
            }
            console.log(a_token);
            headerservices.changepw(vm.changeData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Password updated successfully..");
                    $timeout(function() {
                        $state.go('home');
                    }, 2000);
                }
                else {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        });
//          
     }
})();