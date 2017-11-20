

(function() {
    'use strict';

    var controllerId = 'artist_table';

    angular
            .module('app')
            .controller(controllerId, artist_table);

    artist_table.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$mdDialog', '$window', 'faps_admin_service'];
    function artist_table($rootScope, $scope, $timeout, $state, $location, $mdDialog, $window, faps_admin_service) {
        //  if (localStorage.getItem('abcde') != null) {
        //         $scope.data = JSON.parse(localStorage.getItem('abcde'));
        //         console.log($scope.data);
        //     }
        //     else {
        //         $state.go('home', {});
        //     }
        $scope.data = JSON.parse(localStorage.getItem('abcde'));
        console.log($scope.data.access_token);
        var artist_data = [];
        var company_data = [];
        $rootScope.api1 = $rootScope.api;
        console.log($rootScope.api1)
        $scope.artistData = {
            'access_token': $scope.data.access_token
        };
        
//        $scope.show1 = {
//            'artist_id': "1",
//        };
        $scope.show1 = {};
        //$('#dataTables-example-artist').dataTable({});
        $scope.allArtists = function() {
            console.log("in all artist func");
            faps_admin_service.artist_table($scope.artistData).success(function(response) {
                console.log('response');
                console.log(response.data);
                if (response.status == 105 || response.status == '105') {
                    console.log("in success....")
                    $scope.show1 = response.data;
                   // $('#dataTables-example-artist').dataTable({});
//                    setTimeout(function() {
//                        $('#dataTables-example-artist').dataTable({});
//                    }, 500);
                    $timeout(function() {
                        $('#dataTables-example-artist').dataTable({
                        });
                    }, 0, false);
                } else if (response.status == 103 || response.status == '103') {

                }
            });
        }

        $scope.allArtists();
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
                    $(".alert-success").html(" Artist Approved successfully!!").show();
                    setTimeout(function() {
                        $(".alert-success").html("").hide();
                        //  $state.go('artist_table')
                        $state.reload();
                    }, 5000);


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
                    $(".alert-success").html(" Artist Rejected successfully!!").show();
                    setTimeout(function() {
                        $(".alert-success").html("").hide();
                        $state.reload();
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
//                    $rootScope.viewArtistData = response.data;
//                   $scope.viewArtistData = response.data;
//                    console.log('$rootScope.viewArtistData')
//                    console.log($rootScope.viewArtistData)
//                    //  localStorage.setItem('abcde', JSON.stringify(response.data));
//                    $state.go('view_artist_profile')
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
                    $(".alert-success").html(" Artist Deleted Successfully!!").show();
                    setTimeout(function() {
                        $(".alert-success").html("").hide();
                        $state.reload();
                    }, 5000);

                    // $window.alert("Deleted");
                    // localStorage.setItem('abcde', JSON.stringify(response.data));

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

