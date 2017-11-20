(function() {
    'use strict';
    var controllerId = 'mverify';
    angular
            .module('app')
            .controller(controllerId, mverify);
    mverify.$inject = ['$rootScope', '$scope', '$auth', '$state', '$stateParams', '$location', '$timeout', 'mLoginRegiServices'];
    function mverify($rootScope, $scope, $auth, $state, $stateParams, $location, $timeout, mLoginRegiServices) {
        $("html, body").animate({scrollTop: 0}, 600);
        var vm = this;
        vm.goTologin = goTologin;
        if (localStorage.getItem('m_user_id')) {
            vm.userId = localStorage.getItem('m_user_id');
        }
        else {
            vm.userId = '';
        }

     
        vm.verifyObj = {
            id: $stateParams.user_id,
            otp: $stateParams.otp,
        }
        
        /*=========================View Suggested Profiles===============================*/
        function verifyEmail() {
            mLoginRegiServices.verifyEmail({id: $stateParams.user_id,otp: $stateParams.otp }).success(function(response) {
                console.log("response for verify email")
                console.log(response);
               // return false;
                if (response.status == 105) {
                    console.log("in 105 ")
                  vm.msgType = 'success';
                   vm.msg = 'Email Verified successfully.';
            
                } else {
                    vm.msgType = 'danger';
                    vm.msg = response.message;
                }
            });
        }
        verifyEmail();
        
        
        function goTologin() {
            $state.go('mlogin');
        }
        
    }
})();