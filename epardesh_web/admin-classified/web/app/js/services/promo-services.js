(function() {
    'use strict';
    angular
            .module('app')
            .factory('promocodeServices', promocodeServices);
    promocodeServices.$inject = ['$http'];
    function promocodeServices($http) {
        var service = {};
        service.addpromocode = addpromocode;
        service.viewpromocode = viewpromocode;
        service.deletePromocode = deletePromocode;
        return service;
        function addpromocode(data) {
            return $http.post(config.appSettings.serviceUrl + 'add_promocode', data);
        }
         function viewpromocode() {
            return $http.post(config.appSettings.serviceUrl + 'view_all_promocode');
        }
        function deletePromocode(data){
            return $http.post(config.appSettings.serviceUrl + 'delete_promocode',data)
        }
       
       

    }
})();
