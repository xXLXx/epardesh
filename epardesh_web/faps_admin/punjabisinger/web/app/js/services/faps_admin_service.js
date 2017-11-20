(function() {
    'use strict';

    var serviceId = 'faps_admin_service';

    angular
            .module('app')
            .factory(serviceId, faps_admin_service)
    faps_admin_service.$inject = ['$http'];
    function faps_admin_service($http) {
        var service = this;
        service.login = login;
        service.change_password = change_password;
        service.add_plan=add_plan;
        service.crud = crud;
        service.del_user = del_user;
        service.update = update;
        service.dashboard = dashboard;
        service. artist_plan = artist_plan;
        service. company_plan = company_plan;
          service. artist_table = artist_table;
            service. company_table = company_table;
            service. approve = approve;
             service. reject = reject;
               service. delete1 = delete1;
               service. deletePlan = deletePlan;
               service. companyArtist = companyArtist;
               service. editPlan = editPlan;
               service. viewArtist = viewArtist;
                service. forgotPassword = forgotPassword;
                    service. editAmount = editAmount;
            








        return service;

        function login(data) {
            return $http.post(config.appSettings.serviceUrl + 'admin_login', data);
        }
        function change_password(data) {
            return $http.post(config.appSettings.serviceUrl + 'admin_change_password', data);
        }
        function add_plan(data) {
            return $http.post(config.appSettings.serviceUrl + 'admin_add_plan', data);
        }
        function crud(data) {
            return $http.post(config.appSettings.serviceUrl + 'manage_users', data);
        }
        function del_user(data) {
            return $http.post(config.appSettings.serviceUrl + 'delete_users', data);
        }
        function update(data) {
            return $http.post(config.appSettings.serviceUrl + 'update_user_profile', data);
        }
        function dashboard(data) {
            return $http.post(config.appSettings.serviceUrl + 'view_users_profile', data);
        }
        function complanview(data) {
            return $http.post(config.appSettings.serviceUrl + 'plan_view_artist', data);
        }
        function artist_plan(data) {
            return $http.post(config.appSettings.serviceUrl + 'plan_view', data);
        }
        function company_plan(data) {
            return $http.post(config.appSettings.serviceUrl + 'plan_view', data);
        }
        function artist_table(data) {
            return $http.post(config.appSettings.serviceUrl + 'all_view', data);
        }
        function company_table(data) {
            return $http.post(config.appSettings.serviceUrl + 'company_view', data);
        }
         function approve(data) {
            return $http.post(config.appSettings.serviceUrl + 'approve_artist', data);
        }
        function reject(data) {
            return $http.post(config.appSettings.serviceUrl + 'reject_artist', data);
        }
         function delete1(data) {
            return $http.post(config.appSettings.serviceUrl + 'delete_artist', data);
        }
        function deletePlan(data) {
            return $http.post(config.appSettings.serviceUrl + 'plan_delete', data);
        }
        function companyArtist(data) {
            return $http.post(config.appSettings.serviceUrl + 'artist_in_company', data);
        }
        function editPlan(data) {
            return $http.post(config.appSettings.serviceUrl + 'plan_edit', data);
        }
         function viewArtist(data) {
            return $http.post(config.appSettings.serviceUrl + 'artist_view', data);
        }
         function forgotPassword(data) {
            return $http.post(config.appSettings.serviceUrl + 'forgot_password', data);
        }
         function editAmount(data) {
            return $http.post(config.appSettings.serviceUrl + 'cmp_plan_edit', data);
        }
        
        


    }
})();
