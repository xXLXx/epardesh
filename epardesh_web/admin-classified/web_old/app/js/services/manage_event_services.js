(function() {
    'use strict';
    angular
            .module('app')
            .factory('manageEventServices', manageEventServices);
    manageEventServices.$inject = ['$http'];
    function manageEventServices($http) {
        var service = {};
        service.viewevents = viewevents;
        service.deleteEvent = deleteEvent;

        return service;
        function viewevents() {
            return $http.post(config.appSettings.serviceUrl + 'view_all_events');
        }
        function deleteEvent(data)
        {
            return $http.post(config.appSettings.serviceUrl + 'admin_delete_event',data)
        }
        
    }
})();