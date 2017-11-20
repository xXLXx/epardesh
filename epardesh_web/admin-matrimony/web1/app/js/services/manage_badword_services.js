(function() {
    'use strict';
    angular
            .module('app')
            .factory('badwordServices', badwordServices);
    badwordServices.$inject = ['$http'];
    function badwordServices($http) {
        var service = {};
        service.manage_word = manage_word;
        service.viewbadwords = viewbadwords;
        
        return service;
        function manage_word(data) {
            return $http.post(config.appSettings.serviceUrl + 'update_badwords', data);
        }
        function viewbadwords() {
            return $http.post(config.appSettings.serviceUrl + 'view_badwords');
        }
        }
})();



