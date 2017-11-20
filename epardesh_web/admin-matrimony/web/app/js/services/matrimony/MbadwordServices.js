(function() {
    'use strict';
    angular
            .module('app')
            .factory('MbadwordServices', MbadwordServices);
    MbadwordServices.$inject = ['$http'];
    function MbadwordServices($http) {
        var service = {};
        service.manage_word = manage_word;
        service.viewbadwords = viewbadwords;
        
        return service;
        function manage_word(data) {
            return $http.post(config.appSettings.serviceUrl + 'update_matrimony_badwords', data);
        }
        function viewbadwords() {
            return $http.post(config.appSettings.serviceUrl + 'view_matrimony_badwords');
        }
        }
})();



