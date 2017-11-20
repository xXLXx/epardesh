(function() {
    'use strict';

    var controllerId = 'company_table';

    angular
            .module('app')
            .controller(controllerId, company_table);

    company_table.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$mdDialog', 'faps_admin_service'];
    function company_table($rootScope, $scope, $timeout, $state, $location, $mdDialog, faps_admin_service) {
        if (localStorage.getItem('abcde') != null) {
            $scope.data = JSON.parse(localStorage.getItem('abcde'));
            console.log($scope.data);
        }
        else {
            $state.go('home', {});
        }
        $scope.data = JSON.parse(localStorage.getItem('abcde'));
        console.log($scope.data.access_token);

        var artist_data = [];
        var company_data = [];
        ;
        $rootScope.api = $rootScope.api;
        console.log($rootScope.api1)

        $scope.companyData = {
            'access_token': $scope.data.access_token,
            'id': ''
        };
        $scope.viewA = function(id) {
            console.log(id);
            $scope.modalid = id;
        }
        faps_admin_service.company_table($scope.companyData).success(function(response) {
            console.log('response');
            console.log(response.data);
            $scope.show1 = response.data;
            console.log('$scope.show1')
            console.log($scope.show1)

            if (response.status == 105 || response.status == '105') {
                console.log("in success....")
                $scope.show1 = response.data;
                $timeout(function() {
                    $('#dataTables-example-company').dataTable({
                    });
                }, 0, false);

            } else if (response.status == 103 || response.status == '103') {

            }
            //---------------  -------------\\

            //-------------   ./  --------------\\
//            var count = 0;
//            for (var i = 0; i < response.data.length; i++) {
//                if (response.data[i]["user_type"] == 3)
//                {
//                    company_data.push(response.data[i]);
//                    count = parseInt(count) + 1;
//                }
//                else {
//                    artist_data.push(response.data[i]);
//                    count = parseInt(count) + 1;
//                }
//                if (parseInt(count) == response.data.length - 1) {
//                    $scope.show1 = company_data;
//
//                }
//            }

            // if(response.data.user_type == 3)
            //   {
            //     $scope.show1 = response.data;

            //    alert(response.data.user_type)
            //    console.log('response.data.user_type');
            //  console.log(response.data.user_type);
            //  }

        });
        $scope.data = JSON.parse(localStorage.getItem('abcde'));
        console.log($scope.data.access_token);
        $scope.editamountData = {
            'access_token': $scope.data.access_token,
            'id': '',
            'plan_amount': ''

        };

        $scope.editAmount1 = function(z) {
            $scope.editamountData.id = z.id;
            $scope.editamountData.plan_amount = z.plan_amount;

        }

        $scope.editAmount = function() {

            console.log($scope.editamountData);

            // console.log($scope.editData.access_token);
            // $scope.editData.plan_id = $scope.modalplan_id;
            // console.log($scope.editData.plan_id);

            faps_admin_service.editAmount($scope.editamountData).success(function(response) {
                console.log('response');
                console.log(response);
                if (response.status == 105 || response.status == '105') {
                    $(".alert-success").html("Plan updated successfully").show();
                    setTimeout(function() {
                        $(".alert-success").html("").hide();
                        //  $state.go('artist_table')
                    }, 5000);
                    // $window.alert("Updated");
                    // localStorage.setItem('abcde', JSON.stringify(response.data));
                    $state.reload();
                    //                   $mdDialog.show(
                    //                           $mdDialog.alert()
                    //                           .title('Message')
                    //                           .textContent('Deleted')
                    //                           .ok('close')
                    //                           );
                    //  $location.path('/artist_table');

                    //               }
                }
            })

        }




        $scope.viewArtist = function(id) {
            //  console.log(id);
            console.log($scope.companyData.access_token);
            $scope.companyData.id = id;
            console.log($scope.companyData.id);
            $rootScope.current_company_id = $scope.companyData.id;
            console.log("from company page");
            console.log($rootScope.current_company_id)
            $state.go('artist_view');
//            faps_admin_service.companyArtist($scope.companyData).success(function(response) {
//                console.log('response');
//                console.log(response);
//                if (response.status == 105 || response.status == '105') {
//// localStorage.setItem('abcde', JSON.stringify(response.data));
//
////                   $mdDialog.show(
////                           $mdDialog.alert()
////                           .title('Message')
////                           .textContent('Approved')
////                           .ok('close')
////                           );
//                    $location.path('/artist_view');
//
////               }
//                }
//            })

        }




    }
})();
