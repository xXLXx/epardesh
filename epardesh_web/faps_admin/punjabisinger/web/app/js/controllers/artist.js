(function() {
    'use strict';

    var controllerId = 'artist';

    angular
            .module('app')
            .controller(controllerId, artist);

    artist.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$mdDialog'];
    function artist($rootScope, $scope, $timeout, $state, $location, $mdDialog ) {

        $scope.people = [
            {name: 'Janet Perkins', img: 'app/content/images/c1.jpg', newMessage: true},
            {name: 'Mary Johnson', img: 'app/content/images/c1.jpg', newMessage: false},
            {name: 'Peter Carlsson', img: 'app/content/images/c1.jpg', newMessage: false},
            {name: 'Janet Perkins', img: 'app/content/images/c1.jpg', newMessage: true},
            {name: 'Mary Johnson', img: 'app/content/images/c1.jpg', newMessage: false},
            {name: 'Peter Carlsson', img: 'app/content/images/c1.jpg', newMessage: false},
            {name: 'Janet Perkins', img: 'app/content/images/c1.jpg', newMessage: true},
            {name: 'Mary Johnson', img: 'app/content/images/c1.jpg', newMessage: false},
            {name: 'Peter Carlsson', img: 'app/content/images/c1.jpg', newMessage: false}
        ];
        
        $scope.addArtist = function() {
            alert('add user modal');
        }
//.......... list view ms ..........\\
var imagePath = '../../../../web/app/content/images/homecare.jpg';
    $scope.phones = [
      {
        type: 'Home',
        number: '(555) 251-1234',
        options: {
          icon: 'communication:phone'
        }
      },
      {
        type: 'Cell',
        number: '(555) 786-9841',
        options: {
          icon: 'communication:phone',
          avatarIcon: true
        }
      },
      {
        type: 'Office',
        number: '(555) 314-1592',
        options: {
          face : imagePath
        }
      },
      {
        type: 'Offset',
        number: '(555) 192-2010',
        options: {
          offset: true,
          actionIcon: 'communication:phone'
        }
      }
    ];
    $scope.todos = [
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
    ];

//.......... ./list view ms ..........\\



//.......... update ms  .................\\

 $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/templates/update.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
  
    function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
    }
//.......... ./update ms  .................\\

//

  $scope.myDate = new Date();

  $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 2,
      $scope.myDate.getDate());

  $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());

  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  };

//




    }
})();
