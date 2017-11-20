(function() {
    'use strict';
    angular
            .module('app')
            .factory('matrimonyplanServices', matrimonyplanServices);
    matrimonyplanServices.$inject = ['$http'];
    function matrimonyplanServices($http) {
        var service = {};
        service.matrimonyplan = matrimonyplan;
        service.editmatrimonyplan = editmatrimonyplan;
        return service;
        function matrimonyplan(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_matrimony_plans', data);
        }
        function editmatrimonyplan(data) {
            return $http.post(config.appSettings.serviceUrl + 'admin_edit_plans', data);
        }

    }
})();
