(function() {
    'use strict';
    angular
            .module('app')
            .factory('plansservices', plansservices);
    plansservices.$inject = ['$http'];
    function plansservices($http) {
        var service = {};
        service.viewplans = viewplans;
        service.editplans = editplans;
        return service;
        function viewplans(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_plans', data);
        }
        function editplans(data) {
            return $http.post(config.appSettings.serviceUrl + 'edit_plans', data);
        }
        
         }
})();



