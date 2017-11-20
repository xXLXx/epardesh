(function() {
    'use strict';
    angular
            .module('app')
            .factory('promotionalServices', promotionalServices);
    promotionalServices.$inject = ['$http'];
    function promotionalServices($http) {
        var service = {};
        service.viewpromotionalads = viewpromotionalads;
        service.addpromotionalads = addpromotionalads;
        service.view_states =view_states;
        service.view_cities =view_cities;
        service.deletepromotionalads = deletepromotionalads;
        service.editpromotionalads = editpromotionalads;
        service.uploadimage = uploadimage;
        service.find_cities = find_cities;
        service.find_cities_USA = find_cities_USA;
        service.find_state = find_state;
        return service;
        function viewpromotionalads() {
            return $http.post(config.appSettings.serviceUrl + 'View_promotional_ads');
        }
        function deletepromotionalads(data) {
            return $http.post(config.appSettings.serviceUrl + 'delete_promotional_ad',data);
        }
        function view_states(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_epardesh_states', data);
        }
       function view_cities(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_epardesh_cities', data);
        }
        function addpromotionalads(data) {
            return $http.post(config.appSettings.serviceUrl + 'add_promotional_ad',data);
        }
        function editpromotionalads(data) {
            return $http.post(config.appSettings.serviceUrl + 'edit_promotional_ad',data);
        }
         function find_cities(data)
         {
             return $http.post(config.appSettings.serviceUrl + 'find_india_cities',data)
         }
       function find_cities_USA(data)
       {
           return $http.post(config.appSettings.serviceUrl + 'find_usa_cities',data)
       }
       function find_state(data)
       {
           return $http.post(config.appSettings.serviceUrl + 'find_states',data)
       }
     /********************* service for addpromotional data************************/
      function uploadimage($scope, callback, formData) {
            var data = {};
           $http({
                method: 'POST',
                url: config.appSettings.serviceUrl + 'upload_promotional_image',
                data: formData,
                headers: {'Content-Type': undefined},
            }).success(function(response) {
                console.log(response)
                data = response;
                callback(data);
            }).error(function(error) {
                console.log(error);
            });
        }
        /********************* service for edit promotional data************************/
//      function editpromotionalads($scope, callback, formData) {
//            var data = {};
//           $http({
//                method: 'POST',
//                url: config.appSettings.serviceUrl + 'edit_promotional_ad',
//                data: formData,
//                headers: {'Content-Type': undefined},
//            }).success(function(response) {
//                console.log(response)
//                data = response;
//                callback(data);
//            }).error(function(error) {
//                console.log(error);
//            });
//        }
        }
       
})();