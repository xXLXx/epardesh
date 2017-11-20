(function() {
    'use strict';
    var controllerId = 'matrimonynotification';
    angular
            .module('app')
            .controller(controllerId, viewmatrimonyplan);
    viewmatrimonyplan.$inject = ['$scope', '$timeout', '$state', '$stateParams', 'matrimonynotificationServices'];
    function viewmatrimonyplan($scope, $timeout, $state,$stateParams, matrimonynotificationServices) {
        var vm = this;
        $("#preloader").show();

        /**************update plan***************/
       
        $(document).delegate('#send-notification-profile', 'click', function() {
            console.log("in notifivcation profile");
            matrimonynotificationServices.matrimonyprofilecompletionalert().success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Notification sent Successfully!");
                    $timeout(function() {
                       
                       $state.reload();
                    }, 1000);

                }
                else {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
            });


  $(document).delegate('#send-notification-plan', 'click', function() {
            matrimonynotificationServices.matrimonyplanexpirationalert().success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Notification sent Successfully!");
                    $timeout(function() {
                       
                        $state.reload();
                    }, 1000);

                }
                else {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
            });


       



    }
})();