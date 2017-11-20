(function () {
    'use strict';

    var controllerId = 'home';

    angular
        .module('app')
        .controller(controllerId, home);

    home.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$http', '$mdDialog', 'faps_admin_service'];
    function home($rootScope, $scope, $timeout, $state, $location, $http, $mdDialog, faps_admin_service) {
        $scope.loginData = {
            'email': '',
            'password': '',

        };



        $scope.login = function () {
            console.log($scope.loginData);

            faps_admin_service.login($scope.loginData).success(function (response) {
                console.log('response');
                console.log(response);
                if (response.status == 105 || response.status == '105') {
                    localStorage.setItem('abcde', JSON.stringify(response.data));
                    
                         $(".alert-success").html("Login successfully").show();
                         setTimeout(function () {
                        $(".alert-success").html("").hide();
                      
                    }, 7000);
                     $location.path('/artist_table');
                }
                else {
                    $(".alert-danger").html("Incorect Email or Password").show();
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


             


            });
        };

    }
})();
