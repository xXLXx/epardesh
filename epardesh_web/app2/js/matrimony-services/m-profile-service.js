(function() {
    'use strict';

    angular
            .module('app')
            .factory('mProfileServices', mProfileServices);

    mProfileServices.$inject = ['$http', 'serviceUrl'];
    function mProfileServices($http, serviceUrl) {
        var service = {};
        service.viewSugessted = viewSugessted;
        service.updateProfile = updateProfile;
        service.viewMyProfile = viewMyProfile;
        service.connectRequest = connectRequest;
        service.sendEmailMsg = sendEmailMsg;
        service.sendSMSMsg = sendSMSMsg;
        service.viewIntestedProfile = viewIntestedProfile;
        service.removeFromFav = removeFromFav;
        service.acceptRejectRequest = acceptRejectRequest;
        service.updatePartnerPre = updatePartnerPre;
        service.viewPartnerPre = viewPartnerPre;
        service.viewParticularProfile = viewParticularProfile;
        service.search = search;
        service.uppgradePlan = uppgradePlan;
        service.matrimonyInbox = matrimonyInbox;
        service.uploadProfileImage = uploadProfileImage;
        service.matrimonyInterestedCount = matrimonyInterestedCount;
        service.matrimony_report_spam = matrimony_report_spam;
        service.viewbadwords = viewbadwords;



        return service;
        function viewSugessted(data) {
            return $http.post(serviceUrl + 'view_suggested_profiles', data);
        }
        function updateProfile(data) {
            return $http.post(serviceUrl + 'update_matrimony_user_profile', data);
        }
        function viewMyProfile(data) {
            return $http.post(serviceUrl + 'view_my_profile', data);
        }
        function connectRequest(data) {
            return $http.post(serviceUrl + 'send_request', data);
        }
        function sendEmailMsg(data) {
            return $http.post(serviceUrl + 'send_message', data);
        }
        function sendSMSMsg(data) {
            return $http.post(serviceUrl + 'send_direct_sms', data);
        }
        function viewIntestedProfile(data) {
            return $http.post(serviceUrl + 'interested_profiles', data);
        }
        function removeFromFav(data) {
            return $http.post(serviceUrl + 'remove_from_favourites', data);
        }
        function acceptRejectRequest(data) {
            return $http.post(serviceUrl + 'accept_or_reject_request', data);
        }
        function updatePartnerPre(data) {
            return $http.post(serviceUrl + 'update_matrimony_partner_preferences', data);
        }
        function viewPartnerPre(data) {
            return $http.post(serviceUrl + 'view_partner_preferences', data);
        }
        function viewParticularProfile(data) {
            return $http.post(serviceUrl + 'view_full_profile', data);
        }
        function search(data) {
            return $http.post(serviceUrl + 'matrimony_search', data);
        }
        function uppgradePlan(data) {
            return $http.post(serviceUrl + 'upgrade_plan', data);
        }
        function matrimonyInbox(data) {
            return $http.post(serviceUrl + 'matrimony_inbox', data);
        }
         function matrimonyInterestedCount(data) {
            return $http.post(serviceUrl + 'interested_profile_counts', data);
        }

        function uploadProfileImage($scope, callback, formData) {
            var data = {};
            $http({
                method: 'POST',
                url: serviceUrl + 'upload_promotional_image',
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
         function matrimony_report_spam(data) {
            return $http.post(serviceUrl + 'matrimony_report_spam', data);
        }
        function viewbadwords()
        {
            return $http.post(serviceUrl +'view_matrimony_badwords');
        }
        
        
        
        

    }

})();