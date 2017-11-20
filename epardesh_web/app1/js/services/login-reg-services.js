(function() {
    'use strict';

    angular
            .module('app')
            .factory('loginRegiServices', loginRegiServices);
    loginRegiServices.$inject = ['$http', 'serviceUrl'];
    function loginRegiServices($http, serviceUrl) {
        var service = {};
        service.register = register;
        service.login = login;
        service.forgotPassword = forgotPassword;
        service.view_states = view_states;
        service.view_cities = view_cities;
        service.updatepassword = updatepassword;
        service.updateusertype = updateusertype;
        service.searchAds = searchAds;
        service.chkEmail = chkEmail;
        service.getCat = getCat;
         service.contactUs = contactUs;
         service.searchBykey=searchBykey;
         service.top_categories=topCategories;
         service.featuredTrendingads=featuredTrendingads;
         service.globalsearch=globalsearch;
         service.viewpromocode = viewpromocode;
        return service;
        console.log(config.appSettings.serviceUrl);
        function register(data) {
            return $http.post(serviceUrl + 'register_user', data);
        }
        function login(data) {
            return $http.post(serviceUrl + 'login_user', data);
        }
        function forgotPassword(data) {
            return $http.post(serviceUrl + 'forgot_password', data);
        }
        function view_states(data) {
            return $http.post(serviceUrl + 'view_epardesh_states', data);
        }
        function view_cities(data) {
            return $http.post(serviceUrl + 'view_epardesh_cities', data);
        }
        function updatepassword(data) {
            return $http.post(serviceUrl + 'update_password', data);
        }
        function updateusertype(data) {
            return $http.post(serviceUrl + 'update_user_type', data);
        }
        function searchAds(data) {
            return $http.post(serviceUrl + 'view_ads_by_choice', data);
        }
        function searchBykey(data) {
            return $http.post(serviceUrl + 'auto_suggest_tittle', data);
        }
        
        function chkEmail(data) {
            return $http.post(serviceUrl + 'check_email', data);
        }
        function getCat(data) {
            return $http.post(serviceUrl + 'view_special_categories', data);
        }
          function contactUs(data) {
            return $http.post(serviceUrl + 'contact_us', data);
        }
        function topCategories()
        {
            return $http.post(serviceUrl + 'top_categories');
        }
        function featuredTrendingads(data)
        {
            return $http.post(serviceUrl + 'featured_and_trending_ads',data)
        }
        function globalsearch(data)
        {
            return $http.post(serviceUrl + 'global_search',data)
        }
        function viewpromocode()
        {
            return $http.post(serviceUrl + 'view_homepage_promocode')
        }
    }
})();