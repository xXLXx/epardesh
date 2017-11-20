(function() {
    'use strict';

    angular
            .module('app')
            .factory('EventServices', EventServices);

    EventServices.$inject = ['$http', 'serviceUrl'];
    function EventServices($http, serviceUrl) {
        var service = {};
        service.topfeaturedEvent = topfeaturedEvent;
        service.upcomingEvent = upcomingEvent;
        service.addtoFavEvent = addtoFavEvent;
        service.filterEvent = filterEvent;
        service.eventinfo = eventinfo;
        service.contactEvent = contactEvent;
        service.sendEmail = sendEmail;

        return service;
        function topfeaturedEvent(data) {
            return $http.post(serviceUrl + 'top_featured_events', data);
        }
        function upcomingEvent(data)
        {
            return $http.post(serviceUrl + 'view_upcoming_events',data);
        }
        function addtoFavEvent(data)
        {
            return $http.post(serviceUrl + 'add_favourite_event',data);
        }
        function filterEvent(data)
        {
            return $http.post(serviceUrl + 'filter_events',data);
        }
        function eventinfo(data)
        {
            return $http.post(serviceUrl + 'view_event',data);
        }
        function contactEvent(data)
        {
            return $http.post(serviceUrl + 'contact_event_owner',data);
        }
        function sendEmail(data)
        {
            return $http.post(serviceUrl + 'message_event',data);
        }
       
    }

})();