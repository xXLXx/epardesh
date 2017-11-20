(function() {
    'use strict';
    var controllerId = 'mprofile';
    angular
            .module('app')
            .controller(controllerId, mprofile);
    mprofile.$inject = ['$rootScope', '$scope', '$modal', '$auth', '$state', '$stateParams', '$location', '$timeout', 'mLoginRegiServices', 'mProfileServices', 'editionPayment', 'matrimonypromocode', 'roundProgressService'];
    function mprofile($rootScope, $scope, $modal, $auth, $state, $stateParams, $location, $timeout, mLoginRegiServices, mProfileServices, editionPayment, matrimonypromocode, roundProgressService) {
        $("html, body").animate({scrollTop: 0}, 600);
        var vm = this;
        if (!localStorage.getItem('m_user_token')) {
            $state.go('mlogin');
            return false;
        }
        vm.email = localStorage.getItem('m_user_email');
        vm.myName = localStorage.getItem('m_user_name');
        vm.country = localStorage.getItem('m_country_name');
        vm.changePassword = changePassword;
        vm.valid_year = valid_year;
        vm.doNotMatch = false;
        vm.ifPaidUser = false;
        vm.profileLoader = true;
        vm.closeModal = closeModal;
        vm.manageLoader = false;
        $("html, body").animate({scrollTop: 0});
        vm.report = report;
        vm.send_report = send_report;
        vm.apply = applypromocode;
        vm.promoname = [];
        vm.promodiscount = [];
        vm.couponApplied = false;
        vm.couponText = '';
        vm.upgrade_plan_type = localStorage.getItem('m_user_type');


        /* Progress bar variables */

        $scope.radius = 50;
        $scope.isSemi = false;
        $scope.rounded = false;
        $scope.responsive = false;
        $scope.clockwise = true;
        
        $scope.bgColor = '#eaeaea';
        $scope.duration = 800;
        $scope.currentAnimation = 'easeOutCubic';
        $scope.animationDelay = 0;


        $scope.getStyle = function() {
            var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

            return {
                'top': $scope.isSemi ? 'auto' : '50%',
                'bottom': $scope.isSemi ? '5%' : 'auto',
                'left': '50%',
                'transform': transform,
                '-moz-transform': transform,
                '-webkit-transform': transform,
                'font-size': $scope.radius / 3.5 + 'px'
            };
        };

        $scope.animations = [];

        angular.forEach(roundProgressService.animations, function(value, key) {
            $scope.animations.push(key);
        });

        /* --------------------------------------------- */

        $scope.open = function(indx) {
            console.log('image index');
            console.log(indx);
            $scope.thumbs[indx]['active'] = true;
            console.log('changed or not active');
            console.log($scope.thumbs[indx]);

            $scope.modalInstance = $modal.open({
                animation: true,
                template: '<div class="modal-body">'
                        + '<div class="img-group">'
                        + '<carousel>'
                        + '<slide ng-repeat="thumb in thumbs" active="thumb.active">'
                        + '<img ng-src="{{thumb.image}}" alt="{{thumb.name}}" class="img-responsive pic" />'
                        + '<div class="carousel-caption">{{thumb.name}}</div>'
                        + '</slide>'
                        + '</carousel>'
                        //+ '<button type="button" class="close close-lg" ng-click="ok()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
                        + '</div>'
                        + '</div> '
                        + '<div class="modal-footer">'
                        + '<button class="btn btn-warning" ng-click="ok()">Close</button>'
                        + '</div>',
                scope: $scope

            });
        };


        $scope.ok = function() {
            $scope.modalInstance.close();
        };






        //alert($stateParams.check);
        /*if ($stateParams.check == 1 || $stateParams.check == '1') {
         $('.setting_menu').removeClass('active_setting');
         $('.partner_preferences').hide();
         $('.view_profile').hide();
         $('.manage_ads').hide();
         $('.change_password').hide();
         $('.add_new_ad').hide();
         $('.add_inbox').hide();
         $('.edit_new_ad').hide();
         $('.manage_ads').hide();
         $('.my_profile').addClass('active_setting');
         $('.view_particualr_profile').show();
         }*/
        if (localStorage.getItem('m_user_id')) {
            vm.userId = localStorage.getItem('m_user_id');
        }
        else {
            vm.userId = '';
        }

        if (localStorage.getItem('upornot') == 1) {
            $('.setting_menu').removeClass('active_setting');
            $('.c_membership').addClass('active_setting');
            $('.change_profile').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.edit_new_ad').hide();
            $('.change_password').hide();
            $('.add_inbox').hide();
            $('.partner_preferences').hide();
            $('.view_profile').hide();
            $('.view_particualr_profile').hide();
            $('.edit_new_ad').show()
            localStorage.setItem('upornot', 2);
        }

        /*======================Check user type========================*/
        if (localStorage.getItem('m_user_type')) {
            if (localStorage.getItem('m_user_type') == 'free') {
                vm.ifPaidUser = false;
            } else {
                vm.ifPaidUser = true;
            }
        }
        vm.changePassObj = {
            access_token: localStorage.getItem('m_user_token'),
            new_password: null,
            old_password: null,
        }
        function changePassword() {
            if (vm.changePassObj.new_password != vm.c_password) {
                vm.doNotMatch = true;
                return false;
            }
            mLoginRegiServices.mChangePassword(vm.changePassObj).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Password updated successfully");
                    $timeout(function() {
                        $state.reload();
                    }, 2000);
                } else {
                    showError(response['message']);
                    return false;
                }
            });
        }

        /* ================ year of passing date ================ */
        function valid_year(d) {
            var date = new Date();
            var day = date.getFullYear()
            if (parseInt(d) > parseInt(day)) {
                alert('Please select valid year');
                vm.updateObj.year_of_passing = null;
            }
        }

        /*=========================View Suggested Profiles===============================*/
        function viewSugesstedProfile() {
            mProfileServices.viewSugessted({id: localStorage.getItem('m_user_id')}).success(function(response) {
                console.log("response for view suggested")
                console.log(response);
                vm.imgArr = [];
                vm.profileLoader = false;
                if (response.status == 105) {
                    vm.view_count = response.data.view_count;
                    vm.allProfile = response.data.recommended_profiles;
                    angular.forEach(vm.allProfile, function(value) {
                        var imgStr = value.relevant_picture;
                        if (imgStr) {
                            var splitArr = imgStr.split(',');
                        }
                        else {
                            var splitArr = [];
                        }
                        vm.imgArr.push(splitArr);
                    })
                    console.log(vm.imgArr);
                    console.log("yes see below image arr");
                    return false;
                } else {
                    alert(response['message']);
                    return false;
                }
            });
        }

        /*=========================View Suggested Profiles===============================*/
        function viewInterested() {

            mProfileServices.matrimonyInterestedCount({user_id: localStorage.getItem('m_user_id')}).success(function(response) {
                console.log("response for viewInterested")
                console.log(response);
                // return false;
                if (response.status == 105) {
                    console.log("in 105 ")
                    vm.interest_count = response.data;
                    console.log("vm.interest_count" + vm.interest_count)

                } else {
                    alert(response['message']);
                    return false;
                }
            });
        }
        viewInterested();


        $('.v_profile').on('click', function() {
            $('.setting_menu').removeClass('active_setting');
            $('.v_profile').addClass('active_setting');
            $('.change_password').hide();
            $('.add_new_ad').hide();
            $('.edit_new_ad').hide();
            $('.change_profile').hide();
            $('.add_inbox').hide();
            $('.partner_preferences').hide();
            $('.view_profile').hide();
            $('.view_particualr_profile').hide();
            $('.manage_ads').show();
            viewSugesstedProfile();
        });





 /*********************************view Badwords*************************************/
        vm.badArray = [];
        vm.badObj = {};
        mProfileServices.viewbadwords().success(function(response) {
            console.log(response);
            if (response.status == 105) {
                console.log("*manage badwords*")
                vm.manage_badwords = response.data[0].badwords.split(",");

                console.log(vm.manage_badwords);
                angular.forEach(vm.manage_badwords, function(value, key) {

                    vm.badArray.push({name: value});
                })
                console.log(vm.badArray);

            }
            else {
                showError(response['message']);
                return false;
            }
        });
        vm.ChkVogular = ChkVogular;
        function ChkVogular(search) {
            vm.allPeopleSearchData = $filter('filter')(vm.badArray, {name: search});
            console.log("chk bad words")
            console.log(vm.allPeopleSearchData);
        }












        /*=========================Update Profile Pannel =============================================*/
        vm.updateProfileFun = updateProfileFun;
        vm.day = null;
        vm.month = null;
        vm.year = null;
        vm.socailLinksArr = ['', '', ''];
        vm.professionalLinksArr = ['', '', ''];
        vm.addFormInput = addFormInput;
        vm.fileInput = [];
        vm.relImageIdArray = [];
        vm.relImagePathArray = [];
        vm.imgLoader = false;
        vm.removeFormField = removeFormField;
        vm.socialLinks = [];
        vm.professionalLinks = [];
        vm.emailPrivacy = emailPrivacy;
        vm.mobilePrivacy = mobilePrivacy;
        vm.horoPrivacy = horoPrivacy;
        vm.socialPrivacyFun = socialPrivacyFun;
        vm.email_privacy = false;
        vm.mobile_privacy = false;
        vm.horoscope_privacy = false;
        vm.socialPrivacy = false;


        function emailPrivacy() {
            if (vm.email_privacy == true) {

                vm.email_privacy = true;
            }
            else {
                vm.email_privacy = false;
            }

        }
        function mobilePrivacy() {
            if (vm.mobile_privacy == true) {
                vm.mobile_privacy = true;
            }
            else {
                vm.mobile_privacy = false;
            }

        }
        function horoPrivacy() {
            if (vm.horoscope_privacy == true) {
                vm.horoscope_privacy = true;
            }
            else {
                vm.horoscope_privacy = false;
            }
        }
        function socialPrivacyFun() {
            if (vm.connection_links_privacy == true) {
                vm.connection_links_privacy = true;
            }
            else {
                vm.connection_links_privacy = false;
            }
        }
        vm.updateObj = {
            status: null,
            access_token: localStorage.getItem('m_user_token'),
            id: localStorage.getItem('m_user_id'),
            about_me: null,
            profile_picture: null,
            relevant_picture: null,
            profile_created_by: null,
            date_of_birth: null,
            age: null,
            martial_status: null,
            height: null,
            height_in_cm: null,
            nationality: null,
            current_residence: null,
            //citizenship: null,
            body_type: null,
            health_information: null,
            diet: null,
            skin_tone: null,
            any_disability: null,
            nakshatra: "",
            gana: "",
            manglik: "",
            blood_group: null,
            drink: null,
            smoke: null,
            social_links: null,
            professional_links: null,
            horoscope: null,
            mobile_privacy: null,
            email_privacy: null,
            connection_links_privacy: null,
            horoscope_privacy: null,
            religion: null,
            mother_tounge: null,
            community: null,
            father_status: null,
            mother_status: null,
            family_location: null,
            family_type: null,
            family_values: null,
            affluence_level: null,
            education: null,
            annual_income: null,
            employer_name: null,
            working_with: "",
            working_as: "",
            major_subject: null,
            year_of_passing: null
        }

        function addFormInput() {
            vm.fileInput.push('');
            vm.relImageIdArray.push('');
            vm.relImagePathArray.push('');
        }
        function removeFormField(pos) {
            vm.fileInput.splice(pos, 1);
            vm.relImagePathArray.splice(pos, 1)
        }
        vm.removePImage = removePImage;
        function removePImage() {
            vm.updateObj.profile_picture = null;
        }
        vm.removeHImage = removeHImage;
        function removeHImage() {
            vm.updateObj.horoscope = null;
        }
        function updateProfileFun(status, act) {
            $('#update-' + act).hide();
            $('#updating-' + act).show();

            if (vm.email_privacy == true) {
                vm.updateObj.email_privacy = 1;
            }
            else {
                vm.updateObj.email_privacy = 0;
            }
            if (vm.mobile_privacy == true) {
                vm.updateObj.mobile_privacy = 1;
            }
            else {
                vm.updateObj.mobile_privacy = 0;
            }
            if (vm.horo_privacy == true) {
                vm.updateObj.horoscope_privacy = 1;
            }
            else {
                vm.updateObj.horoscope_privacy = 0;
            }
            if (vm.social_privacy == true) {
                vm.updateObj.connection_links_privacy = 1;
            }
            else {
                vm.updateObj.connection_links_privacy = 0;
            }
            vm.updateObj.status = status;
            vm.updateObj.social_links = vm.socialLinks.toString();
            
            
            if (vm.updateObj.social_links == '') {
                vm.updateObj.social_links = null;
            }
            else 
                {
                    
               
                
                
          //check badword for social links
             vm.result_social = [];
             vm.after_split = [];
             vm.split_index = [];
            vm.pr_social = vm.updateObj.social_links.split(",");
            for(var i =0 ; i< vm.pr_social.length;i++)
            {
                vm.split_index = vm.pr_social[i].split(" ");
               for(var j =0; j < vm.split_index.length;j++)
               {
                   vm.after_split.push(vm.split_index[j])
               }
                
            }
            console.log(vm.after_split)
//            vm.pr_social = vm.pr_soc.split(" ");
            console.log('social')
            console.log(vm.after_split)
            vm.pr_social_len = vm.after_split.length;   
            vm.badword_len = vm.manage_badwords.length
            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.pr_social_len; y++) {
                    if (vm.manage_badwords[x] == vm.after_split[y]) {
                        vm.result_social.push(vm.after_split[y]);
                        console.log(vm.result_social);
                        found2 = 6;
                        break;
                    }
                }
            }
              
            if (found2 == 6) {
                
                vm.msgType = 'danger';
                vm.msg = 'Please change these words '+ vm.result_social.toString();
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);
                
                $('#updating-' + act).hide();
                 $('#update-' + act).show();
                console.log('inside found social')
                return false;
            }
          
                    
                    
                    
                }
                
            vm.updateObj.professional_links = vm.professionalLinks.toString();
            if (vm.updateObj.professional_links == '') {
                vm.updateObj.professional_links = null;
            }
            else
            {
                //check badword for professional link
             vm.result_prof = [];
               vm.prof_split = [];
             vm.split_index_pro = [];
            vm.pr_profsn = vm.updateObj.professional_links.split(",");
            for(var i =0 ; i< vm.pr_profsn.length;i++)
            {
                vm.split_index_pro = vm.pr_profsn[i].split(" ");
               for(var j =0; j < vm.split_index_pro.length;j++)
               {
                   vm.prof_split.push(vm.split_index_pro[j])
               }
                
            }
            
            
            
            
            
            console.log('professional')
            console.log(vm.prof_split)
            vm.pr_profn_len = vm.prof_split.length;   
            vm.badword_len = vm.manage_badwords.length
            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.pr_profn_len; y++) {
                    if (vm.manage_badwords[x] == vm.prof_split[y]) {
                        vm.result_prof.push(vm.prof_split[y]);
                        console.log(vm.result_prof);
                        found2 = 2;
                        break;
                    }
                }
            }
              
            if (found2 == 2) {
                
                vm.msgType = 'danger';
                vm.msg = 'Please change these words '+ vm.result_prof.toString();
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);
                
                $('#updating-' + act).hide();
                 $('#update-' + act).show();
                console.log('inside found prfn')
                return false;
            }
            }
            
            vm.updateObj.relevant_picture = vm.relImagePathArray.toString();
            console.log(vm.updateObj);
            if (vm.day != null && vm.day != "" && vm.month != null && vm.month != "" && vm.year != null && vm.year != "") {
                console.log('inside date picker');
                console.log(vm.year, vm.month, vm.day);
                vm.updateObj.date_of_birth = vm.year + '-' + vm.month + '-' + vm.day ;
            } else {
                vm.updateObj.date_of_birth = null;
            }
            if (vm.updateObj.height != null) {
                var data = vm.updateObj.height;
                var height_in_cm = data.split(' - ')[1];
                vm.updateObj.height_in_cm = height_in_cm.substring(0, 3);
            }
            
            //check badword
            if(vm.updateObj.about_me != null)
            {
                 vm.result_des = [];
               vm.pr_descrpp = vm.updateObj.about_me.replace(/[^a-zA-Z ]/g, " ");
            vm.pr_descrp = vm.pr_descrpp.split(" ");
            console.log('description')
            console.log(vm.pr_descrp)
            vm.pr_descrp_len = vm.pr_descrp.length;   
            vm.badword_len = vm.manage_badwords.length
            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.pr_descrp_len; y++) {
                    if (vm.manage_badwords[x] == vm.pr_descrp[y]) {
                        vm.result_des.push(vm.pr_descrp[y]);
                        console.log(vm.result_des);
                        found2 = 1;
                        break;
                    }
                }
            }
             if (found2 == 1) {
                
                vm.msgType = 'danger';
                vm.msg = 'Please change these words '+ vm.result_des.toString();
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);
                
                $('#updating-' + act).hide();
                 $('#update-' + act).show();
                console.log('inside found')
                return false;
            }
            }
            
            
            
            
            //check badword in  working_with
            
            if(vm.updateObj.working_with !='' && vm.updateObj.working_with !=null)
            {
                 vm.result_working_with = [];
                 console.log(vm.updateObj.working_with);
            vm.pr_workwith = vm.updateObj.working_with.split(" ");
            console.log('professional')
            console.log(vm.pr_workwith)
            vm.pr_workwith_len = vm.pr_workwith.length;   
            vm.badword_len = vm.manage_badwords.length
            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.pr_workwith_len; y++) {
                    if (vm.manage_badwords[x] == vm.pr_workwith[y]) {
                        vm.result_working_with.push(vm.pr_workwith[y]);
                        console.log(vm.result_working_with);
                        found2 = 3;
                        break;
                    }
                }
            }
              
            if (found2 == 3) {
                
                vm.msgType = 'danger';
                vm.msg = 'Please change these words '+ vm.result_working_with.toString();
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);
                
                $('#updating-' + act).hide();
                 $('#update-' + act).show();
                console.log('inside found working with')
                return false;
            }
                
            }
            
          
          if( vm.updateObj.working_as !='' && vm.updateObj.working_as !=null)
          {
              //check badword in  working_As
             vm.result_working_as = [];
            vm.pr_workas = vm.updateObj.working_as.split(" ");
            console.log('working as')
            console.log(vm.pr_workas)
            vm.pr_workas_len = vm.pr_workas.length;   
            vm.badword_len = vm.manage_badwords.length
            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.pr_workas_len; y++) {
                    if (vm.manage_badwords[x] == vm.pr_workas[y]) {
                        vm.result_working_as.push(vm.pr_workas[y]);
                        console.log(vm.result_working_as);
                        found2 = 4;
                        break;
                    }
                }
            }
              
            if (found2 == 4) {             
                vm.msgType = 'danger';
                vm.msg = 'Please change these words '+ vm.result_working_as.toString();
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);               
                $('#updating-' + act).hide();
                 $('#update-' + act).show();
                console.log('inside found working as')
                return false;
            }
          }
          
          //check badword for family location
          
           if( vm.updateObj.family_location !='' && vm.updateObj.family_location !=null)
          {
              //check badword in  working_As
             vm.result_family = [];
            vm.pr_family = vm.updateObj.family_location.split(" ");
            console.log('family location')
            console.log(vm.pr_family)
            vm.pr_family_len = vm.pr_family.length;   
            vm.badword_len = vm.manage_badwords.length
            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.pr_family_len; y++) {
                    if (vm.manage_badwords[x] == vm.pr_family[y]) {
                        vm.result_family.push(vm.pr_family[y]);
                        console.log(vm.result_family);
                        found2 = 5;
                        break;
                    }
                }
            }
              
            if (found2 == 5) {             
                vm.msgType = 'danger';
                vm.msg = 'Please change these words '+ vm.result_family.toString();
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);               
                $('#updating-' + act).hide();
                 $('#update-' + act).show();
                console.log('inside found family')
                return false;
            }
          }
          
         
          
          
          
          
          
          
          
            
            
            
            mProfileServices.updateProfile(vm.updateObj).success(function(response) {
                console.log("update profile");
                console.log(response);
                $('#update-' + act).show();
                $('#updating-' + act).hide();
                if (response.status == 105) {
                    var msg = 'ePardesh: Profile updated successfully.'
                    var str = "<h4 class='success'>" + msg + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    $timeout(function() {
                        $('#showMsgModal').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $('.p_professional_view').show();
                        $('.p_updation_professional').hide();
                        $('.p_professional_view').show();
                        $('.p_updation_professional').hide();
                        $('.p_social_view').show();
                        $('.p_updation_social').hide();
                        $('.view_basic_info').show();
                        $('.update_basic').hide();
                        $('.religion_view_text').show();
                        $('.religion_updation').hide();
                        $('.family_view_text').show();
                        $('.family_updation').hide();
                        $('.education_view_text').show();
                        $('.education_updation').hide();
                        veiwProfileFun();
                    }, 3000);
                } else {
                    alert(response['message']);
                    return false;
                }
            });
        }

        $scope.uploadimage = function() {
            vm.imgLoader = true;
            var formData = new FormData(document.forms.namedItem("featureImageForm"));
            vm.imagetype = 'featured';
            formData.append("image_type", vm.imagetype);
            mProfileServices.uploadProfileImage($scope, function(response) {
                vm.imgLoader = false;
                console.log("featured image response");
                console.log(response);
                if (response.status == 105) {
                    vm.updateObj.profile_picture = response.data.profile_image_path;
                } else {
                    alert(response['message']);
                    return false;
                }
            }, formData);
        }

        $scope.uploadHoroimage = function() {
            vm.imgHoroLoader = true;
            var formData = new FormData(document.forms.namedItem("horoImageForm"));
            vm.imagetype = 'featured';
            formData.append("image_type", vm.imagetype);
            mProfileServices.uploadProfileImage($scope, function(response) {
                vm.imgHoroLoader = false;
                console.log("featured image response");
                console.log(response);
                if (response.status == 105) {
                    vm.updateObj.horoscope = response.data.profile_image_path;
                } else {
                    alert(response['message']);
                    return false;
                }
            }, formData);
        }

//        $scope.uploadrelImage = function(position) {
//
//            var index = angular.element(position).scope().$index;
//            var pos = index;
//            $('.hideLoader' + pos).show();
//
//            var formData = new FormData(document.forms.namedItem("relevantImgForm" + index));
//
//            vm.imagetype = 'relevant';
//            formData.append("image_type", vm.imagetype);
//            mProfileServices.uploadProfileImage($scope, function(response) {
//                console.log(response);
//                $('.hideLoader' + pos).hide();
//                if (response.status == 105) {
//                    vm.relImagePathArray[pos] = response.data.profile_image_path;
//                    vm.imgLoader = false;
//                } else {
//                    showError(response['message']);
//                    return false;
//                }
//            }, formData);
//        }

        $scope.uploadrelImage = function(position) {
            var pos = angular.element(position).scope().$index;
            $('.hideLoader').show();
            var formData = new FormData(document.forms.namedItem("relevantImgForm"));
            vm.imagetype = 'relevant';
            formData.append("image_type", vm.imagetype);
            mProfileServices.uploadProfileImage($scope, function(response) {
                console.log("uploadProfileImage");
                console.log(response);
                $('.hideLoader').hide();
                if (response.status == 105) {
                    vm.relImagePathArray.push(response.data.profile_image_path);
                    vm.fileInput.push('');
                    $("#mp-upd-p-image").val("");
                    console.log("vm.relImagePathArrayvm.relImagePathArrayvm.relImagePathArray222222222");
                    console.log(vm.relImagePathArray);
                    vm.imgLoader = false;
                } else {
                    showError(response['message']);
                    return false;
                }
            }, formData);
        }

        /*================================View My Profile=====================================*/
        vm.bUpgrade = bUpgrade;
        vm.viewObj = {
            user_id: localStorage.getItem('m_user_id'),
            access_token: localStorage.getItem('m_user_token'),
        }
        vm.imgArr = [];

        function bUpgrade() {
            $('.setting_menu').removeClass('active_setting');
            $('.c_membership').addClass('active_setting');
            $('.change_profile').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.edit_new_ad').hide();
            $('.change_password').hide();
            $('.add_inbox').hide();
            $('.partner_preferences').hide();
            $('.view_profile').hide();
            $('.view_particualr_profile').hide();
            $('.edit_new_ad').show()
        }

        function veiwProfileFun() {

            mProfileServices.viewMyProfile(vm.viewObj).success(function(response) {
                console.log("view profile");
                console.log(response);
                if (response.status == 105) {
                    localStorage.setItem('email', response.data[0].email);
                    $scope.planExpirationDate = response.data[0].plan_expiration_date;
                    var r = localStorage.getItem('email');
                    console.log(r);
                    vm.viewProfileData = response.data[0];
                    localStorage.setItem('p_completed', response.data[0].profile_completed_percentage);
                    $scope.current = localStorage.getItem('p_completed');
                    if($scope.current < 50) {
                        $scope.currentColor = 'red';
                    } else if($scope.current > 75) {
                        $scope.currentColor = 'green';
                    }
                    else {
                        $scope.currentColor = 'orange';
                    }
                    vm.p_com = localStorage.getItem('p_completed');
                    vm.updateObj = response.data[0];
                    vm.updateObj.profile_picture = vm.viewProfileData.profile_picture;
                    vm.updateObj.horoscope = vm.viewProfileData.horoscope;
                    var relImages = vm.viewProfileData.relevant_picture;
                    if (relImages != null && relImages != '') {
                        var relImagesArr = relImages.split(',');
                    }
                    vm.relImagePathArray = [];
                    vm.fileInput = [];
                    angular.forEach(relImagesArr, function(value, key) {
                        vm.fileInput.push('');
                        vm.relImagePathArray[key] = value;
                    })
                    console.log("vm.relImagePathArrayvm.relImagePathArrayvm.relImagePathArray1111111111");
                    console.log(vm.relImagePathArray);
                    vm.updateObj.relevant_picture = null;
                    if (vm.viewProfileData.social_links != null) {
                        var socialStr = vm.viewProfileData.social_links;
                        var socialArr = socialStr.split(',');
                        angular.forEach(socialArr, function(value, key) {
                            vm.socailLinksArr[key] = value;
                            vm.socialLinks[key] = value;
                        })
                    }
                    if (vm.viewProfileData.professional_links != null) {
                        var proStr = vm.viewProfileData.professional_links;
                        var proArr = proStr.split(',');
                        angular.forEach(proArr, function(value, key) {
                            vm.professionalLinksArr[key] = value;
                            vm.professionalLinks[key] = value;
                        })
                    }
                    if (vm.updateObj.activation_code == '') {
                        vm.updateObj.activation_code = null;
                    }
                    if (vm.updateObj.email_verification_code == '') {
                        vm.updateObj.email_verification_code = null;
                    }
                    if (vm.updateObj.otp == '') {
                        vm.updateObj.otp = null;
                    }
                    if (vm.updateObj.transaction_id == '') {
                        vm.updateObj.transaction_id = null;
                    }
                    if (vm.updateObj.relevant_picture == '') {
                        vm.updateObj.relevant_picture = null;
                    }

                    if (vm.viewProfileData.date_of_birth != null) {
                        var date = vm.viewProfileData.date_of_birth;
                        var splitDate = date.split('T')[0];
                        vm.year = splitDate.split('-')[0];
                        vm.month = splitDate.split('-')[1];
                        vm.day = splitDate.split('-')[2];
                    }
                    if (vm.viewProfileData.email_privacy == 1) {
                        vm.email_privacy = true;
                    }
                    if (vm.viewProfileData.mobile_privacy == 1) {
                        vm.mobile_privacy = true;
                    }
                    if (vm.viewProfileData.horoscope_privacy == 1) {
                        vm.horo_privacy = true;
                    }
                    if (vm.viewProfileData.connection_links_privacy == 1) {
                        vm.social_privacy = true;
                    }

                } else {
                    alert(response['message']);
                    return false;
                }
            });
        }
        veiwProfileFun();




        /*================================Send Request Pannel=====================================*/
        vm.connnectRequestFun = connnectRequestFun;
//        vm.connectReqObj = {
//            status: null,
//            sender_user_id: localStorage.getItem('m_user_id'),
//            access_token: localStorage.getItem('m_user_token'),
//            sender_name: localStorage.getItem('m_user_name'),
//            sender_email: localStorage.getItem('m_user_email'),
//            receiver_user_id: null,
//            receiver_email: null,
//            receiver_mobile: null,
//            is_platinum_status: 0,
//        }

 vm.connectReqObj = {
            status: null,
            sender_user_id: localStorage.getItem('m_user_id'),
            access_token: localStorage.getItem('m_user_token'),
            sender_first_name: localStorage.getItem('m_user_name'),
            sender_last_name: localStorage.getItem('m_user_l_name'),
            sender_email: localStorage.getItem('m_user_email'),
            receiver_user_id: null,
            receiver_email: null,
            receiver_mobile: null,
            is_platinum_status: 0,
            profile_id:null,
            receiver_first_name:null,
            receiver_last_name:null
        }
        function connnectRequestFun(data, status) {
            vm.manageLoader = true;
            vm.connectReqObj.status = status;
            vm.connectReqObj.receiver_user_id = data.id;
            vm.connectReqObj.receiver_email = data.email;
            vm.connectReqObj.receiver_mobile = data.mobile;
            vm.connectReqObj.profile_id = data.profile_id;
            vm.connectReqObj.receiver_first_name = data.first_name;
            vm.connectReqObj.receiver_last_name = data.last_name;
          console.log("vm.connectReqObj");   
   console.log(vm.connectReqObj);
   //return false
    
    
  

            if (localStorage.getItem('m_user_type') == 'platinum' || localStorage.getItem('m_user_type') == 'Platinum') {
                vm.connectReqObj.is_platinum_status = 1;
            }
            mProfileServices.connectRequest(vm.connectReqObj).success(function(response) {
                vm.manageLoader = false;
                console.log(response);
                if (response.status == 105) {
                    var msg = '';
                    if (status == 2) {
                        msg = 'Request sent successfully.';
                    } else if (status == 3) {
                        msg = 'Added to Favourite list successfully.'
                    }
                    var str = "<h4 class='success'>" + msg + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    $timeout(function() {
                        $('#showMsgModal').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $state.reload();
                    }, 2000);
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            }).error(function() {
                vm.manageLoader = false;
            });
        }
        vm.connnectRequestFun1 = connnectRequestFun1;
        function connnectRequestFun1(data, status) {
            vm.connectReqObj.status = status;
            vm.connectReqObj.receiver_user_id = data.id;
            vm.connectReqObj.receiver_email = data.email;
            vm.connectReqObj.receiver_mobile = data.mobile;

            if (localStorage.getItem('m_user_type') == 'platinum' || localStorage.getItem('m_user_type') == 'Platinum') {
                vm.connectReqObj.is_platinum_status = 1;
            }
            mProfileServices.connectRequest(vm.connectReqObj).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    var msg = '';
                    if (status == 2) {
                        msg = 'Request sent successfully.';
                    } else if (status == 3) {
                        msg = 'Added to Favourite list successfully.'
                    }
                    var str = "<h4 class='success'>" + msg + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    $timeout(function() {
                        $('#showMsgModal').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        interestedProfileFun(1);
                    }, 2000);
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            });
        }

        /*================================Send Email msg Pannel=====================================*/
        vm.sendEmailMsgFun = sendEmailMsgFun;
        vm.onBtnClickofSendEmail = onBtnClickofSendEmail;
        vm.memUpgrade = memUpgrade;
        vm.sendEmailMsgObj = {
            access_token: localStorage.getItem('m_user_token'),
            sender_name: localStorage.getItem('m_user_name'),
            sender_email: localStorage.getItem('m_user_email'),
            message: null,
            receiver_email: null,
            sender_id: localStorage.getItem('m_user_id'),
            receiver_id: null
        }
        function onBtnClickofSendEmail(data) {
            console.log("yes inside function")
            vm.sendEmailMsgObj.receiver_email = data.email;
            vm.sendEmailMsgObj.receiver_id = data.id;
           
            if (data.profile_picture == null){
                vm.reciever_image = "http://itspronouncedmetrosexual.com/wp-content/themes/ipmtheme/library/images/sam-killermann-headshot.jpg";
            }
            else{
                 vm.reciever_image = data.profile_picture;
            }
            
            if (localStorage.getItem('m_user_type') == 'free' || localStorage.getItem('m_user_type') == 'Free') {
                var str = "<h4 class='danger'>You need to upgrade your plan to paid members.<h4>"
                $('.msg').html(str);
                $('#showMsgModal').modal('show');
                $('#memUpgrade').show();
            }
            else {
                $('#sendModal').modal('show');
            }
        }
        $('#memUpgrade').on('click', function() {
            $('#showMsgModal').modal('hide');
            $('.setting_menu').removeClass('active_setting');
            $('.c_membership').addClass('active_setting');
            $('.change_profile').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.edit_new_ad').hide();
            $('.change_password').hide();
            $('.add_inbox').hide();
            $('.partner_preferences').hide();
            $('.view_profile').hide();
            $('.view_particualr_profile').hide();
            $('.edit_new_ad').show()
        });

        // vm.sendDis = true;
        function sendEmailMsgFun() {
            
            if(vm.sendEmailMsgObj.message =='' || vm.sendEmailMsgObj.message ==null) 
            {
                  vm.msgType = 'danger';
                vm.msg = 'Enter Message';
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);
                return false;
                
            }
          
            
            if(vm.sendEmailMsgObj.message !='' && vm.sendEmailMsgObj.message !=null)
            {
                 vm.result_send = [];
                 console.log(vm.sendEmailMsgObj.result_send);
                  vm.pr_sende = vm.sendEmailMsgObj.message.replace(/\r?\n|\r/g, ' ');
            vm.pr_send = vm.pr_sende.split(" ");
            console.log('professionalqwerty')
            console.log(vm.pr_send)
            vm.pr_send_len = vm.pr_send.length;   
            vm.badword_len = vm.manage_badwords.length
            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.pr_send_len; y++) {
                    if (vm.manage_badwords[x] == vm.pr_send[y]) {
                        vm.result_send.push(vm.pr_send[y]);
                        console.log(vm.result_send);
                        found2 = 3;
                        break;
                    }
                }
            }
              
            if (found2 == 3) {
                
                vm.msgType = 'danger';
                vm.msg = 'Please change these words '+ vm.result_send.toString();
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);
                return false;
            }
                
            }
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            vm.manageLoader = true;
            mProfileServices.sendEmailMsg(vm.sendEmailMsgObj).success(function(response) {
                vm.manageLoader = false;
                console.log(response);
                $('#sendModal').modal('hide');
                $('#replyModal').modal('hide');
                if (response.status == 105) {
                    vm.sendEmailMsgObj.message = null;
                    var str = "<h4 class='success'>Message sent successfully.<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            }).error(function() {
                vm.manageLoader = false;
            });

        }


        /*================================Send SMS msg Pannel=====================================*/
        vm.sendSMSMsgFun = sendSMSMsgFun;
        vm.onBtnClickofSendSMS = onBtnClickofSendSMS;
        vm.sendSMSMsgObj = {
            access_token: localStorage.getItem('m_user_token'),
            sender_name: localStorage.getItem('m_user_name'),
            message: null,
            receiver_mobile: null,
        }
        function onBtnClickofSendSMS(data) {
            console.log("yes inside function");
            console.log(data);
            vm.sendSMSMsgObj.receiver_mobile = data.mobile;
             if (data.profile_picture == null){
                vm.reciever_sms_image = "http://itspronouncedmetrosexual.com/wp-content/themes/ipmtheme/library/images/sam-killermann-headshot.jpg";
            }
            else{
                console.log("in else");
                console.log(data.profile_image);
                 vm.reciever_sms_image = data.profile_picture;
            }
            
            
            if (localStorage.getItem('m_user_type') == 'platinum' || localStorage.getItem('m_user_type') == 'Platinum') {
                $('#SMSModal').modal('show');
            } else {
                var str = "<h4 class='danger'>You need to upgrade your plan to platinum in order to send text message.<h4>"
                $('.msg').html(str);
                $('#showMsgModal').modal('show');
                $('#memUpgrade').show();

            }
        }
        function sendSMSMsgFun() {
            
            if(vm.sendSMSMsgObj.message =='' || vm.sendSMSMsgObj.message ==null) 
            {
                  vm.msgType = 'danger';
                vm.msg = 'Enter Message';
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);
                return false;
                
            }
          
            
            if(vm.sendSMSMsgObj.message !='' && vm.sendSMSMsgObj.message !=null)
            {
                 vm.result_send = [];
                 console.log(vm.sendSMSMsgObj.result_send);
                  vm.pr_sende = vm.sendSMSMsgObj.message.replace(/\r?\n|\r/g, ' ');
            vm.pr_send = vm.pr_sende.split(" ");
            console.log('professional')
            console.log(vm.pr_send)
            vm.pr_send_len = vm.pr_send.length;   
            vm.badword_len = vm.manage_badwords.length
            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.pr_send_len; y++) {
                    if (vm.manage_badwords[x] == vm.pr_send[y]) {
                        vm.result_send.push(vm.pr_send[y]);
                        console.log(vm.result_send);
                        found2 = 3;
                        break;
                    }
                }
            }
              
            if (found2 == 3) {
                
                vm.msgType = 'danger';
                vm.msg = 'Please change these words '+ vm.result_send.toString();
                vm.checkbadword = true;
                $timeout(function() {
                    vm.checkbadword = false;
                }, 2000);
                return false;
            }
                
            }
            
            
            vm.manageLoader = true;
            mProfileServices.sendSMSMsg(vm.sendSMSMsgObj).success(function(response) {
                vm.manageLoader = false;
                console.log(response);
                $('#SMSModal').modal('hide');
                if (response.status == 105) {
                    vm.sendSMSMsgObj.message = null;
                    var str = "<h4 class='success'>Message sent successfully.<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            })
                    .error(function() {
                        vm.manageLoader = false;
                    });

        }

        /*================================Interested Profiles Pannel=====================================*/
        vm.DataLoader = false;
        vm.visitedFun = visitedFun;
        vm.subvisitedFun = subvisitedFun;
        vm.prequestFun = prequestFun;
        vm.subPenReqFun = subPenReqFun;
        vm.subFavFun = subFavFun;
        vm.subPrevFun = subPrevFun;
        vm.uniFun = uniFun;
        vm.favFun = favFun;
        vm.previewFun = previewFun;
        vm.interestedProfileObj = {
            status: null,
            user_id: localStorage.getItem('m_user_id'),
            access_token: localStorage.getItem('m_user_token'),
        }
        function uniFun() {
            $('.setting_menu').removeClass('active_setting');
            $('.c_int_profile').addClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.edit_new_ad').hide();
            $('.partner_preferences').hide();
            $('.add_inbox').hide()
            $('.view_profile').hide();
            $('.add_new_ad').show();
        }
        function subvisitedFun() {
            $('.newad_menu').removeClass('active_menu');
            $('.a_category').addClass('active_menu');
            $('.ad_detail').hide();
            $('.ad_payment').hide();
            $('.ad_final').hide();
            $('.ad_preview').hide();
            $('.ad_type').hide();
            $('.ad_category').show();
            interestedProfileFun(1);
        }
        function subPenReqFun() {
            $('.newad_menu').removeClass('active_menu');
            $('.a_type').addClass('active_menu');
            $('.ad_category').hide();
            $('.ad_payment').hide();
            $('.ad_final').hide();
            $('.ad_preview').hide();
            $('.ad_detail').hide();
            $('.ad_type').show();
            interestedProfileFun(2);
        }
        function subFavFun() {
            $('.newad_menu').removeClass('active_menu');
            $('.a_detail').addClass('active_menu');
            $('.ad_type').hide();
            $('.ad_payment').hide();
            $('.ad_final').hide();
            $('.ad_preview').hide();
            $('.ad_category').hide();
            $('.ad_detail').show();
            interestedProfileFun(3);
        }
        function subPrevFun() {
            $('.newad_menu').removeClass('active_menu');
            $('.a_preview').addClass('active_menu');
            $('.ad_type').hide();
            $('.ad_payment').hide();
            $('.ad_final').hide();
            $('.ad_detail').hide();
            $('.ad_category').hide();
            $('.ad_preview').show();
            interestedProfileFun(4);
        }
        function visitedFun() {
            vm.uniFun();
            vm.subvisitedFun();
        }
        function prequestFun() {
            vm.uniFun();
            vm.subPenReqFun();
        }
        function favFun() {
            vm.uniFun();
            vm.subFavFun();
        }
        function previewFun() {
            vm.uniFun();
            vm.subPrevFun();
        }
        $('.c_int_profile').on('click', function() {
            vm.visitedFun();
        });
        $('.a_category').on('click', function() {
            vm.subvisitedFun();
        });
        $('.a_type').on('click', function() {
            vm.subPenReqFun();
        });
        $('.a_detail').on('click', function() {
            vm.subFavFun();
        });
        $('.a_preview').on('click', function() {
            vm.subPrevFun();
        });

        function interestedProfileFun(status) {
            vm.whtLastStatus = status;
            vm.DataLoader = true;
            vm.interestedProfileObj.status = status;
            mProfileServices.viewIntestedProfile(vm.interestedProfileObj).success(function(response) {
                console.log(response);
                console.log('response');
                vm.DataLoader = false;
                if (response.status == 105) {
                    if (response.data.length > 0) {
                        vm.interestedData = response.data;
                    }
                    else {
                        vm.interestedData = 1;
                    }
                    console.log(vm.interestedData)

                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            });
        }

        /*===========================Remove from favourates lists=================================*/
        vm.removeFromFavourateFun = removeFromFavourateFun;
        function removeFromFavourateFun(data) {
            var con = confirm('Are you sure want to remove from favourite list?');
            if (con == false) {
                return false;
            } else {
                vm.removeObj = {
                    request_id: data.connect_req_id,
                    access_token: localStorage.getItem('m_user_token'),
                }
                mProfileServices.removeFromFav(vm.removeObj).success(function(response) {
                    console.log(response);
                    console.log('response');
                    if (response.status == 105) {
                        interestedProfileFun(vm.whtLastStatus);
                        var str = "<h4 class='success'>Removed successfully.<h4>"
                        $('.msg').html(str);
                        $('#showMsgModal').modal('show');
                        $('#memUpgrade').hide();
                    } else {
                        var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                        $('.msg').html(str);
                        $('#showMsgModal').modal('show');
                        $('#memUpgrade').hide();
                        return false;
                    }
                });
            }
        }
        /*===========================Accept Reject Requests=================================*/
        vm.acceptRejectFun = acceptRejectFun;
        function acceptRejectFun(data, status) {
            console.log(data);
            vm.actObj = {
                status: status,
                request_id: data.connect_req_id,
                access_token: localStorage.getItem('m_user_token'),
                sender_first_name: data.first_name,
                sender_last_name: data.last_name,
                sender_email: data.email, //localStorage.getItem('m_user_email'),
                sender_mobile: localStorage.getItem('m_user_mobile'),
                receiver_first_name: localStorage.getItem('m_user_name'),
                receiver_last_name: localStorage.getItem('m_user_l_name'),
//                receiver_profile_id: data.profile_id,
                receiver_profile_id: localStorage.getItem('m_user_profile_id'),
                is_platinum_status: 0
                        //sender_name: localStorage.getItem('m_user_name'),
            }
            if (localStorage.getItem('m_user_type') == 'Platinum' || localStorage.getItem('m_user_type') == 'platinum') {
                vm.actObj.is_platinum_status = 1;
            }
            mProfileServices.acceptRejectRequest(vm.actObj).success(function(response) {
                console.log(response);
                console.log('response');
                if (response.status == 105) {
                    interestedProfileFun(vm.whtLastStatus);
                    if (status == 1) {
                        var str = "<h4 class='success'>Accepted successfully.<h4>"
                    } else {
                        var str = "<h4 class='success'>Rejected successfully.<h4>"
                    }
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            });
        }

        /*===================================Partner Preference Pannel=========================================*/
        vm.updatePartnerPreFun = updatePartnerPreFun
        vm.updatePartnerObj = {
            status: null,
            access_token: localStorage.getItem('m_user_token'),
            id: localStorage.getItem('m_user_id'),
            min_age: '21',
            max_age: '50',
            martial_status: null,
            min_height: null,
            min_height_in_cm: null,
            max_height: null,
            max_height_in_cm: null,
            body_type: null,
            skin_tone: null,
            religion: null,
            community: null,
            father_status: null,
            family_values: null,
            affluence_level: null,
            education: null,
            annual_income: null,
        }
        function updatePartnerPreFun(status, act) {
            vm.updatePartnerObj.status = status;
            $('#partner-' + act).hide();
            $('#partnerUpdating-' + act).show();

            if (vm.updatePartnerObj.min_height != null) {
                var data = vm.updatePartnerObj.min_height;
                var temp_min_height = data.split('-')[1];
                vm.updatePartnerObj.min_height_in_cm = parseInt(temp_min_height.split('cm')[0]);
            }
            if (vm.updatePartnerObj.max_height != null) {
                var data = vm.updatePartnerObj.max_height;
                var temp_max_height = data.split('-')[1];
                vm.updatePartnerObj.max_height_in_cm = parseInt(temp_max_height.split('cm')[0]);
            }
            vm.updatePartnerObj.id = localStorage.getItem('m_user_id');
            vm.updatePartnerObj.access_token = localStorage.getItem('m_user_token');
            mProfileServices.updatePartnerPre(vm.updatePartnerObj).success(function(response) {
                console.log("update profile");
                console.log(response);
                $('#partner-' + act).show();
                $('#partnerUpdating-' + act).hide();
                if (response.status == 105) {
                    var msg = 'Partner prefrences updated successfully.'

                    var str = "<h4 class='success'>" + msg + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    $timeout(function() {
                        $('#showMsgModal').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $('.p_education_view_info').show();
                        $('.p_updation_education').hide();
                        $('.p_family_view_info').show();
                        $('.p_updation_family').hide();
                        $('.partner_religion_background').show();
                        $('.p_updation_religion').hide();
                        $('.partner_view_info').show();
                        $('.p_updation_info').hide();
                        viewPartnerPreFun()
                    }, 2000);

                } else {
                    alert(response['message']);
                    return false;
                }
            });
        }

        function viewPartnerPreFun() {
            mProfileServices.viewPartnerPre(vm.viewObj).success(function(response) {
                console.log("View partner profile");
                console.log(response);
                if (response.status == 105) {
                    vm.viewPartnerData = response.data[0];
                    vm.updatePartnerObj = vm.viewPartnerData;
                    if (vm.updatePartnerObj.min_age != null) {
                        vm.updatePartnerObj.min_age = vm.updatePartnerObj.min_age.toString();
                    }
                    if (vm.updatePartnerObj.max_age != null) {
                        vm.updatePartnerObj.max_age = vm.updatePartnerObj.max_age.toString();
                    }

                } else {
                    alert(response['message']);
                    return false;
                }
            });
        }
        viewPartnerPreFun();


        /*===============================View Particular Profile================================*/
        vm.viewProfile = viewProfile;
        vm.onClickOfBackBtn = onClickOfBackBtn;
        vm.ActiveUserTypePlan = localStorage.getItem("m_user_type");
        function viewProfile(data, from) {
            
            localStorage.setItem('fromWhere', from);
            $('.setting_menu').removeClass('active_setting');
            $('.c_profile').addClass('active_setting');
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.edit_new_ad').hide();
            $('.add_inbox').hide();
            $('.partner_preferences').hide();
            $('.view_profile').hide();
            $('.change_profile').hide();
            $('.view_particualr_profile').show();
            vm.connectReqObj.status = 1;
            vm.connectReqObj.receiver_user_id = data.id;
            vm.connectReqObj.receiver_email = data.email;
            vm.connectReqObj.receiver_mobile = data.mobile;
            if (localStorage.getItem('m_user_type') == 'platinum' || localStorage.getItem('m_user_type') == 'Platinum') {
                vm.connectReqObj.is_platinum_status = 1;
            }
            mProfileServices.connectRequest(vm.connectReqObj).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    var dataObj = {
                        user_id: data.id,
                        access_token: localStorage.getItem('m_user_token'),
                    }
                    vm.check_horoscope = localStorage.getItem('mActivePlanID');
                    mProfileServices.viewParticularProfile(dataObj).success(function(response) {
                        console.log("view particular profile data");
                        console.log(response);
                        
                        if (response.status == 105) {
                            console.log('fffggg')
                            vm.viewParticularProfileData = response.data[0];
                            var relImages = vm.viewParticularProfileData.relevant_picture;
                            
                             vm.relImagePathArr = [];
                            if(relImages != null)
                            {
                                var relImagesArr = relImages.split(',');
                                angular.forEach(relImagesArr, function(value, key) {
                                vm.relImagePathArr[key] = value;
                            })
                            }
                            console.log(vm.relImagePathArr)
                           console.log('view per')
                            
                            vm.socailLinksArray = [];
                            if (vm.viewParticularProfileData.social_links != null) {
                                var socialStr = vm.viewParticularProfileData.social_links;
                                var socialArr = socialStr.split(',');
                                angular.forEach(socialArr, function(value, key) {
                                    vm.socailLinksArray[key] = value;

                                })
                            }
                            vm.professionalLinksArray = [];
                            if (vm.viewParticularProfileData.professional_links != null) {
                                var proStr = vm.viewParticularProfileData.professional_links;
                                var proArr = socialStr.split(',');
                                angular.forEach(proArr, function(value, key) {
                                    vm.professionalLinksArray[key] = value;
                                })
                            }
                        } else {
                            var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                            $('.msg').html(str);
                            $('#showMsgModal').modal('show');
                            $('#memUpgrade').hide();
                            return false;
                        }
                    });
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            });
        }

        function onClickOfBackBtn() {
            var getFrom = localStorage.getItem('fromWhere');
            if (getFrom == '1') {
                $('.setting_menu').removeClass('active_setting');
                $('.v_profile').addClass('active_setting');
                $('.change_password').hide();
                $('.add_new_ad').hide();
                $('.edit_new_ad').hide();
                $('.change_profile').hide();
                $('.add_inbox').hide();
                $('.partner_preferences').hide();
                $('.view_profile').hide();
                $('.view_particualr_profile').hide();
                $('.manage_ads').show();
            }
            else if (getFrom == '2') {
                $('.view_particualr_profile').hide();
                $('.setting_menu').removeClass('active_setting');
                $('.c_int_profile').addClass('active_setting');
                $('.change_profile').hide();
                $('.change_password').hide();
                $('.manage_ads').hide();
                $('.edit_new_ad').hide();
                $('.partner_preferences').hide();
                $('.add_inbox').hide()
                $('.view_profile').hide();
                $('.add_new_ad').show();
                $('.newad_menu').removeClass('active_menu');
                $('.a_category').addClass('active_menu');
                $('.ad_detail').hide();
                $('.ad_payment').hide();
                $('.ad_final').hide();
                $('.ad_preview').hide();
                $('.ad_type').hide();
                $('.ad_category').show();
                interestedProfileFun(1)
            }
            else if (getFrom == '3') {
                $('.view_particualr_profile').hide();
                $('.setting_menu').removeClass('active_setting');
                $('.c_int_profile').addClass('active_setting');
                $('.change_profile').hide();
                $('.change_password').hide();
                $('.manage_ads').hide();
                $('.edit_new_ad').hide();
                $('.partner_preferences').hide();
                $('.add_inbox').hide()
                $('.view_profile').hide();
                $('.add_new_ad').show();
                $('.newad_menu').removeClass('active_menu');
                $('.a_type').addClass('active_menu');
                $('.ad_category').hide();
                $('.ad_payment').hide();
                $('.ad_final').hide();
                $('.ad_preview').hide();
                $('.ad_detail').hide();
                $('.ad_type').show();
                interestedProfileFun(2);
            }
            else if (getFrom == '4') {
                $('.view_particualr_profile').hide();
                $('.setting_menu').removeClass('active_setting');
                $('.c_int_profile').addClass('active_setting');
                $('.change_profile').hide();
                $('.change_password').hide();
                $('.manage_ads').hide();
                $('.edit_new_ad').hide();
                $('.partner_preferences').hide();
                $('.add_inbox').hide()
                $('.view_profile').hide();
                $('.add_new_ad').show();
                $('.newad_menu').removeClass('active_menu');
                $('.a_detail').addClass('active_menu');
                $('.ad_type').hide();
                $('.ad_payment').hide();
                $('.ad_final').hide();
                $('.ad_preview').hide();
                $('.ad_category').hide();
                $('.ad_detail').show();
                interestedProfileFun(3);
            }
            else if (getFrom == '5') {
                $('.view_particualr_profile').hide();
                $('.setting_menu').removeClass('active_setting');
                $('.c_int_profile').addClass('active_setting');
                $('.change_profile').hide();
                $('.change_password').hide();
                $('.manage_ads').hide();
                $('.edit_new_ad').hide();
                $('.partner_preferences').hide();
                $('.add_inbox').hide()
                $('.view_profile').hide();
                $('.add_new_ad').show();
                $('.newad_menu').removeClass('active_menu');
                $('.a_preview').addClass('active_menu');
                $('.ad_type').hide();
                $('.ad_payment').hide();
                $('.ad_final').hide();
                $('.ad_detail').hide();
                $('.ad_category').hide();
                $('.ad_preview').show();
                interestedProfileFun(4);
            }
            localStorage.removeItem('fromWhere')
        }



        /*===========================Search Pannel=============================*/
        vm.onInfoChagne = onInfoChagne;
        vm.searchFun = searchFun;
        vm.getGenderFun = getGenderFun;
        vm.searchObj = {
            status: '',
            keyword: '',
            gender: '',
            min_age: '',
            max_age: '',
            caste: '',
            country: '',
            religion: '',
            id: vm.userId,
            mother_tounge: '',
            min_height: '',
            max_height: '',
            current_residence: '',
            education: ''

        }

        if (localStorage.getItem("keywordFromMainPage") && localStorage.getItem("keywordFromMainPage") != "") {
            console.log("keywordFromMainPage keywordFromMainPagekeywordFromMainPage");
            vm.searchObj.keyword = localStorage.getItem("keywordFromMainPage");
            localStorage.removeItem("keywordFromMainPage");
            vm.searchFun();
        }
        else {
            viewSugesstedProfile();
        }

        function broadcastFun() {
            console.log("Broadcasted from profile");
            $rootScope.$broadcast('searchDataFromContent', vm.searchObj);
        }
        $scope.$on("searchDataFromHeader", function(event, data) {
            vm.searchObj = data;
            vm.searchFun();
        });
        $scope.$on("countryFromHeader", function(event, data) {
            console.log("Listened in header");
            vm.country = data;
        });
        function getGenderFun(value) {
            console.log("yes click")
            console.log(value)

            if (value == '') {
                $('.s_btn').removeClass('s_btn_actiuve');
                $('.all').addClass('s_btn_actiuve');
            }

            if (value == 'Male') {
                $('.s_btn').removeClass('s_btn_actiuve');
                $('.male').addClass('s_btn_actiuve');
            }
            if (value == 'Female') {
                $('.s_btn').removeClass('s_btn_actiuve');
                $('.female').addClass('s_btn_actiuve');
            }
            vm.searchObj.gender = value;
            broadcastFun();
        }

        function onInfoChagne() {
            console.log(vm.searchObj);
            broadcastFun();
        }

        function searchFun() {
//            if($state.current.name == 'mhome') {
//                alert('hello')
//                $state.go('matrimony_profile');
//            }
            vm.profileLoader = true;
            $('.setting_menu').removeClass('active_setting');
            $('.view_profile').hide();
            $('.partner_preferences').hide();
            $('.manage_ads').hide();
            $('.change_password').hide();
            $('.add_new_ad').hide();
            $('.add_inbox').hide();
            $('.edit_new_ad').hide();
            $('.view_particualr_profile').hide();
//            $('.change_password').hide();
            $('.v_profile').addClass('active_setting');
            $('.manage_ads').show();
            console.log(vm.searchObj);
            localStorage.setItem('searchObj', JSON.stringify(vm.searchObj));
            mProfileServices.search(vm.searchObj).success(function(response) {
                console.log('After searchFunsearchFunsearchFunsearchFunsearchFun');
                console.log(response);
                vm.profileLoader = false;
                vm.imgArr = [];
                if (response.status == 105) {
                    vm.allProfile = response.data;
                    angular.forEach(vm.allProfile, function(value) {
                        var imgStr = value.relevant_picture;
                        if (imgStr) {
                            var splitArr = imgStr.split(',');
                        }
                        else {
                            var splitArr = [];
                        }
                        vm.imgArr.push(splitArr);
                    })
                    console.log(vm.imgArr);
                    console.log("yes see below image arr");
                    
                    
                    //localStorage.setItem('mSearchData', JSON.stringify(response.data));
                    //$state.go('profiles');
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            }).error(function() {
                vm.profileLoader = false;
                var str = "<h4 class='danger'>Error Detected!<h4>"
                $('.msg').html("Internal Server Error, Please try after some time.");
                $('#showMsgModal').modal('show');
                $('#memUpgrade').hide();
                return false;
            });
        }


        /*=================================Membership Pannel=====================================*/
        vm.freeArr = [];
        vm.goldArr = [];
        vm.platinumArr = [];
        vm.getValidity = getValidity;
        vm.validity = '0';
        vm.planselect = planselect;
        vm.paymentStatus = $location.search();
        vm.index = 0;
        vm.showValidity = true;
        vm.showUpgrade = true;
        vm.toggleShowVal = toggleShowVal;

        function toggleShowVal(v) {
            if (v == 0) {
                vm.showValidity = true;
            } else {
                vm.showValidity = false;
            }
        }
        toggleShowVal(0);

        vm.activePlanDataMember = {
            "plan_name": "",
            "plan_validity": ""
        };

        function getPlanList() {
            mLoginRegiServices.mPlan().success(function(response) {
                console.log(response);
                console.log("see above");

                if (response.status == 105) {
                    angular.forEach(response.data, function(value) {
                        console.log('plan list valuesssss')
                        console.log(value);
                        //=========== Insert into this var to show active plan on membership page==========//
                        if (value.id == localStorage.getItem("mActivePlanID")) {
                            vm.activePlanDataMember.plan_name = value.plan_name;
                            vm.activePlanDataMember.plan_validity = value.plan_validity;
                            if (value.plan_validity == '1') {
                                vm.validity = '0';
                            } else if (value.plan_validity == '3') {
                                vm.validity = '1';
                            } else {
                                vm.validity = '2';
                            }

                            if (value.plan_name == 'silver' || value.plan_name == 'Silver' || value.plan_name == 'SILVER') {
                                vm.rmPlan = '0';
                                vm.price_silver = value.plan_price;
                            } else if (value.plan_name == 'gold' || value.plan_name == 'Gold' || value.plan_name == 'GOLD') {
                                vm.rmPlan = '1';
                                vm.price_gold = value.plan_price;
                            } else {
                                vm.rmPlan = '2';
                                vm.price_platinum = value.plan_price;
                            }
                            
                            console.log('inside matches Plan')
                            console.log(vm.activePlanDataMember)
                            console.log(vm.rmPlan)
                        }
                        //===== End of Insert into this var to show active plan on membership page========//
                        if (value.plan_name == 'silver' || value.plan_name == 'Silver' || value.plan_name == 'SILVER') {
                            vm.freeArr.push(value);
                        }
                        else if (value.plan_name == 'gold' || value.plan_name == 'Gold' || value.plan_name == 'GOLD') {
                            vm.goldArr.push(value);
                        }
                        else {
                            vm.platinumArr.push(value);
                        }
                    });
                    console.log("see below");
                    console.log(vm.freeArr);
                    console.log(vm.goldArr);
                    console.log(vm.platinumArr);
                    vm.freePlan = vm.freeArr[0].plan_price;
                    vm.goldPlan = vm.goldArr[0].plan_price;
                    vm.platinumPlan = vm.platinumArr[0].plan_price;
                    
                    if(vm.rmPlan == "0")
                    {
//                        vm.price_silver = vm.freeArr[0].plan_price;
                        vm.price_gold = vm.goldArr[0].plan_price;
                        vm.price_platinum = vm.platinumArr[0].plan_price;
                        
                    }
                    else if(vm.rmPlan == "1")
                    {
                         vm.price_silver = vm.freeArr[0].plan_price;
//                        vm.price_gold = vm.goldArr[0].plan_price;
                        vm.price_platinum = vm.platinumArr[0].plan_price;
                        
                    }
                    else if(vm.rmPlan == "2")
                    {                       
                         vm.price_silver = vm.freeArr[0].plan_price;
                        vm.price_gold = vm.goldArr[0].plan_price;
//                        vm.price_platinum = vm.platinumArr[0].plan_price;
                    }
                    
                    
                    
                    
                    
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }
        getPlanList();

        function getValidity(index) {
            console.log("vm.rmPlan: " + vm.rmPlan);
            if(index == 0)
            {
                 $("div .one").removeClass("plan_month");
                $("div .three").removeClass("plan_month_6");
                $("div .six").removeClass("plan_month_6");
                $("div .six").addClass("plan_month");
                $("div .three").addClass("plan_month");
                $("div .one").addClass("plan_month_6");
            }else if(index == 1)
            {
                 $("div .one").removeClass("plan_month_6");
                $("div .three").removeClass("plan_month");
                $("div .six").removeClass("plan_month_6");
                $("div .six").addClass("plan_month");
                $("div .three").addClass("plan_month_6");
                $("div .one").addClass("plan_month");
            }else if(index == 2)
            {
                 $("div .one").removeClass("plan_month_6");
                $("div .three").removeClass("plan_month_6");
                $("div .six").removeClass("plan_month");
                $("div .six").addClass("plan_month_6");
                $("div .three").addClass("plan_month");
                $("div .one").addClass("plan_month");
                
            }
            
            
            
            if (index == 0) {
                vm.index = index;
                console.log(vm.freeArr);
                console.log(index);
                vm.freePlan = vm.freeArr[index].plan_price;
                vm.goldPlan = vm.goldArr[index].plan_price;
                vm.platinumPlan = vm.platinumArr[index].plan_price;
                vm.showPlan = true;
               
            }
            else if (index != '') {
                console.log(index);
                vm.index = index;
                vm.freePlan = vm.freeArr[index].plan_price;
                vm.goldPlan = vm.goldArr[index].plan_price;
                vm.platinumPlan = vm.platinumArr[index].plan_price;
                vm.showPlan = true;
            }
            else {
                vm.showPlan = false;
            }
            if (vm.rmPlan == 0 || vm.rmPlan == "0") {
                vm.upgrdageObj.plan = vm.freeArr[index].id;
                vm.price = vm.freeArr[vm.index].plan_price;
                vm.price_silver = vm.freeArr[vm.index].plan_price;
                vm.price_gold = vm.goldArr[vm.index].plan_price;
                vm.price_platinum = vm.platinumArr[vm.index].plan_price;
            }
            if (vm.rmPlan == 1 || vm.rmPlan == "1") {
                vm.price = vm.goldArr[vm.index].plan_price;
                
                vm.upgrdageObj.plan = vm.goldArr[index].id;
                 vm.price_silver = vm.freeArr[vm.index].plan_price;
                vm.price_gold = vm.goldArr[vm.index].plan_price;
                vm.price_platinum = vm.platinumArr[vm.index].plan_price;
            }
            if (vm.rmPlan == 2 || vm.rmPlan == "2") {
                vm.price = vm.platinumArr[vm.index].plan_price;            
                vm.upgrdageObj.plan = vm.platinumArr[index].id;
                 vm.price_silver = vm.freeArr[vm.index].plan_price;
                vm.price_gold = vm.goldArr[vm.index].plan_price;
                vm.price_platinum = vm.platinumArr[vm.index].plan_price;
            }
            vm.showUpgrade = false;
            vm.couponText = '';
            $('.txt-apply').text('Apply');
            vm.couponApplied = false;
            console.log(vm.upgrdageObj);
        }

        vm.upgrdageObj = {
            access_token: localStorage.getItem('m_user_token'),
            id: localStorage.getItem('m_user_id'),
            txn_id: null,
            plan: null
        }
        function planselect(status) {
            console.log(status);
            vm.planSelected = status;
            vm.showUpgrade = false;
            if (status == 0) {
                //toggleShowVal(1);
                vm.price = vm.freeArr[vm.validity].plan_price;
                 vm.price_silver = vm.freeArr[vm.validity].plan_price;
                vm.upgrdageObj.plan = vm.freeArr[vm.validity].id;
                vm.planType = 'free';
            }
            else if (status == 1) {
                //toggleShowVal(1);
                vm.price = vm.goldArr[vm.validity].plan_price;
                vm.price_gold = vm.goldArr[vm.validity].plan_price;
                vm.upgrdageObj.plan = vm.goldArr[vm.validity].id;
                vm.planType = 'gold';
            }
            else if (status == 2) {
                //toggleShowVal(1);
                vm.price = vm.platinumArr[vm.validity].plan_price;
                vm.price_platinum = vm.platinumArr[vm.validity].plan_price;
                vm.upgrdageObj.plan = vm.platinumArr[vm.validity].id;
                vm.planType = 'platinum';
            }
            
            
//            $("div .one").removeClass("plan_month");
//                $("div .three").removeClass("plan_month_6");
//                $("div .six").removeClass("plan_month_6");
//                $("div .six").addClass("plan_month");
//                $("div .three").addClass("plan_month");
//                $("div .one").addClass("plan_month_6");
            
            
            vm.couponText = '';
            $('.txt-apply').text('Apply');
            vm.couponApplied = false;
            console.log(vm.upgrdageObj);
            //doPayment(status);
        }

        vm.doPayment = doPayment;

        function doPayment(status) {
            console.log(vm.upgrdageObj);
//            alert(vm.price);
            if (vm.upgrdageObj.plan === null || vm.upgrdageObj.plan === "null" || vm.upgrdageObj.plan == "") {
                alert("Please choose plan type.");
                return false;
            }
            if(localStorage.getItem('mActivePlanID') < vm.upgrdageObj.plan)
            {
                if (status != 0) {
                
                localStorage.setItem('planType', vm.planType);
                localStorage.setItem('upgradePlan', vm.upgrdageObj.plan);
                
                if(vm.price == 0)
                {
                    console.log('0 pay')
                     updatePlan();
                    
                }else
                {
                    
                   //editionPayment.payment.checkout('PayPal', vm.price, "http://localhost:8888/epardesh-phase2/epardesh/web/#/matrimony_profile/1");
//                editionPayment.payment.checkout('PayPal', vm.price, "http://54.172.109.78/epardesh/epardesh-75way/web/#/matrimony_profile/1");
                editionPayment.payment.checkout('PayPal', vm.price, "http://www.epardesh.com/matrimony_profile/1");
              //editionPayment.payment.checkout('PayPal', vm.price, "http://localhost:8888/epardesh-web/web/#/matrimony_profile/1");
           
            
                }
                
                
                

            
            }
            else {
                localStorage.setItem('m_user_type', vm.planType);
                localStorage.setItem('planType', vm.planType);
                localStorage.setItem('upgradePlan', 1);
                updatePlan();
                /*$timeout(function () {
                 $state.reload();
                 }, 1000);*/
            }
            }else
            {
                 var str = "<h4 class='danger'>Please Choose higher Plan than Current Plan! <h4>"
                $('.msg_upgrade').html(str);
                $('#showMsgModal_Upgrade').modal('show');
            }
            
        }

        if (localStorage.getItem('planType')) {
            vm.info = false;
            vm.payment = true;
            vm.plan = false;
            $('.newad_menu').removeClass('active_menu');
            $('.payment').addClass('active_menu');
            console.log("Lokeshhhhhhhh");
            console.log(vm.paymentStatus);
            if (vm.paymentStatus.st == 'Completed' || vm.paymentStatus.tx == 'Completed' || vm.paymentStatus.tx) {
                localStorage.setItem('m_user_type', localStorage.getItem('planType'));
                localStorage.removeItem('planType')
                vm.upgrdageObj.txn_id = vm.paymentStatus.tx;
                vm.upgrdageObj.plan = localStorage.getItem('upgradePlan');
                vm.upgrade_plan_type = localStorage.getItem('m_user_type');
                updatePlan();
            }
            else {
                localStorage.removeItem('planType')
                var str = "<h4 class='danger'>Payment failed. Please try again.<h4>"
                $('.msg').html(str);
                $('#showMsgModal').modal('show');
                $('#memUpgrade').hide();
            }
        }

        function updatePlan() {
            localStorage.setItem("mActivePlanID", localStorage.getItem('upgradePlan'));
            var ac_plan_id = parseInt(localStorage.getItem('upgradePlan'));
            if (ac_plan_id < 4) {
                localStorage.setItem('m_user_type', "free");
            }
            else if (ac_plan_id > 6) {
                localStorage.setItem('m_user_type', "platinum");
            }
            else {
                localStorage.setItem('m_user_type', "gold");
            }
            console.log(vm.upgrdageObj);
            mProfileServices.uppgradePlan(vm.upgrdageObj).success(function(response) {
                console.log(response);
                console.log('response');
                localStorage.removeItem('planType');
                if (response.status == 105) {
                    var str = "<h4 class='success'>Upgraded successfully.<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    localStorage.setItem('upornot', 1);
                    $timeout(function() {
                        $('#showMsgModal').modal('hide');
                        $timeout(function() {
                            $state.reload();
                        }, 1000);
                    }, 1000);
                    /*if (localStorage.getItem('planType') === 'free') {
                     alert('inside free');
                     $timeout(function() {
                     $state.reload();
                     }, 1000);
                     } else {
                     alert('inside other');
                     $timeout(function() {
                     $state.go("matrimony_profile");
                     }, 1000);
                     }*/

                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            });
        }

        /*======================================Matrimony Inbox Pannel=======================================*/
        vm.viewAll = viewAll;
        vm.replyToSenderModal = replyToSenderModal;
        vm.inboxLoader = false;
        vm.inboxObj = {
            access_token: localStorage.getItem('m_user_token'),
            id: localStorage.getItem('m_user_id'),
        }
        function getInbox() {
            vm.inboxLoader = true;
            mProfileServices.matrimonyInbox(vm.inboxObj).success(function(response) {
                vm.inboxLoader = false;
                console.log(response);
                console.log('response for inbox');
                if (response.status == 105) {
                    vm.getAllMsg = response.data;
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            });
        }
        getInbox();

        $('.c_inbox').on('click', function() {
            $('.setting_menu').removeClass('active_setting');
            $('.c_inbox').addClass('active_setting');
            $('.change_profile').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.edit_new_ad').hide();
            $('.change_password').hide();
            $('.edit_new_ad').hide();
            $('.view_profile').hide();
            $('.partner_preferences').hide();
            $('.view_particualr_profile').hide();
            $('.add_inbox').show()
            getInbox();
        });

        function viewAll(index) {
            $(".viewAll-" + index).toggle('slow');
        }

        function replyToSenderModal(data) {
            vm.sendEmailMsgObj.receiver_email = data.email;
            vm.sendEmailMsgObj.receiver_id = data.id;
            $('#replyModal').modal('show');
        }

        var modal = document.getElementById('myModal');
        var getSliderImagesArray = [];
        vm.popUpImg = popUpImg;
        vm.popUpImg2 = popUpImg2;
        vm.popUpImg3 = popUpImg3
        vm.popUpImghr = popUpImghr;
        var statusSilder = "";
        vm.slindex = 0;

        $scope.getIndex = function(currentIndex, shift) {
            var len = getSliderImagesArray.length;
            return (((currentIndex + shift) + len) % len);
        };

        $("#slPrev").on('click', function() {
            vm.slindex = $scope.getIndex(vm.slindex, -1);
            var str = '<img class="slider_img" src="' + getSliderImagesArray[vm.slindex] + '" alt="Hihi">';
            $("#imgSlide").html(str);
        })

        $("#slNext").on('click', function() {
            vm.slindex = $scope.getIndex(vm.slindex, 1);
            var str = '<img class="slider_img" src="' + getSliderImagesArray[vm.slindex] + '" alt="Hihi">';
            $("#imgSlide").html(str);
        })

        function popUpImg(getSrc, index, clkImg) {
            $scope.thumbs = [];
            var imgArray = vm.imgArr[index];
            var len = 0;
            if(imgArray != null) {
               len =  imgArray.length;
            }
            for (var i = 0; i < len + 1; i++) {
                if (i != len) {
                    $scope.thumbs.push({
                        "image": imgArray[i],
                        "name": ''
                    })
                } else {
                    if(getSrc == '' || getSrc == null) {
                        getSrc = 'https://img.shaadi.com/imgs/registration/closeup-v2.gif';
                    }
                    $scope.thumbs.push({
                        "image": getSrc,
                        "name": ''
                    })
                }

            }

            if (clkImg == -1) {
                $scope.open($scope.thumbs.length - 1);
            } else {
                $scope.open(clkImg);
            }


            console.log('images Array');
            console.log(getSrc, index, clkImg);
            console.log($scope.thumbs);
        }
        function popUpImg2(getSrc, clkImg) {

            $scope.thumbs = [];
            var imgArray = vm.relImagePathArray;
            var len = 0;
            if(imgArray != null) {
               len =  imgArray.length;
            }
            for (var i = 0; i < len + 1; i++) {
                if (i != len) {
                    $scope.thumbs.push({
                        "image": imgArray[i],
                        "name": ''
                    })
                } else {
                    if(getSrc == '' || getSrc == null) {
                        getSrc = 'https://img.shaadi.com/imgs/registration/closeup-v2.gif';
                    }
                    $scope.thumbs.push({
                        "image": getSrc,
                        "name": ''
                    })
                }

            }

            console.log($scope.thumbs);

            if (clkImg == -1) {
                $scope.open($scope.thumbs.length - 1);
            } else {
                $scope.open(clkImg);
            }


        }
        function popUpImg3(getSrc, clkImg) {

            console.log(getSrc, clkImg);
            $scope.thumbs = [];
            var imgArray = vm.relImagePathArr;
            console.log(imgArray)
            var len = 0;
            if(imgArray != null || imgArray !="") {
               len =  imgArray.length;
            }
            for (var i = 0; i < len + 1; i++) {
                if (i != len) {
                    $scope.thumbs.push({
                        "image": imgArray[i],
                        "name": ''
                    })
                } else {
                    if(getSrc == '' || getSrc == null ) {
                        getSrc = 'https://img.shaadi.com/imgs/registration/closeup-v2.gif';
                    }
                    $scope.thumbs.push({
                        "image": getSrc,
                        "name": ''
                    })
                }

            }

            console.log($scope.thumbs);

            if (clkImg == -1) {
                $scope.open($scope.thumbs.length - 1);
            } else {
                $scope.open(clkImg);
            }


        }

        function popUpImghr(img) {
            $("#slPrev").hide();
            $("#slNext").hide();
            modal.style.display = "block";
            var str = '';
            str += '<img class="slider_img" src="' + img + '" alt="Hihi">';
            $("#imgSlide").html(str);

            statusSilder = $("#sliderm").responsiveSlides({
                auto: false,
                nav: true,
                maxwidth: 300,
                speed: 500,
                minSlides: 0,
                namespace: "callbacks",
            });
        }

        var span = document.getElementsByClassName("close11")[0];
        span.onclick = function() {
            modal.style.display = "none";
        }

        function closeModal(status) {
            if (status == 1) {
                vm.viewContact = false;
            }
            else {
                vm.addContactInfoModal = false;
            }
        }


//*****report spam****************************

        function send_report() {

            var to = $("#report_to").val();
            var from = localStorage.getItem('email');
            var msg = $("#msg").val();
            if (msg == '')
            {
                vm.msgType = 'danger';
                vm.msg = 'Please Enter message';
                vm.promocheck = true;
                $timeout(function() {
                    vm.promocheck = false;

                }, 2000);
                return false;
            }


            console.log('form' + msg);
            var report_obj =
                    {
                        report_from: from,
                        report_to: to,
                        message: msg
                    };
            mProfileServices.matrimony_report_spam(report_obj).success(function(response) {

                if (response.status == 105) {

                    vm.msgType = 'success';
                    vm.msg = 'Report Sent Successfully';
                    vm.promocheck = true;
                    $timeout(function() {
                        vm.promocheck = false;
                        $('#modal-report').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $state.reload();
                    }, 2000);

                }
                else
                {

                    vm.msgType = 'success';
                    vm.msg = 'Some Error Occurs while sending';
                    vm.promocheck = true;
                    $timeout(function() {
                        vm.promocheck = false;

                    }, 2000);

                }

            });

        }



        function report(em)
        {

            $("#report_to").val(em);
            $('#modal-report').modal('show');

        }



        /**************Apply promocode***************/

        matrimonypromocode.viewpromocode().success(function(response) {
            console.log(response);
            if (response.status == 105) {
                var len = response.data.length;
                var data = response.data;
                for (var i = 0; i < len; i++) {
                    var name = response.data[i]["name"];
                    var id = response.data[i]["id"];
                    var discount = response.data[i]["discount"];
                    vm.promoname.push(name);
                    vm.promodiscount.push(discount);

                }

            }
            else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });

        function applypromocode()
        {

            var code = vm.couponText;
            if (vm.upgrdageObj.plan === null || vm.upgrdageObj.plan === "null" || vm.upgrdageObj.plan == "") {
//                alert("Please choose plan type.");
                vm.msgType = 'danger';
                vm.msg = 'Please choose plan type';
                vm.promocheck = true;
                $timeout(function() {
                    vm.promocheck = false;
                }, 2000);
                return false;
            }
            if (code == '')
            {
                vm.msgType = 'danger';
                vm.msg = 'Please Enter Promocode';
                vm.promocheck = true;
                $timeout(function() {
                    vm.promocheck = false;
                }, 2000);



            }
            else
            {

                var index = vm.promoname.indexOf(code);

                if (index >= 0)
                {

                    vm.msgType = 'success';
                    vm.msg = 'You have successfully applied';
                    vm.promocheck = true;
//                    $timeout(function() {
//                        vm.promocheck = false;
//                    }, 3000);vm.doPayment

                    var val = vm.promodiscount[index];
                    console.log(val + 'eee');
                    console.log(vm.price + 'vm.price');
                    var per = (vm.price * val) / 100;
                    console.log(per + 'per');
                    var amnt = vm.price - per;
                    vm.price = amnt.toFixed(2);
                    var price = 'Pay $' + amnt + ' Now';
                    console.log(amnt + 'amnt');
                    console.log('price new' + vm.price);
                    $('.txt-apply').text('Applied');
                    vm.couponApplied = true;
                    //$('#apply').attr('readonly', true);
                    //$('#apply').css('background-color', '#BDBDBD');
                    $('.pay').text(price);
                }
                else
                {
                    vm.msgType = 'Danger';
                    vm.msg = 'Invalid Promocode';
                    vm.promocheck = true;
                    $timeout(function() {
                        vm.promocheck = false;
                    }, 3000);

                }



            }


        }


        //*******end promocode*******
         vm.cancel = cancel;
        function cancel()
        {
            $state.reload();
            
            
        }
        
        if(localStorage.getItem('Viewfromhome'))
        {
            
            localStorage.setItem('fromWhere', 'home');
            $('.setting_menu').removeClass('active_setting');
            $('.c_profile').addClass('active_setting');
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.edit_new_ad').hide();
            $('.add_inbox').hide();
            $('.partner_preferences').hide();
            $('.view_profile').hide();
            $('.change_profile').hide();
            $('.view_particualr_profile').show();
            vm.connectReqObj.status = 1;
            vm.connectReqObj.receiver_user_id = localStorage.getItem('Viewfromhome_id');
            vm.connectReqObj.receiver_email =  localStorage.getItem('Viewfromhome_email');
            vm.connectReqObj.receiver_mobile =  localStorage.getItem('Viewfromhome_mob');
            if (localStorage.getItem('m_user_type') == 'platinum' || localStorage.getItem('m_user_type') == 'Platinum') {
                vm.connectReqObj.is_platinum_status = 1;
            }
            mProfileServices.connectRequest(vm.connectReqObj).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    var dataObj = {
                        user_id: localStorage.getItem('Viewfromhome_id'),
                        access_token: localStorage.getItem('m_user_token'),
                    }
                    vm.check_horoscope = localStorage.getItem('mActivePlanID');
                    mProfileServices.viewParticularProfile(dataObj).success(function(response) {
                        console.log("view particular profile data");
                        console.log(response);
                        
                        localStorage.removeItem('Viewfromhome')
                        localStorage.removeItem('Viewfromhome_id')
                        localStorage.removeItem('Viewfromhome_email')
                        localStorage.removeItem('Viewfromhome_mob')
                        
                        
                        
                        if (response.status == 105) {
                            console.log('fffggg')
                            vm.viewParticularProfileData = response.data[0];
                            var relImages = vm.viewParticularProfileData.relevant_picture;
                            
                             vm.relImagePathArr = [];
                            if(relImages != null)
                            {
                                var relImagesArr = relImages.split(',');
                                angular.forEach(relImagesArr, function(value, key) {
                                vm.relImagePathArr[key] = value;
                            })
                            }
                            console.log(vm.relImagePathArr)
                           console.log('view per')
                            
                            vm.socailLinksArray = [];
                            if (vm.viewParticularProfileData.social_links != null) {
                                var socialStr = vm.viewParticularProfileData.social_links;
                                var socialArr = socialStr.split(',');
                                angular.forEach(socialArr, function(value, key) {
                                    vm.socailLinksArray[key] = value;

                                })
                            }
                            vm.professionalLinksArray = [];
                            if (vm.viewParticularProfileData.professional_links != null) {
                                var proStr = vm.viewParticularProfileData.professional_links;
                                var proArr = socialStr.split(',');
                                angular.forEach(proArr, function(value, key) {
                                    vm.professionalLinksArray[key] = value;
                                })
                            }
                        } else {
                            var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                            $('.msg').html(str);
                            $('#showMsgModal').modal('show');
                            $('#memUpgrade').hide();
                            return false;
                        }
                    });
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $('#memUpgrade').hide();
                    return false;
                }
            });
            
            
        }
        
        
        
        
        


    }


})();

app.controller('ModalInstanceCtrl', function($scope, $modalInstance, imgs) {
    $scope.thumbs = imgs;
    console.log($scope.thumbs);
    $scope.ok = function() {
        $modalInstance.dismiss('cancel');
    };
});