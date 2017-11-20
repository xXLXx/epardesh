(function() {
    'use strict';
    var controllerId = 'viewParticularCtrl';
    angular
            .module('app')
            .controller(controllerId, viewParticularCtrl);
    viewParticularCtrl.$inject = ['$scope', '$timeout', '$state', 'manageaddServices', '$stateParams'];
    function viewParticularCtrl($scope, $timeout, $state, manageaddServices, $stateParams) {
        var vm = this;
        vm.viewObj = {
            ad_id: $stateParams.id
        }
          $("#preloader").show();
        manageaddServices.viewParticularAd(vm.viewObj).success(function(response) {
            console.log(response);
              $("#preloader").hide();
            if (response.status == 105) {
               vm.adData=response.data;
            }
            else
            {
                console.log(response)
                alert(response['message']);
                return false;
            }
        });
    }
})();