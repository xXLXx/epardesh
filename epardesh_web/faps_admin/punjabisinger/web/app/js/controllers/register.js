(function() {
    'use strict';

    var controllerId = 'register';

    angular
            .module('app')
            .controller(controllerId, register);

    register.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location'];
    function register($rootScope, $scope, $timeout, $state, $location) {
        
        $('#userBtn').addClass('actBtn');
        $scope.ActiveBtn = function(id, id2, id3) {
            $('#' + id).addClass('actBtn');
            $('#' + id2).removeClass('actBtn');
            $('#' + id3).removeClass('actBtn');
        }

    }
})();
