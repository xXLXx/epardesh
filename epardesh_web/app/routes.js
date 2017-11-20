(function() {
    'use strict';
    var app = angular.module('app');

    app.config(['$stateProvider','$urlRouterProvider', '$locationProvider', '$authProvider', configureState]);

    function configureState($stateProvider, $urlRouterProvider, $locationProvider,$authProvider) {
        
        $stateProvider

            .state("main", {
            url: '/',
            views: {
                "content@": {
                    templateUrl: 'app/templates/main.html',
                },
            }
        })
            .state("home", {
            url: '/classified',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/home.html',
                },
            }
        })
            .state("login", {
            url: '/login',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/login.html',
                },
            }
        })
            .state("sign", {
            url: '/sign',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/sign.html',
                },
            }
        })
            .state("ad_details", {
            url: '/ad-details/:id',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/ad_details.html',
                },
            }
        })
        
        
         .state("event_details", {
            url: '/event-details/:id',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/event_details.html',
                },
            }
        })
        
            .state("ad_approve", {
            url: '/ad_approve/:id/:status',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/ad_approve.html',
                },
            }
        })
            .state("setting", {
            url: '/setting',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/setting.html',
                },
            }
        })
         .state("settings", {
            url: '/settings',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/setting_user.html',
                },
            }
        })
                .state("about", {
            url: '/about',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/about_us.html',
                },
            }
        })
                .state("contact", {
            url: '/contact',
            views: {
//                 "header": {
//                    templateUrl: "app/templates/header.html",
//                },
                "content@": {
                    templateUrl: 'app/templates/contact_us.html',
                },
            }
        })
                .state("term-condition", {
            url: '/term-condition',
            views: {
                
                "content@": {
                    templateUrl: 'app/templates/term_condition.html',
                },
            }
        })
                .state("privacy-policy", {
            url: '/privacy-policy',
            views: {
//                "header": {
//                    templateUrl: "app/templates/header.html",
//                },
                "content@": {
                    templateUrl: 'app/templates/privacy_policy.html',
                },
            }
        })
                .state("logout", {
            url: '/logout',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/logout.html',
                },
            }
        })
                .state("update-password", {
            url: '/update-password/:token',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/update_password.html',
                },
            }
        })
                .state("forgot", {
            url: '/forgot',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/forget_password.html',
                },
            }
        })
          .state("ads", {
            url: '/ads',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/ads_page.html',
                },
            }
        })
        
        .state("event_search", {
            url: '/event_search',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/event_search.html',
                },
            }
        })
        
         
        
           .state("events", {
            url: '/events',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/events_page.html',
                },
            }
        })     
           .state("all_search", {
            url: '/all_search',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/all_search.html',
                },
            }
        })
        
        
         .state("training", {
            url: '/training',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/training_page.html',
                },
            }
        })
        
           .state("training_detail", {
            url: '/training-details/:id',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/training_detail.html',
                },
            }
        })
         .state("training_search", {
            url: '/training_search',
            views: {
                "header": {
                    templateUrl: "app/templates/header.html",
                },
                "content@": {
                    templateUrl: 'app/templates/training_search.html',
                },
            }
        })
       
               
//        matrimony page routing start
  .state("mhome", {
            url: '/matrimony',
            views: {
                "header": {
                    templateUrl: "app/templates/matrimony/header2.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/mhome.html',
                },
            }
        })
        
                .state("mlogin", {
            url: '/mlogin',
            views: {
                "header": {
                    templateUrl: "app/templates/matrimony/header2.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/mlogin.html',
                },
            }
        })
                .state("msign", {
            url: '/msign',
            views: {
                "header": {
                    templateUrl: "app/templates/matrimony/header2.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/msign.html',
                },
            }
        })
                  .state("mforgot", {
            url: '/mforgot',
            views: {
                "header": {
                    templateUrl: "app/templates/matrimony/header2.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/mforgot.html',
                },
            }
        })
                 .state("mupdate-password", {
            url: '/mupdate-password/:token',
            views: {
                "header": {
                    templateUrl: "app/templates/matrimony/header2.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/mupdate-password.html',
                },
            }
        })
            .state("matrimony_profile", {
            url: '/matrimony_profile/:check',
            views: {
                "header": {
                    templateUrl: "app/templates/matrimony/header2.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/matrimony_profile.html',
                },
            }
        })
         .state("profiles", {
            url: '/profiles',
            views: {
                "header": {
                    templateUrl: "app/templates/matrimony/header2.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/profiles.html',
                },
            }
        })
         .state("verify", {
            url: '/verify/:user_id/:otp',
            views: {
                "header": {
                    templateUrl: "app/templates/matrimony/header2.html",
                },
                "content@": {
                    templateUrl: 'app/templates/matrimony/verify.html',
                },
            }
        })
        $urlRouterProvider.otherwise('/');
         $authProvider.google({
            clientId: '841106851746-6nh00q5viur572idoqb7jeg6m3r1kkp5.apps.googleusercontent.com'
        });
          $authProvider.facebook({
            clientId: '1626531407653419'
            
        })
        $authProvider.google1({
            clientId: '841106851746-6nh00q5viur572idoqb7jeg6m3r1kkp5.apps.googleusercontent.com'
        });
          $authProvider.facebook1({
            clientId: '1626531407653419'
            
        })

        $locationProvider.html5Mode(true).hashPrefix('*');
       
    }
})();