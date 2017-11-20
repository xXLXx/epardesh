(function() {
    'use strict';
    var controllerId = 'TrainingDetailsCtrl';
    angular
            .module('app')
            .controller(controllerId, TrainingDetailsCtrl);
    TrainingDetailsCtrl.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'TrainingServices', '$stateParams', 'adDataServices', 'loginRegiServices', 'manageadServices'];
    function TrainingDetailsCtrl($rootScope, $scope, $state, $timeout, TrainingServices, $stateParams, adDataServices, loginRegiServices, manageadServices) {
        $("html, body").animate({scrollTop: 0}, 600);
        var vm = this;
        vm.viewContact = false;
        vm.addContactInfoModal = false;
        vm.closeModal = closeModal;
        vm.closeimg = closeimg;
        vm.viewContactFun = viewContactFun;
        vm.adContactView = adContactView;
        vm.viewsendemail = viewsendemail;
        vm.trainingSendEmailCon = trainingSendEmailCon;
        vm.trainingSendEmailConlogin = trainingSendEmailConlogin;
        vm.showSending = true;
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
        
        var data = {
            training_id: $stateParams.id,
            user_id: ''
        }
        if (localStorage.getItem('user_id'))
        {
            data.user_id = localStorage.getItem('user_id');
        } else
        {
            data.user_id = '';
        }
        /***event detail *******/
        vm.hideLoader = true;
        TrainingServices.traininginfo(data).success(function(response) {
            if (response.status == 105)
            {
                vm.hideLoader = false;
                console.log(response);

                //***timezone
                var dt = response.data.ad_details;
                //start date
                var d = new Date(dt[0].training_start_date);
                var localTime = d.getTime();
                var localOffset = d.getTimezoneOffset() * 60000;
                var utc = localTime;
                var st = utc + (localOffset);
                var nd = new Date(st);
                response.data.ad_details[0].training_start_date = nd;
                //end date                   
                var de = new Date(dt[0].training_end_date);
                var localTime_end = de.getTime();
                var localOffset_end = de.getTimezoneOffset() * 60000;
                var utc_end = localTime_end;
                var end = utc_end + (localOffset_end);
                var nd_end = new Date(end);
                response.data.ad_details[0].training_end_date = nd_end;
                //*****end timezone

                if (response.data.other_ads.length > 0)
                {
                    var dtw = response.data.other_ads;
                    //start date
                    var d1 = new Date(dtw[0].training_start_date);
                    var localTime1 = d1.getTime();
                    var localOffset1 = d1.getTimezoneOffset() * 60000;
                    var utc1 = localTime1;
                    var st1 = utc1 + (localOffset1);
                    var nd1 = new Date(st1);
                    response.data.other_ads[0].training_start_date = nd1;
                    //end date                   
                    var de2 = new Date(dtw[0].training_end_date);
                    var localTime_end2 = de2.getTime();
                    var localOffset_end2 = de2.getTimezoneOffset() * 60000;
                    var utc_end2 = localTime_end2;
                    var end2 = utc_end2 + (localOffset_end2);
                    var nd_end2 = new Date(end2);
                    response.data.other_ads[0].training_end_date = nd_end2;
                    //*****end timezone

                }




                console.log('fddsfdsfgdf');
                console.log(response.data);




                vm.getData = response.data.ad_details[0];
                vm.otherAd = response.data.other_ads;
                console.log('traininig detail above');
                console.log(vm.getData);


                //pagination
                $scope.filteredTodos = [];
                $scope.currentPage = 1;
                $scope.numPerPage = 2;
                $scope.maxSize = 3;
                $scope.todos = [];
                $scope.makeTodos = function() {
                    for (var i = 0; i < vm.otherAd.length; i++) {
                        $scope.todos.push(vm.otherAd[i]);
                    }
                };
                $scope.makeTodos();

                $scope.numPages = function() {
                    return Math.ceil(vm.otherAd.length / $scope.numPerPage);
                };
                $scope.$watch('currentPage + numPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                            , end = begin + $scope.numPerPage;

                    vm.otherAds = $scope.todos.slice(begin, end);


                });





            }


        })


        vm.checktrack = checktrack;
        function checktrack()
        {
            //alert('sgdgfg');
            var ch = localStorage.getItem('track_training');
            $state.go(ch);

        }

        function closeimg()
        {
            $('#myModal').hide();

        }


        vm.viewContactObj = {
            sender_name: null,
            training_email: null,
            sender_phone: null,
            sender_email: null,
            user_id: "",
            training_id:null
        }
        function viewContactFun(data) {
            console.log(data);
            vm.viewContactObj.training_email = data.training_email;
            vm.viewContactObj.training_id = 'EPCT'+data.id;
            vm.training_provider = data.training_provider;
            vm.training_phone = data.training_phone;
            vm.email = data.training_email;
            vm.viewContactObj.user_id = data.user_id;
            console.log(vm.viewContactObj)
            if (localStorage.getItem('user_name')) {
                vm.training_phon = data.training_phone;
                vm.provider = data.training_provider;
                vm.training_email = data.training_email;
                
                vm.viewContactObj.sender_name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.viewContactObj.sender_phone = localStorage.getItem('phone');
                vm.viewContactObj.sender_email = localStorage.getItem('email');

                TrainingServices.contactTraining(vm.viewContactObj).success(function(response) {

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
                vm.viewContactObj.sender_name = '';
                vm.viewContactObj.sender_email = '';
                vm.viewContactObj.sender_phone = '';

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

        function adContactView() {
            vm.showSending = false;
            TrainingServices.contactTraining(vm.viewContactObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {
                    vm.training_phon = vm.training_phone;
                    vm.provider = vm.training_provider;
                    vm.training_email = vm.email;
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


        /*========================Search from see all category==============================*/

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


        /****** Add to Favourite ********/
        vm.favObj = {
            "access_token": localStorage.getItem('a_token'),
            "user_id": localStorage.getItem('user_id'),
            "training_id": ""

        }
        vm.addtofav = addtofav;
        function addtofav(data)
        {
            if (localStorage.getItem('user_name')) {
                vm.favObj.training_id = data.id;

                TrainingServices.addtoFavtraining(vm.favObj).success(function(response) {
                    if (response.status == 105)
                    {

                        data.favourite_status = '1';
                        vm.getData = data;
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

        //send email
        vm.sendEmailObj = {
            sender_name: null,
            sender_email: null,
            message: null,
            receiver_email: null,
            user_id: null,
            sender_phone: null,
            training_id:null
        }

        function viewsendemail(data)
        {
            console.log(data);
            vm.sendEmailObj.receiver_email = data.training_email;
            vm.sendEmailObj.user_id = data.user_id;
            vm.sendEmailObj.training_id = 'EPCT'+data.id;

            if (localStorage.getItem('user_name')) {
                vm.sendEmailObj.sender_name = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_l_name');
                vm.sendEmailObj.sender_email = localStorage.getItem('email');
                vm.sendEmailObj.sender_phone = localStorage.getItem('phone');
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
                        vm.sendEmailObj.sender_phone = '';
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



        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();






    }

})();