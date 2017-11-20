(function() {
    'use strict';
    var controllerId = 'mainCtrl';
    angular
            .module('app')
            .controller(controllerId, mainCtrl);
    mainCtrl.$inject = ['$state'];
    function mainCtrl($state) {
        var vm = this;
        if(localStorage.getItem('user_id')){
            $state.go('home');
        }
       

    }

})();