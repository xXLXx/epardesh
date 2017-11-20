(function() {
    'use strict';
    var app = angular.module('app');

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configureState]);

    function configureState($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $stateProvider

                .state("home", {
            url: '/home',
            views: {
                "content@": {
                    templateUrl: 'app/templates/admin-panel/home.html',
                },
            }
        })

                .state("category", {
            url: '/category',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/category.html',
                },
            }
        })
                .state("view-category", {
            url: '/view-category/:id',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/view-sub-category.html',
                },
            }
        })
                .state("sub-category", {
            url: '/sub-category',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/sub_category.html',
                },
            }
        })
        
            .state("view_particular_category", {
            url: '/view_particular_category',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/view_particular_category.html',
                },
            }
        })
        
                .state("ads", {
            url: '/ads',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/manage_ads.html',
                },
            }
        })
               .state("view-particular-ad", {
            url: '/view-particular-ad/:id',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/view-particular-ad.html',
                },
            }
        })
                .state("promotion-ads", {
            url: '/promotion-ads',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/promotional_ads.html',
                },
            }
        })
                .state("add-promotional-ads", {
            url: '/add-promotional-ads',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/add_promotional_ads.html',
                },
            }
        })
                .state("plans", {
            url: '/plans',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/plans.html',
                },
            }
        })
                .state("badword-filter", {
            url: '/badword-filter',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/manage_badword.html',
                },
            }
        })
                .state("users", {
            url: '/users',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/manage_users.html',
                },
            }
        })
                .state("password", {
            url: '/password',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/change_password.html',
                },
            }
        })
        
           .state("events", {
            url: '/events',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/manage_events.html',
                },
            }
        })
        
        
          .state("courses", {
            url: '/courses',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/courses.html',
                },
            }
        })
        
          .state("training", {
            url: '/training',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/training.html',
                },
            }
        })
        
         .state("promocode", {
            url: '/promocode',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/admin-panel/promocode.html',
                },
            }
        })
        
        
        
        //        matrimony admin pannel start
 .state("matrimony-category", {
            url: '/matrimony-category',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/matrimony-category.html',
                },
            }
        })
        .state("send-notification", {
            url: '/send-notification',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/send-notification.html',
                },
            }
        })
        .state("view-details", {
            url: '/view-details',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/view-details.html',
                },
            }
        })
         .state("matrimony-plans", {
            url: '/matrimony-plans',
            views: {
                "header": {
                    templateUrl: "app/templates/admin-panel/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/matrimony-plans.html',
                },
            }
        })

//        matrimony admin pannel end

        $urlRouterProvider.otherwise('/home');


    }
})();