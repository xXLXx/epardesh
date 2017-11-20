(function () {
  'use strict';

  var controllerId = 'artist_plan';

  angular
    .module('app')
    .controller(controllerId, artist_plan);

  artist_plan.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$window', 'faps_admin_service'];
  function artist_plan($rootScope, $scope, $timeout, $state, $location, $window, faps_admin_service) {
    if (localStorage.getItem('abcde') != null) {
            $scope.data = JSON.parse(localStorage.getItem('abcde'));
            console.log($scope.data);
        }
        else {
            $state.go('home', {});
        }

    //.................
    $scope.update1 = {
      access_token: '',
      name: '',
      description: '',
      amount: '',
      plan_id: '',
      validity: ''
    }



    $scope.updateArtistPlan = function (updateData) {
     
      console.log('updateData')
      console.log(updateData)
      $scope.update1 = updateData;
    }

    //................


    $scope.data = JSON.parse(localStorage.getItem('abcde'));
    console.log($scope.data.access_token);
    $scope.planData = {
      'access_token': $scope.data.access_token,
      'name': '',
      'description': '',
      'amount': '',
      'plan_id': '',
      'validity': '',
      'plan_type': 1
    };
    faps_admin_service.artist_plan($scope.planData).success(function (response) {
      console.log('response');
      console.log(response.data);
      $scope.show = response.data;
 if (response.status == 105 || response.status == '105') {
                    console.log("in success....")
                $scope.show1 = response.data;
                $timeout(function() {
                    $('#dataTables-example').dataTable({
                    });
                }, 0, false);

            } else if (response.status == 103 || response.status == '103') {

            }
      //.......... ./Change Password ms ..........\\
    });


    $scope.deleteData = {
      'access_token': $scope.data.access_token,
      'plan_id': ''
    };

    $scope.deleteModal = function (plan_id) {
      console.log(plan_id);
      $scope.modalplan_id = plan_id;
    }

    $scope.deletePlan = function () {
      console.log($scope.modalplan_id);

      console.log($scope.deleteData.access_token);
      $scope.deleteData.plan_id = $scope.modalplan_id;
      console.log($scope.deleteData.plan_id);

      faps_admin_service.deletePlan($scope.deleteData).success(function (response) {
        console.log('response');
        console.log(response);
        if (response.status == 105 || response.status == '105') {
           $(".alert-success").html("Plan Deleted successfully!!").show();
                    setTimeout(function () {
                        $(".alert-success").html("").hide();
                        //  $state.go('artist_table')
                    }, 5000);
          // $window.alert("Plan Deleted");
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
    $scope.data = JSON.parse(localStorage.getItem('abcde'));
    console.log($scope.data.access_token);
    $scope.edit = function (x) {
      $scope.editData = {
        'access_token': $scope.data.access_token,
        'name': 'x.name',
        'description': 'x.description',
        'amount': 'x.amount',
        'plan_id': 'x.plan_id',
        'validity': 'x.validity'

      };
    }
     
    $scope.editPlan = function () {
       $scope.data = JSON.parse(localStorage.getItem('abcde'));
      $scope.update1.access_token = $scope.data.access_token;
      console.log('$scope.update1.access_token')
      console.log($scope.update1.access_token)

      console.log($scope.update1)
      // console.log($scope.modalplan_id);

      // console.log($scope.editData.access_token);
      // $scope.editData.plan_id = $scope.modalplan_id;
      // console.log($scope.editData.plan_id);

      faps_admin_service.editPlan($scope.update1).success(function (response) {
        console.log('response');
        console.log(response);
        if (response.status == 105 || response.status == '105') {
           $(".alert-success").html("Plan updated successfully").show();
                    setTimeout(function () {
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
    // if (!localStorage.getItem('accesstoken')) {
           
    //         $state.go('home');
    //     }






  };


})();
