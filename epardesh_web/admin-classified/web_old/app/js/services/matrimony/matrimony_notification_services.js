(function() {
    'use strict';
    angular
            .module('app')
            .factory('matrimonynotificationServices', matrimonynotificationServices);
    matrimonynotificationServices.$inject = ['$http'];
    function matrimonynotificationServices($http) {
        var service = {};
        service.matrimonyprofilecompletionalert = matrimonyprofilecompletionalert;
        service.matrimonyplanexpirationalert = matrimonyplanexpirationalert;
        return service;
        function matrimonyprofilecompletionalert(data) {
            return $http.post(config.appSettings.serviceUrl + 'profile_completion_alert', data);
        }
        function matrimonyplanexpirationalert(data) {
            return $http.post(config.appSettings.serviceUrl + 'plan_expiration_alert', data);
        }

    }
})();
