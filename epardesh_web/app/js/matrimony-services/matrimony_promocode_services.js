(function() {
    'use strict';
    angular
            .module('app')
            .factory('matrimonypromocode', matrimonypromocode);
    matrimonypromocode.$inject = ['$http', 'serviceUrl'];
    function matrimonypromocode($http, serviceUrl) {
        var service = {};
        service.addpromocode = addpromocode;
        service.viewpromocode = viewpromocode;
     
        return service;
        function addpromocode(data) {
            return $http.post(serviceUrl + 'matrimony_add_promocode', data);
        }
         function viewpromocode() {
            return $http.post(serviceUrl + 'matrimony_view_promocode');
        }
       
       

    }
})();
