(function() {
    'use strict';

    var controllerId = 'change_password';

    angular
            .module('app')
            .controller(controllerId, change_password);

    change_password.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location','$http','$mdDialog','faps_admin_service'];
    function change_password($rootScope, $scope, $timeout, $state, $location, $http, $mdDialog, faps_admin_service) {
      if (localStorage.getItem('abcde') != null) {
            $scope.data = JSON.parse(localStorage.getItem('abcde'));
            console.log($scope.data);
        }
        else {
            $state.go('home', {});
        }

      $scope.data = JSON.parse(localStorage.getItem('abcde'));
             console.log($scope.data.access_token);

        $scope.change_passwordData = {
          'access_token': $scope.data.access_token,
          'old_password': '',
            'new_password': ''

        };
        $scope.matched = false;

        $scope.checkPass = function() {
            $scope.matched = $scope.new_password === $scope.confirm_password;
        };
        $scope.change_pass = function() {

          console.log($scope.change_passwordData);
          localStorage.getItem('abcde');


              faps_admin_service.change_password($scope.change_passwordData).success(function(response) {
                console.log('response');
                console.log(response);
                if (response.status == 105 || response.status == '105') {
                   $(".alert-success").html("Password changed").show();
                    setTimeout(function () {
                        $(".alert-success").html("").hide();
                        //  $state.go('artist_table')
                    }, 7000);
                     location.reload();


                  //  alert("Password changed");
                    // $mdDialog.show(
                    //         $mdDialog.alert()
                    //         .title('Message')
                    //         .textContent('Password changed')
                    //         .ok('close')
                    //         );
                            location.reload();
                }
                 else {
                    $(".alert-danger").html("old Password donot match").show();
                    setTimeout(function () {
                        $(".alert-danger").html("").hide();
                    }, 4000);

                    //   $mdDialog.show(
                    //           $mdDialog.alert()
                    //           .title('Message')
                    //           .textContent('you have login successfully')
                    //           .ok('close')
                    //           );
                    //           $location.path('/artist_table');

                }


//.......... ./Change Password ms ..........\\
});
};

}
})();
