(function() {
    'use strict';
    var controllerId = 'adApprove';
    angular
            .module('app')
            .controller(controllerId, adApprove);
    adApprove.$inject = ['$scope', '$timeout', '$state', '$stateParams', 'adDataServices'];
    function adApprove($scope, $timeout, $state, $stateParams, adDataServices) {
        var vm = this;
       vm.getCurrentState = $state.current.name;
        if ($stateParams.id) {
            var data = {
                ad_id: $stateParams.id,
                status: $stateParams.status
            }
            console.log($stateParams.status);
            vm.status = $stateParams.status;
            vm.ad_id = $stateParams.id;
           console.log(vm.ad_id)
           console.log('iddd')
            adDataServices.approved(data).success(function(response) {
                console.log(response)
                if (response.status == 105) {
                    if ($stateParams.status == 1)
                    {
                        vm.type = 'success';
                        vm.msg = "Your ad activated successfully."
                    } else if ($stateParams.status == 2)
                    {
                        vm.type = 'success';
                        vm.msg = "Your event activated successfully."
                    } else if ($stateParams.status == 3)
                    {
                        vm.type = 'success';
                        vm.msg = "Your  it training activated successfully."

                    }


                }
                else {
                    vm.type = 'danger';
                    vm.msg = "Oops! something went wrong."
                }
            })
        }
        
        
        
         vm.adDetailFun = adDetailFun;
            vm.eventDetailFun = eventDetailFun;
            vm.trainingDetailFun = trainingDetailFun;
            function adDetailFun(id)
            {
                localStorage.setItem('track', vm.getCurrentState)
                $state.go('ad_details', {id: id})
            }
            function eventDetailFun(id)
            {
                 localStorage.setItem('track_event', vm.getCurrentState);
            $state.go('event_details', {id: id});
            }
            function trainingDetailFun(id)
            {
                localStorage.setItem('track_training', vm.getCurrentState);
               $state.go('training_detail', {id: id});
            }
        
        
        
        
        
        
         $('html, body').animate({scrollTop: 0}, 'slow');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

    }
})();