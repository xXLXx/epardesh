(function() {
    'use strict';
    angular
            .module('app')
            .factory('headerservices', headerservices);
    headerservices.$inject = ['$http'];
    function headerservices($http) {
        var service = {};
        service.changepw = changepw;
        return service;
        function changepw(data) {
            return $http.post(config.appSettings.serviceUrl + 'change_admin_password', data);
        }
        
         }
})();



