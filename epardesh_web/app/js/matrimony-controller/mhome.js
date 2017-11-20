(function() {
    'use strict';
    var controllerId = 'mhome';
    angular
            .module('app')
            .controller(controllerId, mhome);
    mhome.$inject = ['$rootScope', '$scope', '$auth', '$state', '$stateParams', '$location', '$timeout', 'mLoginRegiServices'];
    function mhome($rootScope, $scope, $auth, $state, $stateParams, $location, $timeout, mLoginRegiServices) {
        $("html, body").animate({scrollTop: 0}, 600);
        var vm = this;
//        if(!localStorage.getItem('m_user_token')) {
//            $state.go('mlogin');
//            return false;
//        }
        vm.p_com = localStorage.getItem('p_completed');
        //console.log('profile completed : ' + localStorage.getItem('p_completed'));
        $scope.pcom1 = vm.p_com;
        // vm.p_com;
       /* vm.myprofileFun = myprofileFun;
        function myprofileFun() {
            alert('yes working');
            $('#SMSModal').modal('toggle');
            $state.go('matrimony_profile');
        }*/

        $("#c_pro").click(function() {
            $('#SMSModal').modal('hide');
            $timeout(function () {
                $state.go('matrimony_profile', {'check':1});
            }, 1000);
            
        });

        if (localStorage.getItem('m_user_id')) {
            vm.userId = localStorage.getItem('m_user_id');
        }
        else {
            vm.userId = '';
        }
        vm.p_com = localStorage.getItem('p_completed');
        var str2 = '';
        if ( vm.p_com <= 60 && localStorage.getItem('first_login') == 1) {
            localStorage.setItem('first_login', 2);
            $('#SMSModal').modal({backdrop: 'static', keyboard: false});
            $('.p_com').html(vm.p_com);
           if(vm.p_com == 40) {
               $('#getm1').show();
               $('#getm2').hide();
               $('#getm3').hide();
           } else if(vm.p_com == 50) {
               $('#getm1').hide();
               $('#getm2').show();
               $('#getm3').hide();
           } else if(vm.p_com == 60) {
               $('#getm1').hide();
               $('#getm2').hide();
               $('#getm3').show();
           } else {
               $('#getm1').show();
               $('#getm2').hide();
               $('#getm3').hide();
           }
            $('#SMSModal').modal('show');
        }



        /*=========================View Suggested Profiles===============================*/
        function viewTopProfile() {

            mLoginRegiServices.topPaidProfile({}).success(function(response) {
                console.log("response for topPaidProfile")
                console.log(response);
                // return false;
                if (response.status == 105) {
                    console.log("in 105 ")
                    vm.row = response.data;
                    var lenn = vm.row.length;
                    var str = "";
                    if (lenn > 0) {
                        
                        if(localStorage.getItem('m_user_token'))
                        {
                           for (var i = 0; i < lenn; i++) {
                            var count = parseInt(i) + 1;
                            str += '<div class="slide">';
                            str += '<a  onclick=\'angular.element(this).scope().ViewFun("'+vm.row[i].id+'","'+vm.row[i].email+'","'+vm.row[i].mobile+'")\'>';
                            if (vm.row[i].profile_picture == "" || vm.row[i].profile_picture == null || vm.row[i].profile_picture === null) {
                                str += '<img src="http://placehold.it/350x150&text=FooBar' + count + '">';
                            }
                            else {
                                str += '<img src="' + vm.row[i].profile_picture + '">';
                            }
                            str += '<div class="each_profile_desc">';
                            str += '<p class="epm-name">' + vm.row[i].first_name + " " + vm.row[i].last_name + '</p>';
                            str += '<p class="col-md-6 col-sm-12 col-xs-12 epm-profile">' + vm.row[i].profile_id + '</p>';
                            str += '<p class="col-md-6 col-sm-12 col-xs-12 epm-location">' + vm.row[i].country + '</p>';
                            str += '</div>';
                            str += '</a>';
                            str += '</div>';
                        }  
                        }
                        else
                        {
                            for (var i = 0; i < lenn; i++) {
                            var count = parseInt(i) + 1;
                            str += '<div class="slide">';
                            str += '<a  onclick=\'angular.element(this).scope().ViewFun("'+vm.row[i].id+'","'+vm.row[i].email+'","'+vm.row[i].mobile+'")\'>';
                            if (vm.row[i].profile_picture == "" || vm.row[i].profile_picture == null || vm.row[i].profile_picture === null) {
                                str += '<img style="filter: blur(5px);" src="http://placehold.it/350x150&text=FooBar' + count + '">';
                            }
                            else {
                                str += '<img style="filter: blur(5px);" src="' + vm.row[i].profile_picture + '">';
                            }
                            str += '<div class="each_profile_desc">';
                            str += '<p class="epm-name">' + vm.row[i].first_name + " " + vm.row[i].last_name + '</p>';
                            str += '<p class="col-md-6 col-sm-12 col-xs-12 epm-profile">' + vm.row[i].profile_id + '</p>';
                            str += '<p class="col-md-6 col-sm-12 col-xs-12 epm-location">' + vm.row[i].country + '</p>';
                            str += '</div>';
                            str += '</a>';
                            str += '</div>';
                        } 
                            
                        }
                        
                        
                        
                       
                        $('.slider2').html(str);
                        $('.slider2').bxSlider({
                            slideWidth: 225,
                            minSlides: 5,
                            maxSlides: 5,
                            slideMargin: 10,
                            speed: 500,
                            auto: true,
                            infiniteLoop: true,
                            hideControlOnEnd: true
                        });
                    }
                    else {
                        $('.slider2').html("No Data Found!");
                    }

                } else {
                    alert(response['message']);
                    return false;
                }
            });
        }
        viewTopProfile();
        $('body').removeClass('modal-open');
$('.modal-backdrop').remove();


   $scope.ViewFun = function(id,email,mob)
   {
       
       if (localStorage.getItem('m_user_id')) {
           localStorage.setItem('Viewfromhome','1');
           localStorage.setItem('Viewfromhome_id',id);
           localStorage.setItem('Viewfromhome_email',email);
           localStorage.setItem('Viewfromhome_mob',mob);
           $state.go('matrimony_profile');
            console.log('dddddddd')
        }
        else {
           $state.go("mlogin")
        }
   }


    }
})();