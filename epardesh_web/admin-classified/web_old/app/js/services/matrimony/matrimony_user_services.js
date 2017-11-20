(function() {
    'use strict';
    angular
            .module('app')
            .factory('matrimonyuserServices', matrimonyuserServices);
    matrimonyuserServices.$inject = ['$http'];
    function matrimonyuserServices($http) {
        var service = {};
//        service.addcategory = addcategory;
        service.matrimonyuser = matrimonyuser;
        service.matrimonyuserdetail = matrimonyuserdetail;
//         service.deletecategory = deletecategory;
//          service.viewsubcategory=viewsubcategory
        return service;
//        console.log(config.appSettings.serviceUrl);
        function matrimonyuser(data) {
            return $http.post(config.appSettings.serviceUrl + 'matrimony_manage_users', data);
        }
         function matrimonyuserdetail(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_details', data);
        }
//        function viewcategory() {
//            return $http.post(config.appSettings.serviceUrl + 'view_epardesh_categories');
//        }
//        function editcategory(data) {
//            return $http.post(config.appSettings.serviceUrl + 'edit_epardesh_categories', data);
//        }
//          function deletecategory(data) {
//            return $http.post(config.appSettings.serviceUrl + 'delete_epardesh_categories', data);
//        }
//           function viewsubcategory(data) {
//            return $http.post(config.appSettings.serviceUrl + 'view_epardesh_sub_categories',data);
//        }
    }
})();
