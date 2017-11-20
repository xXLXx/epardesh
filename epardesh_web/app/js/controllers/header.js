(function() {
    'use strict';
    var controllerId = 'header';
    angular
            .module('app')
            .controller(controllerId, header);
    header.$inject = ['$rootScope', '$scope', '$state', '$http', '$timeout', 'loginRegiServices', 'manageadServices', 'EventServices', 'TrainingServices'];
    function header($rootScope, $scope, $state, $http, $timeout, loginRegiServices, manageadServices, EventServices, TrainingServices) {

        $("html, body").animate({scrollTop: 0}, 600);
        var vm = this;
        vm.logout = logout;
        vm.userType = localStorage.getItem('user_type');
        vm.user_name = localStorage.getItem('user_name');
        vm.getCurrentState = $state.current.name;
        vm.stateChangeFun = stateChangeFun;
        vm.changeCountry = changeCountry;
//        vm.getCurrentState = $state.current.name;
        vm.goToPostAd = goToPostAd;
        vm.goToPostAd1 = goToPostAd1;
        vm.open_pop = open_pop;
        vm.closeModal = closeModal;
        vm.closeModal1 = closeModal1;
        vm.current_country = '';
        vm.conCode = '';
//        vm.cloc=localStorage.getItem('current_loc')
        $scope.loc = localStorage.getItem('current_loc');
        $scope.loc1 = localStorage.getItem('current_loc');
//         localStorage.setItem('status','4');
        if (localStorage.getItem('top'))
        {
            vm.topname = localStorage.getItem('top');
            $('.search-panel span#search_concept').text(vm.topname);
        }
        if (!localStorage.getItem('status'))
        {
            localStorage.setItem('status', '4');
        }
        if (localStorage.getItem('country'))
        {
            var con = localStorage.getItem('country');
            if (con == '1')
            {
                vm.conCode = '1';
            } else if (con == '2')
            {
                vm.conCode = '2';
            }

        }






//         $rootScope.$broadcast('cloc', '1');
//        alert($scope.loc);
        function closeModal()
        {
            $scope.loc = localStorage.getItem('current_loc');
            $('#loc').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

        }
        function closeModal1()
        {
            $scope.loc1 = localStorage.getItem('current_loc');
            $('#loc1').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        function goToPostAd() {
//            localStorage.setItem('fromPost', 'yes');
//            $state.go('setting');
            $('#postads').modal({backdrop: 'dynamic'});
            $('#postads').modal('show');

        }
        function goToPostAd1() {
//            localStorage.setItem('fromPost', 'yes');
//            $state.go('setting');
            $('#postads1').modal({backdrop: 'dynamic', keyboard: false});
            $('#postads1').modal('show');

        }


        vm.eventad = eventad;
        function eventad()
        {
            localStorage.setItem('fromevent', '1');
            if (vm.getCurrentState === 'setting')
            {
                console.log('if else');
                $timeout(function() {
                    $state.reload()
                }, 500);

//             location.reload();

            } else
            {
                console.log('else stateee');
                $timeout(function() {
                    $state.go('setting')
                }, 500);
//               $state.go('setting'); 
            }

            $('#postads').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        vm.itTraining = itTraining;
        function itTraining()
        {
            localStorage.setItem('fromtraining', '1');
//            $state.go('setting');
            if (vm.getCurrentState === 'setting')
            {
                console.log('if else');
//                vm.getCurrentState.reload();
                $timeout(function() {
                    $state.reload()
                }, 500);

            } else
            {
                console.log('else stateee');
//               $state.go('setting'); 
                $timeout(function() {
                    $state.go('setting')
                }, 500);
            }
            $('#postads').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        vm.ads = ads;
        function ads()
        {
            localStorage.setItem('fromads', '1');
//            $state.go('setting');
            if (vm.getCurrentState === 'setting')
            {
                console.log('if else');
//                $state.reload();
                $timeout(function() {
                    $state.reload()
                }, 500);
            } else
            {
                console.log('else stateee');
//               $state.go('setting');
                $timeout(function() {
                    $state.go('setting')
                }, 500);
            }
            $('#postads').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        vm.searchObj = {
            status: null,
            state: null,
            city: null,
            keyword: null,
            category_id: null,
            sub_category_id: null,
            count: 0
        }
        vm.clocation = clocation;
        function clocation()
        {

            var locat = $scope.loc;
            if (locat == "")
            {
                alert('Please Enter Your Location');
                return false;
            }


//            alert(locat);
            var city = $scope.city;
            var state = $scope.state;
            var country = $scope.country;
//            localStorage.setItem('current_loc',city +' ,'+country.toUpperCase());
            var latitude = $scope.latitude;
            var longitude = $scope.longitude;
            
            var place = $scope.place.address_components[0].long_name;
            console.log(place)
            console.log('place')
            if (country == undefined)
            {

                $('#loc').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }
            var cone = country.toLowerCase();
            if (cone == 'usa' || cone == 'united states of america' || cone == 'united,states,of,america' || cone == 'us' || cone == 'united states')
            {
                $('.country_toggle').html($('#ct2').html() + '<span class="caret"></span>');
                if (city == undefined && state != undefined)
                {
//                vm.current_country = state +', '+country.toUpperCase();
                    vm.current_country = state;
                    localStorage.setItem('country', '2');
                    localStorage.setItem('current_lat', latitude);
                    localStorage.setItem('current_lon', longitude);
                    localStorage.setItem('current_loc', vm.current_country);
                  localStorage.setItem('status_promo','2')
                    localStorage.setItem('promo_region',place)

                }
                else if (city == undefined && state == undefined)
                {
//                vm.current_country = 'CA, '+country.toUpperCase();
                    vm.current_country = 'CA';
                    localStorage.setItem('country', '2');
                    localStorage.setItem('current_lat', 36.7783);
                    localStorage.setItem('current_lon', 119.4179);
                    localStorage.setItem('current_loc', vm.current_country);
                    localStorage.setItem('status_promo','2')
                    localStorage.setItem('promo_region','California')
                    console.log('bb');
                }
                else if (state == undefined && city != undefined)
                {
//                vm.current_country = city +', '+country.toUpperCase();
                    vm.current_country = city;
                    localStorage.setItem('country', '2');
                    localStorage.setItem('current_lat', latitude);
                    localStorage.setItem('current_lon', longitude);
                    localStorage.setItem('current_loc', vm.current_country);
                  localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',vm.current_country)
                    console.log('state');
                } else
                {
//               vm.current_country = city +', '+state+', '+country.toUpperCase();
                    vm.current_country = city + ', ' + state;
                    localStorage.setItem('country', '2');
                    localStorage.setItem('current_lat', latitude);
                    localStorage.setItem('current_lon', longitude);
                    localStorage.setItem('current_loc', vm.current_country);
                     localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',city)
                    console.log('else');
                }
            } else if (cone == 'india')
            {
                $('.country_toggle').html($('#ct1').html() + '<span class="caret"></span>');
                if (city == undefined && state != undefined)
                {
//                vm.current_country = state +', '+country.toUpperCase();
                    vm.current_country = state;
                    localStorage.setItem('country', '1');
                    localStorage.setItem('current_lat', latitude);
                    localStorage.setItem('current_lon', longitude);
                    localStorage.setItem('current_loc', vm.current_country);
                    localStorage.setItem('status_promo','2')
                    localStorage.setItem('promo_region',place)
                    console.log(vm.current_country);
                    console.log('dddddd');
                }
                else if (city == undefined && state == undefined)
                {
//                vm.current_country = 'New Delhi, '+country.toUpperCase();
                    vm.current_country = 'DL';
                    localStorage.setItem('country', '1');
                    localStorage.setItem('current_lat', 28.6139);
                    localStorage.setItem('current_lon', 77.2090);
                    localStorage.setItem('current_loc', vm.current_country);
                    localStorage.setItem('status_promo','2')
                    localStorage.setItem('promo_region','New Delhi')
                    console.log(vm.current_country);
                    console.log('bothrrr');
                }
                else if (state == undefined && city != undefined)
                {
//                vm.current_country = city +', '+country.toUpperCase();
                    vm.current_country = city;
                    localStorage.setItem('country', '1');
                    localStorage.setItem('current_lat', latitude);
                    localStorage.setItem('current_lon', longitude);
                    localStorage.setItem('current_loc', vm.current_country);
                   localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',city)
                    console.log(vm.current_country);
                    console.log('yyyy');
                } else
                {
//                vm.current_country = city +', '+state+', '+country.toUpperCase();
                    vm.current_country = city + ', ' + state;
                    localStorage.setItem('country', '1');
                    localStorage.setItem('current_lat', latitude);
                    localStorage.setItem('current_lon', longitude);
                    localStorage.setItem('current_loc', vm.current_country);
                    localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',city)
                    console.log('else');
                    console.log(vm.current_country);
                }

            } else
            {

                alert('This application only Use for USA and India !');
                return false;
            }




//            if (con_name[con_name.length - 1] == 'usa' || con_name[con_name.length - 1] == 'united states of america' || con_name[con_name.length - 1] == 'united,states,of,america' || con_name[con_name.length - 1] == 'us')
//            {
////                vm.current_country = con_name[con_name.length - 2]+' , '+con_name[con_name.length - 1] ;
//                vm.current_country =  city +', '+country.toUpperCase();
//                localStorage.setItem('country', '2');
//                localStorage.setItem('current_lat', latitude);
//                localStorage.setItem('current_lon', longitude);
//
//            } else if (con_name[con_name.length - 1] == 'india' || con_name[con_name.length - 1] == 'india')
//            {
//                localStorage.setItem('country', '1');
////                vm.current_country = con_name[con_name.length - 2]+' , '+con_name[con_name.length - 1];
//               vm.current_country = vm.current_country =  city +' ,'+country.toUpperCase();
//                localStorage.setItem('current_lat', latitude);
//                localStorage.setItem('current_lon', longitude);
//            } else if (con_name == 'united,states')
//            {
////                vm.current_country = cone;
//                vm.current_country = vm.current_country =  city +' ,'+country.toUpperCase();
//                localStorage.setItem('country', '2');
//                localStorage.setItem('current_lat', latitude);
//                localStorage.setItem('current_lon', longitude);
//
//            }
//            else
//            {
//                alert('This application only Use for USA and India !');
//                return false;
//            }

            var featured = {
                'lat': localStorage.getItem('current_lat'),
                'long': localStorage.getItem('current_lon')

            }
            vm.adData = '';
            vm.trend = '';
            console.log("ggg" + featured.lat);
            manageadServices.featuredtrend(featured).success(function(response) {
                console.log(response);
                console.log("featured trends ads")
                vm.adData = response.data.featured_ads.ads;
                var a = vm.adData.length;
                console.log('images array');
                console.log(vm.adData);
                console.log(a);
                var check = 15 - a;
                for (var t = 1; t <= check; t++)
                {
                    vm.adData.push({"ad_info": {"ad_tittle": "Demo"}, "image_info": [[{"image_path": "app/content/img/houston.png", "image_type": "demo"}]]});
                }
                console.log(vm.adData);
                vm.trendads = response.data.trending_ads.ads;
                var b = vm.trendads.length;
                console.log("treee" + b);
                if (b >= 20)
                {
                    vm.trend = vm.trendads;
                }
                else
                {
                    vm.trend = '';
                }

                $rootScope.$broadcast('featured_ads', vm.adData);
                $rootScope.$broadcast('trend_ads', vm.trend);


            })

            //globalSearch data
//            vm.gsearch = {};
            if (localStorage.getItem('globalsearchData'))
            {
                vm.gsearch = JSON.parse(localStorage.getItem('globalsearchData'));
                vm.gsearch.lattitude = localStorage.getItem('current_lat');
                vm.gsearch.longitude = localStorage.getItem('current_lon');
                console.log(vm.gsearch);
                loginRegiServices.globalsearch(vm.gsearch).success(function(response) {
                    console.log(response);
                    console.log("eeeeeeee")
                    localStorage.setItem('adsData', JSON.stringify(response.data));

                    $state.reload();


                })
            }
            /***** Upcomming events ******/
            vm.upEvent =
                    {
                        'no_of_days': '7',
                        'user_id': localStorage.getItem('user_id'),
                        'lattitude': localStorage.getItem('current_lat'),
                        'longitude': localStorage.getItem('current_lon')
                    }
            EventServices.upcomingEvent(vm.upEvent).success(function(response) {
                if (response.status == 105)
                {
                    vm.hideLoader = false;
                    console.log('upcoming event');
                    console.log(response);
                    vm.upcomingEvent = response.data;
                    $rootScope.$broadcast('upcomming_event', vm.upcomingEvent);

                }
                else
                {
                    console.log('failed');
                }

            })

            /********view top 3 featured events******/
            vm.getloc =
                    {
                        'lattitude': localStorage.getItem('current_lat'),
                        'longitude': localStorage.getItem('current_lon')
                    }

            EventServices.topfeaturedEvent(vm.getloc).success(function(response) {
                if (response.status == 105)
                {

                    vm.topfeaturedEvent = response.data;
                    $rootScope.$broadcast('top_event', vm.topfeaturedEvent);

                }
                else
                {
                    console.log('failed');
                }

            })

            /********view top 5 featured Training******/
            vm.getloc =
                    {
                        'lattitude': localStorage.getItem('current_lat'),
                        'longitude': localStorage.getItem('current_lon')
                    }
            TrainingServices.topfeaturedTraining(vm.getloc).success(function(response) {
                if (response.status == 105)
                {
                    console.log('topfeatured');
                    console.log(response);
                    vm.topfeaturedTraining = response.data;
                    $rootScope.$broadcast('topfeaturedTraining', vm.topfeaturedTraining);

                }
                else
                {
                    console.log('failed1');
                }

            })

            /******** View Training on page load******/
            vm.ViewTraining =
                    {
                        'user_id': localStorage.getItem('user_id'),
                        'latitude': localStorage.getItem('current_lat'),
                        'longitude': localStorage.getItem('current_lon')

                    }
            if (!localStorage.getItem('user_id'))
            {
                vm.ViewTraining.user_id = "";
            }
            TrainingServices.ViewTraining(vm.ViewTraining).success(function(response) {
                if (response.status == 105)
                {

                    console.log('View training');
                    console.log(response);
                    vm.ViewTraining_all = response.data;
                    $rootScope.$broadcast('TrainingData', vm.ViewTraining_all);



                }
                else
                {
                    console.log('failed');
                }

            })

            $('#loc').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $state.reload();

        }

        $('#select_loc').on('click', function() {
            $('#loc').modal({backdrop: 'static', keyboard: false});
            $('#loc').modal('show');

        });
        $('#select_loc1').on('click', function() {
            $('#loc1').modal({backdrop: 'static', keyboard: false});
            $('#loc1').modal('show');
//alert('dfff');
        });


        vm.clocation1 = clocation1;
        function clocation1()
        {
            var locat = $scope.loc1;
            if (locat == "")
            {
                alert('Please Enter Your Location');
                return false;
            }

            var city1 = $scope.city1;
            var country1 = $scope.country1;
            var state1 = $scope.state1;
            var latitude1 = $scope.latitude1;
            var longitude1 = $scope.longitude1;
            var place1 = $scope.place1.address_components[0].long_name;
            var cone = country1.toLowerCase();

//                      var con_name = cone.split(/[\s,]+/);
            if (country1 == undefined)
            {

                $('#loc1').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }


            if (cone == 'usa' || cone == 'united states of america' || cone == 'united,states,of,america' || cone == 'us' || cone == 'united states')
            {
                if (city1 == undefined && state1 != undefined)
                {
//                vm.current_country = state1 +', '+country1.toUpperCase();
                    vm.current_country = state1;
                    localStorage.setItem('country', '2');
                    localStorage.setItem('current_lat', latitude1);
                    localStorage.setItem('current_lon', longitude1);
                    localStorage.setItem('current_loc', vm.current_country);
                    localStorage.setItem('status_promo','2')
                    localStorage.setItem('promo_region',place1)
                    console.log('city');

                }
                else if (city1 == undefined && state1 == undefined)
                {
//                vm.current_country = 'California, '+country1.toUpperCase();
                    vm.current_country = 'CA';
                    localStorage.setItem('country', '2');
                    localStorage.setItem('current_lat', 36.7783);
                    localStorage.setItem('current_lon', 119.4179);
                    localStorage.setItem('current_loc', vm.current_country);
                     localStorage.setItem('status_promo','2')
                    localStorage.setItem('promo_region','California')
                    console.log('bb');
                }
                else if (state1 == undefined && city1 != undefined)
                {
//                vm.current_country = city1 +', '+country1.toUpperCase();
                    vm.current_country = city1;
                    localStorage.setItem('country', '2');
                    localStorage.setItem('current_lat', latitude1);
                    localStorage.setItem('current_lon', longitude1);
                    localStorage.setItem('current_loc', vm.current_country);
                     localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',vm.current_country)
                    console.log('state');
                } else
                {
//               vm.current_country = city1 +', '+country1.toUpperCase();
                    vm.current_country = city1 + ', ' + state1;
                    localStorage.setItem('country', '2');
                    localStorage.setItem('current_lat', latitude1);
                    localStorage.setItem('current_lon', longitude1);
                    localStorage.setItem('current_loc', vm.current_country);
                     localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',city1)
                    console.log('else');
                }
            } else if (cone == 'india')
            {
                if (city1 == undefined && state1 != undefined)
                {
//                vm.current_country = state1 +', '+country1.toUpperCase();
                    vm.current_country = state1;
                    localStorage.setItem('country', '1');
                    localStorage.setItem('current_lat', latitude1);
                    localStorage.setItem('current_lon', longitude1);
                    localStorage.setItem('current_loc', vm.current_country);
                     localStorage.setItem('status_promo','2')
                    localStorage.setItem('promo_region',place1)
                    console.log(vm.current_country);
                    console.log('dddddd');
                }
                else if (city1 == undefined && state1 == undefined)
                {
//                vm.current_country = 'New Delhi, '+country1.toUpperCase();
                    vm.current_country = 'DL';
                    localStorage.setItem('country', '1');
                    localStorage.setItem('current_lat', 28.6139);
                    localStorage.setItem('current_lon', 77.2090);
                    localStorage.setItem('current_loc', vm.current_country);
                     localStorage.setItem('status_promo','2')
                    localStorage.setItem('promo_region','New Delhi')
                    console.log(vm.current_country);
                    console.log('bothrrr');
                }
                else if (state1 == undefined && city1 != undefined)
                {
//                vm.current_country = city1 +', '+country1.toUpperCase();
                    vm.current_country = city1;
                    localStorage.setItem('country', '1');
                    localStorage.setItem('current_lat', latitude1);
                    localStorage.setItem('current_lon', longitude1);
                    localStorage.setItem('current_loc', vm.current_country);
                     localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',city1)
                    console.log(vm.current_country);
                    console.log('yyyy');
                } else
                {
                    vm.current_country = city1 + ', ' + state1;
                    localStorage.setItem('country', '1');
                    localStorage.setItem('current_lat', latitude1);
                    localStorage.setItem('current_lon', longitude1);
                    localStorage.setItem('current_loc', vm.current_country);
                     localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',city1)
                    console.log('else');
                    console.log(vm.current_country);
                }

            } else
            {

                alert('This application only Use for USA and India !');
                return false;
            }










//                      if(con_name[con_name.length-1]=='usa' ||con_name[con_name.length-1]=='united states of america'||con_name[con_name.length-1]=='united,states,of,america'|| con_name[con_name.length-1]=='us')
//                      {
////                          vm.current_country=con_name[con_name.length-1];
//                          vm.current_country =  city1 +' ,'+country1.toUpperCase();
//                          localStorage.setItem('country','2');
//                          localStorage.setItem('current_lat',latitude);
//                          localStorage.setItem('current_lon', longitude);
//                          
//                      }else if(con_name[con_name.length-1]=='india' || con_name[con_name.length-1]=='india')
//                      {
//                          localStorage.setItem('country','1');
////                          vm.current_country=con_name[con_name.length-1];
//                           vm.current_country =  city1 +' ,'+country1.toUpperCase();
//                           localStorage.setItem('current_lat',latitude);
//                           localStorage.setItem('current_lon', longitude);
//                      } else if(con_name=='united,states')
//                      {
////                          vm.current_country=cone;
//                          vm.current_country =  city1 +' ,'+country1.toUpperCase();
//                          localStorage.setItem('country','2');
//                          localStorage.setItem('current_lat',latitude);
//                          localStorage.setItem('current_lon', longitude);
//                          
//                      }
//                      else
//                      {
//                          alert('This application only Use for USA and India !');
//                          return false;
//                      }

           var featured = {
                'lat': localStorage.getItem('current_lat'),
                'long': localStorage.getItem('current_lon')

            }
            vm.adData = '';
            vm.trend = '';
            console.log("ggg" + featured.lat);
            manageadServices.featuredtrend(featured).success(function(response) {
                console.log(response);
                console.log("featured trends ads")
                vm.adData = response.data.featured_ads.ads;
                var a = vm.adData.length;
                console.log('images array');
                console.log(vm.adData);
                console.log(a);
                var check = 15 - a;
                for (var t = 1; t <= check; t++)
                {
                    vm.adData.push({"ad_info": {"ad_tittle": "Demo"}, "image_info": [[{"image_path": "app/content/img/houston.png", "image_type": "demo"}]]});
                }
                console.log(vm.adData);
                vm.trendads = response.data.trending_ads.ads;
                var b = vm.trendads.length;
                console.log("treee" + b);
                if (b >= 20)
                {
                    vm.trend = vm.trendads;
                }
                else
                {
                    vm.trend = '';
                }

                $rootScope.$broadcast('featured_ads', vm.adData);
                $rootScope.$broadcast('trend_ads', vm.trend);


            })

            //globalSearch data
//            vm.gsearch = {};
            if (localStorage.getItem('globalsearchData'))
            {
                vm.gsearch = JSON.parse(localStorage.getItem('globalsearchData'));
                vm.gsearch.lattitude = localStorage.getItem('current_lat');
                vm.gsearch.longitude = localStorage.getItem('current_lon');
                console.log(vm.gsearch);
                loginRegiServices.globalsearch(vm.gsearch).success(function(response) {
                    console.log(response);
                    console.log("eeeeeeee")
                    localStorage.setItem('adsData', JSON.stringify(response.data));

                    $state.reload();


                })
            }
            /***** Upcomming events ******/
            vm.upEvent =
                    {
                        'no_of_days': '7',
                        'user_id': localStorage.getItem('user_id'),
                        'lattitude': localStorage.getItem('current_lat'),
                        'longitude': localStorage.getItem('current_lon')
                    }
            EventServices.upcomingEvent(vm.upEvent).success(function(response) {
                if (response.status == 105)
                {
                    vm.hideLoader = false;
                    console.log('upcoming event');
                    console.log(response);
                    vm.upcomingEvent = response.data;
                    $rootScope.$broadcast('upcomming_event', vm.upcomingEvent);

                }
                else
                {
                    console.log('failed');
                }

            })

            /********view top 3 featured events******/
            vm.getloc =
                    {
                        'lattitude': localStorage.getItem('current_lat'),
                        'longitude': localStorage.getItem('current_lon')
                    }

            EventServices.topfeaturedEvent(vm.getloc).success(function(response) {
                if (response.status == 105)
                {

                    vm.topfeaturedEvent = response.data;
                    $rootScope.$broadcast('top_event', vm.topfeaturedEvent);

                }
                else
                {
                    console.log('failed');
                }

            })

            /********view top 5 featured Training******/
            vm.getloc =
                    {
                        'lattitude': localStorage.getItem('current_lat'),
                        'longitude': localStorage.getItem('current_lon')
                    }
            TrainingServices.topfeaturedTraining(vm.getloc).success(function(response) {
                if (response.status == 105)
                {
                    console.log('topfeatured');
                    console.log(response);
                    vm.topfeaturedTraining = response.data;
                    $rootScope.$broadcast('topfeaturedTraining', vm.topfeaturedTraining);

                }
                else
                {
                    console.log('failed1');
                }

            })

            /******** View Training on page load******/
            vm.ViewTraining =
                    {
                        'user_id': localStorage.getItem('user_id'),
                        'latitude': localStorage.getItem('current_lat'),
                        'longitude': localStorage.getItem('current_lon')

                    }
            if (!localStorage.getItem('user_id'))
            {
                vm.ViewTraining.user_id = "";
            }
            TrainingServices.ViewTraining(vm.ViewTraining).success(function(response) {
                if (response.status == 105)
                {

                    console.log('View training');
                    console.log(response);
                    vm.ViewTraining_all = response.data;
                    $rootScope.$broadcast('TrainingData', vm.ViewTraining_all);



                }
                else
                {
                    console.log('failed');
                }

            })


            $('#loc1').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

        }





        if (localStorage.getItem('user_name')) {
            vm.isLogOut = false;
            vm.isLogIn = true;
        }
        else {
            vm.isLogOut = true;
            vm.isLogIn = false;
        }
        function logout() {
            var lat = localStorage.getItem('current_lat');
            var lon = localStorage.getItem('current_lon');
            var loc = localStorage.getItem('current_loc');
            var country = localStorage.getItem('country');
            localStorage.clear();
            localStorage.setItem('current_lat', lat);
            localStorage.setItem('current_lon', lon);
            localStorage.setItem('current_loc', loc);
            localStorage.setItem('country', country);
            $state.go('logout');
        }

        function changeCountry(cntry) {
            if (cntry == 'India') {
                localStorage.setItem('country', 1);
                vm.stateData = {
                    'country_id': 1
                }
                $('.country_toggle').html($('#ct1').html() + '<span class="caret"></span>');
            }
            else {
                localStorage.setItem('country', 2);
                vm.stateData = {
                    'country_id': 2,
                }
                $('.country_toggle').html($('#ct2').html() + '<span class="caret"></span>');
            }
            loginRegiServices.view_states(vm.stateData).success(function(response) {
                console.log("API Hit For States");
                console.log(response);
                if (response.status == 105) {
                    vm.states = response.data;
                    $state.reload();
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }

        if (!localStorage.getItem('country')) {
            $.ajax({
                url: '//freegeoip.net/json/',
                type: 'POST',
                async: false,
                dataType: 'jsonp',
                success: function(response) {
                    console.log("location");
                    console.log(response);
                    if (response == '' || response == null)
                    {
                        $('#locdefault').modal({backdrop: 'static', keyboard: false});
                        $('#locdefault').modal('show');
                    }

                    if (response.city == "" && response.region_code != "")
                    {
//                vm.current_country = state1 +', '+country1.toUpperCase();
                        vm.current_country = response.region_code;
                        localStorage.setItem('status_promo','2')
                    localStorage.setItem('promo_region',response.region_name)
                        

                    }
                    else if (response.city == "" && response.region_code == "")
                    {
//                vm.current_country = 'California, '+country1.toUpperCase();
                        vm.current_country = response.country_name.toUpperCase();
                    localStorage.setItem('status_promo','0')
                    localStorage.setItem('promo_region',vm.current_country)

                    }
                    else if (response.region_code == "" && response.city != "")
                    {
//                vm.current_country = city1 +', '+country1.toUpperCase();
                        vm.current_country = response.city;
                    localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',vm.current_country)

                    } else
                    {
//               vm.current_country = city1 +', '+country1.toUpperCase();
                        vm.current_country = response.city + ', ' + response.region_code;
                    localStorage.setItem('status_promo','1')
                    localStorage.setItem('promo_region',response.city)

                    }

//                    vm.current_country = response.city +', ' +response.region_code;
                    $scope.loc = vm.current_country;
                    localStorage.setItem('current_lat', response.latitude);
                    localStorage.setItem('current_lon', response.longitude);
                    localStorage.setItem('current_loc', response.city + ', ' + response.country_name.toUpperCase());
                    if (response.country_name) {
                        if (response.country_name == 'INDIA' || response.country_name == 'India') {
                            localStorage.setItem('country', 1);
                           vm.conCode = '1';
                            vm.stateData = {
                                'country_id': 1
                            }
                            $('.country_toggle').html($('#ct1').html() + '<span class="caret"></span>');
                        }
                        //else if (response.country_name == 'UNITED STATES' || response.country_name == 'United States' || response.country_name == 'united states' || response.country_name == 'US' || response.country_name == 'us') 
                        else {
                            localStorage.setItem('country', 2);
                            vm.conCode = '2';
                            vm.stateData = {
                                'country_id': 2,
                            }
                            $('.country_toggle').html($('#ct2').html() + '<span class="caret"></span>');
                        }
                        loginRegiServices.view_states(vm.stateData).success(function(response) {
                            console.log("API Hit For States");
                            console.log(response);
                            if (response.status == 105) {
                                vm.states = response.data;
                                if (localStorage.getItem('searchData')) {
                                    var data = JSON.parse(localStorage.getItem('searchData'));
                                    if (data.keyword) {
                                        vm.searchObj.keyword = data.keyword;
                                    }
                                    angular.forEach(vm.states, function(value) {
                                        if (value.location_name == data.state) {

                                            vm.getState = value.location_name + ',' + value.id;
                                            vm.searchObj.state = value.location_name;
                                            console.log(vm.selectState);
                                            vm.cityData = {
                                                'country_id': localStorage.getItem('country'),
                                                'state_id': value.id,
                                            }

                                            loginRegiServices.view_cities(vm.cityData).success(function(response) {

                                                vm.cities = [];
                                                if (response.status == 105) {
                                                    vm.cities = response.data;
                                                    if (data.city) {
                                                        vm.city = data.city;
                                                        vm.searchObj.city = data.city;
                                                    }
                                                }
                                                else {
                                                    showError(response['message']);
                                                    return false;
                                                }
                                            });


                                        }
                                    })


                                }
                            }
                            else {
                                showError(response['message']);
                                return false;
                            }
                        });
                    }
                    else {
                        alert('please allow us to get your location');
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#locdefault').modal({backdrop: 'static', keyboard: false});
                    $('#locdefault').modal('show');
                }
            });
        }
        else {
            if (localStorage.getItem('country') == '1') {
                localStorage.setItem('country', 1);
                vm.stateData = {
                    'country_id': 1
                }
                $('.country_toggle').html($('#ct1').html() + '<span class="caret"></span>');

//                vm.current_country = 'New Delhi, '+'INDIA';
//                localStorage.setItem('country', '1');
//                localStorage.setItem('current_lat', 28.6139);
//                localStorage.setItem('current_lon', 77.2090);
//                localStorage.setItem('current_loc', vm.current_country);


            }
            //else if (response.country_name == 'UNITED STATES' || response.country_name == 'United States' || response.country_name == 'united states' || response.country_name == 'US' || response.country_name == 'us') 
            else if (localStorage.getItem('country') == '2') {
                localStorage.setItem('country', 2);
                vm.stateData = {
                    'country_id': 2,
                }
                $('.country_toggle').html($('#ct2').html() + '<span class="caret"></span>');

//                
//                vm.current_country = 'California, '+'UNITED STATES';
//                localStorage.setItem('country', '2');
//                localStorage.setItem('current_lat', 36.7783);
//                localStorage.setItem('current_lon', 119.4179);
//                localStorage.setItem('current_loc', vm.current_country);



            }
            loginRegiServices.view_states(vm.stateData).success(function(response) {
                console.log("API Hit For States");
                console.log(response);
                if (response.status == 105) {
                    vm.states = response.data;
                    if (localStorage.getItem('searchData')) {
                        var data = JSON.parse(localStorage.getItem('searchData'));
                        if (data.keyword) {
                            vm.searchObj.keyword = data.keyword;
                        }
                        angular.forEach(vm.states, function(value) {
                            if (value.location_name == data.state) {

                                vm.getState = value.location_name + ',' + value.id;
                                vm.searchObj.state = value.location_name;
                                console.log(vm.selectState);
                                vm.cityData = {
                                    'country_id': localStorage.getItem('country'),
                                    'state_id': value.id,
                                }

                                loginRegiServices.view_cities(vm.cityData).success(function(response) {
                                    vm.cities = [];
                                    if (response.status == 105) {
                                        vm.cities = response.data;
                                        if (data.city) {
                                            vm.city = data.city;
                                            vm.searchObj.city = data.city;
                                        }
                                    }
                                    else {
                                        showError(response['message']);
                                        return false;
                                    }
                                });
                            }
                        })
                    }
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }


        if (localStorage.getItem('country') == '1' | localStorage.getItem('country') == 1) {
            vm.searchObj.state = 'Delhi';
            vm.current_country = 'India';
            vm.current_country = localStorage.getItem('current_loc');
        }
        else if (localStorage.getItem('country') == '2') {
            vm.searchObj.state = 'California';
//            vm.current_country = 'USA';
            vm.current_country = localStorage.getItem('current_loc');
        }




        vm.cityData = {};
        function stateChangeFun(data) {
            console.log(data);
            vm.cityData.state_id = data.split(',')[1];
            vm.searchObj.state = data.split(',')[0];
            broadcastFun();
            vm.cityData.country_id = localStorage.getItem('country');
            loginRegiServices.view_cities(vm.cityData).success(function(response) {
                console.log("API Hit For Cities");
                console.log(response);
                vm.cities = [];
                if (response.status == 105) {
                    vm.cities = response.data;
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }

        $('.country_menu a').on('click', function() {
            $('.country_toggle').html($(this).html() + '<span class="caret"></span>');
            console.log(vm.country);
        });
        vm.getCity = getCity;
        function getCity(city) {
            vm.searchObj.city = city;
            broadcastFun();
        }



        /*==========top_categories====*/

        vm.top_categories = [];
        loginRegiServices.top_categories().success(function(response) {
            console.log(response);
            console.log("dgdfgh");
            if (response.status == '105') {

                vm.top_categories = response.data;

                console.log("data" + vm.top_categories);

            }
            else {
                console.log('No items Found!');
            }
        })






        /*========================Search pannel start from here==============================*/

//
//        vm.findFunc = findFunc;
//        vm.s = s;
//        function s(data) {
//            vm.searchObj.keyword = data;
//            findFunc();
//
//        }
//
//        function broadcastFun() {
//            $rootScope.$broadcast('searchDataFromHeader', vm.searchObj);
//        }
//        vm.onChangeKeyword = onChangeKeyword;
//        function onChangeKeyword() {
//            vm.searchContentLoader = true;
//            var keyword = {
//                'keyword': vm.searchObj.keyword
//            }
////            broadcastFun();
//            vm.searchData = [];
//            loginRegiServices.searchBykey(keyword).success(function(response) {
//                console.log(response);
//                localStorage.setItem('searchData', JSON.stringify(response.data));
//                if (response.status == '105') {
//                    vm.searchContentLoader = false;
//                    vm.searchData = response.data;
//                    $('#searchDiv').show();
//                    console.log('data' + vm.searchData.ad_tittle);
//
//                }
//                else {
//                    console.log('No items Found!');
//                }
//            })
//
//
//        }
//        $(document).mouseup(function(e)
//        {
//            var container = $("#searchDiv");
//
//            if (!container.is(e.target) // if the target of the click isn't the container...
//                    && container.has(e.target).length === 0) // ... nor a descendant of the container
//            {
//                container.hide();
//            }
//        });
//
//
//
//        $scope.$on("searchDataFromHome", function(event, data) {
//            console.log("console from header listner")
//            console.log(data);
//            vm.searchObj.category_id = data.category_id;
//            vm.searchObj.sub_category_id = data.sub_category_id;
//        });
//        function findFunc() {
//            vm.searchObj.category_id = $('#search_param').val();
////             alert(vm.searchObj.category_id);
//            if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.category_id) {
//                vm.searchObj.status = 9;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 11;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword) {
//                vm.searchObj.status = 7;
//            }
//
//            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.category_id) {
//                vm.searchObj.status = 8;
//            }
//            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 10;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.category_id) {
//                vm.searchObj.status = 4;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 5;
//            }
//            else if (vm.searchObj.state && vm.searchObj.category_id) {
//                vm.searchObj.status = 2;
//            }
//            else if (vm.searchObj.state && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 3;
//            }
//
//            else if (vm.searchObj.state && vm.searchObj.city) {
//                vm.searchObj.status = 1;
//            }
//            else if (vm.searchObj.state && vm.searchObj.keyword) {
//                vm.searchObj.status = 6;
//            }
//            else if (vm.searchObj.state) {
//                vm.searchObj.status = 0;
//            }
//            else {
//                vm.searchObj.state = "Delhi";
//                vm.searchObj.status = 0;
//            }
//
//            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
//            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
//            loginRegiServices.searchAds(vm.searchObj).success(function(response) {
//                console.log(response);
//                localStorage.setItem('adsData', JSON.stringify(response.data));
//                if (vm.getCurrentState == 'ads') {
//                    $rootScope.$broadcast('reloadState');
//                }
//                else {
//                    $state.go('ads');
//                }
//            })
//        }




//
//        /*=====================Get Header Fixed Category=============================*/
//        vm.allCategoryImgArr = ['trainning-icon.png', 'event-icon.png', 'jobs-icon.png', 'roommate-icon.png', 'rental-icon.png', 'travelindia-icon.png', 'daycare-icon.png', 'service-icon.png', 'auto-icon.png', 'more-icon.png'];
//        loginRegiServices.getCat().success(function(response) {
//            console.log("chk response for category")
//            console.log(response);
//            vm.allCat = response.data;
//
//        })
//
//        vm.searchByFixCat = searchByFixCat;
//        function searchByFixCat(catId) {
//            vm.searchObj.category_id = catId;
//            vm.searchObj.sub_category_id = null;
//            if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.category_id) {
//                vm.searchObj.status = 9;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 11;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword) {
//                vm.searchObj.status = 7;
//            }
//
//            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.category_id) {
//                vm.searchObj.status = 8;
//            }
//            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 10;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.category_id) {
//                vm.searchObj.status = 4;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 5;
//            }
//            else if (vm.searchObj.state && vm.searchObj.category_id) {
//                vm.searchObj.status = 2;
//            }
//            else if (vm.searchObj.state && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 3;
//            }
//
//            else if (vm.searchObj.state && vm.searchObj.city) {
//                vm.searchObj.status = 1;
//            }
//            else if (vm.searchObj.state && vm.searchObj.keyword) {
//                vm.searchObj.status = 6;
//            }
//            else if (vm.searchObj.state) {
//                vm.searchObj.status = 0;
//            }
//            else {
//                vm.searchObj.state = "Delhi";
//                vm.searchObj.status = 0;
//            }
//
//            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
//            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
//            loginRegiServices.searchAds(vm.searchObj).success(function(response) {
//                console.log(response);
//                localStorage.setItem('adsData', JSON.stringify(response.data));
//                if (vm.getCurrentState == 'ads') {
//                    $rootScope.$broadcast('reloadState');
//                }
//                else {
//                    $state.go('ads');
//                }
//            })
//        }
        /*===pop up ====*/
        manageadServices.viewtopcategories().success(function(response) {
            console.log(response);
            vm.category = [];

            var len = response.data.length;
            if (response.status == 105) {
                vm.category = response.data;               
                 $rootScope.$broadcast('ViewAllCat', vm.category);      
                console.log("response3");
                console.log(vm.category);
                vm.DataLoader = false;
            }
            else {
                showError(response['message']);
                return false;
            }

        });

        function open_pop() {
//              alert("dfsfsd");
            $("html, body").animate({scrollTop: 0}, 600);


            var id = '#dialog';

            //Get the screen height and width
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();

            //Set heigth and width to mask to fill up the whole screen
            $('#mask').css({'width': maskWidth, 'height': maskHeight});

            //transition effect		
            $('#mask').fadeIn(500);
            $('#mask').fadeTo("slow", 0.9);

            //Get the window height and width
            var winH = $(window).height();
            var winW = $(window).width();

            //Set the popup window to center
//		$(id).css('top',  winH/2-$(id).height()/2);
//		$(id).css('left', winW/2-$(id).width()/2);
            $(id).css('display', 'block');
            //transition effect
            $(id).fadeIn(2000);

//	//if close button is clicked
            $('.close').click(function(e) {
                //Cancel the link behavior
                e.preventDefault();

                $('#mask').hide();
                $('.window').hide();
            });
//	
//	//if mask is clicked
            $('#mask').click(function() {
                $(this).hide();
                $('.window').hide();
            });




        }

//        	$(document).ready(function(e){
//		$('.search-panel .dropdown-menu').find('a').click(function(e) {
//			e.preventDefault();
//			var param = $(this).attr("myVal");
//			var concept = $(this).text();
//                        alert(concept);
//			$('.search-panel span#search_concept').text(concept);
//			$('.input-group #search_param').val(param);
//		});
//		});
//                

        $scope.dropFun = function(top) {
            var id = top.id;
            var concept = top.name;
//                        alert(concept);
            localStorage.setItem('top', concept);
            $('.search-panel span#search_concept').text(concept);
            $('.input-group #search_param').val(id);
            vm.globalsearch.status = 1;
            localStorage.setItem('status', '1');
            localStorage.setItem('cat_id', id);
        }
        $scope.fixdropFun = function(top) {
            var concept = top;
            localStorage.setItem('top', top);
            localStorage.removeItem('cat_id');
            $('.search-panel span#search_concept').text(concept);
            if (concept == "IT Training")
            {
//               $('.input-group #search_param').val(2); 
                vm.globalsearch.status = 2;
                localStorage.setItem('status', '2');
                $state.go('training')

            } else if (concept == "Events")
            {
//               $('.input-group #search_param').val(3); 
                vm.globalsearch.status = 3;
                localStorage.setItem('status', '3');
                $state.go('events')
            } else if (concept == "All")
            {
//               $('.input-group #search_param').val(4); 
                vm.globalsearch.status = 4;
                localStorage.setItem('status', '4');
            }

//            $('.input-group #search_param').val(id);
        }

        /*========================Search pannel start from here==============================*/
//
//        vm.getCat = getCat;
//        vm.searchObj = {
//            status: null,
//            state: null,
//            city: null,
//            keyword: null,
//            category_id: null,
//            sub_category_id: null,
//            count: 0
//        }
//
//
//        if (localStorage.getItem('searchData')) {
//            vm.SearchData = JSON.parse(localStorage.getItem('searchData'));
//            if (vm.SearchData.state) {
//                vm.searchObj.state = vm.SearchData.state;
//            }
//            if (vm.SearchData.city) {
//                vm.searchObj.city = vm.SearchData.city;
//            }
//            if (vm.SearchData.keyword) {
//                vm.searchObj.keyword = vm.SearchData.keyword;
//            }
//        }
//        else if (localStorage.getItem('country') == '1') {
//            vm.searchObj.state = 'Delhi';
//            vm.showPopularCity = false;
//        }
//        else {
//            vm.searchObj.state = 'California';
//            vm.showPopularCity = true;
//        }
//        if (localStorage.getItem('country') == '1') {
//
//            vm.showPopularCityIndia = true;
//            vm.showPopularCityUSA = false;
//        }
//        else {
//
//            vm.showPopularCityIndia = false;
//            vm.showPopularCityUSA = true;
//        }
//
//        $scope.$on("searchDataFromHeader", function(event, data) {
//            console.log(data);
//            vm.searchObj.state = data.state;
//            vm.searchObj.city = data.city;
//            vm.searchObj.keyword = data.keyword;
//        });
//
//        function getCat(cat) {
//            vm.searchObj.category_id = cat;
//            if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.category_id) {
//                vm.searchObj.status = 9;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 11;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword) {
//                vm.searchObj.status = 7;
//            }
//
//            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.category_id) {
//                vm.searchObj.status = 8;
//            }
//            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 10;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.category_id) {
//                vm.searchObj.status = 4;
//            }
//            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 5;
//            }
//            else if (vm.searchObj.state && vm.searchObj.category_id) {
//                vm.searchObj.status = 2;
//            }
//            else if (vm.searchObj.state && vm.searchObj.sub_category_id) {
//                vm.searchObj.status = 3;
//            }
//
//            else if (vm.searchObj.state && vm.searchObj.city) {
//                vm.searchObj.status = 1;
//            }
//            else if (vm.searchObj.state && vm.searchObj.keyword) {
//                vm.searchObj.status = 6;
//            }
//            else if (vm.searchObj.state) {
//                vm.searchObj.status = 0;
//            }
//            else {
//                vm.searchObj.state = "Delhi";
//                vm.searchObj.status = 0;
//            }
//
//            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
//            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
//            loginRegiServices.searchAds(vm.searchObj).success(function(response) {
//                console.log(response);
//                console.log("fhjkghw")
//                localStorage.setItem('adsData', JSON.stringify(response.data));
//                $state.go('ads');
//            })
//
//        }

        /*========================Global Search from top 24 category==============================*/


        vm.globalsearch = {
            status: "4",
            keyword: "",
            category_id: "",
            subcategory_id: "",
            lattitude: "",
            longitude: "",
            user_id: ""

        }
        var userid = localStorage.getItem('user_id');
        if (userid == null)
        {
            vm.globalsearch.user_id = "";
        }
        else
        {
            vm.globalsearch.user_id = userid;
        }
        vm.getCat = getCat;
        function getCat(cat) {
            vm.globalsearch.status = 1;
            vm.globalsearch.lattitude = localStorage.getItem('current_lat');
            vm.globalsearch.longitude = localStorage.getItem('current_lon');
            vm.globalsearch.category_id = cat;
//            alert(vm.globalsearch.category_id);
            
            localStorage.setItem('globalsearchData', JSON.stringify(vm.globalsearch));
            $rootScope.$broadcast('searchDataFromHeader', vm.globalsearch);
            loginRegiServices.globalsearch(vm.globalsearch).success(function(response) {
                console.log(response);
                console.log("fhjkghw")
                localStorage.setItem('Cat_id',cat);
                localStorage.setItem('adsData', JSON.stringify(response.data));
                if (vm.getCurrentState == 'ads')
                {
                    $state.reload();
                } else
                {
                    $state.go('ads');
                }

            })

        }

        vm.getsubCat = getsubCat;
        function getsubCat(cat) {
            vm.globalsearch.status = 1;
            vm.globalsearch.lattitude = localStorage.getItem('current_lat');
            vm.globalsearch.longitude = localStorage.getItem('current_lon');
            vm.globalsearch.category_id = cat;
//            alert(vm.globalsearch.category_id);

//            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
//            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
            loginRegiServices.globalsearch(vm.globalsearch).success(function(response) {
                console.log(response);
                console.log("fhjkghw")
                localStorage.setItem('Subcat_id',cat);
                localStorage.setItem('adsData', JSON.stringify(response.data));
                $state.go('ads');
            })

        }

        /*========================Search pannel from auto suggestion  with keyword==============================*/


        vm.findFunc = findFunc;
        vm.s = s;
        vm.sevent = sevent;
        function s(data, idd) {
            vm.globalsearch.keyword = data;
            console.log('checcccc');
            console.log(idd);
//            findFunc();
            localStorage.setItem('track', vm.getCurrentState)
            $state.go('ad_details', {id: idd})

        }
        function sevent(data, eid) {
            vm.globalsearch.keyword = data;
            console.log('checcccc');
            console.log(eid);
//            findFunc();
            localStorage.setItem('track_event', vm.getCurrentState)
            $state.go('event_details', {id: eid})

        }
        vm.straining = straining;
        function straining(data, tid)
        {
            vm.globalsearch.keyword = data;
            console.log(tid);
            localStorage.setItem('track_training', vm.getCurrentState)
            $state.go('training_detail', {id: tid})
        }
        function broadcastFun() {
            $rootScope.$broadcast('searchDataFromHeader', vm.searchObj);
        }
        vm.onChangeKeyword = onChangeKeyword;
        function onChangeKeyword() {
            vm.searchContentLoader = true;
            var keyword = {
                'keyword': vm.searchObj.keyword,
                'status': localStorage.getItem('status')
            }

            vm.searchData = [];
            loginRegiServices.searchBykey(keyword).success(function(response) {
                console.log(response);
                localStorage.setItem('searchData', JSON.stringify(response.data));
                if (response.status == '105') {
                    vm.searchContentLoader = false;
                    vm.searchData = response.data;
                    $('#searchDiv').show();
                    $('#searchDiv1').show();
                    console.log('dataaa');
                    console.log(vm.searchData);

                }
                else {
                    console.log('No items Found!');
                }
            })


        }
        $(document).mouseup(function(e)
        {
            var container = $("#searchDiv");
            var container1 = $("#searchDiv1");

            if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                container.hide();
            }
            if (!container1.is(e.target) // if the target of the click isn't the container...
                    && container1.has(e.target).length === 0) // ... nor a descendant of the container
            {
                container1.hide();
            }
        });



//        $scope.$on("searchDataFromHome", function(event, data) {
////            console.log("console from header listner")
////            console.log(data);
//            vm.searchObj.category_id = data.category_id;
//            vm.searchObj.sub_category_id = data.sub_category_id;
//        });
        function findFunc() {
            vm.globalsearch.category_id = localStorage.getItem('cat_id');
            if (localStorage.getItem('cat_id') == null)
            {
                vm.globalsearch.category_id = "";
            }
//           vm.globalsearch.status=1;
            console.log(vm.globalsearch.category_id);
            vm.globalsearch.keyword = vm.searchObj.keyword;
            if (vm.searchObj.keyword == null)
            {
                vm.globalsearch.keyword = "";
            }

            console.log(vm.searchObj.keyword);
            if (localStorage.getItem('status'))
            {
                vm.globalsearch.status = localStorage.getItem('status');
            }

            vm.globalsearch.lattitude = localStorage.getItem('current_lat');
            vm.globalsearch.longitude = localStorage.getItem('current_lon');
//            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
//            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
            loginRegiServices.globalsearch(vm.globalsearch).success(function(response) {
                console.log(response);

                if (localStorage.getItem('status') == '1')
                {
                    localStorage.setItem('adsData', JSON.stringify(response.data));
                    if (vm.getCurrentState == 'ads') {
                        $rootScope.$broadcast('reloadState');
                    }
                    else {
                        $state.go('ads');
                    }

                }
                else if (localStorage.getItem('status') == '2')
                {

//                    $state.go('ads');

                    if (vm.getCurrentState == 'training_search') {
                        localStorage.setItem('TrainingData', JSON.stringify(response.data));
                        $rootScope.$broadcast('reloadtraining');
                    }
                    else
                    {
                        localStorage.setItem('TrainingData', JSON.stringify(response.data));
                        $state.go('training_search');
                    }






                }
                else if (localStorage.getItem('status') == '3')
                {
                    if (vm.getCurrentState == 'event_search') {
                        localStorage.setItem('eventData', JSON.stringify(response.data));
                        $rootScope.$broadcast('reloadevent');
                    }
                    else
                    {
                        localStorage.setItem('eventData', JSON.stringify(response.data));
                        $state.go('event_search');
                    }


                } else if (localStorage.getItem('status') == '4')
                {
//                    localStorage.setItem('alladsData', JSON.stringify(response.data));
//                    $state.go('all_search');
//                    
                    if (vm.getCurrentState == 'all_search') {
                        localStorage.setItem('alladsData', JSON.stringify(response.data));
                        $rootScope.$broadcast('reloadallads');
                    }
                    else
                    {
                        localStorage.setItem('alladsData', JSON.stringify(response.data));
                        $state.go('all_search');
                    }





                }


            })
        }

           
           
           //redirect home page
           vm.redirect = redirect;
           function redirect()
           {
               
               $state.go("main")
               console.log('qwerty')
//               if(vm.getCurrentState == "home")
//               {
//                   $state.go("main")
//               }else
//               {
//                   $state.go("home")
//               }
               
           }





    }
})();
