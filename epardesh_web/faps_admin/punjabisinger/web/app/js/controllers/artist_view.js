(function() {
    'use strict';

    var controllerId = 'artist_view';

    angular
            .module('app')
            .controller(controllerId, artist_view);

    artist_view.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$mdDialog', '$window', 'faps_admin_service'];
    function artist_view($rootScope, $scope, $timeout, $state, $location, $mdDialog, $window, faps_admin_service) {
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
        console.log("roure scope from particular company artist");
        console.log($rootScope.current_company_id)
//$rootScope.api1 =$rootScope.api;
//console.log($rootScope.api1)
        $scope.artistData = {
            'access_token': $scope.data.access_token,
            'id': $rootScope.current_company_id
        };
        
$scope.companyArtistViewFun = function(){
    $scope.companyArtistView = {};
    faps_admin_service.companyArtist($scope.artistData).success(function(response) {
            console.log('response from artist view....');
            console.log(response.data);

            if (response.status == 105 || response.status == '105') {
                console.log("in success....")
                $scope.companyArtistView = response.data;
                console.log("$scope.companyArtistView");
                console.log($scope.companyArtistView);
                $timeout(function() {
                    $('#dataTables-example-company-artist').dataTable({
                        
                    });
                }, 0, false);
            } else if (response.status == 103 || response.status == '103') {

            }
        });

}
    $scope.companyArtistViewFun();    

        $scope.approveData = {
            'access_token': $scope.data.access_token,
            'id': ''
        };

        $scope.approve = function(id) {
            //  console.log(id);
            console.log($scope.approveData.access_token);
            $scope.approveData.id = id;
            console.log($scope.approveData.id);

            faps_admin_service.approve($scope.approveData).success(function(response) {
                console.log('response');
                console.log(response);
                if (response.status == 105 || response.status == '105') {
                    $(".alert-success").html("Artist Approved Successfully!!").show();
                    $scope.companyArtistViewFun();
                    setTimeout(function() {
                        $(".alert-success").html("").hide();
                        
                        //  $state.go('artist_table')
                    }, 5000);
                    // $window.alert("Approved");
                    // localStorage.setItem('abcde', JSON.stringify(response.data));
// location.reload();
                    //                   $mdDialog.show(
                    //                           $mdDialog.alert()
                    //                           .title('Message')
                    //                           .textContent('Approved')
                    //                           .ok('close')
                    //                           );
                    //                         //   $location.path('/artist_table');

                    //               }
                }
            })

        }
        $scope.reject = function(id) {
            //  console.log(id);
            console.log($scope.approveData.access_token);
            $scope.approveData.id = id;
            console.log($scope.approveData.id);

            faps_admin_service.reject($scope.approveData).success(function(response) {
                console.log('response');
                console.log(response);
                if (response.status == 105 || response.status == '105') {
                    $(".alert-success").html(" Artist Rejected Successfully!!").show();
                    $scope.companyArtistViewFun();
                    setTimeout(function() {
                        $(".alert-success").html("").hide();
                        //  $state.go('artist_table')
                    }, 5000);
                    // localStorage.setItem('abcde', JSON.stringify(response.data));

                    //  window.scrollTo(0, document.body.scrollHeight);
                    // $window.alert("rejected");

                   // $location.path('/artist_table');


                    // location.reload();             
                }
            })

        }
        $scope.view = function(id) {
            //  console.log(id);
            console.log($scope.approveData.access_token);
            $scope.approveData.id = id;
            console.log($scope.approveData.id);
             $rootScope.viewArtistId = id;
$state.go('view_artist_profile');
//            faps_admin_service.viewArtist($scope.approveData).success(function(response) {
//                console.log('response');
//                console.log(response);
//                console.log();
//                if (response.status == 105 || response.status == '105') {
//                    localStorage.setItem('abcde', JSON.stringify(response.data));
////  $window.alert("Approved");
//                    // location.reload();
//                    //                   $mdDialog.show(
//                    //                           $mdDialog.alert()
//                    //                           .title('Message')
//                    //                           .textContent('Rejected')
//                    //                           .ok('close')
//                    //                           );
//                    //                           $location.path('/artist_table');
//
//
//                }
//            })

        }


        $scope.deleteModal = function(id) {
            console.log(id);
            $scope.modalid = id;
        }

        $scope.delete = function() {
            console.log($scope.modalid);

            console.log($scope.approveData.access_token);
            $scope.approveData.id = $scope.modalid;
            console.log($scope.approveData.id);

            faps_admin_service.delete1($scope.approveData).success(function(response) {
                console.log('response');
                console.log(response);
                if (response.status == 105 || response.status == '105') {
                    $(".alert-success").html("Artist Deleted Successfully").show();
                    $scope.companyArtistViewFun();
                    setTimeout(function() {
                        $(".alert-success").html("").hide();
                        //  $state.go('artist_table')
                    }, 5000);
                    // $window.alert("Deleted");
                    // localStorage.setItem('abcde', JSON.stringify(response.data));
                    $state.reload();
                    //                   $mdDialog.show(
                    //                           $mdDialog.alert()
                    //                           .title('Message')
                    //                           .textContent('Deleted')
                    //                           .ok('close')
                    //                           );
                    //                         //   $location.path('/artist_table');

                    //               }
                }
            })

        }





    }
})();


             