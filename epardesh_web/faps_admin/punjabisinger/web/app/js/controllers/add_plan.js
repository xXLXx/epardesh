(function () {
    'use strict';

    var controllerId = 'add_plan';

    angular
        .module('app')
        .controller(controllerId, add_plan);

    add_plan.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'faps_admin_service', '$mdDialog', '$window'];
    function add_plan($rootScope, $scope, $timeout, $state, $location, faps_admin_service, $mdDialog, $window) {
        if (localStorage.getItem('abcde') != null) {
            $scope.data = JSON.parse(localStorage.getItem('abcde'));
            console.log($scope.data);
        }
        else {
            $state.go('home', {});
        }
        $scope.data = JSON.parse(localStorage.getItem('abcde'));
        console.log($scope.data.access_token);

        $scope.planData = {
            'access_token': $scope.data.access_token,
            'name': '',
            'description': '',
            'amount': '',
            'validity': '',
            'plan_type': ''


        };

        $scope.add_plan1 = function () {
            faps_admin_service.add_plan($scope.planData).success(function (response) {
                console.log('response');
                console.log(response);
                console.log($scope.planData);
                if (response.status == 105 || response.status == '105') {
                    $(".alert-success").html("Plan Added successfully!!").show();
                    setTimeout(function () {
                        $(".alert-success").html("").hide();
                        //  $state.go('artist_table')
                    }, 5000);

                    //  $window.alert("Plan Added");

                    // $mdDialog.show(
                    //   $mdDialog.alert()
                    //   .title('Message')
                    //   .textContent('you have login successfully')
                    //   .ok('close')
                    //   );

                    $state.reload();
                }

            });
        };
        //                if (!localStorage.getItem('accesstoken')) {

        //     $state.go('home');
        // }

    }
})();
