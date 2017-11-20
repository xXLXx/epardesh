(function() {
    'use strict';
    angular
            .module('app')
            .factory('manageuserservices', manageuserservices);
    manageuserservices.$inject = ['$http'];
    function manageuserservices($http) {
        var service = {};
        service.manageuser = manageuser;
        return service;
        function manageuser(data) {
            return $http.post(config.appSettings.serviceUrl + 'manage_users', data);
        }
         function deleteuser(data) {
            return $http.post(config.appSettings.serviceUrl + 'delete_users', data);
        }
        
         }
})();



