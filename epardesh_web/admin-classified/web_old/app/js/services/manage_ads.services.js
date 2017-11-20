(function() {
    'use strict';
    angular
            .module('app')
            .factory('manageaddServices', manageaddServices);
    manageaddServices.$inject = ['$http'];
    function manageaddServices($http) {
        var service = {};
        service.viewads = viewads;
        service.approved = approved;
        service.rejectReason = rejectReason;
        service.viewParticularAd = viewParticularAd;
        service.deleteAd = deleteAd;
        service.blockAd = blockAd;

        return service;
        function viewads(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_ads', data);
        }
        function approved(data) {
            return $http.post(config.appSettings.serviceUrl + 'approve_ad', data);
        }
        function rejectReason(data) {
            return $http.post(config.appSettings.serviceUrl + 'approve_ad_by_user', data);
        }
        function viewParticularAd(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_full_ad_info', data);
        }
        function deleteAd(data) {
            return $http.post(config.appSettings.serviceUrl + 'admin_delete_ad', data);
        }
        function blockAd(data) {
            return $http.post(config.appSettings.serviceUrl + 'admin_block_unblock_ad', data);
        }
    }
})();