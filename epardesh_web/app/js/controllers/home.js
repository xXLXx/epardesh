(function() {
    'use strict';
    var controllerId = 'home';
    angular
            .module('app')
            .controller(controllerId, home);
    home.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'manageadServices', 'loginRegiServices'];
    function home($rootScope, $scope, $state, $timeout, manageadServices, loginRegiServices) {
        $("html, body").animate({scrollTop: 0}, 600);
        var vm = this;
        vm.DataLoader = true;
        vm.showPopularCityIndia = false;
        vm.showPopularCityUSA = false;
        vm.getCurrentState = $state.current.name;
        //vm.cnt = 4;
        vm.cnt1 = '';
        vm.count = count;
        
        var fourVar = 5;
        
        vm.cnt = {
            0: fourVar,
            1: fourVar,
            2: fourVar,
            3: fourVar,
            4: fourVar,
            5: fourVar,
            6: fourVar,
            7: fourVar,
            8: fourVar,
            9: fourVar,
            10: fourVar,
            11: fourVar,
            12: fourVar,
            13: fourVar,
            14: fourVar,
            15: fourVar,
            16: fourVar,
            17: fourVar,
            18: fourVar,
            19: fourVar,
            20: fourVar,
            21: fourVar,
            22: fourVar,
            23: fourVar,
            24: fourVar,
            25: fourVar,
            26: fourVar,
            27: fourVar,
            28: fourVar,
            29: fourVar,
            30: fourVar,
            31: fourVar,
            32: fourVar,
            33: fourVar,
            34: fourVar,
            35: fourVar,
            36: fourVar,
            37: fourVar,
            38: fourVar,
            39: fourVar,
            40: fourVar
        }
        
        vm.showMoreItems = showMoreItems;
        
        function showMoreItems(getIndex){
            vm.cnt[getIndex] = vm.cnt[getIndex] + fourVar;
        }
        
        
        function count(a)
        {
            vm.id = a;
//            alert(a);
//            alert(b);
            vm.cnt1 = a;
            vm.cnt = vm.cnt + 4;
//            $('#pp').css({'height':''});
        }
        $scope.Jobs = function(p) {

//            alert(p);
        }

        vm.adData1 = function() {
            return new array(25);
        }
//        vm.num=15;
//        console.log(vm.num)
//         vm.adData=function(){
//      new Array(15);
//};
        //trackinggg
        vm.track = track;
        function track()
        {
            localStorage.setItem('track', vm.getCurrentState);
        }


        manageadServices.viewtopcategories().success(function(response) {
            console.log(response);
            vm.category1 = [];
            vm.subcategory = [];
            vm.allcategory = [];
//            vm.category = [];

            var len = response.data.length;
            if (response.status == 105) {
                vm.category1 = response.data;
                console.log("response3");
                console.log(vm.category1);
                var len1 = vm.category1.length;
                var q = 0;
                for (q = 0; q < len1; q++)
                {
//                    console.log(vm.category[q]['category_name']);
                    if (vm.category1[q].subcategories.length == 0)
                    {
                        vm.subcategory.push(vm.category1[q]);
                    } else
                    {
                        vm.allcategory.push(vm.category1[q]);
                    }

                }
//                vm.allcategory.concat(vm.subcategory);
                vm.category = vm.allcategory.concat(vm.subcategory);
                console.log("categoryffff");
                console.log(vm.category);
                vm.DataLoader = false;
            }
            else {
                showError(response['message']);
                return false;
            }

        });

        /*========================Search from see all category==============================*/


        vm.globalsearch = {
            status: "",
            keyword: "",
            category_id: "",
            subcategory_id: "",
            lattitude: "",
            longitude: ""

        }
        vm.getCat = getCat;
        function getCat(cat) {
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
                localStorage.setItem('adsData', JSON.stringify(response.data));
                $state.go('ads');
            })

        }

        vm.getSubCat = getsubCat;
        function getsubCat(subcat, cat) {

            vm.globalsearch.status = 1;
            vm.globalsearch.lattitude = localStorage.getItem('current_lat');
            vm.globalsearch.longitude = localStorage.getItem('current_lon');
            vm.globalsearch.category_id = cat;
            vm.globalsearch.subcategory_id = subcat;
//            alert(vm.globalsearch.subcategory_id);
//            alert(vm.globalsearch.category_id);
            localStorage.setItem('Cat_id', cat)
            localStorage.setItem('subcat_id', subcat)
//            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
//            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
            loginRegiServices.globalsearch(vm.globalsearch).success(function(response) {
                console.log(response);
                console.log("fhjkghw")
                localStorage.setItem('adsData', JSON.stringify(response.data));
                $state.go('ads');
            })

        }

        /*======================Get All Promotional Ads Based on Region==============================*/
        vm.prmotionalAd = [];
        if (!localStorage.getItem('promo_region'))
        {
            $.ajax({
                url: '//freegeoip.net/json/',
                type: 'POST',
                async: false,
                dataType: 'jsonp',
                success: function(response) {
                    console.log("location111");
                    console.log(response);

                    if (response.city == "" && response.region_code != "")
                    {
//                vm.current_country = state1 +', '+country1.toUpperCase();
                        vm.current_country = response.region_code;
                        localStorage.setItem('status_promo', '2')
                        localStorage.setItem('promo_region', response.region_name)


                    }
                    else if (response.city == "" && response.region_code == "")
                    {
//                vm.current_country = 'California, '+country1.toUpperCase();
                        vm.current_country = response.country_name.toUpperCase();
                        localStorage.setItem('status_promo', '0')
                        localStorage.setItem('promo_region', vm.current_country)

                    }
                    else if (response.region_code == "" && response.city != "")
                    {
//                vm.current_country = city1 +', '+country1.toUpperCase();
                        vm.current_country = response.city;
                        localStorage.setItem('status_promo', '1')
                        localStorage.setItem('promo_region', vm.current_country)

                    } else
                    {
//               vm.current_country = city1 +', '+country1.toUpperCase();
                        vm.current_country = response.city + ', ' + response.region_code;
                        localStorage.setItem('status_promo', '1')
                        localStorage.setItem('promo_region', response.city)

                    }



//                var data = {
//                    city: response.region_name
////city: "Panchkula"
//                }

                    var data = {
                        promo_region: localStorage.getItem('promo_region'),
                        promo_status: localStorage.getItem('status_promo'),
                        country: localStorage.getItem('country')
                    }
                    console.log(data)
                    console.log('dddddddddd')
                    console.log(localStorage.getItem('promo_region'))
                    console.log(localStorage.getItem('status_promo'))
                    console.log('promo data')
                    manageadServices.getPromotionalAd(data).success(function(response) {
                        console.log("response for promotional ad")
                        console.log(response);
                        var rollingStr;
                        var bannerStr = '';
                        angular.forEach(response.data.promotional_ads, function(value, key) {
                            if (value.image_type == 'Banner' || value.image_type == 'banner') {
                                bannerStr += ' <li><img src="' + value.image_url + '" alt=""></li>';
                                ;

                            }
                            else {
                                vm.prmotionalAd.push(value.image_url);
                            }
                        })
                        if (response.data.nationwide_ads.length > "0")
                        {
                            angular.forEach(response.data.nationwide_ads, function(value, key) {
                                if (value.image_type == 'Banner' || value.image_type == 'banner') {
//                    bannerStr += value.image_url ;
                                    bannerStr += ' <li><img src="' + value.image_url + '" alt=""></li>';

                                }
                                else {
                                    vm.prmotionalAd.push(value.image_url);
                                }
                            })

                        }

                        if (bannerStr == '') {
                            console.log("in banner")
                            //bannerStr = "http://localhost:8888/epardesh-web/web/app/content/img/banner1.jpg";
                            bannerStr += ' <li><img src="app/content/img/banner1.jpg" alt=""></li>';

                        }



                        $('#slider1').html(bannerStr);
                        $("#slider1").responsiveSlides({
                            auto: true,
                            nav: true,
                            speed: 500,
                            namespace: "callbacks",
                        });
//            if (vm.prmotionalAd.length > 0) {
//                var str = ' <div id="jssor_1" style="position: relative; margin: 0 auto; top: 30px; left: 0px; width: 980px; height: 190px; overflow: hidden; visibility: hidden;"><div data-u="loading" style="position: absolute; top: 0px; left: 0px;"><div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div><div style="position: absolute; display: block; background: url(app/content/img/loading.gif) no-repeat center center; top: 0px; left: 0px; width: 100%; height: 100%;"></div></div><div data-u="slides" class="rolling" style="cursor: default; position: relative; top: 0px; left: 0px; width: 980px; height: 140px; overflow: hidden;">';
//                angular.forEach(vm.prmotionalAd, function(value, key) {
//                    str += ' <div class="" style="display: none;"><img height="200" data-u="image" src="' + value + '" /></div>';
//                });
//                str += '<div class="" style="display: none;"><img data-u="image" height="200" src="app/content/img/ad4.png" /></div>';
//                str += '  </div>';
//                str += '  </div>';
//                $('.st-column').html(str);
//            }
//            jssor_1_slider_init();
                    })

                }
            });
        } else
        {
            var data = {
                promo_region: localStorage.getItem('promo_region'),
                promo_status: localStorage.getItem('status_promo'),
                country: localStorage.getItem('country')
            }
            console.log(data)
            console.log(localStorage.getItem('promo_region'))
            console.log(localStorage.getItem('status_promo'))
            console.log('promo data')
            manageadServices.getPromotionalAd(data).success(function(response) {
                console.log("response for promotional ad")
                console.log(response);
                var rollingStr;
                var bannerStr = '';
                vm.banner = [];
                angular.forEach(response.data.promotional_ads, function(value, key) {
                    if (value.image_type == 'Banner' || value.image_type == 'banner') {
                        bannerStr += ' <li><img src="' + value.image_url + '" alt=""></li>';
                        ;
                        vm.banner.push(value.image_url);
                    }
                    else {
                        vm.prmotionalAd.push(value.image_url);
                    }
                })
                if (response.data.nationwide_ads.length > "0")
                {
                    angular.forEach(response.data.nationwide_ads, function(value, key) {
                        if (value.image_type == 'Banner' || value.image_type == 'banner') {
//                    bannerStr += value.image_url ;
                            bannerStr += ' <li><img src="' + value.image_url + '" alt=""></li>';
                            vm.banner.push(value.image_url);
                        }
                        else {
                            vm.prmotionalAd.push(value.image_url);
                        }
                    })

                }

                if (bannerStr == '') {
                    console.log("in banner")
                    //bannerStr = "http://localhost:8888/epardesh-web/web/app/content/img/banner1.jpg";
                    bannerStr += ' <li><img src="app/content/img/banner1.jpg" alt=""></li>';
                    vm.banner.push('app/content/img/banner1.jpg');
                }

                console.log('banner check');
                console.log(vm.banner)
                $('#slider1').html(bannerStr);
                $("#slider1").responsiveSlides({
                    auto: true,
                    nav: true,
                    speed: 500,
                    namespace: "callbacks",
                });
//            if (vm.prmotionalAd.length > 0) {
//                var str = ' <div id="jssor_1" style="position: relative; margin: 0 auto; top: 30px; left: 0px; width: 980px; height: 190px; overflow: hidden; visibility: hidden;"><div data-u="loading" style="position: absolute; top: 0px; left: 0px;"><div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div><div style="position: absolute; display: block; background: url(app/content/img/loading.gif) no-repeat center center; top: 0px; left: 0px; width: 100%; height: 100%;"></div></div><div data-u="slides" class="rolling" style="cursor: default; position: relative; top: 0px; left: 0px; width: 980px; height: 140px; overflow: hidden;">';
//                angular.forEach(vm.prmotionalAd, function(value, key) {
//                    str += ' <div class="" style="display: none;"><img height="200" data-u="image" src="' + value + '" /></div>';
//                });
//                str += '<div class="" style="display: none;"><img data-u="image" height="200" src="app/content/img/ad4.png" /></div>';
//                str += '  </div>';
//                str += '  </div>';
//                $('.st-column').html(str);
//            }
//            jssor_1_slider_init();
            })

        }



        vm.searchFromPopulor = searchFromPopulor;
        function searchFromPopulor(state, city) {
            vm.searchObj = {};
            vm.searchObj.state = state;
            vm.searchObj.city = city


            if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.category_id) {
                vm.searchObj.status = 9;
            }
            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
                vm.searchObj.status = 11;
            }
            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword) {
                vm.searchObj.status = 7;
            }

            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.category_id) {
                vm.searchObj.status = 8;
            }
            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
                vm.searchObj.status = 10;
            }
            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.category_id) {
                vm.searchObj.status = 4;
            }
            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.sub_category_id) {
                vm.searchObj.status = 5;
            }
            else if (vm.searchObj.state && vm.searchObj.category_id) {
                vm.searchObj.status = 2;
            }
            else if (vm.searchObj.state && vm.searchObj.sub_category_id) {
                vm.searchObj.status = 3;
            }

            else if (vm.searchObj.state && vm.searchObj.city) {
                vm.searchObj.status = 1;
            }
            else if (vm.searchObj.state && vm.searchObj.keyword) {
                vm.searchObj.status = 6;
            }
            else if (vm.searchObj.state) {
                vm.searchObj.status = 0;
            }
            else {
                vm.searchObj.state = "Delhi";
                vm.searchObj.status = 0;
            }

            localStorage.setItem('adsData', JSON.stringify(vm.searchObj));
            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
            loginRegiServices.searchAds(vm.searchObj).success(function(response) {
                console.log(response);
                console.log("fhjkghw")
                localStorage.setItem('adsData', JSON.stringify(response.data));
                $state.go('ads');
            })
        }



        /*==========================Get TOp 15 Featured Ads================================*/

//        vm.topObj={
//            state:vm.searchObj.state 
//        }
//           manageadServices.getFeaturedAd(vm.topObj).success(function(response) {
//                console.log(response);
//                console.log("see above for response")
//                vm.adData=response.data.ads;
//               var a=vm.adData.length;
//               console.log(a);
//               var check=15-a;
//               for(var t=1;t<=check;t++)
//               {
//                   vm.adData.push({"ad_info":{"ad_tittle":"Demo"},"image_info":[{"image_path":"app/content/img/houston.png","image_type":"demo"}]});
//               }
//               console.log(vm.adData);
//            })

        /*====Featured adsss====*/
        $.ajax({
            url: '//freegeoip.net/json/',
            type: 'POST',
            async: false,
            dataType: 'jsonp',
            success: function(response) {
                console.log("lat");
                console.log(response);

                var featured = {
                    'lat': localStorage.getItem('current_lat'),
                    'long': localStorage.getItem('current_lon')

                }
                console.log("ggg" + featured.lat);
                manageadServices.featuredtrend(featured).success(function(response) {
                    console.log(response);
                    console.log("featured trends ads")
                    vm.adData = response.data.featured_ads.ads;
                    var a = vm.adData.length;
                    console.log('images array');
                    console.log(vm.adData);
                    console.log(a);

                    for (var ft = 0; ft < a; ft++)
                    {
                        if (vm.adData[ft].image_info[0] == '')
                        {
                            vm.adData[ft].image_info[0].push({"image_path": "app/content/img/dummy.jpg", "image_type": "demo1"})
                        }
                        if (vm.adData[ft].image_info[0][0].image_type == 'relevant')
                        {

                            vm.adData[ft].image_info[0].push({"image_path": "app/content/img/dummy.jpg", "image_type": "demo2"})
                        }
                    }



                    var check = 15 - a;
                    for (var t = 1; t <= check; t++)
                    {
                        vm.adData.push({"ad_info": {"ad_tittle": "Demo"}, "image_info": [[{"image_path": "app/content/img/dummy.jpg", "image_type": "demo"}]]});
                    }
                    console.log(vm.adData);
                    vm.trendads = response.data.trending_ads.ads;
                    var b = vm.trendads.length;
                    console.log("treee" + b);
                    console.log(vm.trendads);
                    for (var ck = 0; ck < b; ck++)
                    {
                        if (vm.trendads[ck].image_info[0] == '')
                        {
                            vm.trendads[ck].image_info[0].push({"image_path": "app/content/img/dummy.jpg", "image_type": "demo"})
                        }
                        if (vm.trendads[ck].image_info[0][0].image_type == 'relevant')
                        {

                            vm.trendads[ck].image_info[0].push({"image_path": "app/content/img/dummy.jpg", "image_type": "demo2"})
                        }



                    }
                    if (b >= 20)
                    {
                        
                        
                        
                        vm.trend = vm.trendads;
                        var str = '';
                        for (var i = 0; i < vm.trend.length; i++) {
                            str += '<div class="item" >' +
                                    '<div class="product-item">' +
                                    '<div class="carousel-thumb">' +
                                    '<img style = "height:160px;"src="' + vm.trend[i].image_info[0][0].image_path + '" alt=""> ' +
                                    '<div class="overlay">' +
                                    '<a onclick=\'angular.element(this).scope().trendAdFun("' + vm.trend[i].ad_info.id + '")\'><i class="fa fa-link"></i></a>' +
                                    '</div> ' +
                                    '</div>' +
                                    '<a onclick=\'angular.element(this).scope().trendAdFun("' + vm.trend[i].ad_info.id + '")\' style="word-wrap: break-word;" class="item-name">' + vm.trend[i].ad_info.ad_tittle + '</a>  ' +
                                    '<span class="price">$' + vm.trend[i].ad_info.ad_price + '</span>  ' +
                                    '</div>' +
                                    '</div>';
                        }
                        console.log('carousel item length');
                        console.log(vm.trend.length);
                        $("#new-products").html(str);
                        $("#new-products").owlCarousel({
                            navigation: true,
                            pagination: true,
                            slideSpeed: 1000,
                            stopOnHover: true,
                            autoPlay: true,
                            items: 5,
                            itemsDesktopSmall: [1024, 3],
                            itemsTablet: [600, 1],
                            itemsMobile: [479, 1]
                        });

                        $('#new-products').find('.owl-prev').html('<i class="fa fa-angle-left"></i>');
                        $('#new-products').find('.owl-next').html('<i class="fa fa-angle-right"></i>');


                    }
                    else
                    {
                        vm.trend = '';
                    }
                    console.log(vm.trendads);
                    console.log('after trendddingg');


                })


            }
        });

        /*=====================Get Fixed Category=============================*/
//        vm.allCategoryImgArr = ['trainning-icon.png', 'event-icon.png', 'jobs-icon.png', 'roommate-icon.png', 'rental-icon.png', 'travelindia-icon.png', 'daycare-icon.png', 'service-icon.png', 'auto-icon.png', 'more-icon.png'];

        vm.allCategoryImgArr = ['img-1.png', 'img-2.png', 'img-3.png', 'img-4.png', 'img-5.png', 'img-6.png', 'img-7.png', 'img-8.png', 'img-9.png', 'img-10.png', 'img-11.png', 'img-12'];



        loginRegiServices.getCat().success(function(response) {
            console.log("chk response for category")
            console.log(response);
            vm.allCat = response.data;

        })
        vm.searchByFixCat = searchByFixCat;
        function searchByFixCat(catId) {
//            alert(catId);
            vm.searchObj = {};
            vm.searchObj.category_id = catId;
            vm.searchObj.sub_category_id = null;
            if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.category_id) {
                vm.searchObj.status = 9;
            }
            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
                vm.searchObj.status = 11;
            }
            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.keyword) {
                vm.searchObj.status = 7;
            }

            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.category_id) {
                vm.searchObj.status = 8;
            }
            else if (vm.searchObj.state && vm.searchObj.keyword && vm.searchObj.sub_category_id) {
                vm.searchObj.status = 10;
            }
            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.category_id) {
                vm.searchObj.status = 4;
            }
            else if (vm.searchObj.state && vm.searchObj.city && vm.searchObj.sub_category_id) {
                vm.searchObj.status = 5;
            }
            else if (vm.searchObj.state && vm.searchObj.category_id) {
                vm.searchObj.status = 2;
            }
            else if (vm.searchObj.state && vm.searchObj.sub_category_id) {
                vm.searchObj.status = 3;
            }

            else if (vm.searchObj.state && vm.searchObj.city) {
                vm.searchObj.status = 1;
            }
            else if (vm.searchObj.state && vm.searchObj.keyword) {
                vm.searchObj.status = 6;
            }
            else if (vm.searchObj.state) {
                vm.searchObj.status = 0;
            }
            else {
                vm.searchObj.state = "Delhi";
                vm.searchObj.status = 0;
            }

            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
            loginRegiServices.searchAds(vm.searchObj).success(function(response) {
                console.log(response);
                localStorage.setItem('adsData', JSON.stringify(response.data));
                if (vm.getCurrentState == 'ads') {
                    $rootScope.$broadcast('reloadState');
                }
                else {
                    $state.go('ads');
                }
            })
        }

        /*===pop up ====*/

        $('#open_pop').click(function() {
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
//	        $(id).css('display','block');
            //transition effect
            $(id).fadeIn(2000);

//	//if close button is clicked
            $('.window .close').click(function(e) {
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







        });




        /*====end pop up====*/
        $scope.$on("featured_ads", function(event, data) {
            console.log(data);
            console.log('fffffffffff');
            vm.adData = data;


        });
        $scope.$on("trend_ads", function(event, data) {
            console.log(data);
            console.log('retet');
            vm.trend = data;


        });
        if (localStorage.getItem('country') == '1')
        {
//            alert('1');
            vm.showPopularCityIndia = true;
            vm.showPopularCityUSA = false;
        } else if (localStorage.getItem('country') == '2')
        {
//            alert('2');
            vm.showPopularCityIndia = false;
            vm.showPopularCityUSA = true;

        }
//         $scope.$on("cloc", function(event, data) {
//            console.log(data);
//            console.log('cloc');
//           if(data=='1')
//        {
//            alert('1');
//        vm.showPopularCityIndia = true;
//        vm.showPopularCityUSA = false;
//        }else if(data=='2')
//        {
//            alert('2');
//            vm.showPopularCityIndia = false;
//        vm.showPopularCityUSA = true;
//            
//        }
//           
//            
//        });


// view promoce on page load
        loginRegiServices.viewpromocode().success(function(response) {
            if (response.status == 105)
            {
                console.log(response);
                console.log("promocode")
                vm.promoData = response.data;
            }



        })

        $scope.trendAdFun = function(id)
        { 
            console.log('QWERTY');
            $state.go('ad_details', {"id": id})
           
        }




        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }




})();