(function() {
    'use strict';
    var app = angular.module('app');

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configureState]);

    function configureState($stateProvider, $urlRouterProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $stateProvider

                .state("home", {
                    url: '/home',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/home.html',
                        },
                    }
                })


                .state("Forgot_password", {
            url: '/Forgot_password',
            views: {
                "content@": {
                    templateUrl: 'app/templates/Forgot_password.html',
                },
            }
        })

        .state("artist_table", {
    url: '/artist_table',
    views: {
        "content@": {
            templateUrl: 'app/templates/artist_table.html',
        },
    }
})
.state("add_plan", {
url: '/add_plan',
views: {
"content@": {
    templateUrl: 'app/templates/add_plan.html',
},
}
})
.state("artist_plan", {
url: '/artist_plan',
views: {
"content@": {
    templateUrl: 'app/templates/artist_plan.html',
},
}
})
.state("artist_view", {
url: '/artist_view',
views: {
"content@": {
    templateUrl: 'app/templates/artist_view.html',
},
}
})
.state("company_plan", {
url: '/company_plan',
views: {
"content@": {
    templateUrl: 'app/templates/company_plan.html',
},
}
})
.state("company_table", {
url: '/company_table',
views: {
"content@": {
    templateUrl: 'app/templates/company_table.html',
},
}
})
.state("view_artist_profile", {
url: '/view_artist_profile',
views: {
"content@": {
    templateUrl: 'app/templates/view_artist_profile.html',
},
}
})
.state("index", {
url: '/index',
views: {
"content@": {
    templateUrl: 'app/templates/index.html',
},
}
})







                .state("artist", {
                    url: '/artist',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/artist.html',
                        },
                    }
                })
                .state("plans", {
                    url: '/plans',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/plans.html',
                        },
                    }
                })
                .state("booking", {
                    url: '/booking',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/booking.html',
                        },
                    }
                })
                .state("messages", {
                    url: '/messages',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/messages.html',
                        },
                    }
                })
                .state("updateProfile", {
                    url: '/updateProfile',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/updateProfile.html',
                        },
                    }
                })
                //............ change password ms .......\\
                .state("change_password", {
                    url: '/change_password',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/change_password.html',
                        },
                    }
                })
                .state("availability", {
                    url: '/availability',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/availability.html',
                        },
                    }
                })
                .state("company_profile", {
                    url: '/company_profile',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/company_profile.html',
                        },
                    }
                })
                .state("user_profile", {
                    url: '/user_profile',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/user_profile.html',
                        },
                    }
                })
                .state("artist_prf_upload", {
                    url: '/artist_prf_upload',
                    views: {
                        "header": {
                            templateUrl: "app/templates/header1.html",
                        },
                        "content@": {
                            templateUrl: 'app/templates/artist_prf_upload.html',
                        },
                    }
                })

        $urlRouterProvider.otherwise('/home');


    }
})();
