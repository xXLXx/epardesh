(function() {
    'use strict';
    var controllerId = 'mParticularProfile';
    angular
            .module('app')
            .controller(controllerId, mParticularProfile);
    mParticularProfile.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'mProfileServices'];
    function mParticularProfile($rootScope, $scope, $state, $timeout, mProfileServices) {
        var vm = this;
         vm.closeModal = closeModal;
       
        vm.profileLoader = false;
        vm.imgArr = [];
        vm.allProfile = JSON.parse(localStorage.getItem('mSearchData'));
        angular.forEach(vm.allProfile, function(value) {
            console.log(value)
            var imgStr = value.relevant_picture;
            console.log(imgStr);
            if (imgStr) {
                var splitArr = imgStr.split(',');
            }
            else {
                var splitArr = [];
            }
            vm.imgArr.push(splitArr);
        })
        
        
        
        
           
        var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
        var modalImg = document.getElementById("img01");
        vm.popUpImg = popUpImg;
        function popUpImg(getSrc) {
            modal.style.display = "block";
            modalImg.src = getSrc;
        }
        
        
        
        var span1 = document.getElementsByClassName("close11")[0];
        console.log("span")
        console.log(span1)
        // When the user clicks on <span> (x), close the modal
        span1.onclick = function() {
            console.log("in onclick span")
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
        
        

        /*===========================Search Pannel=============================*/
        vm.onInfoChagne = onInfoChagne;
        vm.searchFun = searchFun;
        vm.getGenderFun = getGenderFun;
        vm.searchDataObj = JSON.parse(localStorage.getItem('searchObj'));
        console.log(vm.searchDataObj);
        vm.searchObj = {
            status: vm.searchDataObj.status,
            keyword: vm.searchDataObj.keyword,
            gender: vm.searchDataObj.gender,
            min_age: vm.searchDataObj.min_age,
            max_age: vm.searchDataObj.max_age,
            caste: vm.searchDataObj.caste,
            country: localStorage.getItem('m_country_name'),
            religion: vm.searchDataObj.religion,
            id: vm.searchDataObj.id
        }
        if (vm.searchObj.gender == '') {
            $('.s_btn').removeClass('s_btn_actiuve');
            $('.all').addClass('s_btn_actiuve');
        }
        if (vm.searchObj.gender == 'Male') {
            $('.s_btn').removeClass('s_btn_actiuve');
            $('.male').addClass('s_btn_actiuve');
        }
        if (vm.searchObj.gender == 'Female') {
            $('.s_btn').removeClass('s_btn_actiuve');
            $('.female').addClass('s_btn_actiuve');
        }
        function broadcastFun() {
            $rootScope.$broadcast('searchDataFromContent', vm.searchObj);
        }
        $scope.$on("searchDataFromHeader", function(event, data) {
            vm.searchObj.status = data.status;
        });
        function getGenderFun(value) {
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
            broadcastFun();
        }

        function searchFun() {
            vm.profileLoader = true;
            localStorage.setItem('searchObj', JSON.stringify(vm.searchObj));
            mProfileServices.search(vm.searchObj).success(function(response) {
                console.log(response);
                console.log('response');
                vm.profileLoader = false;
                if (response.status == 105) {
                    vm.allProfile = response.data;
                    angular.forEach(vm.allProfile, function(value) {
                        console.log(value)
                        var imgStr = value.relevant_picture;
                        console.log(imgStr);
                        if (imgStr) {
                            var splitArr = imgStr.split(',');
                        }
                        else {
                            var splitArr = [];
                        }
                        vm.imgArr.push(splitArr);
                    })
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    return false;
                }
            });
        }

        /*================================Send Request Pannel=====================================*/
        vm.connnectRequestFun = connnectRequestFun;
        vm.connectReqObj = {
            status: null,
            sender_user_id: localStorage.getItem('m_user_id'),
            access_token: localStorage.getItem('m_user_token'),
            sender_name: localStorage.getItem('m_user_name'),
            sender_email: localStorage.getItem('m_user_email'),
            receiver_user_id: null,
            receiver_email: null,
            receiver_mobile: null,
            is_platinum_status: 0,
        }
        function connnectRequestFun(data, status) {
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
                        msg = 'Added to favourate list successfully.'
                    }
                    var str = "<h4 class='success'>" + msg + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    $timeout(function() {
                        $state.reload();
                    }, 2000);
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    return false;
                }
            });
        }


        /*================================Send Email msg Pannel=====================================*/
        vm.sendEmailMsgFun = sendEmailMsgFun;
        vm.onBtnClickofSendEmail = onBtnClickofSendEmail;
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
            if (localStorage.getItem('m_user_type') == 'free' || localStorage.getItem('m_user_type') == 'Free' || localStorage.getItem('m_user_type') == 'gold' || localStorage.getItem('m_user_type') == 'Gold') {
                var str = "<h4 class='danger'>You need to upgrade your plan to paid members.<h4>"
                $('.msg').html(str);
                $('#showMsgModal').modal('show');
            }
            else {
                $('#sendModal').modal('show');
            }
        }

        function sendEmailMsgFun() {
            console.log(vm.sendEmailMsgObj);
            mProfileServices.sendEmailMsg(vm.sendEmailMsgObj).success(function(response) {
                console.log(response);
                $('#sendModal').modal('hide');
                if (response.status == 105) {
                    vm.sendEmailMsgObj.message=null;
                    var str = "<h4 class='success'>Message sent successfully.<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    return false;
                }
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
            console.log("yes inside function")
            vm.sendSMSMsgObj.receiver_mobile = data.mobile;
            if (localStorage.getItem('m_user_type') == 'platinum' || localStorage.getItem('m_user_type') == 'Platinum') {
                $('#SMSModal').modal('show');
            } else {
                var str = "<h4 class='danger'>You need to upgrade your plan to platinum in order to send text message.<h4>"
                $('.msg').html(str);
                $('#showMsgModal').modal('show');

            }
        }
        function sendSMSMsgFun() {
            mProfileServices.sendSMSMsg(vm.sendSMSMsgObj).success(function(response) {
                console.log(response);
                $('#SMSModal').modal('hide');
                if (response.status == 105) {
                    vm.sendSMSMsgObj.message=null;
                    var str = "<h4 class='success'>Message sent successfully.<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    return false;
                }
            });

        }


        /*===============================View Particular Profile================================*/
        vm.viewProfile = viewProfile;
        vm.onClickOfBackBtn = onClickOfBackBtn;
        function viewProfile(data) {
            $('.manage_ads').hide();
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
                    mProfileServices.viewParticularProfile(dataObj).success(function(response) {
                        console.log("view particular profile data");
                        console.log(response);
                        if (response.status == 105) {
                            vm.viewParticularProfileData = response.data[0];
                            var relImages = vm.viewParticularProfileData.relevant_picture;
                            var relImagesArr = relImages.split(',');
                            vm.relImagePathArr = [];
                            angular.forEach(relImagesArr, function(value, key) {
                                vm.relImagePathArr[key] = value;
                            })
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
                            return false;
                        }
                    });
                } else {
                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
                    $('.msg').html(str);
                    $('#showMsgModal').modal('show');
                    return false;
                }
            });
        }

        function onClickOfBackBtn() {
            $('.manage_ads').show();
            $('.view_particualr_profile').hide();
        }


    }
})();