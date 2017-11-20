(function() {
    'use strict';

    angular
            .module('app')
            .factory('manageadServices', manageadServices);

    manageadServices.$inject = ['$http', 'serviceUrl'];
    function manageadServices($http, serviceUrl) {
        var service = {};
           service.getFeaturedAd = getFeaturedAd;
        service.viewcategory = viewcategory;
        service.viewsubcategory = viewsubcategory;
        service.viewtopcategories = viewtopcategories;
        service.viewbadwords = viewbadwords;
        service.upload_adImage = upload_adImage;
        service.deleterelimage = deleterelimage;
        service.updateImage = updateImage;
        service.saveAd = saveAd;
        service.getPlan = getPlan;
        service.getPromotionalAd = getPromotionalAd;
         service.deleteRelevant = deleteRelevant;
       service.featuredtrend=featuredtrend;
       service.saveEvent=saveEvent;
       service.saveTraining =saveTraining;
       service.ApplyCoupon = ApplyCoupon;
       service.viewtopfeatured = viewtopfeatured;

//        service.update_adImage=update_adImage;
        return service;
          function getFeaturedAd(data) {
            return $http.post(serviceUrl + 'view_top_featured_ads', data);
        }
         function deleteRelevant(data) {
            return $http.post(serviceUrl + 'delete_epardesh_ads_images', data);
        }
        function getPromotionalAd(data) {
            return $http.post(serviceUrl + 'display_promotional_ads', data);
        }
        function getPlan() {
            return $http.post(serviceUrl + 'view_plans');
        }
        function saveAd(data) {
            return $http.post(serviceUrl + 'epardesh_ads', data);
        }
        function viewcategory() {
            return $http.post(serviceUrl + 'view_epardesh_categories');
        }
        function viewsubcategory(data) {
            return $http.post(serviceUrl + 'view_subcategories_by_categories', data);
        }
        function deleterelimage(data) {
            return $http.post(serviceUrl + 'delete_images', data);
        }
        function viewtopcategories() {
            return $http.post(serviceUrl + 'view_top_categories');
        }
        function viewbadwords() {
            return $http.post(serviceUrl + 'view_badwords');
        }
        function upload_adImage($scope, callback, formData) {
            var data = {};
            $http({
                method: 'POST',
                url: serviceUrl + 'upload_image',
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
        function updateImage($scope, callback, formData) {
            var data = {};
            $http({
                method: 'POST',
                url: serviceUrl + 'update_images',
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
//        function update_adImage($scope, callback, formData) {
//            var data = {};
//            $http({
//                method: 'POST',
//                url: serviceUrl + 'update_images',
//                data: formData,
//                headers: {'Content-Type': undefined},
//            }).success(function(response) {
//                console.log(response)
//                data = response;
//                callback(data);
//            }).error(function(error) {
//                console.log(error);
//            });
//        }
       function featuredtrend(data)
       {
           return $http.post(serviceUrl +'featured_and_trending_ads',data)
       }
       function saveEvent(data)
       {
           return $http.post(serviceUrl +'add_events',data);
       }
       function saveTraining(data)
       {
           return $http.post(serviceUrl +'add_it_training',data);
       }
       function ApplyCoupon(data)
       {
           return $http.post(serviceUrl +'apply_classified_promocode',data)
       }
       function viewtopfeatured()
       {
           return $http.post(serviceUrl +'view_top_featured_ads')
       }
    }
})();