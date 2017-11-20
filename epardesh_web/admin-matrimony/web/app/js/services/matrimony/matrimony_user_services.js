(function() {
    'use strict';
    angular
            .module('app')
            .factory('matrimonyuserServices', matrimonyuserServices);
    matrimonyuserServices.$inject = ['$http'];
    function matrimonyuserServices($http) {
        var service = {};
        service.matrimonyuser = matrimonyuser;
        service.matrimonyuserdetail = matrimonyuserdetail;
         service.filterUser = filterUser;
          service.matrimonydeleteUser = matrimonydeleteUser;
        return service;

        function matrimonyuser(data) {
            return $http.post(config.appSettings.serviceUrl + 'matrimony_manage_users', data);
        }
         function matrimonyuserdetail(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_details', data);
        }
        function filterUser(data) {
            return $http.post(config.appSettings.serviceUrl + 'filter_matrimony_user',data);
        }
         function matrimonydeleteUser(data) {
            return $http.post(config.appSettings.serviceUrl + 'delete_matrimony_user',data);
        }

    }
})();
