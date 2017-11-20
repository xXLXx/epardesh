(function() {
    'use strict';
    var controllerId = 'adDetailsCtrl';
    angular
            .module('app')
            .controller(controllerId, adDetailsCtrl);
    adDetailsCtrl.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'adDataServices', '$stateParams', 'loginRegiServices', 'manageadServices'];
    function adDetailsCtrl($rootScope, $scope, $state, $timeout, adDataServices, $stateParams, loginRegiServices, manageadServices) {
        $("html, body").animate({scrollTop: 0}, 600);
        var vm = this;
        vm.viewContact = false;
        vm.addContactInfoModal = false;
        vm.closeModal = closeModal;
        vm.closeimg = closeimg;
        vm.viewContactFun = viewContactFun;
        vm.adContactView = adContactView;
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
            ad_id: $stateParams.id,
                    user_id:''
        }
        if (localStorage.getItem('user_id'))
        {
            data.user_id = localStorage.getItem('user_id');
        } else
        {
            data.user_id = '';
        }

//check tracking
        vm.checktrack = checktrack;
        function checktrack()
        {
            //alert('sgdgfg');
            var ch = localStorage.getItem('track');
            $state.go(ch);
//          if(ch==1)
//          {
//              $state.go('home')
//              localStorage.removeItem('track');
//          }
//          else
//          {
//              $state.go('ads');
//          }
        }
//end page  tracking
        function closeimg()
        {
            $('#myModal').hide();

        }
        adDataServices.viewParticularAd(data).success(function(response) {
            console.log("adDeatisl")
            console.log(response)
            vm.getData = response.data[0];
            var len = vm.getData.image_info.length;
            var str = '';

            for (var i = 0; i < len; i++) {
                if (i == 0) {
                    str += '<li>';
                    str += '<a>';
                    str += '<img class="etalage_thumb_image" src="' + vm.getData.image_info[i][0].image_path + '" class="img-responsive" />';
                    str += '<img class="etalage_source_image" src="' + vm.getData.image_info[i][0].image_path + '"  class="img-responsive" title="" />';
                    str += '</a>';
                    str += ' </li>';
                }
                else {
                    str += '<li>';
                    str += '<img class="etalage_thumb_image" src="' + vm.getData.image_info[i][0].image_path + '" class="img-responsive" />';
                    str += '<img class="etalage_source_image" src="' + vm.getData.image_info[i][0].image_path + '"  class="img-responsive" title="" />';
                    str += ' </li>';
                }
            }
            // data-ui-sref="ad_details"
            //   $('#etalage').html(str)
//            $('#etalage').etalage({
//                thumb_image_width: 300,
//                thumb_image_height: 400,
//                source_image_width: 900,
//                source_image_height: 1200,
//                show_hint: true,
//                click_callback: function(image_anchor, instance_id) {
//                    alert('Callback example:\nYou clicked on an image with the anchor: "' + image_anchor + '"\n(in Etalage instance: "' + instance_id + '")');
//                }
//            });
        })


        var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
        var modalImg = document.getElementById("img01");
        vm.popUpImg = popUpImg;
        function popUpImg(getSrc) {
            modal.style.display = "block";
            modalImg.src = getSrc;
        }

// Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        console.log("span");
        console.log(span);
// When the user clicks on <span> (x), close the modal
        span.onclick = function() {

            console.log("in onclick");
            modal.style.display = "none";
        }

        vm.viewContactObj = {
            name: null,
            email: null,
            phone: null,
            business_id: null,
            ad_id:null
        }
        function viewContactFun(data) {
            console.log(data);
            vm.name = data.ad_info.business_name;
            vm.phone = data.ad_info.phone;
            vm.email = data.ad_info.email;
            
            vm.viewContactObj.business_id = data.ad_info.user_id;
            vm.viewContactObj.ad_id = 'EPCA'+data.ad_info.id;
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

        function adContactView() {
            vm.showSending = false;
            adDataServices.contactBusiness(vm.viewContactObj).success(function(response) {
                console.log(response)
                vm.showSending = true;
                if (response.status == 105) {
                    vm.business_name = vm.name;
                    vm.ad_phone = vm.phone;
                    vm.ad_email = vm.email;
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
        vm.addtofav = addtofav;
        vm.favObj = {
            "access_token": localStorage.getItem('a_token'),
            "user_id": localStorage.getItem('user_id'),
            "ad_id": ""

        }

        function addtofav(data)
        {
            if (localStorage.getItem('user_name')) {
                console.log(data)
                vm.favObj.ad_id = data.ad_info.id;
                adDataServices.addtoFavAds(vm.favObj).success(function(response) {
                    if (response.status == 105)
                    {
                        data.ad_info.favourite_status = '1';
                        vm.getData = data;
                        console.log(vm.getData)
                        vm.favpopup = true;
                        console.log('addtofav');
                        console.log(response);

                        $timeout(function() {
                            vm.favpopup = false;
                            $state.reload()
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
        //send email

        vm.sendEmailObj = {
            sender_name: null,
            sender_email: null,
            message: null,
            sender_phone: null,
            receiver_email: null,
            ad_id : null
        }
        vm.viewsendemail = viewsendemail;
        vm.eventSendEmailCon = eventSendEmailCon;
        vm.eventSendEmailConlogin = eventSendEmailConlogin;

        function viewsendemail(data)
        {
            console.log(data);
            vm.sendEmailObj.receiver_email = data.ad_info.email;
             vm.sendEmailObj.ad_id = 'EPCA'+data.ad_info.id;
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