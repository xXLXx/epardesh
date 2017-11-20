(function() {
    'use strict';
    var controllerId = 'adCtrl';
    angular
            .module('app')
            .controller(controllerId, adCtrl);
    adCtrl.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'adDataServices', 'loginRegiServices', 'manageadServices'];
    function adCtrl($rootScope, $scope, $state, $timeout, adDataServices, loginRegiServices, manageadServices) {
        $("html, body").animate({scrollTop: 0}, 600);
        
        var vm = this;
        vm.alert = false;
        vm.adDetailFun = adDetailFun;
        vm.totalPagesArr = [];
        vm.getCurrentState = $state.current.name;
        vm.showMore = showMore;
        vm.showPagination = false;
        vm.hideLoader = false;
        vm.viewContact = false;
//        vm.favpopup = false
        vm.addContactInfoModal = false;
        vm.closeModal = closeModal;
        vm.viewContactFun = viewContactFun;
        vm.showSending = true;
        var allData = JSON.parse(localStorage.getItem('adsData'));
        console.log(allData);
        console.log("below")
        vm.getData = allData;
//        alert(vm.getData);
        vm.hideLoader = false;
        vm.adContactView = adContactView;
        vm.viewsendemail = viewsendemail;
        vm.eventSendEmailCon = eventSendEmailCon;
        vm.eventSendEmailConlogin = eventSendEmailConlogin;
        //console.log(vm.getData);
        $scope.$on("reloadState", function(event) {
            $state.reload();
        });

        vm.viewContactObj = {
            name: null,
            email: null,
            phone: null,
            business_id: null,
            ad_id: null
        }
//show more
        vm.showmore = showmore;
        function showmore(len, index)
        {
            vm.len[index] = {'limit': len};
            // vm.showcount =5000;
        }
        vm.showless = showless;
        function showless(index)
        {
            vm.len[index] = {'limit': 300};
            // vm.showcount =10;
        }
        vm.len = [];
        for (var t = 0; t < allData.ads.ad.length; t++)
        {
            vm.len.push({'limit': 300});
            console.log(t)
        }


        //trackk
//        vm.track = track;
//        function track()
//        {
//            localStorage.setItem('track', vm.getCurrentState);
//        }

        function viewContactFun(data) {
            console.log(data);
            vm.viewContactObj.business_id = data.ad_info.user_id;
            vm.viewContactObj.ad_id = 'EPCA' + data.ad_info.id;
            vm.name = data.ad_info.business_name;
            vm.phone = data.ad_info.phone;
            vm.email = data.ad_info.email;
            if (localStorage.getItem('user_name')) {
                vm.viewContactObj.name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.viewContactObj.email = localStorage.getItem('email');
                vm.viewContactObj.phone = localStorage.getItem('phone');

                adDataServices.contactBusiness(vm.viewContactObj).success(function(response) {
                    console.log(response)
                    vm.showSending = true;
                    if (response.status == 105) {

                        vm.viewContact = true;
                    }
                    else {
                        vm.type = 'danger';
                        vm.msg = "Oops! something went wrong."
                        $timeout(function() {
                            vm.alert = false;
                        }, 1500);
                    }
                })



                vm.viewContact = true;
            }
            else {
                vm.addContactInfoModal = true;
            }
        }
        function closeModal(status) {


            if (status == 1) {
                vm.viewContact = false;
            }
            else if (status == 2) {
                vm.addContactInfoModal = false;
                vm.type = '';
                vm.msg = ""
                vm.viewContactObj.name = '';
                vm.viewContactObj.email = '';
                vm.viewContactObj.phone = '';
            }
            else if (status == 3)
            {
                vm.eventSendEmail = false;
                vm.sendEmailObj.sender_name = '';
                vm.sendEmailObj.sender_email = '';
                vm.sendEmailObj.sender_phone = '';
                vm.sendEmailObj.message = '';
            } else if (status == 4)
            {
                vm.eventSendEmaillogin = false;
                vm.sendEmailObj.message = '';
            }




        }

        vm.totalPages = Math.ceil(allData.count / 2);
        for (var i = 1; i <= vm.totalPages; i++) {
            if (vm.totalPages > 1) {
                vm.showPagination = true;
            }
            vm.totalPagesArr.push(i);
        }

        function showMore(index) {
//            vm.hideLoader = true;
            var pos = index + 1;
            var data = JSON.parse(localStorage.getItem('searchData'));
            data.count = index * 2;
            loginRegiServices.searchAds(data).success(function(response) {
                console.log(response);
                console.log('sfsfsd');
                vm.getData = response.data.ad;
                vm.hideLoader = false;
                $('.pages').removeClass('showActive');
                $('.page-' + pos).addClass('showActive');
            })
        }

        function adDetailFun(id) {
            var data = {
                ad_id: id
            }
            adDataServices.updateAdCount(data).success(function(response) {
                console.log(response)
                localStorage.setItem('track', vm.getCurrentState)
                $state.go('ad_details', {id: id})
            })
        }

        function adContactView() {
            vm.showSending = false;
            var phone = vm.viewContactObj.phone;
            if (ifBlank("Mobile No.", phone) == false)
                return false;
            phone = phone.replace(/^1(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
            if (phone.length === 10) {
                console.log("in if phone")
            }
            else {
                vm.showSending = true;
                console.log("in else phone")
                showError('Phone number should be 10 digit number');
                $timeout(function() {
                }, 1000);
                return false;
            }
            adDataServices.contactBusiness(vm.viewContactObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type = 'success';
                    vm.msg = "View contact info sent successfully."
                    $timeout(function() {
                        vm.alert = false;
                        vm.addContactInfoModal = false;

                        vm.viewContact = true;

                    }, 1500);
                }
                else {
                    vm.type = 'danger';
                    vm.msg = "Oops! something went wrong."
                    $timeout(function() {
                        vm.alert = false;
                    }, 1500);
                }
            })
        }


        //pagination

        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 5;
        $scope.maxSize = 3;
        $scope.todos = [];
        $scope.makeTodos = function() {
            // $scope.todos = allData.ads;

            //console.log('dataaa'+$scope.todos);
            for (i = 0; i < allData.ads.ad.length; i++) {
                // $scope.todos.push(allData.ads[i]);
                $scope.todos.push(allData.ads.ad[i]);
            }
        };
        $scope.makeTodos();

        $scope.numPages = function() {
            return Math.ceil(allData.ads.ad.length / $scope.numPerPage);
        };

        $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

            vm.getData = $scope.todos.slice(begin, end);

//     console.log('check'+$scope.filteredTodos);
        });



// ********** top category*******
        //vm.cnt = 4;

        /*====================================================
         * Code for Top Categories
         * ==================================================*/
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

        function showMoreItems(getIndex) {
            vm.cnt[getIndex] = vm.cnt[getIndex] + fourVar;
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
        /*====================================================
         * End of Code for Top Categories
         * ==================================================*/

        vm.cnt1 = '';
        vm.count = count;
        function count(a)
        {
            vm.id = a;

            vm.cnt1 = a;
            vm.cnt = vm.cnt + 4;

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
                if (vm.getCurrentState == 'ads')
                {
                    $state.reload();
                } else
                {
                    $state.go('ads');
                }
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

//            localStorage.setItem('searchData', JSON.stringify(vm.searchObj));
//            $rootScope.$broadcast('searchDataFromHome', vm.searchObj);
            loginRegiServices.globalsearch(vm.globalsearch).success(function(response) {
                console.log(response);
                console.log("fhjkghw")
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

        /****** Add to Favourite ********/
        vm.addtofav = addtofav;
        vm.favObj = {
            "access_token": localStorage.getItem('a_token'),
            "user_id": localStorage.getItem('user_id'),
            "ad_id": ""

        }

        function addtofav(data, index)
        {
            if (localStorage.getItem('user_name')) {
                console.log(data)
                vm.favObj.ad_id = data.ad_info.id;

                adDataServices.addtoFavAds(vm.favObj).success(function(response) {
                    if (response.status == 105)
                    {


                        var adsData = JSON.parse(localStorage.getItem('adsData'));
                        adsData.ads.ad[index].ad_info.favourite_status = 1;
                        localStorage.setItem('adsData', JSON.stringify(adsData));
                        $state.reload();
                        console.log(adsData);
                        console.log('ads dataaaaaaa');


//                         $('#addtfav_ad').modal({backdrop: 'static', keyboard: false});
//                      $('#addtfav_ad').modal('show');
                        vm.favpopup = true;
                        console.log('addtofav');
                        console.log(response);
//                        $('.ad_fav').html('added');
                        $timeout(function() {
//                            $('#addtfav_ad').modal('hide');
//                             $('body').removeClass('modal-open');
//            $('.modal-backdrop').remove();
                            vm.favpopup = false;
                        }, 2000);

                    }
                    else
                    {
                        console.log('failed');
                    }

                })

            }
            else {
                $state.go('login');
            }

        }

        $("#range").slider({
            range: "min",
            min: 0,
            max: 365,
            value: 0,
            slide: function(e, ui) {
                return $(".ui-slider-handle").html(ui.value);
            }
        });


        $(".ui-slider-handle").html("0");


        $scope.price = {price_min: '', price_max: ''};
        $scope.distance = {value_min: '', value_max: ''};


        //set price
        vm.priceArray = [];
        for (i = 0; i < allData.ads.ad.length; i++) {
            vm.priceArray.push(allData.ads.ad[i].ad_info.ad_price);
        }
        console.log(vm.priceArray)
        console.log('see price')
        console.log(vm.priceArray.length)
        if (vm.priceArray.length == 0)
        {
            $scope.price.price_min = 0 // 4   
            $scope.price.price_max = 0 // 4
        }
        else
        {
            $scope.price.price_min = Math.min.apply(Math, vm.priceArray); // 4   
            $scope.price.price_max = Math.max.apply(Math, vm.priceArray); // 4


        }
        if ($scope.price.price_min == $scope.price.price_max)
        {
            $('.range .min').attr('disabled', 'disabled');
            $('.range .max').attr('disabled', 'disabled');
        }



        // default the user's values to the available range
        $scope.userMinPrice = $scope.price.price_min;
        $scope.userMaxPrice = $scope.price.price_max;

        vm.filterData =
                {
                    'min_price': '',
                    'max_price': '',
                    'posted_within_day': '',
                    'title': '',
                    'has_image': 0,
                    'latitude': localStorage.getItem('current_lat'),
                    'longitude': localStorage.getItem('current_lon'),
                    'min_miles': '',
                    'max_miles': '',
                    'user_id': localStorage.getItem('user_id'),
                    'category_id': '',
                    'sub_category_id': ''

                }
        vm.filter = filter;
        function filter()
        {

            vm.filterData.min_price = $scope.userMinPrice;
            vm.filterData.max_price = $scope.userMaxPrice;
            vm.filterData.min_miles = $scope.distance.value_min;
            vm.filterData.max_miles = $scope.distance.value_max;
            vm.posted_within_day = $(".ui-slider-handle").html();
            if (vm.posted_within_day == 0)
            {
                console.log('indside day')
                vm.filterData.posted_within_day = "";
            } else
            {

                vm.filterData.posted_within_day = vm.posted_within_day;
            }
            if ($('.check').is(':checked')) {
                console.log('fffffff');

                vm.filterData.has_image = 1;
            }
            else
            {
                vm.filterData.has_image = 0;

            }
            if (!localStorage.getItem('user_id'))
            {
                vm.filterData.user_id = "";
            }

            if ($scope.ad_title == undefined || $scope.ad_title == "undefined")
            {
                vm.filterData.title = "";
            }
            else
            {
                vm.filterData.title = $scope.ad_title;

            }
            if (localStorage.getItem('Cat_id'))
            {
                vm.filterData.category_id = localStorage.getItem('Cat_id')
            }
            if (localStorage.getItem('subcat_id'))
            {
                vm.filterData.sub_category_id = localStorage.getItem('subcat_id')
            }


            console.log(vm.filterData)
            console.log('inside filter func')
            adDataServices.filterData(vm.filterData).success(function(response)
            {
                if (response.status == "105")
                {
//                    vm.getData = response;


                    $scope.filteredTodos = [];
                    $scope.currentPage = 1;
                    $scope.numPerPage = 5;
                    $scope.maxSize = 3;
                    $scope.todos = [];
                    $scope.makeTodos = function() {
                        // $scope.todos = allData.ads;

                        //console.log('dataaa'+$scope.todos);
                        for (i = 0; i < response.data.length; i++) {
                            // $scope.todos.push(allData.ads[i]);
                            $scope.todos.push(response.data[i]);
                        }
                    };
                    $scope.makeTodos();

                    $scope.numPages = function() {
                        return Math.ceil(response.data.length / $scope.numPerPage);
                    };

                    $scope.$watch('currentPage + numPerPage', function() {
                        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                                , end = begin + $scope.numPerPage;

                        vm.getData = $scope.todos.slice(begin, end);

//     console.log('check'+$scope.filteredTodos);
                    });


                    console.log(response)
                    console.log('filtered data')


                }

            })


        }


        manageadServices.viewtopfeatured().success(function(response) {
//            console.log(response);    
            var len = response.data.length;
            if (response.status == 105) {
                vm.topfeaturedAd = response.data.ads;
                console.log("topfeaturedAds");
                console.log(response);
            }
            else {
                showError(response['message']);
                return false;
            }

        });


        vm.Byprice = Byprice;
        function Byprice()
        {
            console.log(vm.sortByprice);
            console.log(vm.getData);

            if (vm.sortByprice == 'low to high') {
                vm.getData.sort(function(a, b) {
                    return a.ad_info.ad_price - b.ad_info.ad_price;
                });
            } else if (vm.sortByprice == 'high to low') {
                vm.getData.sort(function(a, b) {
                    return b.ad_info.ad_price - a.ad_info.ad_price;
                });
            }



        }
        vm.Bydate = Bydate;
        function Bydate()
        {
            console.log(vm.sortBydate);
            console.log(vm.getData);

            if (vm.sortBydate == 'low to high') {
                vm.getData.sort(function(a, b) {
                    return new Date(a.ad_info.date_posted) - new Date(b.ad_info.date_posted);
                });
            } else if (vm.sortBydate == 'high to low') {
                vm.getData.sort(function(a, b) {
                    return new Date(b.ad_info.date_posted) - new Date(a.ad_info.date_posted);
                });
            }

        }
        vm.Bydistance = Bydistance;
        function Bydistance()
        {
            console.log(vm.sortBydistance);
            console.log(vm.getData);

            if (vm.sortBydistance == 'low to high') {
                vm.getData.sort(function(a, b) {
                    return parseFloat(a.ad_info.distance) - parseFloat(b.ad_info.distance);
                });
            } else if (vm.sortBydistance == 'high to low') {
                vm.getData.sort(function(a, b) {
                    return parseFloat(b.ad_info.distance) - parseFloat(a.ad_info.distance);
                });
            }

        }
        //send email

        vm.sendEmailObj = {
            sender_name: null,
            sender_email: null,
            message: null,
            sender_phone: null,
            receiver_email: null,
            ad_id: null
        }

        function viewsendemail(data)
        {
            console.log(data);
            vm.sendEmailObj.receiver_email = data.ad_info.email;
            vm.sendEmailObj.ad_id = 'EPCA' + data.ad_info.id;
            vm.sendEmailObj.sender_email = localStorage.getItem('email');
            if (localStorage.getItem('user_name')) {
                vm.sendEmailObj.sender_name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.sendEmailObj.sender_phone = localStorage.getItem('phone');
                vm.eventSendEmaillogin = true;
            }
            else {

                vm.eventSendEmail = true;
            }
        }

        function eventSendEmailCon() {
            vm.showSending = false;

            adDataServices.sendEmail(vm.sendEmailObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type_email = 'success';
                    vm.msg_email = "Email sent successfully."
                    $timeout(function() {
                        vm.alert_email = false;
                        vm.eventSendEmail = false;
                        vm.sendEmailObj.sender_name = '';
                        vm.sendEmailObj.sender_email = '';
                        vm.sendEmailObj.message = '';
                        vm.type_email = '';
                        vm.msg_email = ""


                    }, 1500);
                }
                else {
                    vm.type_email = 'danger';
                    vm.msg_email = "Oops! something went wrong."
                    $timeout(function() {
                        vm.alert_email = false;
                    }, 1500);
                }
            })

        }
        function eventSendEmailConlogin()
        {
            vm.showSending = false;
            adDataServices.sendEmail(vm.sendEmailObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type_email_login = 'success';
                    vm.msg_email_login = "Email sent successfully."

                    $timeout(function() {
                        vm.alert_email_login = false;
                        vm.eventSendEmaillogin = false;
                        vm.type_email_login = '';
                        vm.msg_email_login = "";
                        vm.sendEmailObj.message = '';

                    }, 1500);
                }
                else {
                    vm.type_email_login = 'danger';
                    vm.msg_email_login = "Oops! something went wrong."
                    $timeout(function() {
                        vm.alert_email_login = false;
                    }, 1500);
                }
            })

        }




        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

    }


})();