(function() {
    'use strict';
    angular
            .module('app')
            .factory('loginRegiServices', loginRegiServices);
    loginRegiServices.$inject = ['$http'];
    function loginRegiServices($http) {
        var service = {};
          service.login = login;
        return service;
//        console.log(config.appSettings.serviceUrl);
        function login(data) {
            return $http.post(config.appSettings.serviceUrl + 'admin_login', data);
        }
    }
})();


