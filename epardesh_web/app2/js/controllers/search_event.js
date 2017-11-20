(function() {
    'use strict';
    var controllerId = 'SearchEventsCtrl';
    angular
            .module('app')
            .controller(controllerId, SearchEventsCtrl);
    SearchEventsCtrl.$inject = ['$scope', '$auth', '$state', '$sessionStorage', '$timeout', 'EventServices', 'loginRegiServices'];
    function SearchEventsCtrl($scope, $auth, $state, $sessionStorage, $timeout, EventServices, loginRegiServices) {
        var vm = this;
        vm.getCurrentState = $state.current.name;
        vm.viewContact = false;
        vm.viewContactFun = viewContactFun;
        vm.closeModal = closeModal;
        vm.eventContactInfoModal = false;
        vm.eventContactView = eventContactView;
        vm.alert = false;
        vm.showSending = true;
        vm.hideLoader = false;
        vm.addtofav = addtofav;
        vm.cnt = 4;
        vm.eventDetailFun = eventDetailFun;
        vm.viewsendemail = viewsendemail;
        vm.eventSendEmailCon = eventSendEmailCon;
        vm.eventSendEmailConlogin = eventSendEmailConlogin;
        var searchData = JSON.parse(localStorage.getItem('eventData'));
        console.log('data');
        console.log(searchData);
        vm.upcomingEvent = '';
        $scope.$on("reloadevent", function(event) {
            $state.reload();
        });
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
        vm.viewEventCon = {
            name: null,
            phone: null,
            email: null,
            user_id: null,
        }
        function viewContactFun(data) {
            console.log(data);
            vm.viewEventCon.user_id = data.id;
            vm.organisor = data.organisor;
            vm.event_phone = data.event_phone;
            vm.email = data.email;
            if (localStorage.getItem('user_name')) {
                vm.viewContact = true;
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
            sender_phone: null

        }

        function viewsendemail(data)
        {
            console.log(data);
            vm.sendEmailObj.user_id = data.user_id;
            vm.sendEmailObj.event_tittle = data.event_tittle;

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
        vm.favObj = {
            "access_token": localStorage.getItem('a_token'),
            "user_id": localStorage.getItem('user_id'),
            "event_id": ""

        }

        function addtofav(data, index)
        {
            console.log(index);
            if (localStorage.getItem('user_name')) {
                vm.favObj.event_id = data.id;

                EventServices.addtoFavEvent(vm.favObj).success(function(response) {
                    if (response.status == 105)
                    {
                        var eventdata = JSON.parse(localStorage.getItem('eventData'));
                        eventdata.events[index].favourite_status = 1;
                        localStorage.setItem('eventData', JSON.stringify(eventdata));
                        $state.reload();
                        console.log(eventdata);
                        console.log('event dataaaaaaa');





//               EventServices.upcomingEvent(vm.upEvent).success(function(response) {
//            if (response.status == 105)
//            {
//                vm.hideLoader = false;
//                console.log('upcoming event');
//                console.log(response);
//                vm.upcomingEvent = response.data;
//
//
//
//                $scope.filteredTodos = [];
//                $scope.currentPage = 1;
//                $scope.numPerPage = 2;
//                $scope.maxSize = 3;
//                $scope.todos = [];
//                $scope.makeTodos = function() {
//                    // $scope.todos = allData.ads;
//
//                    //console.log('dataaa'+$scope.todos);
//                    for (var i = 0; i < vm.upcomingEvent.length; i++) {
//                        // $scope.todos.push(allData.ads[i]);
//                        $scope.todos.push(vm.upcomingEvent[i]);
//                    }
//                };
//                $scope.makeTodos();
//
//                $scope.numPages = function() {
//                    return Math.ceil(vm.upcomingEvent.length / $scope.numPerPage);
//                };
//
//                $scope.$watch('currentPage + numPerPage', function() {
//                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
//                            , end = begin + $scope.numPerPage;
//
//                    vm.getData = $scope.todos.slice(begin, end);
//                   
//
//                });
//
//
//
//
//            }
//            else
//            {
//                console.log('failed');
//            }
//
//        })


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
            vm.len.push({'limit': 300});

        }


        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('html, body').animate({scrollTop: 0}, 'slow');



    }
})();