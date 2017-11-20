(function() {
    'use strict';
    var controllerId = 'SearchAllCtrl';
    angular
            .module('app')
            .controller(controllerId, SearchAllCtrl);
    SearchAllCtrl.$inject = ['$scope', '$auth', '$state', '$sessionStorage', '$timeout', 'EventServices', 'adDataServices', 'TrainingServices', 'loginRegiServices', 'manageadServices'];
    function SearchAllCtrl($scope, $auth, $state, $sessionStorage, $timeout, EventServices, adDataServices, TrainingServices, loginRegiServices, manageadServices) {
        $("html, body").animate({scrollTop: 0}, 600);
        var vm = this;
        vm.getCurrentState = $state.current.name;
        vm.viewContact = false;
        vm.viewContactFun = viewContactFun;
        vm.closeModal = closeModal;
        vm.eventContactInfoModal = false;
        vm.eventContactView = eventContactView;
        vm.alert = false;
        //vm.cnt=4;

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

        vm.showSending = true;
        vm.hideLoader = false;
        vm.addtofavEvent = addtofavEvent;
        vm.eventDetailFun = eventDetailFun;
        vm.viewsendemail = viewsendemail;
        vm.eventSendEmailCon = eventSendEmailCon;
        vm.eventSendEmailConlogin = eventSendEmailConlogin;
        var searchData = JSON.parse(localStorage.getItem('alladsData'));
        console.log('data');
        console.log(searchData);
        vm.upcomingEvent = '';
        $scope.$on("reloadallads", function(event) {
            $state.reload();
        });

        //show more for ad
        vm.showmore_ad = showmore_ad;
        function showmore_ad(len, index)
        {
            vm.len_ad[index] = {'limit': len};
            // vm.showcount =5000;
        }
        vm.showless_ad = showless_ad;
        function showless_ad(index)
        {
            vm.len_ad[index] = {'limit': 300};
            // vm.showcount =10;
        }
        vm.len_ad = [];

        //show more for event
        vm.showmore_event = showmore_event;
        function showmore_event(len, index)
        {
            vm.len_event[index] = {'limit': len};
            // vm.showcount =5000;
        }
        vm.showless_event = showless_event;
        function showless_event(index)
        {
            vm.len_event[index] = {'limit': 300};
            // vm.showcount =10;
        }
        vm.len_event = [];

        //show more for ad
        vm.showmore_training = showmore_training;
        function showmore_training(len, index)
        {
            vm.len_training[index] = {'limit': len};
            // vm.showcount =5000;
        }
        vm.showless_training = showless_training;
        function showless_training(index)
        {
            vm.len_training[index] = {'limit': 300};
            // vm.showcount =10;
        }
        vm.len_training = [];



        /*******EVent view *******/
        vm.viewEventCon = {
            name: null,
            phone: null,
            email: null,
            user_id: null,
            event_id: null
        }
        function viewContactFun(data) {
            console.log(data);
            vm.viewEventCon.user_id = data.user_id;
            vm.viewEventCon.event_id = 'EPCE' + data.id;
            vm.organisor = data.organisor;
            vm.event_phone = data.event_phone;
//            vm.viewEventCon.email = data.email;
            if (localStorage.getItem('user_name')) {

                vm.viewEventCon.name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.viewEventCon.phone = localStorage.getItem('phone');
                vm.viewEventCon.email = localStorage.getItem('email');
                EventServices.contactEvent(vm.viewEventCon).success(function(response) {
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





            }
            else {
                vm.eventContactInfoModal = true;
            }
        }
        function closeModal(status) {
            if (status == 1) {
                vm.viewContact = false;
            }
            else if (status == 2) {
                vm.eventContactInfoModal = false;
                vm.type = '';
                vm.msg = ""
                vm.viewEventCon.name = '';
                vm.viewEventCon.email = '';
                vm.viewEventCon.phone = '';
            }
            else if (status == 3)
            {
                vm.eventSendEmail = false;
                vm.sendEmailObj.sender_name = '';
                vm.sendEmailObj.sender_email = '';
                vm.sendEmailObj.message = '';
            } else if (status == 4)
            {
                vm.eventSendEmaillogin = false;
                vm.sendEmailObj.message = '';
            }
        }

        function eventContactView() {
            vm.showSending = false;
            var phone = vm.viewEventCon.phone;
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
            EventServices.contactEvent(vm.viewEventCon).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type = 'success';
                    vm.msg = "View contact info sent successfully."
                    $timeout(function() {
                        vm.alert = false;
                        vm.eventContactInfoModal = false;
                        vm.type = '';
                        vm.msg = "";
                        vm.viewEventCon.name = '';
                        vm.viewEventCon.email = '';
                        vm.viewEventCon.phone = '';

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

        function eventDetailFun(id)
        {
            localStorage.setItem('track_event', vm.getCurrentState);
            $state.go('event_details', {id: id});

        }
        vm.sendEmailObj = {
            sender_name: null,
            sender_email: null,
            message: null,
            user_id: null,
            event_tittle: null,
            sender_phone: null,
            event_id: null
        }

        function viewsendemail(data)
        {
            console.log(data);
            vm.sendEmailObj.user_id = data.user_id;
            vm.sendEmailObj.event_tittle = data.event_tittle;
            vm.sendEmailObj.event_id = 'EPCE' + data.id;

            if (localStorage.getItem('user_name')) {
                vm.sendEmailObj.sender_name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.sendEmailObj.sender_email = localStorage.getItem('email');
                vm.sendEmailObj.sender_phone = localStorage.getItem('phone');
                vm.eventSendEmaillogin = true;
            }
            else {

                vm.eventSendEmail = true;
            }
        }


        function eventSendEmailCon() {
            vm.showSending = false;

            EventServices.sendEmail(vm.sendEmailObj).success(function(response) {
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
            EventServices.sendEmail(vm.sendEmailObj).success(function(response) {
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





        /*===pop up ====*/
        $scope.$on("ViewAllCat", function(event, data) {
            console.log('all cat');
            console.log(data);
            vm.category = data;
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
            console.log('dddd')
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













        /****** Add to Favourite ********/
        vm.favObjEvent = {
            "access_token": localStorage.getItem('a_token'),
            "user_id": localStorage.getItem('user_id'),
            "event_id": ""

        }

        function addtofavEvent(data, index)
        {
            console.log(index);
            if (localStorage.getItem('user_name')) {
                vm.favObjEvent.event_id = data.id;

                EventServices.addtoFavEvent(vm.favObjEvent).success(function(response) {
                    if (response.status == 105)
                    {
                        var eventdata = JSON.parse(localStorage.getItem('alladsData'));
                        eventdata.events[index].favourite_status = 1;
                        localStorage.setItem('alladsData', JSON.stringify(eventdata));
                        $state.reload();
                        console.log(eventdata);
                        console.log('event dataaaaaaa');

                        vm.favpopup = true;
                        console.log('addtofav');
                        console.log(response);
//                        $('.ad_fav').html('added');
                        $timeout(function() {
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


        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 2;
        $scope.maxSize = 3;
        $scope.todos = [];
        $scope.makeTodos = function() {
            // $scope.todos = allData.ads;

            //console.log('dataaa'+$scope.todos);
            for (var i = 0; i < searchData.events.length; i++) {
                // $scope.todos.push(allData.ads[i]);
                $scope.todos.push(searchData.events[i]);
            }
        };
        $scope.makeTodos();

        $scope.numPages = function() {
            return Math.ceil(searchData.events.length / $scope.numPerPage);
        };

        $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

            vm.getData = $scope.todos.slice(begin, end);


        });
        for (var t = 0; t < searchData.events.length; t++)
        {
            vm.len_event.push({'limit': 300});

        }





        /******* ADs view **********/
        vm.viewAdContact = false;
        vm.addContactInfoModal_ad = false;
        vm.adDetailFun = adDetailFun;
        vm.ad_closeModal = ad_closeModal;
        vm.adviewContactFun = adviewContactFun;
        vm.AdContactView = AdContactView;
        vm.addtofavAd = addtofavAd;
        function adDetailFun(id)
        {
            console.log(id)

            localStorage.setItem('track', vm.getCurrentState);
            $state.go('ad_details', {id: id});


        }
        function ad_closeModal(status)
        {
            if (status == 1) {
                vm.viewAdContact = false;
            }
            else {
                vm.addContactInfoModal_ad = false;
            }
        }






        vm.viewAdCon = {
            name: null,
            email: null,
            phone: null,
            business_id: null,
            ad_id: null
        }

        function adviewContactFun(data) {
            console.log(data);
            vm.viewAdCon.business_id = data.ad_info.user_id;
            vm.viewAdCon.ad_id = 'EPCA' + data.ad_info.id;
            vm.ad_name = data.ad_info.business_name;
            vm.ad_phone = data.ad_info.phone;
            vm.ad_email = data.ad_info.email;
            if (localStorage.getItem('user_name')) {

                vm.viewAdCon.name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.viewAdCon.email = localStorage.getItem('email');
                vm.viewAdCon.phone = localStorage.getItem('phone');


                adDataServices.contactBusiness(vm.viewAdCon).success(function(response) {
                    vm.showSending = true;
                    if (response.status == 105) {
                        vm.viewAdContact = true;

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
            else {
                vm.addContactInfoModal_ad = true;
            }
        }


        function AdContactView() {
            vm.showSending = false;
            var phone = vm.viewAdCon.phone;
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
//            EventServices.contactBusiness(vm.viewEventCon).success(function(response) {
            adDataServices.contactBusiness(vm.viewAdCon).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type = 'success';
                    vm.msg = "View contact info sent successfully."
                    $timeout(function() {
                        vm.alert = false;

                        vm.type = '';
                        vm.msg = "";
                        vm.viewAdCon.name = '';
                        vm.viewAdCon.email = '';
                        vm.viewAdCon.phone = '';
                        vm.addContactInfoModal_ad = false;
                        vm.viewAdContact = true;

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

        //send email
        //send email

        vm.AdsendEmailObj = {
            sender_name: null,
            sender_email: null,
            message: null,
            sender_phone: null,
            receiver_email: null,
            ad_id: null
        }
        vm.Adviewsendemail = Adviewsendemail;
        vm.AdSendEmailCon = AdSendEmailCon;
        vm.AdSendEmailConlogin = AdSendEmailConlogin;

        function Adviewsendemail(data)
        {
            console.log(data);
            vm.AdsendEmailObj.receiver_email = data.ad_info.email;
            vm.AdsendEmailObj.ad_id = 'EPCA' + data.ad_info.id;
            vm.AdsendEmailObj.sender_email = localStorage.getItem('email');
            if (localStorage.getItem('user_name')) {
                vm.AdsendEmailObj.sender_name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.AdsendEmailObj.sender_phone = localStorage.getItem('phone');
                vm.AdSendEmaillogin = true;
            }
            else {

                vm.AdSendEmail = true;
            }
        }

        function AdSendEmailCon() {
            vm.showSending = false;

            adDataServices.sendEmail(vm.AdsendEmailObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type_email = 'success';
                    vm.msg_email = "Email sent successfully."
                    $timeout(function() {
                        vm.alert_email = false;
                        vm.AdSendEmail = false;
                        vm.AdsendEmailObj.sender_name = '';
                        vm.AdsendEmailObj.sender_email = '';
                        vm.AdsendEmailObj.message = '';
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
        function AdSendEmailConlogin()
        {
            vm.showSending = false;
            adDataServices.sendEmail(vm.AdsendEmailObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type_email_login = 'success';
                    vm.msg_email_login = "Email sent successfully."

                    $timeout(function() {
                        vm.alert_email_login = false;
                        vm.AdSendEmaillogin = false;
                        vm.type_email_login = '';
                        vm.msg_email_login = "";
                        vm.AdsendEmailObj.message = '';

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










        /****** Add to Favourite ********/
        vm.favObjAd = {
            "access_token": localStorage.getItem('a_token'),
            "user_id": localStorage.getItem('user_id'),
            "ad_id": ""

        }

        function addtofavAd(data, index)
        {
            console.log(index);
            console.log(data)
            if (localStorage.getItem('user_name')) {
                vm.favObjAd.ad_id = data.ad_info.id;

                adDataServices.addtoFavAds(vm.favObjAd).success(function(response) {
                    if (response.status == 105)
                    {
                        var eventdata = JSON.parse(localStorage.getItem('alladsData'));
                        eventdata.ads.ad[index].ad_info.favourite_status = 1;
                        localStorage.setItem('alladsData', JSON.stringify(eventdata));
                        $state.reload();
                        console.log(eventdata);
                        console.log('event dataaaaaaa');

                        vm.favpopupAd = true;
                        console.log('addtofav');
                        console.log(response);
//                        $('.ad_fav').html('added');
                        $timeout(function() {
                            vm.favpopupAd = false;
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














        $scope.filteredTodos = [];
        $scope.currentPage_ads = 1;
        $scope.numPerPage_ads = 5;
        $scope.maxSize_ads = 5;
        $scope.todos_ads = [];
        $scope.makeTodos_ads = function() {
            // $scope.todos = allData.ads;

            //console.log('dataaa'+$scope.todos);
            for (var i = 0; i < searchData.ads.ad.length; i++) {
                // $scope.todos.push(allData.ads[i]);
                $scope.todos_ads.push(searchData.ads.ad[i]);
            }
        };
        $scope.makeTodos_ads();

        $scope.numPages_ads = function() {
            return Math.ceil(searchData.ads.ad.length / $scope.numPerPage_ads);
        };

        $scope.$watch('currentPage_ads + numPerPage_ads', function() {
            var begin = (($scope.currentPage_ads - 1) * $scope.numPerPage_ads)
                    , end = begin + $scope.numPerPage_ads;

            vm.getData_ads = $scope.todos_ads.slice(begin, end);


        });
        for (var t = 0; t < searchData.ads.ad.length; t++)
        {
            vm.len_ad.push({'limit': 300});

        }

        /****** end view ads ******/

        /******* view It training ads*********/
        vm.trainingDetailFun = trainingDetailFun;
        vm.viewContactFunTraining = viewContactFunTraining;
        vm.trainingContactView = trainingContactView;
        vm.closeModalTraining = closeModalTraining;
        vm.viewsendemailTraining = viewsendemailTraining;
        vm.trainingSendEmailCon = trainingSendEmailCon;
        vm.trainingSendEmailConlogin = trainingSendEmailConlogin;
        vm.addtofavtraining = addtofavtraining;
        function trainingDetailFun(id)
        {
            localStorage.setItem('track_training', vm.getCurrentState);
            $state.go('training_detail', {id: id});

        }



        //popup
        vm.viewTrainingCon = {
            sender_name: null,
            sender_phone: null,
            training_email: null,
            sender_email: null,
            user_id: "",
            training_id: null
        }
        function viewContactFunTraining(data) {
            console.log(data);
            vm.viewTrainingCon.training_email = data.training_email;
            vm.viewTrainingCon.training_id = 'EPCT' + data.id;
            vm.training_provider = data.training_provider;
            vm.training_phone = data.training_phone;
            vm.viewTrainingCon.user_id = data.user_id;
            vm.Training_email = data.training_email;
            if (localStorage.getItem('user_name')) {
                vm.viewTrainingCon.sender_name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.viewTrainingCon.sender_phone = localStorage.getItem('phone');
                vm.viewTrainingCon.sender_email = localStorage.getItem('email');


                TrainingServices.contactTraining(vm.viewTrainingCon).success(function(response) {
                    console.log(response)
                    vm.showSending = true;
                    if (response.status == 105) {
                        vm.viewContactTraining = true;
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
            else {
                vm.trainingContactInfoModalTraining = true;
            }
        }
        function closeModalTraining(status) {
            if (status == 1) {
                vm.viewContactTraining = false;
            }
            else if (status == 2) {
                vm.trainingContactInfoModalTraining = false;
                vm.type = '';
                vm.msg = ""
                vm.viewTrainingCon.name = '';
                vm.viewTrainingCon.email = '';
                vm.viewTrainingCon.phone = '';
            }
            else if (status == 3)
            {
                vm.trainingSendEmail = false;
                vm.sendEmailObj.sender_name = '';
                vm.sendEmailObj.sender_email = '';
                vm.sendEmailObj.message = '';
            } else if (status == 4)
            {
                vm.trainingSendEmaillogin = false;
                vm.sendEmailObj.message = '';
            }
        }

        function trainingContactView() {
            vm.showSending = false;
            var phone = vm.viewTrainingCon.sender_phone;
            if (ifBlank("Mobile No.", phone) == false)
                return false;
            phone = phone.replace(/^(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
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
            TrainingServices.contactTraining(vm.viewTrainingCon).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type = 'success';
                    vm.msg = "View contact info sent successfully."
                    $timeout(function() {
                        vm.alert = false;
                        vm.trainingContactInfoModalTraining = false;
                        vm.type = '';
                        vm.msg = "";
                        vm.viewTrainingCon.sender_name = '';
                        vm.viewTrainingCon.sender_email = '';
                        vm.viewTrainingCon.sender_phone = '';

                        vm.viewContactTraining = true;

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




        function viewsendemailTraining(data)
        {
            vm.sendEmailObj = {
                sender_name: null,
                sender_email: null,
                message: null,
                receiver_email: null,
                user_id: null,
                sender_phone: null,
                training_id: null

            }
            console.log(data);
            vm.sendEmailObj.receiver_email = data.training_email;
            vm.sendEmailObj.user_id = data.user_id;
            vm.sendEmailObj.training_id = 'EPCT' + data.id;

            if (localStorage.getItem('user_name')) {
                vm.sendEmailObj.sender_name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.sendEmailObj.sender_email = localStorage.getItem('email');

                vm.trainingSendEmaillogin = true;
            }
            else {

                vm.trainingSendEmail = true;
            }
        }


        function trainingSendEmailCon() {
            vm.showSending = false;

            TrainingServices.sendEmail(vm.sendEmailObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type_email = 'success';
                    vm.msg_email = "Email sent successfully."
                    $timeout(function() {
                        vm.alert_email = false;
                        vm.trainingSendEmail = false;
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
        function trainingSendEmailConlogin()
        {
            vm.showSending = false;
            TrainingServices.sendEmail(vm.sendEmailObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {

                    vm.type_email_login = 'success';
                    vm.msg_email_login = "Email sent successfully."

                    $timeout(function() {
                        vm.alert_email_login = false;
                        vm.trainingSendEmaillogin = false;
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


        //end poipup

        /****** Add to Favourite ********/
        vm.favObjTraining = {
            "access_token": localStorage.getItem('a_token'),
            "user_id": localStorage.getItem('user_id'),
            "training_id": ""

        }

        function addtofavtraining(data, index)
        {
            console.log(index);
            if (localStorage.getItem('user_name')) {
                vm.favObjTraining.training_id = data.id;

                TrainingServices.addtoFavtraining(vm.favObjTraining).success(function(response) {
                    if (response.status == 105)
                    {
                        var trainingdata = JSON.parse(localStorage.getItem('alladsData'));
                        trainingdata.trainings[index].favourite_status = 1;
                        localStorage.setItem('alladsData', JSON.stringify(trainingdata));
                        $state.reload();
                        console.log(trainingdata);
                        console.log('training dataaaaaaa');






                        vm.favpopupTraining = true;

                        console.log('addtofav');
                        console.log(response);
//                        $('.ad_fav').html('added');
                        $timeout(function() {
                            vm.favpopupTraining = false;
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


        $scope.filteredTodos = [];
        $scope.currentPage_it = 1;
        $scope.numPerPage_it = 5;
        $scope.maxSize_it = 5;
        $scope.todos_it = [];
        $scope.makeTodos_it = function() {
            // $scope.todos = allData.ads;

            //console.log('dataaa'+$scope.todos);
            for (var i = 0; i < searchData.trainings.length; i++) {
                // $scope.todos.push(allData.ads[i]);
                $scope.todos_it.push(searchData.trainings[i]);
            }
        };
        $scope.makeTodos_it();

        $scope.numPages_it = function() {
            return Math.ceil(searchData.trainings.length / $scope.numPerPage_ads);
        };

        $scope.$watch('currentPage_it + numPerPage_it', function() {
            var begin = (($scope.currentPage_it - 1) * $scope.numPerPage_it)
                    , end = begin + $scope.numPerPage_it;

            vm.getData_it = $scope.todos_it.slice(begin, end);


        });
        for (var t = 0; t < searchData.trainings.length; t++)
        {
            vm.len_training.push({'limit': 300});

        }


        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('html, body').animate({scrollTop: 0}, 'slow');







    }
})();