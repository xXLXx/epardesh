(function() {
    'use strict';
    angular
            .module('app')
            .factory('matrimonypromocode', matrimonypromocode);
    matrimonypromocode.$inject = ['$http'];
    function matrimonypromocode($http) {
        var service = {};
        service.addpromocode = addpromocode;
        service.viewpromocode = viewpromocode;
     
        return service;
        function addpromocode(data) {
            return $http.post(config.appSettings.serviceUrl + 'matrimony_add_promocode', data);
        }
         function viewpromocode() {
            return $http.post(config.appSettings.serviceUrl + 'matrimony_view_promocode');
        }
       
       

    }
})();
