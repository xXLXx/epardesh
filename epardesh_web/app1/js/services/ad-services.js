(function() {
    'use strict';

    angular
            .module('app')
            .factory('adDataServices', adDataServices);

    adDataServices.$inject = ['$http', 'serviceUrl'];
    function adDataServices($http, serviceUrl) {
        var service = {};
        service.updateAdCount = updateAdCount;
        service.viewParticularAd = viewParticularAd;
        service.contactUs = contactUs;
        service.contactBusiness = contactBusiness;
         service.approved = approved;
         service.addtoFavAds = addtoFavAds;
         service.filterData = filterData;
         service.sendEmail = sendEmail;
        return service;
        function updateAdCount(data) {
            return $http.post(serviceUrl + 'update_view_count', data);
        }
        ;
        function viewParticularAd(data) {
            return $http.post(serviceUrl + 'view_ad_details', data);
        }
        ;
        function contactUs(data) {
            return $http.post(serviceUrl + 'contact_us', data);
        }
        ;
        function contactBusiness(data) {
            return $http.post(serviceUrl + 'contact_business_owner', data);
        }
        ;
           function approved(data) {
            return $http.post(config.appSettings.serviceUrl + 'approve_ad_by_user', data);
        }
        function addtoFavAds(data)
        {
            return $http.post(config.appSettings.serviceUrl + 'add_favourite_ad',data);
        }
        function filterData(data)
        {
            return $http.post(config.appSettings.serviceUrl + 'filter_ads',data);
        }
        function sendEmail(data)
        {
            return $http.post(config.appSettings.serviceUrl + 'send_email_in_ad',data);
        }
    }

})();