(function() {
    'use strict';
    angular
            .module('app')
            .factory('categoriesServices', categoriesServices);
    categoriesServices.$inject = ['$http'];
    function categoriesServices($http) {
        var service = {};
        service.addcategory = addcategory;
        service.viewcategory = viewcategory;
        service.editcategory = editcategory;
        service.deletecategory = deletecategory;
        service.viewsubcategory = viewsubcategory;
        service.viewsubBycategory = viewsubBycategory
        return service;
//        console.log(config.appSettings.serviceUrl);
        function addcategory(data) {
            return $http.post(config.appSettings.serviceUrl + 'epardesh_categories', data);
        }
        function viewcategory() {
            return $http.post(config.appSettings.serviceUrl + 'view_epardesh_categories');
        }
        function editcategory(data) {
            return $http.post(config.appSettings.serviceUrl + 'edit_epardesh_categories', data);
        }
        function deletecategory(data) {
            return $http.post(config.appSettings.serviceUrl + 'delete_epardesh_categories', data);
        }
        function viewsubcategory(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_epardesh_sub_categories', data);
        }
        function viewsubBycategory(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_subcategories_by_categories', data);
        }
    }
})();
