(function() {
    'use strict';

    angular
            .module('app')
            .factory('TrainingServices', TrainingServices);

    TrainingServices.$inject = ['$http', 'serviceUrl'];
    function TrainingServices($http, serviceUrl) {
        var service = {};
        service.topfeaturedTraining = topfeaturedTraining;
        service.ViewTraining = ViewTraining;
        service.addtoFavtraining = addtoFavtraining;
        service.filterTraining = filterTraining;
        service.traininginfo = traininginfo;
        service.contactTraining = contactTraining;
        service.sendEmail = sendEmail;

        return service;
        function topfeaturedTraining(data) {
            return $http.post(serviceUrl + 'view_top_featured_training_ads',data);
        }
        function ViewTraining(data)
        {
            return $http.post(serviceUrl + 'view_nearby_training',data);
        }
        function addtoFavtraining(data)
        {
            return $http.post(serviceUrl + 'add_favourite_training',data);
        }
        function filterTraining(data)
        {
            return $http.post(serviceUrl + 'filter_training',data);
        }
        function traininginfo(data)
        {
            return $http.post(serviceUrl + 'view_training_ad_details',data);
        }
        function contactTraining(data)
        {
            return $http.post(serviceUrl + 'contact_training_owner',data);
        }
        function sendEmail(data)
        {
            return $http.post(serviceUrl + 'send_email/msg',data);
        }
       
    }

})();