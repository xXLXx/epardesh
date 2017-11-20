(function() {
    'use strict';
    angular
            .module('app')
            .factory('trainingServices', trainingServices);
    trainingServices.$inject = ['$http'];
    function trainingServices($http) {
        var service = {};
        service.addcourse = addcourse;
        service.viewcourses = viewcourses;
        service.editcourse = editcourse;
        service.deleteCourse = deleteCourse;
        service.viewtraining = viewtraining;
        service.deleteTraining = deleteTraining;
        return service;

        function addcourse(data)
        {
            return $http.post(config.appSettings.serviceUrl + 'add_training_courses',data);
        }
        function viewcourses()
        {
            return $http.post(config.appSettings.serviceUrl + 'view_all_courses');
        }
        function editcourse(data)
        {
            return $http.post(config.appSettings.serviceUrl + 'edit_training_course',data);
        }
        function deleteCourse(data)
        {
            return $http.post(config.appSettings.serviceUrl +'admin_delete_course',data);
        }
        function viewtraining(data)
        {
            return $http.post(config.appSettings.serviceUrl +'view_all_training_ads',data);
        }
        function deleteTraining(data)
        {
            return $http.post(config.appSettings.serviceUrl +'admin_delete_training_ad',data);
        }

    }
})();
