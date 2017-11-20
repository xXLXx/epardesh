(function() {
    'use strict';
    var controllerId = 'TrainingCtrl';
    angular
            .module('app')
            .controller(controllerId, TrainingCtrl);
    TrainingCtrl.$inject = ['$rootScope', '$scope', '$auth', '$state', '$sessionStorage', '$timeout', 'TrainingServices', 'loginRegiServices'];
    function TrainingCtrl($rootScope, $scope, $auth, $state, $sessionStorage, $timeout, TrainingServices, loginRegiServices) {
        var vm = this;
        vm.getCurrentState = $state.current.name;
        vm.viewContact = false;
        vm.viewContactFun = viewContactFun;
        vm.closeModal = closeModal;
        vm.trainingContactInfoModal = false;
        vm.trainingContactView = trainingContactView;
        vm.alert = false;
        vm.showSending = true;
        vm.hideLoader = false;
        vm.addtofav = addtofav;
        vm.applyFilter = applyFilter;
        vm.trainingDetailFun = trainingDetailFun;
        vm.viewsendemail = viewsendemail;
        vm.trainingSendEmailCon = trainingSendEmailCon;
        vm.trainingSendEmailConlogin = trainingSendEmailConlogin;
        vm.upcomingEvent = '';
        vm.ViewTraining_all = '';
        vm.cnt = 4;
        vm.showError = false;

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


        vm.viewTrainingCon = {
            sender_name: null,
            sender_phone: null,
            training_email: null,
            sender_email: null,
        }
        function viewContactFun(data) {
            console.log(data);
            vm.viewTrainingCon.training_email = data.training_email;
            vm.training_provider = data.training_provider;
            vm.training_phone = data.training_phone;
            vm.viewTrainingCon.user_id = data.user_id;
//            vm.viewEventCon.email = data.email;
            if (localStorage.getItem('user_name')) {
                vm.viewContact = true;
            }
            else {
                vm.trainingContactInfoModal = true;
            }
        }
        function closeModal(status) {
            if (status == 1) {
                vm.viewContact = false;
            }
            else if (status == 2) {
                vm.trainingContactInfoModal = false;
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
                        vm.trainingContactInfoModal = false;
                        vm.type = '';
                        vm.msg = "";
                        vm.viewTrainingCon.sender_name = '';
                        vm.viewTrainingCon.sender_email = '';
                        vm.viewTrainingCon.sender_phone = '';

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

        function trainingDetailFun(id)
        {
            localStorage.setItem('track_training', vm.getCurrentState);
            $state.go('training_detail', {id: id});

        }
        vm.sendEmailObj = {
            sender_name: null,
            sender_email: null,
            message: null,
            receiver_email: null,
            user_id: null
        }

        function viewsendemail(data)
        {
            console.log(data);
            vm.sendEmailObj.receiver_email = data.training_email;
            vm.sendEmailObj.user_id = data.user_id;

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
            "training_id": ""

        }

        function addtofav(data)
        {
            if (localStorage.getItem('user_name')) {
                vm.favObj.training_id = data.id;

                TrainingServices.addtoFavtraining(vm.favObj).success(function(response) {
                    if (response.status == 105)
                    {



                        TrainingServices.ViewTraining(vm.ViewTraining).success(function(response) {
                            if (response.status == 105)
                            {
                                vm.hideLoader = false;
                                console.log('view training');
                                console.log(response);
                                vm.ViewTraining_all = response.data;



                                $scope.filteredTodos = [];
                                $scope.currentPage = 1;
                                $scope.numPerPage = 2;
                                $scope.maxSize = 3;
                                $scope.todos = [];
                                $scope.makeTodos = function() {
                                    for (var i = 0; i < vm.ViewTraining_all.length; i++) {
                                        $scope.todos.push(vm.ViewTraining_all[i]);
                                    }
                                };
                                $scope.makeTodos();

                                $scope.numPages = function() {
                                    return Math.ceil(vm.ViewTraining_all.length / $scope.numPerPage);
                                };

                                $scope.$watch('currentPage + numPerPage', function() {
                                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                                            , end = begin + $scope.numPerPage;

                                    vm.getData = $scope.todos.slice(begin, end);


                                });
                                for (var t = 0; t < vm.ViewTraining_all.length; t++)
            {
                vm.len.push({'limit': 300});
               
            }
                            }
                            else
                            {
                                console.log('failed');
                            }

                        })

                        vm.favpopup = true;
                        console.log('addtofav');
                        console.log(response);
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


        /*********** Apply Filter ****************/


        vm.filterTraining =
                {
                    "training_name": "",
                    "start_date": "",
                    "end_date": "",
                    "user_id": localStorage.getItem('user_id')
                }
        function applyFilter()
        {
            vm.filterTraining.start_date = "";
            vm.filterTraining.end_date = "";
            vm.training_name = $('#training_name').val();
            vm.start_date = $('#start_date').val();
            vm.end_date = $('#end_date').val();
            console.log(vm.start_date);
            console.log(vm.end_date);
            if (!localStorage.getItem('user_id'))
            {
                vm.filterTraining.user_id = "";

            }


            if (vm.start_date != "")
            {
                vm.filterTraining.start_date = vm.start_date;

            }
            if (vm.end_date != "") {
                vm.filterTraining.end_date = vm.end_date;
            }

            if (vm.start_date != "" && vm.end_date != "")
            {
                if (vm.start_date > vm.end_date)
                {
                    vm.showError = true;
                    showError('End Date should be Greater than start date');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }
            }



            vm.filterTraining.training_name = vm.training_name;
            console.log(vm.start_date);
//            console.log(vm.end_date);
            console.log(vm.training_name);
            vm.hideLoader = true;
            TrainingServices.filterTraining(vm.filterTraining).success(function(response) {
                if (response.status == 105)
                {
                    vm.hideLoader = false;
                    console.log('filteree');
                    vm.ViewTraining_all = response.data;


                    //pagination
                    $scope.filteredTodos = [];
                    $scope.currentPage = 1;
                    $scope.numPerPage = 2;
                    $scope.maxSize = 3;
                    $scope.todos = [];
                    $scope.makeTodos = function() {
                        for (var i = 0; i < vm.ViewTraining_all.length; i++) {
                            $scope.todos.push(vm.ViewTraining_all[i]);
                        }
                    };
                    $scope.makeTodos();

                    $scope.numPages = function() {
                        return Math.ceil(vm.ViewTraining_all.length / $scope.numPerPage);
                    };
                    $scope.$watch('currentPage + numPerPage', function() {
                        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                                , end = begin + $scope.numPerPage;

                        vm.getData = $scope.todos.slice(begin, end);


                    });
                    for (var t = 0; t < vm.ViewTraining_all.length; t++)
            {
                vm.len.push({'limit': 300});
               
            }
                }



            })
        }

        /********view top 5 featured Training******/
        vm.getloc =
                {
                    'lattitude': localStorage.getItem('current_lat'),
                    'longitude': localStorage.getItem('current_lon')
                }
        vm.hideLoader = true;
        TrainingServices.topfeaturedTraining(vm.getloc).success(function(response) {
            if (response.status == 105)
            {
                vm.hideLoader = false;
                console.log('topfeatured');
                console.log(response);
                vm.topfeaturedTraining = response.data;
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
                vm.hideLoader = false;
                console.log('View training');
                console.log(response);
                vm.ViewTraining_all = response.data;



                $scope.filteredTodos = [];
                $scope.currentPage = 1;
                $scope.numPerPage = 5;
                $scope.maxSize = 5;
                $scope.todos = [];
                $scope.makeTodos = function() {
                    // $scope.todos = allData.ads;

                    //console.log('dataaa'+$scope.todos);
                    for (var i = 0; i < vm.ViewTraining_all.length; i++) {
                        // $scope.todos.push(allData.ads[i]);
                        $scope.todos.push(vm.ViewTraining_all[i]);
                    }
                };
                $scope.makeTodos();

                $scope.numPages = function() {
                    return Math.ceil(vm.ViewTraining_all.length / $scope.numPerPage);
                };

                $scope.$watch('currentPage + numPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                            , end = begin + $scope.numPerPage;

                    vm.getData = $scope.todos.slice(begin, end);

                });
                for (var t = 0; t < vm.ViewTraining_all.length; t++)
                {
                    vm.len.push({'limit': 300});
                    
                }
            }
            else
            {
                console.log('failed');
            }

        })

        $scope.$on("TrainingData", function(event, data) {
            console.log(data);
            console.log('training broadcast');
            vm.ViewTraining_all = data;
            $scope.filteredTodos = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 2;
            $scope.maxSize = 3;
            $scope.todos = [];
            $scope.makeTodos = function() {
                for (var i = 0; i < vm.ViewTraining_all.length; i++) {
                    $scope.todos.push(vm.ViewTraining_all[i]);
                }
            };
            $scope.makeTodos();

            $scope.numPages = function() {
                return Math.ceil(vm.ViewTraining_all.length / $scope.numPerPage);
            };

            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;

                vm.getData = $scope.todos.slice(begin, end);
                console.log('inside broadcast');
                console.log(vm.getData);

            });
            for (var t = 0; t < vm.ViewTraining_all.length; t++)
            {
                vm.len.push({'limit': 300});
               
            }

        });

        $scope.$on("topfeaturedTraining", function(event, data) {

            vm.hideLoader = false;
            console.log('topfeatured');
            console.log(data);
            vm.topfeaturedTraining = data;


        });





        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('html, body').animate({scrollTop: 0}, 'slow');




    }
})();