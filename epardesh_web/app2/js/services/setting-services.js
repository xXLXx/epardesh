(function() {
    'use strict';

    angular
            .module('app')
            .factory('settingServices', settingServices);

    settingServices.$inject = ['$http', 'serviceUrl'];
    function settingServices($http, serviceUrl) {
        var service = {};
        service.changePassword = changePassword;
        service.editProfile = editProfile;
        service.viewProfile = viewProfile;
        service.viewUserAds = viewUserAds;
        service.removeAd = removeAd;
        service.upgradeToFeature = upgradeToFeature;
        service.upgradeToPremium = upgradeToPremium;
        service.editAd = editAd;
        service.checkTitle = checkTitle;
        service.checkEventTitle=checkEventTitle;
        service.getEventObj=getEventObj;
        service.editEvent=editEvent;
        service.removeEvent = removeEvent;
        service.upgrade_event_plan=upgrade_event_plan;
        service.viewcourses = viewcourses;
        service.checkTrainingTitle = checkTrainingTitle;
        service.getTrainingObj = getTrainingObj;
        service.editTraining = editTraining;
        service.removeTraining = removeTraining;
        service.upgrade_training_plan = upgrade_training_plan;
        service.view_fav = view_fav;
        service.remEventFav = remEventFav;
        service.remTrainingFav = remTrainingFav;
        service.viewpromocode = viewpromocode;
        service.checkPromocode = checkPromocode;
        service.remAdFav = remAdFav;
        return service;

        function changePassword(data) {
            return $http.post(serviceUrl + 'change_password', data);
        }
        function editProfile(data) {
            return $http.post(serviceUrl + 'update_user_profile', data);
        }
        function viewProfile(data) {
            return $http.post(serviceUrl + 'view_users_profile', data);
        }
        function viewUserAds(data) {
            return $http.post(serviceUrl + 'view_user_ads', data);
        }
        function removeAd(data) {
            return $http.post(serviceUrl + 'cancel_epardesh_ads', data);
        }
        function upgradeToFeature(data) {
            return $http.post(serviceUrl + 'upgrade_to_featured', data);
        }
        function upgradeToPremium(data) {
            return $http.post(serviceUrl + 'upgrade_to_premium', data);
        }
        function editAd(data) {
            return $http.post(serviceUrl + 'edit_epardesh_ads', data);
        }
          function checkTitle(data) {
            return $http.post(serviceUrl + 'check_ad_tittle', data);
        }
         function checkEventTitle(data) {
            return $http.post(serviceUrl + 'check_event_tittle', data);
        }
        function getEventObj(data)
        {
            return $http.post(serviceUrl + 'view_my_events',data);
        }
        function editEvent(data)
        {
            return $http.post(serviceUrl + 'edit_event',data);
        }
        function removeEvent(data)
        {
            return $http.post(serviceUrl + 'delete/cancel_event',data);
        }
        function upgrade_event_plan(data)
        {
            return $http.post(serviceUrl + 'upgrade_event_plan',data);
        }
        function viewcourses()
        {
            return $http.post(serviceUrl +'view_all_courses');
        }
        function checkTrainingTitle(data)
        {
            return $http.post(serviceUrl +'check_training_tittle',data);
        }
        function getTrainingObj(data)
        {
            return $http.post(serviceUrl + 'view_my_training_ads',data);
        }
        function editTraining(data)
        {
            return $http.post(serviceUrl + 'edit_training_ad',data)
        }
        function removeTraining(data)
        {
            return $http.post(serviceUrl +'delete/cancel_training_ad',data);
        }
        function upgrade_training_plan(data)
        {
            return $http.post(serviceUrl +'upgrade_training_plan',data);
        }
        function view_fav(data)
        {
            return $http.post(serviceUrl +'view_favourites',data);
        }
        function remEventFav(data)
        {
            return $http.post(serviceUrl +'remove_favourite_event',data)
        }
         function remTrainingFav(data)
        {
            return $http.post(serviceUrl + 'remove_favourite_training',data)
        }
        function viewpromocode()
        {
            return $http.post(serviceUrl +'view_all_promocode')
        }
        function checkPromocode(data)
        {
            return $http.post(serviceUrl +'check_applied_promocode',data)
        }
        function remAdFav(data)
        {
            return $http.post(serviceUrl +'remove_favourite_ad',data)
        }
    }

})();