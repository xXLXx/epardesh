(function () {
      'use strict';

      var controllerId = 'view_artist_profile';

      angular
            .module('app')
            .controller(controllerId, view_artist_profile);

      view_artist_profile.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$window', 'faps_admin_service'];
      function view_artist_profile($rootScope, $scope, $timeout, $state, $location, $window, faps_admin_service) {
            if (localStorage.getItem('abcde') != null) {
            $scope.data = JSON.parse(localStorage.getItem('abcde'));
            console.log($scope.data);
        }
        else {
            $state.go('home', {});
        }
           

            //
            // $rootScope.viewArtistData = $scope.name1;
            // console.log('$scope.name1')
            // console.log($scope.name1)
            // console.log('$rootScope.viewArtistData')
            // console.log($rootScope.viewArtistData)

            //

            $scope.data = JSON.parse(localStorage.getItem('abcde'));
            console.log($scope.data.access_token);

            //.......... sideNav ms ..........\\
            $scope.viewData = {
                  'access_token': $scope.data.access_token,
                  'id': $rootScope.viewArtistId
            };
            $scope.viewA = function (id) {
                  console.log(id);
                  $scope.modalid = id;
            }
             console.log($scope.viewA);
            faps_admin_service.viewArtist($scope.viewData).success(function (response) {
                  // console.log('response');
                  // console.log(response.data);
                  $scope.viewArtist = response.data;
                  $rootScope.api = response.data;
                  console.log('api');
                  console.log($rootScope.api);

            });

      }
})();