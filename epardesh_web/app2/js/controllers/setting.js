(function() {
    'use strict';
    var controllerId = 'setting';
    angular
            .module('app')
            .controller(controllerId, setting);
    setting.$inject = ['$scope', '$state', '$timeout', '$location', 'settingServices', 'loginRegiServices', 'manageadServices', '$filter', 'editionPayment', 'mProfileServices','adDataServices'];
    function setting($scope, $state, $timeout, $location, settingServices, loginRegiServices, manageadServices, $filter, editionPayment, mProfileServices,adDataServices) {
        var vm = this;
        vm.premium_ad = true;
        vm.free_ad = true;
        $("#off").attr('checked', 'checked');
        $("#training_on").attr('checked', 'checked');
        vm.selectAd = selectAd;
        function selectAd()
        {
            localStorage.setItem('selectTab', '0');
            vm.getAdObj = {
                user_id: localStorage.getItem('user_id')
            }
            settingServices.viewUserAds(vm.getAdObj).success(function(response) {
                console.log("response for view ads")
                console.log(response);
                if (response.status == '105') {
                    var dt = response.data.ads;
                    var len = response.data.ads.length;
                    for (var m = 0; m < len; m++)
                    {
                        //start date
                        var d = new Date(dt[m].ad_info.date_posted);
                        var localTime = d.getTime();
                        var localOffset = d.getTimezoneOffset() * 60000;
                        var utc = localTime;
                        var st = utc + (localOffset);
                        var nd = new Date(st);
                        response.data.ads[m].ad_info.date_posted = nd;

                        //end date

                        var de = new Date(dt[m].ad_info.expiry_date);
                        var localTime_end = de.getTime();
                        var localOffset_end = de.getTimezoneOffset() * 60000;
                        var utc_end = localTime_end;
                        var end = utc_end + (localOffset_end);
                        var nd_end = new Date(end);
                        response.data.ads[m].ad_info.expiry_date = nd_end;


                    }
                    vm.adViewData = response.data;
                }
            })
        }
        vm.selectEvent = selectEvent;
        function selectEvent()
        {
            localStorage.setItem('selectTab', '1');
            vm.getEventObj = {
                user_id: localStorage.getItem('user_id'),
                access_token: localStorage.getItem('a_token')
            }
            settingServices.getEventObj(vm.getEventObj).success(function(response) {
                console.log("response for view events");
                console.log(response);
                if (response.status == '105') {
                    var dt = response.data;
                    var len = response.data.length;
                    for (var m = 0; m < len; m++)
                    {
                        //start date
                        var d = new Date(dt[m].start_date);
                        var localTime = d.getTime();
                        var localOffset = d.getTimezoneOffset() * 60000;
                        var utc = localTime;
                        var st = utc + (localOffset);
                        var nd = new Date(st);
                        response.data[m].start_date = nd;

                        //end date

                        var de = new Date(dt[m].end_date);
                        var localTime_end = de.getTime();
                        var localOffset_end = de.getTimezoneOffset() * 60000;
                        var utc_end = localTime_end;
                        var end = utc_end + (localOffset_end);
                        var nd_end = new Date(end);
                        response.data[m].end_date = nd_end;
                    }
                    vm.EventViewData = response.data;
                }
            })
        }
        vm.selectTraining = selectTraining;
        function selectTraining()
        {
            localStorage.setItem('selectTab', '2');
            vm.getTrainingObj = {
                user_id: localStorage.getItem('user_id'),
                access_token: localStorage.getItem('a_token')
            }
            settingServices.getTrainingObj(vm.getTrainingObj).success(function(response) {
                console.log("response for view training");
                console.log(response);
                if (response.status == '105') {
                    var dt = response.data;
                    var len = response.data.length;
                    for (var m = 0; m < len; m++)
                    {
                        //start date
                        var d = new Date(dt[m].training_start_date);
                        var localTime = d.getTime();
                        var localOffset = d.getTimezoneOffset() * 60000;
                        var utc = localTime;
                        var st = utc + (localOffset);
                        var nd = new Date(st);
                        response.data[m].training_start_date = nd;

                        //end date

                        var de = new Date(dt[m].training_end_date);
                        var localTime_end = de.getTime();
                        var localOffset_end = de.getTimezoneOffset() * 60000;
                        var utc_end = localTime_end;
                        var end = utc_end + (localOffset_end);
                        var nd_end = new Date(end);
                        response.data[m].training_end_date = nd_end;


                    }
                    vm.TrainingData = response.data;
                }
            })


        }


        if (localStorage.getItem('selectTab'))
        {
            vm.selectTab = localStorage.getItem('selectTab');

        }

        vm.getCity = getCity;
        vm.getCurrentState = $state.current.name;
        vm.getState = getState;
        vm.getcategory = getcategory;
        vm.getsubcategory = getsubcategory;
        vm.changepassword = changepassword;
        vm.ad_category = true;
        vm.a_category = a_category;
        vm.a_type = a_type;
        vm.a_detail = a_detail;
        vm.a_preview = a_preview;
        vm.a_payment = a_payment;
        vm.a_final = a_final;
        //event
        vm.event_type = true;
        vm.e_type = e_type;
        vm.e_detail = e_detail;
        vm.e_preview = e_preview;
        vm.e_payment = e_payment;
        vm.e_final = e_final;

        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("startdate")[0].setAttribute('min', today);
        document.getElementsByName("enddate")[0].setAttribute('min', today);

        document.getElementsByName("trainingstartdate")[0].setAttribute('min', today);
        document.getElementsByName("trainingenddate")[0].setAttribute('min', today);

        document.getElementsByName("edittrainingstartdate")[0].setAttribute('min', today);
        document.getElementsByName("edittrainingenddate")[0].setAttribute('min', today);

        $scope.items = [];
        $scope.selectedItem = {name: 'Dancer', id: 1};
        $scope.items = [{name: 'Dancer', id: 1}, {name: 'Artist', id: 2}, {name: 'Musician', id: 3}, {name: 'Singer', id: 4}];
//        vm.event_preview = event_preview;
//        vm.event_payment = event_payment;
//        vm.event_final = event_final;

        vm.addFormInput = addFormInput;
        vm.addperInput = addperInput;
        vm.fileInput = [''];
        vm.addmoreper = [''];
        vm.pernamArray = [];
        vm.perfType = [];
        vm.showLoading = true;
        vm.planselect = planselect;
        vm.planselect1 = planselect1;
        vm.location_type = location_type;
        vm.imageIdArray = [];
        vm.event_img = [];
        vm.edit_event_img = [];
        vm.organisername = localStorage.getItem('business');
        vm.event_contact = localStorage.getItem('phone');
        vm.event_email = localStorage.getItem('email');
        vm.relativeImagePathArray = [];
        vm.today = new Date();
        vm.today.toISOString();
        vm.imgSrc = '';
        vm.eventimgsrc = '';
        vm.editimgsrc = '';
        vm.saveAdFun = saveAdFun;
        vm.saveEventFun = saveEventFun;
        vm.checkfeature = false;
        vm.ifPremium = true;
        vm.limitImg = 5;
        vm.email = localStorage.getItem('email');
        vm.showMulti = true;
        vm.removeAdFun = removeAdFun;
        vm.removeEventFun = removeEventFun;
        vm.phone = localStorage.getItem('phone');
        //post new ads
        vm.goToPostAd = goToPostAd;
        function goToPostAd() {
//            localStorage.setItem('fromPost', 'yes');
//            $state.go('setting');
            $('#postnewads').modal({backdrop: 'static', keyboard: false});
            $('#postnewads').modal('show');

        }
        vm.eventad = eventad;
        function eventad()
        {
            localStorage.setItem('fromevent', '1');
            if (vm.getCurrentState === 'setting')
            {
                console.log('if else');
                $timeout(function() {
                    $state.reload()
                }, 500);



            } else
            {
                console.log('else stateee');
                $timeout(function() {
                    $state.go('setting')
                }, 500);

            }

            $('#postads').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        vm.itTraining = itTraining;
        function itTraining()
        {
            localStorage.setItem('fromtraining', '1');

            if (vm.getCurrentState === 'setting')
            {
                console.log('if else');

                $timeout(function() {
                    $state.reload()
                }, 500);

            } else
            {
                console.log('else stateee');

                $timeout(function() {
                    $state.go('setting')
                }, 500);
            }
            $('#postads').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        vm.ads = ads;
        function ads()
        {
            localStorage.setItem('fromads', '1');

            if (vm.getCurrentState === 'setting')
            {
                console.log('if else');

                $timeout(function() {
                    $state.reload()
                }, 500);
            } else
            {
                console.log('else stateee');

                $timeout(function() {
                    $state.go('setting')
                }, 500);
            }
            $('#postads').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }


        $scope.onReady = function() {
            // ... 
        };


        var allData = $location.search();
        $('.add_new_event').hide();
        $('.edit_new_event').hide();
        $('.add_new_training').hide();
        if (localStorage.getItem('fromads')) {

            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.edit_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_event').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.add_new_ad').show();
            $('html, body').animate({scrollTop: 0}, 'slow');
            localStorage.removeItem('fromads');
        }
        if (localStorage.getItem('fromevent')) {
            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.edit_new_ad').hide();
            $('.add_new_ad').hide();
            $('.edit_new_event').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.add_new_event').show();
            localStorage.removeItem('fromevent');
        }

        if (localStorage.getItem('fromtraining')) {
            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.edit_new_ad').hide();
            $('.add_new_ad').hide();
            $('.edit_new_event').hide();
            $('.add_new_event').hide();
            $('.edit_new_training').hide();
            $('.add_new_training').show();
            localStorage.removeItem('fromtraining');
        }



        function addFormInput() {
            console.log(vm.adObj.ad_type)
            console.log('dd')
            if (vm.adObj.ad_type == 0)
            {
                if (vm.fileInput != undefined && vm.fileInput != 'undefined') {
                    if (vm.fileInput.length >= 5)
                    {
                        alert('Only 5 Images are allowed!');
                        return false;
                    }
                }
            } else if (vm.adObj.ad_type == 1)
            {
                if (vm.fileInput != undefined && vm.fileInput != 'undefined') {
                    if (vm.fileInput.length >= 10)
                    {
                        alert('Only 10 Images are allowed!');
                        return false;
                    }
                }
            } else if (vm.adObj.ad_type == 2)
            {
                if (vm.fileInput != undefined && vm.fileInput != 'undefined') {
                    if (vm.fileInput.length >= 10)
                    {
                        alert('Only 10 Images are allowed!');
                        return false;
                    }
                }

            }
            vm.fileInput.push('');
        }
        function addperInput() {
//           if(vm.pernamArray[vm.pernamArray.length-1]===''){
//               console.log('sffdsgfdgdgfdggdfg');
//           }
            vm.addmoreper.push('');


        }


        vm.removeFormField = removeFormField;
        $('a.payment_select_btn').on('click', function() {
            $(".common_footer").removeClass("payment_color");
            $(this).addClass("payment_color");
            vm.planid = $(this).attr("id");
        });


        vm.removePer = removePer;
        function removePer(pos) {
            if (vm.addmoreper.length != 1)
            {
                vm.addmoreper.splice(pos, 1);
                vm.pernamArray.splice(pos, 1);
                vm.perfType.splice(pos, 1);
                console.log(vm.addmoreper);
                console.log(vm.pernamArray);
                console.log(vm.perfType);

            }
        }


        $scope.perfomerName = function(position) {

            var index = angular.element(position).scope().$index;
            var pos = index;
            var size = $('#perfomer_name' + pos).val();

            var type = $('#per_type' + pos).find(":selected").text();
            if (pos == 0)
            {
                if (size != '')
                {
                    vm.pernamArray[pos] = size;
                    vm.perfType[pos] = type;

                }
            }
            else
            {
                if (size == '')
                {
                    vm.pernamArray[pos] = '';
                    vm.perfType[pos] = '';

                } else
                {
                    vm.pernamArray[pos] = size;
                    vm.perfType[pos] = type;
                }

            }
        }

        $scope.perfomerType = function(position)
        {
            var index = angular.element(position).scope().$index;
            var pos = index;
            var type = $('#per_type' + pos).find(":selected").text();
//            alert(pos);
//            array_splice(vm.perfType, pos,type);
            vm.perfType[pos] = type;
//           alert(vm.perfType);
        }




        manageadServices.getPlan().success(function(response) {
            console.log("response for add ad plan")
            console.log(response)
            angular.forEach(response.data, function(value, key) {
                console.log("value");
                console.log(value)
                if (value.plan_type == "premium") {
                    vm.premium_price = value.plan_price;
                }
                else {
                    vm.featured_price = value.plan_price;
                }

            })
        })




        vm.showLoading = true;

        var value_img = $("#imgInp").val();
        console.log("value of featured" + value_img);
        if (!localStorage.getItem('user_name')) {
            $state.go('home');
        }
        vm.adObj = {
            ad_category_id: null,
            user_id: localStorage.getItem('user_id'),
            ad_sub_category_id: null,
            ad_tittle: null,
            ad_description: null,
            business_name: localStorage.getItem('business'),
            ad_price: null,
            state: null,
            city: null,
            images: null,
            ad_type: null,
            approved_status: 0,
            total_payable: null,
            date_posted: vm.today,
            latitude: localStorage.getItem('current_lat'),
            longitude: localStorage.getItem('current_lon')


        }

//        function a_category() {
//            $('html, body').animate({scrollTop: 0}, 'slow');
//            vm.ad_category = true;
//            vm.ad_detail = false;
//            vm.ad_preview = false;
//            vm.ad_payment = false;
//            vm.ad_final = false;
//            vm.ad_type = false;
//            $('.newad_menu').removeClass('active_menu');
//            $('.a_category').addClass('active_menu');
//        }

        function a_type() {
            $('html, body').animate({scrollTop: 0}, 'slow');
            var cat = $('#category').val();
            var sub_cat = $('#subcategory').val();

            if (ifBlank("Category", cat) == false)
                return false;
            if (ifBlank("Sub Category", sub_cat) == false)
                return false;
            vm.ad_category = false;
            vm.ad_detail = false;
            vm.ad_preview = false;
            vm.ad_payment = false;
            vm.ad_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.a_type').addClass('active_menu');
            vm.ad_type = true;
            console.log(vm.plan_status);
            if (vm.plan_status == 1) {
                vm.free_ad = false;

            }

        }



        function planselect(id) {
            $(".common_footer").removeClass("payment_color");
            $('#' + id).addClass("payment_color");
            vm.adObj.ad_type = id;
        }

//        vm.location_type
        function a_detail() {
            $('html, body').animate({scrollTop: 0}, 'slow');
            if (vm.adObj.ad_type == null) {
                var ad_type = '';
            }
            if (ifBlank("Ad Type", ad_type) == false)
                return false;
            vm.ad_category = false;
            vm.ad_type = false;
            vm.ad_preview = false;
            vm.ad_payment = false;
            vm.ad_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.a_detail').addClass('active_menu');
            vm.ad_detail = true;
            if (vm.adObj.ad_type == 1) {
                vm.limitImg = 10;
                vm.upimg = 0;
//                vm.checkfeature = true;
                vm.adObj.total_payable = vm.premium_price;
                vm.showMulti = true;

//                vm.checkpremium = false;
            }
            else if (vm.adObj.ad_type == 2) {
                vm.limitImg = 10;
                vm.upimg = 0;
//                vm.checkfeature = true;
                vm.adObj.total_payable = vm.featured_price;
                vm.showMulti = true;
            }
            else {
                vm.showMulti = false;
                vm.limitImg = 5;
                vm.upimg = 0;
                vm.adObj.total_payable = 0;
                vm.ifPremium = false;
            }
//            else if (vm.plan_status == 0) {
//                vm.checkfeature = false;
//                vm.checkpremium = true;
//            }

        }







        function a_category() {
            vm.ad_category = true;
            vm.ad_detail = false;
            vm.ad_preview = false;
            vm.ad_payment = false;
            vm.ad_final = false;
            vm.ad_type = false;
            $('.newad_menu').removeClass('active_menu');
            $('.a_category').addClass('active_menu');
        }


        function a_preview() {
            $('html, body').animate({scrollTop: 0}, 'slow');
            vm.add_title = $('#adtitle').val().toUpperCase();
            vm.ad_title = vm.add_title.split(" ");
            vm.result = [];
//            vm.result_des = [];
//            vm.ad_desc = $('#ad_des').val();
//            vm.ad_descrp = vm.ad_desc.split(" ");
//            vm.ad_descrp_len = vm.ad_descrp.length;


            vm.ad_desc = vm.char;
            vm.addespre = $(vm.ad_desc).text();
            console.log(vm.ad_desc);
            console.log('desc above');
            console.log(vm.addespre);
            if (vm.ad_desc == "")
            {
                showError('Ad Description Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.addespre.length >= '100' && vm.addespre.length <= '3200')
            {

            } else {
                showError('Description Should be in between 100 to 3200');
                $timeout(function() {
                }, 1000);
                return false;
            }



            vm.price = $("#price").val();
            if (vm.price < 0)
            {
                showError("Please Enter correct Price");
                return false;
            }
            console.log($("#region_ad").val());
            var state = $("#state_ad").val();
            vm.adObj.state = $("#state_ad").val().split(',')[0];
            vm.adObj.ad_description = vm.ad_desc;
            vm.adObj.ad_price = vm.price;
            vm.adObj.ad_tittle = vm.add_title;
            console.log(vm.adObj);
            if (vm.adObj.ad_type == '1' || vm.adObj.ad_type == 1) {
                vm.adObj.city = $("#region_ad").val();
                if (vm.adObj.city) {
                    if (vm.adObj.city.length > 0) {
                        vm.adObj.city = vm.adObj.city.toString();
                    }
                }
                else {
                    vm.adObj.city = '';
                }
            }
            else {
                vm.adObj.city = $("#region_ad1").val();
            }
//            if (vm.isFeatured == true) {
//                vm.adObj.ad_type = 2;
//                vm.adObj.total_payable = parseInt(vm.adObj.total_payable) + parseInt(vm.featured_price);
//            }
            if (ifBlank("Ad title", vm.add_title) == false)
                return false;
            if (ifBlank("Ad description", vm.ad_desc) == false)
                return false;
            if (ifBlank("Price", vm.price) == false)
                return false;
            if (ifNumeric("Price", vm.price) == false)
                return false;

            if (ifBlank("State", state) == false)
                return false;
            if (ifBlank("Region", vm.adObj.city) == false)
                return false;
//            if (ifBlank("Featured image", vm.imgSrc) == false)
//                return false;
            console.log("image");
            console.log(vm.imgsrc);
            var found1 = 0;
            vm.badword_len = vm.manage_badwords.length
            vm.adtit_len = vm.ad_title.length;


            var intRegex = /[0-9]{3}[\-][0-9]{6}|[0-9]{3}[\s][0-9]{6}|[0-9]{3}[\s][0-9]{3}[\s][0-9]{4}|[0-9]{9}|[0-9]{3}[\-][0-9]{3}[\-][0-9]{4} |(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
            if (intRegex.test(vm.add_title)) {

                showError('phone number are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }
            var regex = /([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})/;
            if (regex.test(vm.add_title))
            {
                showError('Email are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }


            if (intRegex.test(vm.addespre)) {

                showError('phone number are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (regex.test(vm.addespre))
            {
                showError('Email are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }


            console.log("length badword", vm.badword_len);
            console.log("length adtitle", vm.adtitlen)
            vm.result = [];
            for (var i = 0; i < vm.badword_len; i++) {
                for (var j = 0; j < vm.adtit_len; j++) {
                    if (vm.manage_badwords[i] == vm.ad_title[j]) {
                        vm.result.push(vm.ad_title[j]);
                        console.log(vm.result);
                        found1 = 1;
                        break;
                    }
                }
            }
            vm.result_des = [];

//            for (var x = 0; x < vm.badword_len; x++) {
//                for (var y = 0; y < vm.ad_descrp_len; y++) {
//                    if (vm.manage_badwords[x] == vm.ad_descrp[y]) {
//                        vm.result_des.push(vm.ad_descrp[y]);
//                        console.log(vm.result);
//                        found2 = 2;
//                        break;
//                    }
//                }
//            }



//            vm.adtrim = vm.addespre.replace(/\r?\n|\r/g, ' ');
             vm.adtrim = vm.addespre.replace(/[^a-zA-Z ]/g, " ");
            console.log(vm.adtrim);
            console.log('trimmmmm');

            vm.adbad_desc = vm.adtrim.split(" ");
            console.log(vm.adbad_desc);
            for (var i = 0; i < vm.adbad_desc.length; i++)
            {
                vm.adbad_desc[i] = vm.adbad_desc[i].trim();
            }
            console.log('after bad forloop');
            console.log(vm.adbad_desc);
            vm.adbad = cleanArray(vm.adbad_desc);
            function cleanArray(actual) {
                var newArray = new Array();
                for (var i = 0; i < actual.length; i++) {
                    if (actual[i]) {
                        newArray.push(actual[i]);
                    }
                }
                return newArray;
            }
            console.log(vm.adbad);
            vm.ad_descc = vm.adbad_desc.length;

            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.ad_descc; y++) {
                    if (vm.manage_badwords[x] == vm.adbad_desc[y]) {
                        vm.result_des.push(vm.adbad_desc[y]);
                        console.log(vm.result_des);
                        console.log('found2');
                        found2 = 2;
                        break;
                    }
                }


            }


            if (found1 == 1) {
                showError("Please change these words " + vm.result.toString());
                $("#adtitle").focus();
                return false;
            }
            else if (found2 == 2) {
                showError("Please change these words " + vm.result_des.toString());
                return false;
            }

            if ($('.fcheck').is(":checked")) {
                console.log("checked");
            }
            else if ($('.fcheck').prop("checked") == false) {
                console.log("unchecked");
//                    if ($('.fcheck').is(":checked")) {
//                        vm.price = vm.price + 2;
//                    }
//                    else if ($('.fcheck').is(":checked")) {
//
//                    }
            }
            vm.ad_category = false;
            vm.ad_type = false;
            vm.ad_detail = false;
            vm.ad_final = false;
            vm.ad_payment = false;
            $('.newad_menu').removeClass('active_menu');
            $('.a_preview').addClass('active_menu');
            vm.ad_preview = true;
        }
        function a_payment() {
            vm.ad_category = false;
            vm.ad_type = false;
            vm.ad_detail = false;
            vm.ad_preview = false;
            vm.ad_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.a_payment').addClass('active_menu');
            vm.ad_payment = true;
        }
        if (allData.tx && localStorage.getItem('testObject')) {
            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.edit_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_event').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.add_new_ad').show();
            var data = JSON.parse(localStorage.getItem('testObject'));
            vm.title = data.ad_tittle;
            vm.title = data.ad_tittle;
            vm.description = data.ad_description;
            vm.business = data.business_name;
            vm.price1 = data.total_payable;
            vm.ad_price1 = data.ad_price;
            vm.type = data.ad_type;
            vm.img = localStorage.getItem('img');
            console.log('imgg');

            if (!localStorage.getItem('img'))
            {
                vm.img = "";

            }
            console.log(vm.img);

            vm.isFromStatus = 1;
            a_final();
        }
        else {
            localStorage.removeItem('testObject');
        }
        function a_final() {
            vm.ad_category = false;
            vm.ad_type = false;
            vm.ad_detail = false;
            vm.ad_preview = false;
            vm.ad_payment = false;
            $('.newad_menu').removeClass('active_menu');
            $('.a_final').addClass('active_menu');
            vm.ad_final = true;
//            vm.selectTab = 0;
        }







        /*******event************************/
        vm.showLoading = true;


        var value_img = $("#imgInp").val();
        console.log("value of featured" + value_img);
        if (!localStorage.getItem('user_name')) {
            $state.go('home');
        }
        vm.eventObj = {
            access_token: localStorage.getItem('a_token'),
            user_id: localStorage.getItem('user_id'),
            event_tittle: '',
            location_type: 0,
            plan_id: null,
            total_payable: '',
            event_url: '',
            event_address: '',
            event_lattitude: localStorage.getItem('current_lat'),
            event_longitude: localStorage.getItem('current_lon'),
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
            timezone: '',
            event_image: '',
            event_phone: '',
            description: '',
            organisor: localStorage.getItem('business'),
            performer: '',
            performance_type: '',
            event_ticket_status: '',
            buy_url: ''
        }
        function location_type(type)
        {
            if (type == 0)
            {
                $('#showtext').css('display', 'block');
                $('#showtext1').css('display', 'none');
//                  $("p").css("color", "red");
                vm.eventObj.location_type = type;
            }
            else if (type == 1)
            {
                $('#showtext1').css('display', 'block');
                $('#showtext').css('display', 'none');
//                  $("p").css("color", "red");
                vm.eventObj.location_type = type;

            }

        }

        function e_type() {

            vm.event_detail = false;
            vm.event_preview = false;
            vm.event_payment = false;
            vm.event_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.event_type').addClass('active_menu');
            vm.event_type = true;
//            console.log(vm.plan_status);
//            if (vm.plan_status == 1) {
//                vm.free_ad = false;
//
//            }

        }



        function planselect1(id) {

            $(".common_footer").removeClass("payment_color");
            $('#' + id).addClass("payment_color");
            vm.eventObj.plan_id = id;
//            alert(vm.eventObj.plan_id);
        }


        function e_detail() {

            $('html, body').animate({scrollTop: 0}, 'slow');
            if (vm.eventObj.plan_id == null) {
                var plan_id = '';
//                alert(vm.eventObj.plan_id);
            }


            if (ifBlank("Event Type", plan_id) == false)
                return false;
            vm.event_category = false;
            vm.event_type = false;
            vm.event_preview = false;
            vm.event_payment = false;
            vm.event_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.e_detail').addClass('active_menu');
            vm.event_detail = true;
            if (vm.eventObj.plan_id == 1) {
                vm.limitImg = 10;
//                vm.checkfeature = true;
                vm.eventObj.total_payable = vm.premium_price;
                vm.showMulti = true;

//                vm.checkpremium = false;
            }
            else if (vm.eventObj.plan_id == 2) {
                vm.limitImg = 10;
//                vm.checkfeature = true;
                vm.eventObj.total_payable = vm.featured_price;
                vm.showMulti = true;
            }
            else {
                vm.showMulti = false;
                vm.limitImg = 5;
                vm.eventObj.total_payable = 0;
                vm.ifPremium = false;
            }
//            else if (vm.plan_status == 0) {
//                vm.checkfeature = false;
//                vm.checkpremium = true;
//            }

        }





        function e_preview() {
            vm.editRelivantIdArr = [];
            vm.editRelivantPathArr = [];
            vm.event_title = $('#eventTitle').val().toUpperCase();
            vm.even_title = vm.event_title.split(" ");
            vm.result = [];
            vm.result_des = [];

            vm.event_desc = $scope.ckeditor;
            vm.despre = $(vm.event_desc).text();
            console.log(vm.event_desc);
            console.log('desc above');
            console.log(vm.despre);
            if (vm.event_desc == "")
            {
                showError('Event Description Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.despre.length >= '100' && vm.despre.length <= '3200')
            {

            } else {
                showError('Description Should be in between 100 to 3200');
                $timeout(function() {
                }, 1000);
                return false;
            }

            vm.webUrl = '';
            vm.webUrl = $('#type_online').val();
            if (vm.webUrl != '')   // return true or false.
            {

                var urlregex = new RegExp(
                        "^(http:\/\/www.|http:\/\/|https:\/\/|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
                if (!urlregex.test(vm.webUrl))
                {
                    showError('Event Location Url Format is not Correct');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }

            }

            vm.address = $scope.address;
            vm.latitude = $scope.latitude;
            vm.longitude = $scope.longitude;

            if ($('#on').is(':checked'))
            {
                $("#type_online").prop('required', true);
                vm.eventObj.event_url = vm.webUrl;
                if (ifBlank("Event Url", vm.webUrl) == false)
                    return false;
//              validateUrl()

            }
            if ($('#off').is(':checked'))
            {
                $("#type_offline").prop('required', true);
                vm.eventObj.event_address = vm.address;
//                vm.eventObj.event_lattitude = vm.latitude;
//                vm.eventObj.event_longitude = vm.longitude;
                vm.eventObj.event_lattitude = localStorage.getItem('current_lat');
                vm.eventObj.event_longitude = localStorage.getItem('current_lon');
                console.log(vm.address)
                if (ifBlank("Event Address", vm.address) == false)
                    return false;


                if (vm.address == undefined || vm.address == 'undefined' || vm.address == "")
                {

                    showError('Event Address Cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }

            }


            vm.selectstartdate = $('#selectstartdate').val();
            vm.selectenddate = $('#selectenddate').val();
            if (ifBlank("Start date", vm.selectstartdate) == false)
                return false;
            if (ifBlank("End date", vm.selectenddate) == false)
                return false;
            if (vm.selectstartdate > vm.selectenddate)
            {
                showError('Start Date should be smaller than End Date');
                $timeout(function() {
                }, 1000);
                return false;
            }


            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = yyyy + '-' + mm + '-' + dd;


            console.log('today');
            console.log(today);
            if (today >= vm.selectenddate)
            {
                showError('End Date should be Greater than Today');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (today == vm.selectenddate)
            {
                showError('End Date should not be Equal to Today');
                $timeout(function() {
                }, 1000);
                return false;
            }
            vm.start_time = $('#start_time').val();
            vm.end_time = $('#end_time').val();
//            alert(vm.start_time);
//            alert(vm.end_time);

            if (vm.selectstartdate == vm.selectenddate)
            {
                if (vm.start_time > vm.end_time)
                {
                    showError('Start Time should be smaller Than End Time');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }
                if (vm.start_time == vm.end_time)
                {
                    showError('Start Time shouldnot be Equal to  End Time');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }
            }




            vm.timezone = $('#timezone').val();
            vm.Contact_number = $('#Contact_number').val();
//            vm.Contact_number = vm.Contact_number1.replace(/^(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
//            if (vm.Contact_number.length != 10) {
//                showError('Phone number should be 10 digit number');
//                $timeout(function() {
//                }, 1000);
//                return false;
//            }

            vm.organiser_name = $('#organiser_name').val();
            vm.perfName = cleanArray(vm.pernamArray);
            vm.perfty = cleanArray(vm.perfType);
            console.log(vm.perfName);
            console.log('ppperrrrr');
            function cleanArray(actual) {
                var newArray = new Array();
                for (var i = 0; i < actual.length; i++) {
                    if (actual[i]) {
                        newArray.push(actual[i]);
                    }
                }
                return newArray;
            }
            vm.perfomer_name = vm.perfName.join('&&');
//            alert(vm.perfomer_name);
            vm.ticket_url = '';


            vm.performer_type = vm.perfty.join('&&');
//            alert(vm.performer_type);
            vm.eventObj.event_tittle = vm.event_title;
            vm.eventObj.description = vm.event_desc;
            vm.eventObj.start_date = vm.selectstartdate;
            vm.eventObj.end_date = vm.selectenddate;
            vm.eventObj.start_time = vm.start_time;
            vm.eventObj.end_time = vm.end_time;
            vm.eventObj.timezone = vm.timezone;
            vm.eventObj.event_phone = vm.Contact_number;
            vm.eventObj.organisor = vm.organiser_name;
            vm.eventObj.performer = vm.perfomer_name;
            vm.eventObj.performance_type = vm.performer_type;
            vm.eventObj.buy_url = vm.ticket_url;
//              alert(vm.addmoreper);

            if ($('#ischeck').prop("checked") == true) {
                vm.eventObj.event_ticket_status = '1';
                $(".check_ticket").prop('required', true);
                vm.ticket_url = $('#ticket').val();
                vm.eventObj.buy_url = vm.ticket_url;
//                 alert(vm.ticket_url);e_payment
                if (ifBlank("Buy Url", vm.ticket_url) == false)
                    return false;
                if (vm.ticket_url != '')   // return true or false.
                {

                    var urlregex = new RegExp(
                            "^(http:\/\/www.|http:\/\/|https:\/\/|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
                    if (!urlregex.test(vm.ticket_url))
                    {
                        showError('Buy Url Format is not Correct');
                        $timeout(function() {
                        }, 1000);
                        return false;
                    }

                }
            }
            else if ($('#ischeck').prop("checked") == false) {
                vm.eventObj.event_ticket_status = '2';
            }
            if (ifBlank("Event title", vm.event_title) == false)
                return false;
            if (ifBlank("Event description", vm.event_desc) == null)
                return false;

            if (ifBlank("Start time", vm.start_time) == false)
                return false;
            if (ifBlank("End time", vm.end_time) == false)
                return false;
            if (ifBlank("Timezone", vm.timezone) == false)
                return false;
            if (ifBlank("Contact Number", vm.Contact_number) == false)
                return false;
            if (ifBlank("Organiser Name", vm.organiser_name) == false)
                return false;
//            if (ifBlank("Performer Name", vm.perfomer_name) == false)
//                return false;

            if (ifBlank("Event Image", vm.eventimgsrc) == false)
                return false;



            var found1 = 0;
            vm.badword_len = vm.manage_badwords.length;
            var intRegex = /[0-9]{3}[\-][0-9]{6}|[0-9]{3}[\s][0-9]{6}|[0-9]{3}[\s][0-9]{3}[\s][0-9]{4}|[0-9]{9}|[0-9]{3}[\-][0-9]{3}[\-][0-9]{4} |(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
            if (intRegex.test(vm.event_title)) {

                showError('phone number are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }
            var regex = /([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})/;
            if (regex.test(vm.event_title))
            {
                showError('Email are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }


            if (intRegex.test(vm.despre)) {

                showError('phone number are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (regex.test(vm.despre))
            {
                showError('Email are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }

            vm.event_title_split = vm.event_title.split(" ");
            vm.event_title_len = vm.event_title_split.length;
            console.log("length badword", vm.badword_len);
            console.log("length adtitle", vm.event_title_len)
            vm.result = [];
            for (var i = 0; i < vm.badword_len; i++) {
                for (var j = 0; j < vm.event_title_len; j++) {
                    if (vm.manage_badwords[i] == vm.event_title_split[j]) {
                        vm.result.push(vm.event_title_split[j]);
                        console.log(vm.result);
                        console.log('found');
                        found1 = 1;
                        break;
                    }
                }
            }

            vm.result_des = [];
//            vm.trim = vm.despre.trim();
            vm.trim = vm.despre.replace(/[^a-zA-Z ]/g, " ");
            console.log(vm.trim);
            console.log('trimmmmm');

            vm.bad_desc = vm.trim.split(" ");
            console.log(vm.bad_desc);
            for (var i = 0; i < vm.bad_desc.length; i++)
            {
                vm.bad_desc[i] = vm.bad_desc[i].trim();
            }
            console.log('after bad forloop');
            console.log(vm.bad_desc);
            vm.bad = cleanArray(vm.bad_desc);

            console.log(vm.bad);
            vm.event_descc = vm.bad_desc.length;
            var found2 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.event_descc; y++) {
                    if (vm.manage_badwords[x] == vm.bad_desc[y]) {
                        vm.result_des.push(vm.bad_desc[y]);
                        console.log(vm.result);
                        console.log('found2');
                        found2 = 2;
                        break;
                    }
                }


            }
            if (found1 == 1) {
                showError("Please change these word " + vm.result.toString() + " in Event Title");
                $("#eventTitle").focus();
                return false;
            }
            else if (found2 == 2) {
                showError("Please change these words " + vm.result_des.toString() + " in Event Description");
                return false;
            }


            vm.event_category = false;
            vm.event_type = false;
            vm.event_detail = false;
            vm.event_payment = false;
            vm.event_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.e_preview').addClass('active_menu');
            vm.event_preview = true;

            console.log(vm.eventObj);
            console.log('sdfdsfssfdfsfffffffff');

        }
        vm.update_status == 1;
        $scope.uploadEventimage = function() {
            vm.DataLoader = true;
            vm.f_img = true;
            var size = $('#event_img').get(0).files[0].size;
            size = size / 1024;
            if (size > 5120) {
                showError("Image size should be less than 5MB");
                return false
            }
             var ext = $('#event_img').val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg','bmp']) == -1) {
                showError("Only Image file format are allowed");
              vm.DataLoader = false;
             
                return false;
            }
            if (!vm.eventimgsrc) {
                var formData = new FormData(document.forms.namedItem("eventForm"));
//                vm.imagetype = $("#imgfea").attr("img_type");
//                vm.imagetype = 'featured';
//                formData.append("image_type", vm.imagetype);
                if (vm.update_status == 1) {
                    mProfileServices.uploadProfileImage($scope, function(response) {
//                        console.log("featured image response");
                        console.log(response);
                        if (response.status == 105) {
                            vm.event_img.push(response.data.id);

                            vm.eventimgsrc = response.data.profile_image_path;
                            vm.eventObj.event_image = vm.eventimgsrc;
                            localStorage.setItem('imgevent', vm.eventimgsrc);
                            vm.DataLoader = false;
                        }
                        else {
                            showError(response['message']);
                            return false;
                        }
                    }, formData);
                }
            }
            else {
                var formData = new FormData(document.forms.namedItem("eventForm"));
//                vm.imagetype = 'featured';
//                formData.append("image_type", vm.imagetype);
                formData.append("image_id", vm.eventimgsrc[0]);
                mProfileServices.uploadProfileImage($scope, function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        vm.eventimgsrc = response.data.profile_image_path;
                        vm.eventObj.event_image = vm.eventimgsrc;
                        console.log('image');
                        console.log(vm.eventObj);
                        localStorage.setItem('imgevent', vm.eventimgsrc);
                        vm.DataLoader = false;
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);
            }

        }
        function e_payment() {
            vm.event_category = false;
            vm.event_type = false;
            vm.event_detail = false;
            vm.event_preview = false;
            vm.event_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.e_payment').addClass('active_menu');
            if (vm.eventObj.plan_id == '0')
            {
                vm.event_final1 = true;
                localStorage.setItem('eventObject', JSON.stringify(vm.eventObj));
            }
            else
            {
                vm.event_payment = true;

            }

        }
        if (allData.tx && localStorage.getItem('eventObject')) {
            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.edit_new_ad').hide();
            $('.edit_new_event').hide();
//            $('.add_new_event').hide();
            $('.add_new_ad').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.add_new_event').show();
            var data = JSON.parse(localStorage.getItem('eventObject'));
            vm.title = data.event_tittle;
//            vm.title = data.ad_tittle;
            vm.description = data.description;

            vm.business = data.organisor;
            vm.total_payable = data.total_payable;
            vm.start_date = data.start_date;
            vm.end_date = data.end_date;
            vm.start_time = data.start_time;
            vm.end_time = data.end_time;
//            vm.ad_price1 = data.ad_price;
//            vm.type = data.ad_type;
            vm.imgg = data.event_image;
            vm.isFromStatus = 1;
            e_final();
        }
        else
        {
            localStorage.removeItem('eventObject');
        }

        vm.eventcheckout = eventcheckout;
        function eventcheckout() {
//            var imgId = vm.imageIdArray.concat(vm.featuredImageIdArray);
//            vm.adObj.images = imgId.toString();
            if (vm.eventchkTermCondition != true)
            {
                showError("Please accept terms and conditions.");
                return false;
            }
            localStorage.setItem('eventObject', JSON.stringify(vm.eventObj));


//            editionPayment.payment.checkout('PayPal', vm.eventObj.total_payable, "http://localhost:8888/epardesh-web/web/#/setting");
            editionPayment.payment.checkout('PayPal', vm.eventObj.total_payable, "http://www.epardesh.com/setting");
//            editionPayment.payment.checkout('PayPal', vm.eventObj.total_payable, "http://54.172.109.78/epardesh/epardesh-75way/web/#/setting");

//            editionPayment.payment.checkout('PayPal', vm.eventObj.total_payable, "http://localhost:8888/epardesh-web/web/#/setting");


        }
        ;



        function e_final() {
            vm.event_category = false;
            vm.event_type = false;
            vm.event_detail = false;
            vm.event_preview = false;
            vm.event_payment = false;
            $('.newad_menu').removeClass('active_menu');
            $('.e_final').addClass('active_menu');
            vm.event_final = true;
        }

        vm.eventafterpayment = eventafterpayment;
        function eventafterpayment() {

            vm.ApplyObj =
                    {
                        "user_id": localStorage.getItem('user_id'),
                        "promocode": localStorage.getItem('coupon')
                    }
            var data = JSON.parse(localStorage.getItem('eventObject'));
            manageadServices.saveEvent(data).success(function(response) {
                console.log("response for add event")
                console.log(response);
                if (response.status == '105') {
//                    vm.a_final();

                    manageadServices.ApplyCoupon(vm.ApplyObj).success(function(response) {

                        if (response.status == '105')
                        {
                            console.log('apply couponn')
                        }

                    })

                    vm.saveEventFun();
                }
                else {
                    vm.addAction = true;
                    showError(response.message);

                }
            })

        }

        function saveEventFun() {
            localStorage.setItem('selectTab', '1');
            localStorage.removeItem('eventObject');
            localStorage.removeItem('img');

            vm.eventObj = {
                access_token: localStorage.getItem('a_token'),
                user_id: localStorage.getItem('user_id'),
                event_tittle: '',
                location_type: '',
                plan_id: '',
                total_payable: '',
                event_url: '',
                event_address: '',
                event_lattitude: '',
                event_longitude: '',
                start_date: '',
                start_time: '',
                end_date: '',
                end_time: '',
                timezone: '',
                event_image: '',
                event_phone: '',
                description: '',
                organisor: localStorage.getItem('business'),
                performer: '',
                performance_type: '',
                event_ticket_status: '',
                buy_url: ''
            }

            $(".ad_review").show();
            $timeout(function() {
                $state.reload();
            }, 1000);

        }



        /*********************************view Badwords*************************************/
        vm.badArray = [];
        vm.badObj = {};
        manageadServices.viewbadwords().success(function(response) {
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
        /********* ************change password*************************/
        function changepassword() {
            var pass_old = $("#p_old").val();
            var pass_new = $("#p_new").val();
            var con_password = $("#c_password").val();
            if (ifBlank("Old Password", pass_old) == false)
                return false;
            if (ifBlank("New Password", pass_new) == false)
                return false;
            if (ifBlank("Confirm Password", con_password) == false)
                return false;
            if (ifMatch("Passwords", pass_new, con_password) == false)
                return false;
            var a_token = localStorage.getItem("a_token");
            vm.changeData = {
                'old_password': pass_old,
                'new_password': pass_new,
                'token': a_token,
            }
            console.log(a_token);
            settingServices.changePassword(vm.changeData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Password updated successfully..");
                    $timeout(function() {
                        $state.reload();
                    }, 1000);
                    //$state.reload();

                }
                else {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        }
        /********* ************change profile*************************/
        $("#change_busiprofile").click(function() {
            var first_name = $("#f_name").val();
            var last_name = $("#l_name").val();
            var business_name = $("#business").val();
            var website = $("#website").val();
            var phone = $("#mobile").val();
            var phone1 = $('#phone1').val();
            var phone2 = $('#phone2').val();
            var address = $("#address").val();
            var city = localStorage.getItem("city_name");
            var state = localStorage.getItem("state_name");
            var country = localStorage.getItem("country");
            var email = localStorage.getItem("email");
            if (ifBlank("First Name", first_name) == false)
                return false;
            if (ifBlank("Last Name", last_name) == false)
                return false;
//            if (ifBlank("Business Name", business_name) == false)
//                return false;
            if (ifBlank("Website", website) == false)
                return false;
            if (ifBlank("City", city) == false)
                return false;
            if (ifBlank("Mobile No.", phone) == false)
                return false;

            phone = phone.replace(/^(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
            if (phone.length === 10) {
                console.log("in if phone")
            }
            else {
                console.log("in else phone")
                showError('Phone number should be 10 digit number');
                $timeout(function() {
                }, 1000);
                return false;
            }
//        phone1 = phone1.replace(/^1(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
//            if (phone1.length === 10) {
//                console.log("in if phone")
//            }
//            else {
//                console.log("in else phone")
//                showError('Phone number should be 10 digit number');
//                $timeout(function() {
//                }, 1000);
//                return false;
//            }
//              phone2 = phone2.replace(/^1(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
//            if (phone2.length === 10) {
//                console.log("in if phone")
//            }
//            else {
//                console.log("in else phone")
//                showError('Phone number should be 10 digit number');
//                $timeout(function() {
//                }, 1000);
//                return false;
//            }


            if (ifBlank("Address", address) == false)
                return false;
            vm.editData = {
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'phone': phone,
                'phone1': phone1,
                'phone2': phone2,
                'city': city,
                'state': state,
                'country': country,
                'business_name': business_name,
                'website': website,
                'address': address,
//                'user_type': 2,
            }
            settingServices.editProfile(vm.editData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Profile updated successfully..");
                    localStorage.setItem('a_token', response.data.access_token);
                    localStorage.setItem('user_id', response.data.id);
                    localStorage.setItem('user_name', response.data.first_name);
                    localStorage.setItem('user_l_name', response.data.last_name);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('phone', response.data.phone);
                    localStorage.setItem('business', response.data.business_name);
                    localStorage.setItem('user_type', response.data.user_type);
                    $state.reload();
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        });
        $("#user_profile").click(function() {
            var first_name = $("#f_name").val();
            var last_name = $("#l_name").val();
            var phone = $("#mobile").val();
            var city = localStorage.getItem("city_name");
            var state = localStorage.getItem("state_name");
            var country = localStorage.getItem("country");
            var email = localStorage.getItem("email");
            if (ifBlank("First Name", first_name) == false)
                return false;
            if (ifBlank("Last Name", last_name) == false)
                return false;
            if (ifBlank("Mobile No.", phone) == false)
                return false;

            vm.editData = {
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'phone': phone,
                'city': city,
                'state': state,
                'country': country,
                'business_name': '',
                'website': '',
                'address': '',
            }
            settingServices.editProfile(vm.editData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Profile updated successfully..");

                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        });
        /********************** state and city*************************/
        vm.stateData = {
            'country_id': localStorage.getItem("country"),
        }
        loginRegiServices.view_states(vm.stateData).success(function(response) {
            vm.states = [];
            console.log("state response")
            console.log(response);
            if (response.status == 105) {
                vm.states = response.data;
            }
            else {
                showError(response['message']);
                return false;
            }
        });
        function getState() {
            console.log(vm.selectState);
            var state_name = vm.selectState.split(',')[0];
            var country_id = vm.selectState.split(',')[1];
            var state_id = vm.selectState.split(',')[2];
            localStorage.setItem('state_name', state_name);
//            console.log(state_name);
//            console.log(country_id);
//            console.log(state_id);
            vm.cityData = {
                'country_id': country_id,
                'state_id': state_id,
            }
            loginRegiServices.view_cities(vm.cityData).success(function(response) {
                console.log(response);
                vm.cities = [];
                if (response.status == 105) {
                    vm.cities = response.data
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }
        function getCity() {
            console.log(vm.selectcity);
            var city_name = vm.selectcity;
//            console.log(city_name);
            localStorage.setItem('city_name', city_name);
//            console.log(country_id);
//            console.log(city_id);
        }
        /*************************************view profile**********************************/
        var user_id = localStorage.getItem("user_id");
        vm.viewData = {
            'user_id': user_id,
        }
        settingServices.viewProfile(vm.viewData).success(function(response) {
            console.log("business profile data");
            console.log(response);
            if (response.status == 105) {
//                    showSuccess("Password updated successfully..");
                if (response.data.length > 0) {
                    var first_name = response.data[0]['first_name'];
                    var last_name = response.data[0]['last_name'];
                    var business_name = response.data[0]['business_name'];
                    var website = response.data[0]['website'];
                    var state_name = response.data[0]['state'];
                    var region_name = response.data[0]['city'];
                    var mobile_no = response.data[0]['phone'];
                    var phone1 = response.data[0]['phone1'];
                    var phone2 = response.data[0]['phone2'];
                    var address = response.data[0]['address'];
                    var email = response.data[0]['email'];
                    $("#f_name").val(first_name);
                    $("#l_name").val(last_name);
                    $("#business").val(business_name);
                    $("#website").val(website);
                    $('#email').val(email);
                    $('#phone1').val(phone1);
                    $('#phone2').val(phone2);
                    localStorage.setItem('state_name', state_name);
                    localStorage.setItem('city_name', region_name);
                    vm.stateData = {
                        'country_id': localStorage.getItem("country"),
                    }
                    loginRegiServices.view_states(vm.stateData).success(function(response) {
                        vm.states = [];
                        console.log("state response")
                        console.log(response);
                        if (response.status == 105) {
                            vm.states = response.data;
                            angular.forEach(vm.states, function(value) {
                                if (value.location_name == state_name) {

                                    vm.selectState = value.location_name + ',' + value.country_id + ',' + value.id;
                                    console.log(vm.selectState);
                                    vm.cityData = {
                                        'country_id': localStorage.getItem('country'),
                                        'state_id': value.id,
                                    }
                                    loginRegiServices.view_cities(vm.cityData).success(function(response) {

                                        vm.cities = [];
                                        if (response.status == 105) {
                                            vm.cities = response.data;

                                            vm.selectcity = region_name;
                                            console.log(vm.selectcity);
                                        }
                                        else {
                                            showError(response['message']);
                                            return false;
                                        }
                                    });

                                }
                            })
                        }
                        else {
                            showError(response['message']);
                            return false;
                        }
                    });

                    $("#mobile").val(mobile_no);
                    $('#phone1').val(phone1);
                    $('#phone2').val(phone2);
                    $("#address").val(address);
                }
            }
            else {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });
        /********* ************view category*************************/
        manageadServices.viewcategory().success(function(response) {
            vm.category = [];
            console.log(response);
            if (response.status == 105) {
                vm.category = response.data;
            }
            else {
                showError(response['message']);
                return false;
            }
        });
        /********* ************view subcategory*************************/
        function getcategory() {
            vm.showLoading = false;
            vm.cat_name = vm.selectcategory.split(',')[0];
            vm.category_id = vm.selectcategory.split(',')[1];
            vm.category_name = vm.cat_name;
            vm.adObj.ad_category_id = vm.category_id;
//            localStorage.setItem('category_name', cat_name);
            vm.subcatData = {
                'category_id': vm.category_id,
            }
            manageadServices.viewsubcategory(vm.subcatData).success(function(response) {
                console.log(response);
                vm.subcat = [];
                if (response.status == 105) {
                    vm.subcat = response.data
                    console.log(vm.subcat);
                    vm.showLoading = true;
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }
        function getsubcategory() {
            vm.name = vm.selectsubcategory.split(',')[0];
            vm.subcat_id = vm.selectsubcategory.split(',')[1];
            vm.ad_status = vm.selectsubcategory.split(',')[2];
            vm.subcat_parent = vm.selectsubcategory.split(',')[3];
            vm.cat_position = vm.selectsubcategory.split(',')[4];
            vm.plan_status = vm.ad_status;
            vm.subcat_name = vm.name;
            vm.adObj.ad_sub_category_id = vm.subcat_id;
        }

        /************************view and upload images**************************/
        vm.update_status = 1;
        $scope.uploadimage = function() {
            vm.DataLoader = true;
            vm.f_img = true;
            var size = $('#feature').get(0).files[0].size;

            size = size / 1024;
            if (size > 5120) {
                showError("Image size should be less than 5MB");
                return false
            }


            var ext = $('#feature').val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg','bmp']) == -1) {
                showError("Only Image file format are allowed");
                vm.DataLoader = false;
                return false
            }

           
            if (!vm.imgSrc) {
                var formData = new FormData(document.forms.namedItem("featureImageForm"));
                vm.imagetype = $("#imgfea").attr("img_type");
                vm.imagetype = 'featured';
                formData.append("image_type", vm.imagetype);
                if (vm.update_status == 1) {
                    manageadServices.upload_adImage($scope, function(response) {
                        console.log("featured image response");
                        console.log(response);
                        if (response.status == 105) {
                            vm.imageIdArray.push(response.data.id);

                            vm.imgSrc = response.data.image_path;
                            localStorage.setItem('img', vm.imgSrc);
                            vm.DataLoader = false;
                        }
                        else {
                            showError(response['message']);
                            return false;
                        }
                    }, formData);
                }
            }
            else {
                var formData = new FormData(document.forms.namedItem("featureImageForm"));
                vm.imagetype = 'featured';
                formData.append("image_type", vm.imagetype);
                formData.append("image_id", vm.imageIdArray[0]);
                manageadServices.updateImage($scope, function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        vm.imgSrc = response.data.image_path;
                        localStorage.setItem('img', vm.imgSrc);
                        vm.DataLoader = false;
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);
            }
        }
        vm.featuredImageIdArray = [];
        $scope.uploadrelImage = function(position) {
            vm.r_img = true;
            var index = angular.element(position).scope().$index;
            var pos = index;
            $('.hideLoader' + pos).show();
            var size = $('#imgrel' + pos).get(0).files[0].size;
            size = size / 1024;
            if (size > 5120) {
                showError("Image size should be less than 5MB");
                $('.hideLoader' + pos).hide();
                vm.imgLoader = false;
                return false;
            }
              var ext = $('#imgrel' + pos).val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg','bmp']) == -1) {
                showError("Only Image file format are allowed");
                $('.hideLoader' + pos).hide();
                vm.imgLoader = false;
                return false;
            }
            if (!vm.featuredImageIdArray[pos]) {
                console.log("inside if");
                var formData = new FormData(document.forms.namedItem("relevantImgForm" + index));

                vm.imagetype = 'relevant';
                formData.append("image_type", vm.imagetype);
                manageadServices.upload_adImage($scope, function(response) {
                    console.log(response);
                    $('.hideLoader' + pos).hide();
                    if (response.status == 105) {
                        vm.imageid = response.data.id;
                        vm.featuredImageIdArray.push(vm.imageid);
                        vm.relativeImagePathArray.push(response.data.image_path);
//                        $('.prview' + index).show();
//                        $('.prview' + index).attr('src', response.data.image_path);
                        console.log(vm.relativeImagePathArray);
                        vm.imgLoader = false;
                        vm.upimg = vm.upimg + 1;
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);
            }
            else {
                console.log("inside else");
                var formData = new FormData(document.forms.namedItem("relevantImgForm" + index));

                vm.imagetype = 'relevant';
                formData.append("image_type", vm.imagetype);
                formData.append("image_id", vm.featuredImageIdArray[pos]);
                manageadServices.upload_adImage($scope, function(response) {
                    $('.hideLoader' + pos).hide();
                    console.log("relative image response");
                    console.log(response);
                    if (response.status == 105) {
                        vm.imageid = response.data.id;
                        vm.relativeImagePathArray.push(response.data.image_path);
//                        $('.prview' + index).show();
//                        $('.prview' + index).attr('src', response.data.image_path);
                        vm.imgLoader = false;
                        vm.upimg = vm.upimg + 1;
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);
            }
        }

        function removeFormField(pos) {
            
            if(vm.fileInput.length != 1)
            {
                vm.fileInput.splice(pos, 1);
            }
            if(vm.upimg > 0)
            {
                 vm.upimg = vm.upimg - 1; 
            }
          
            if (vm.featuredImageIdArray[pos]) {
                vm.delData = {
                    image_id: vm.featuredImageIdArray[pos],
                }
                vm.featuredImageIdArray.splice(pos, 1);
                manageadServices.deleterelimage(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        vm.relativeImagePathArray.splice(pos, 1);
                        console.log("deleted")
                        console.log(vm.relativeImagePathArray);
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                });
            }
        }
        vm.checkout = checkout;
        function checkout() {
            var imgId = vm.imageIdArray.concat(vm.featuredImageIdArray);
            vm.adObj.images = imgId.toString();
            if (vm.chkTermCondition != true)
            {
                showError("Please accept terms and conditions.");
                return false;
            }
            localStorage.setItem('testObject', JSON.stringify(vm.adObj));
            //editionPayment.payment.checkout('PayPal', '5', $state.href('subscription', {}, { "absolute": true }));
//            manageadServices.saveAd(vm.adObj).success(function(response) {
//                console.log("response for add ad")
//                console.log(response);
//                if (response.status == '105') {
//                    editionPayment.payment.checkout('PayPal', vm.adObj.total_payable, "http://54.172.109.78/epardesh/epardesh-web/web/#/setting");
//                }
//                else {
//                    showError(response.message);
//                    return false;
//                }
//            })

//            editionPayment.payment.checkout('PayPal', vm.adObj.total_payable, "http://localhost:8888/epardesh-web/web/#/setting");

            editionPayment.payment.checkout('PayPal', vm.adObj.total_payable, "http://www.epardesh.com/setting");
//            editionPayment.payment.checkout('PayPal', vm.adObj.total_payable, "http://54.172.109.78/epardesh/epardesh-75way/web/#/setting");

//            editionPayment.payment.checkout('PayPal', vm.adObj.total_payable, "http://localhost:8888/epardesh-web/web/#/setting");


        }
        ;

        vm.afterpayment = afterpayment;
        function afterpayment() {
            var url = $location.absUrl().split('&st=')[1];
            var status = url.split("&amt=")[0];
            console.log("url" + url);
            console.log("status" + status);
            vm.ApplyObj =
                    {
                        "user_id": localStorage.getItem('user_id'),
                        "promocode": localStorage.getItem('coupon')
                    }
            console.log('check promo')
            console.log(vm.ApplyObj)
            if (status == "Completed") {
                var data = JSON.parse(localStorage.getItem('testObject'));
                manageadServices.saveAd(data).success(function(response) {
                    console.log("response for add ad")
                    console.log(response);
                    if (response.status == '105') {
//                    vm.a_final();


                        manageadServices.ApplyCoupon(vm.ApplyObj).success(function(response) {

                            if (response.status == '105')
                            {
                                console.log('apply couponn')
                            }

                        })


                        vm.saveAdFun();
                    }
                    else {
                        vm.addAction = true;
                        showError(response.message);

                    }
                })

            }
            else {
                alert("Something went wrong");
            }


        }


        vm.saveAd = saveAd;
        vm.addAction = true;
        function saveAd() {
            vm.addAction = false;
            vm.isFromStatus = 1;
            var imgId = vm.imageIdArray.concat(vm.featuredImageIdArray);
            vm.adObj.images = imgId.toString();
            manageadServices.saveAd(vm.adObj).success(function(response) {
                console.log("response for add ad")
                console.log(response);
                if (response.status == '105') {
//                    vm.a_final();
                    vm.saveAdFun();
                }
                else {
                    vm.addAction = true;
                    showError(response.message);

                }
            })
        }
        function saveAdFun() {
            localStorage.setItem('selectTab', '0');
            localStorage.removeItem('testObject');
            localStorage.removeItem('img');

            vm.adObj = {
                ad_category_id: null,
                user_id: localStorage.getItem('user_id'),
                ad_sub_category_id: null,
                ad_tittle: null,
                ad_description: null,
                business_name: localStorage.getItem('business'),
                ad_price: null,
                state: null,
                city: null,
                images: null,
                ad_type: null,
                approved_status: 0,
                total_payable: null,
                date_posted: vm.today,
                latitude: localStorage.getItem('current_lat'),
                longitude: localStorage.getItem('current_lon')
            }

            $(".ad_review").show()
            $timeout(function() {
                $state.reload();
            }, 1000);

        }

        $('.c_profile').on('click', function() {
            $('.setting_menu').removeClass('active_setting');
            $('.c_profile').addClass('active_setting');
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_ad').hide();
            $('.edit_new_event').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();

            $('.my_fav').hide();
            $('.change_profile').show();

        });
        $('.c_password').on('click', function() {
            $('.setting_menu').removeClass('active_setting');
            $('.c_password').addClass('active_setting');
            $('.change_profile').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_ad').hide();
            $('.edit_new_event').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.my_fav').hide();
            $('.change_password').show();


        });
        $('.m_ads').on('click', function() {
            $("html, body").animate({scrollTop: 0});
            $('.setting_menu').removeClass('active_setting');
            $('.m_ads').addClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.add_new_ad').hide();
            $('.edit_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_event').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.my_fav').hide();
            $('.manage_ads').show();
            location.reload();
        });
        $('.add_new').on('click', function() {

            var checkcountry = localStorage.getItem('country');
            if (checkcountry == '1' || '2')
            {
                $('.setting_menu').removeClass('active_setting');
                $('.change_profile').hide();
                $('.change_password').hide();
                $('.manage_ads').hide();
                $('.edit_new_ad').hide();
                $('.add_new_event').hide();
                $('.edit_new_event').hide();
                $('.add_new_training').hide();
                $('.my_fav').hide();
                $('.edit_new_training').hide();
                $('.add_new_ad').show();
                // angular.element(this).scope().actionDeactivatePopup();
                startFromFirst1();
            }
            else {
                alert('Free Post Ads for India And USA Only');
            }

        });
        $('.edit_new').on('click', function() {
            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_event').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.my_fav').hide();
            $('.edit_new_ad').show();
        });

        $('.edit_event').on('click', function() {
            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_event').show();
            $('.edit_new_ad').hide();
            $('.edit_new_training').hide();
            $('.my_fav').hide();
            $('.add_new_training').hide();
        });


        $('.fav').on('click', function() {
            $("html, body").animate({scrollTop: 0});
            $('.setting_menu').removeClass('active_setting');
            $('.fav').addClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.add_new_ad').hide();
            $('.edit_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_event').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.manage_ads').hide();
            $('.my_fav').show();

        });





        vm.startFromFirst = startFromFirst;
        function startFromFirst1() {
            vm.startFromFirst();
        }
        if (localStorage.getItem('isFromStatus')) {
            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.edit_new_ad').hide();
            $('.add_new_ad').show();
            $('.add_new_event').hide();
            $('.edit_new_event').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.my_fav').hide();
            $('.newad_menu').removeClass('active_menu');
            $('.a_category').addClass('active_menu');
            localStorage.removeItem('isFromStatus');
        }
        function startFromFirst() {
            if (vm.isFromStatus == 1) {
                localStorage.removeItem('testObject');
                localStorage.removeItem('img');
                localStorage.setItem('isFromStatus', 1);
                vm.isFromStatus = 0;
                $state.reload();
            }

        }
        /*=======================View Ads on Page loading=================================*/
        vm.getAdObj = {
            user_id: localStorage.getItem('user_id')
        }
        settingServices.viewUserAds(vm.getAdObj).success(function(response) {
            console.log("response for view ads")
            console.log(response);
            if (response.status == '105') {

                console.log(response);
                var dt = response.data.ads;
//                console.log(dt);
                var len = response.data.ads.length;
//                console.log(len)
                for (var m = 0; m < len; m++)
                {
                    //start date
                    var d = new Date(dt[m].ad_info.date_posted);
//                    console.log(d);
                    var localTime = d.getTime();
                    var localOffset = d.getTimezoneOffset() * 60000;
                    var utc = localTime;
                    var st = utc + (localOffset);
                    var nd = new Date(st);
                    response.data.ads[m].ad_info.date_posted = nd;

                    //end date

                    var de = new Date(dt[m].ad_info.expiry_date);
//                    console.log(de);
                    var localTime_end = de.getTime();
                    var localOffset_end = de.getTimezoneOffset() * 60000;
                    var utc_end = localTime_end;
                    var end = utc_end + (localOffset_end);
                    var nd_end = new Date(end);
                    response.data.ads[m].ad_info.expiry_date = nd_end;


                }



                vm.adViewData = response.data;
            }
        })

        /*=======================View Events on Page loading=================================*/
        vm.getEventObj = {
            user_id: localStorage.getItem('user_id'),
            access_token: localStorage.getItem('a_token')
        }
        settingServices.getEventObj(vm.getEventObj).success(function(response) {
            console.log("response for view events");
            console.log(response);
            if (response.status == '105') {

//                console.log(response);
                var dt = response.data;
//                console.log(dt);
                var len = response.data.length;
//                console.log(len)
                for (var m = 0; m < len; m++)
                {
                    //start date
                    var d = new Date(dt[m].start_date);
//                    console.log(d);
                    var localTime = d.getTime();
                    var localOffset = d.getTimezoneOffset() * 60000;
                    var utc = localTime;
                    var st = utc + (localOffset);
                    var nd = new Date(st);
                    response.data[m].start_date = nd;

                    //end date

                    var de = new Date(dt[m].end_date);
//                    console.log(de);
                    var localTime_end = de.getTime();
                    var localOffset_end = de.getTimezoneOffset() * 60000;
                    var utc_end = localTime_end;
                    var end = utc_end + (localOffset_end);
                    var nd_end = new Date(end);
                    response.data[m].end_date = nd_end;


                }




                vm.EventViewData = response.data;
            }
        })





        /*=======================Remove Ads on Page=================================*/

        function removeAdFun(data) {
            var dataObj = {
                'ad_id': data
            }

//            var ch = confirm("Are you sure you want to Delete this ad?");
            vm.confirm = true;
            vm.confirmbox = function(status)
            {
                vm.confirm = false;

                if (status == 1)
                {
                    settingServices.removeAd(dataObj).success(function(response) {
                        console.log("response for view ads")
                        console.log(response);
                        if (response.status == '105') {
                            showSuccess('Ad has been Deleted successfully.')
                            $timeout(function() {
                                $state.reload();
                            }, 1000);

                        }
                    })
                }
                elseif(status == 0)
                {
                    vm.confirm = false;
                }
            }

        }
        /*=======================Remove Event on Page=================================*/

        function removeEventFun(data) {
            var remEventObj = {
                'event_id': data,
                'access_token': localStorage.getItem('a_token')
            }

//            var ch = confirm("Are you sure you want to Delete this ad?");
            vm.event_confirm = true;
            vm.eventconfirmbox = function(status)
            {
                vm.event_confirm = false;

                if (status == 1)
                {
                    settingServices.removeEvent(remEventObj).success(function(response) {
                        console.log("response for view eventssss")
                        console.log(response);
                        if (response.status == '105') {
                            showSuccess('Event has been Deleted successfully.')
                            $timeout(function() {
                                $state.reload();
                            }, 1000);

                        }
                    })
                }
                else if (status == 0)
                {
                    vm.event_confirm = false;
                }
            }

        }



        /*====upgrade popup----*/
        vm.upgradeToPremiumPay_adspop = upgradeToPremiumPay_adspop;
        function upgradeToPremiumPay_adspop(id)
        {
            vm.ad_id = id;
            console.log(vm.ad_id);
            vm.upgradetopremium_ads = true;
            $('#upgradetopremium_ads').modal({backdrop: 'static', keyboard: false});
            $('#upgradetopremium_ads').modal('show');

        }
        vm.upgradeToFeaturedPay_adspop = upgradeToFeaturedPay_adspop;
        function upgradeToFeaturedPay_adspop(id)
        {
            vm.ad_id = id;
            console.log(vm.ad_id);
            vm.upgradetoFeatured_ads = true;
            $('#upgradetoFeatured_ads').modal({backdrop: 'static', keyboard: false});
            $('#upgradetoFeatured_ads').modal('show');

        }

        vm.upgradeToPremiumPayEvent_pop = upgradeToPremiumPayEvent_pop;
        function upgradeToPremiumPayEvent_pop(id)
        {
            vm.event_id_pop = id;
            vm.upgradetoFeatured_event = true;
            $('#upgradetopremium_event').modal({backdrop: 'static', keyboard: false});
            $('#upgradetopremium_event').modal('show');
        }

        vm.upgradeToFeaturedPayEvent_pop = upgradeToFeaturedPayEvent_pop;
        function upgradeToFeaturedPayEvent_pop(id)
        {
            vm.event_id_pop = id;
            vm.upgradetopremium_event = true;
            $('#upgradetoFeatured_event').modal({backdrop: 'static', keyboard: false});
            $('#upgradetoFeatured_event').modal('show');

        }
        vm.upgradeToPremiumPayTraining_pop = upgradeToPremiumPayTraining_pop;
        function upgradeToPremiumPayTraining_pop(id)
        {
            vm.training_id_pop = id;
            vm.upgradetopremium_training = true;
            $('#upgradetopremium_training').modal({backdrop: 'static', keyboard: false});
            $('#upgradetopremium_training').modal('show');

        }
        vm.upgradeToFeaturedPayTraining_pop = upgradeToFeaturedPayTraining_pop;
        function upgradeToFeaturedPayTraining_pop(id)
        {
            vm.training_id_pop = id;
            vm.upgradetoFeatured_training = true;
            $('#upgradetoFeatured_training').modal({backdrop: 'static', keyboard: false});
            $('#upgradetoFeatured_training').modal('show');
        }
        /*=======================Upgrade to Feature Ads=================================*/
        vm.upgradeToFeaturedPay = upgradeToFeaturedPay;
        function upgradeToFeaturedPay(data) {
            localStorage.setItem('featuredId', data)

//            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://54.172.109.78/epardesh/epardesh-web/web/#/setting");

//            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://54.172.109.78/epardesh/epardesh-75way/web/#/setting");

//            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://localhost:8888/epardesh-web/web/#/setting");

            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://www.epardesh.com/setting");
        }
        function upgradeToFeatured(id) {
            var dataObj = {
                ad_id: id
            }
            settingServices.upgradeToFeature(dataObj).success(function(response) {
                console.log("response for view ads")
                console.log(response);
                if (response.status == '105') {
                    vm.ApplyObj =
                            {
                                "user_id": localStorage.getItem('user_id'),
                                "promocode": localStorage.getItem('coupon')
                            }
                    manageadServices.ApplyCoupon(vm.ApplyObj).success(function(response) {

                        if (response.status == '105')
                        {
                            console.log('apply couponn')
                        }

                    })
                    localStorage.removeItem('featuredId')
                    $state.reload();
                }
            })
        }
        if (allData.tx && localStorage.getItem('featuredId')) {
            upgradeToFeatured(localStorage.getItem('featuredId'));
        }

        /*=======================Upgrade to Premium Ads=================================*/
        vm.upgradeToPremiumPay = upgradeToPremiumPay;
        function upgradeToPremiumPay(data) {
            localStorage.setItem('premiumId', data)
//            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://54.172.109.78/epardesh/epardesh-web/web/#/setting");
            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://www.epardesh.com/setting");
//            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://54.172.109.78/epardesh/epardesh-75way/web/#/setting");
//            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://localhost:8888/epardesh-web/web/#/setting");

        }
        function upgradeToPremium(id) {
            var dataObj = {
                ad_id: id
            }
            settingServices.upgradeToPremium(dataObj).success(function(response) {
                console.log("response for view ads")
                console.log(response);
                if (response.status == '105') {
                    vm.ApplyObj =
                            {
                                "user_id": localStorage.getItem('user_id'),
                                "promocode": localStorage.getItem('coupon')
                            }
                    manageadServices.ApplyCoupon(vm.ApplyObj).success(function(response) {

                        if (response.status == '105')
                        {
                            console.log('apply couponn')
                        }

                    })
                    localStorage.removeItem('premiumId')
                    $state.reload();
                }
            })
        }
        if (allData.tx && localStorage.getItem('premiumId')) {
            upgradeToPremium(localStorage.getItem('premiumId'));
        }

        /*=======================Upgrade to Feature Events=================================*/
        vm.upgradeToFeaturedPayEvent = upgradeToFeaturedPayEvent;
        function upgradeToFeaturedPayEvent(dat) {
            localStorage.setItem('featuredIdEvent', dat)
//            alert(dat);
//            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://localhost:8888/epardesh-web/web/#/setting");
//            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://54.172.109.78/epardesh/epardesh-75way/web/#/setting");



            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://www.epardesh.com/setting");
        }
        function upgradeToFeaturedEvent(id) {
            var EventdataObj = {
                'status': 2,
                'access_token': localStorage.getItem('a_token'),
                'event_id': id
            }
            settingServices.upgrade_event_plan(EventdataObj).success(function(response) {
                console.log("response for upgraded plan")
                console.log(response);
                if (response.status == '105') {
                    vm.ApplyObj =
                            {
                                "user_id": localStorage.getItem('user_id'),
                                "promocode": localStorage.getItem('coupon')
                            }
                    manageadServices.ApplyCoupon(vm.ApplyObj).success(function(response) {

                        if (response.status == '105')
                        {
                            console.log('apply couponn')
                        }

                    })
                    localStorage.removeItem('featuredIdEvent')
                    $state.reload();
                }
            })
        }
        if (allData.tx && localStorage.getItem('featuredIdEvent')) {
            upgradeToFeaturedEvent(localStorage.getItem('featuredIdEvent'));
        }

        /*=======================Upgrade to Premium Event=================================*/
        vm.upgradeToPremiumPayEvent = upgradeToPremiumPayEvent;
        function upgradeToPremiumPayEvent(data) {
            localStorage.setItem('premiumIdEvent', data)
//            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://localhost:8888/epardesh-web/web/#/setting");
            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://www.epardesh.com/setting");

//            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://54.172.109.78/epardesh/epardesh-75way/web/#/setting");
        }
        function upgradeToPremiumEvent(id) {
            var eventdataObj = {
                'status': 1,
                'access_token': localStorage.getItem('a_token'),
                'event_id': id
            }
            settingServices.upgrade_event_plan(eventdataObj).success(function(response) {
                console.log("response for view preimium")
                console.log(response);
                if (response.status == '105') {
                    vm.ApplyObj =
                            {
                                "user_id": localStorage.getItem('user_id'),
                                "promocode": localStorage.getItem('coupon')
                            }
                    manageadServices.ApplyCoupon(vm.ApplyObj).success(function(response) {

                        if (response.status == '105')
                        {
                            console.log('apply couponn')
                        }

                    })
                    localStorage.removeItem('premiumIdEvent')
                    $state.reload();
                }
            })
        }
        if (allData.tx && localStorage.getItem('premiumIdEvent')) {
            upgradeToPremiumEvent(localStorage.getItem('premiumIdEvent'));
        }

        /*=======================Edit Ads=================================*/
        vm.updateAdsFun = updateAdsFun;
        vm.editAdObj = {
            ad_id: null,
            ad_tittle: null,
            ad_description: null,
            images: null,
            business_name: "",
            ad_price: 0,
            user_email: localStorage.getItem('email'),
            user_first_name: localStorage.getItem('user_name'),
            user_last_name: localStorage.getItem('user_l_name')
        }
        vm.editAdFun = editAdFun;
        vm.editFeaturedIdArr = [];
//        vm.editFeaturedPathArr = [];
        vm.editRelivantIdArr = [];
        vm.editRelivantPathArr = [];
        vm.fileInputEdit = [];
        vm.limitImgEdit = 5;
        function editAdFun(data) {
            $('html, body').animate({scrollTop: 0}, 'slow');
            console.log("chk it below");
            console.log(data);
            $('#cat').val(data.category);
            $('#sub_cat').val(data.sub_category);
            vm.editFeaturedIdArr = [];
            vm.editRelivantIdArr = [];
            vm.editRelivantPathArr = [];
            vm.fileInputEdit = [];
            vm.limitImgEdit = 5;
            vm.upimgedit = 0;
            vm.editAdObj.ad_id = data.ad_info.id;
            vm.editAdObj.ad_description = data.ad_info.ad_description;
            vm.editAdObj.ad_tittle = data.ad_info.ad_tittle;
            vm.editAdObj.business_name = data.ad_info.business_name;
            vm.editAdObj.ad_price = data.ad_info.ad_price;
            console.log("see below")
            console.log(vm.editAdObj);
            var pos = 0;
            if (data.ad_info.ad_type == 0 || data.ad_info.ad_type == '0') {
                vm.limitImgEdit = 5;
            }
            else {
                vm.limitImgEdit = 10;
            }
            if (data.image_info[0] != '')
            {
                angular.forEach(data.image_info, function(value, key) {
                    console.log(data.image_info);
                    if (value[0].image_type == 'featured') {
                        vm.editFeaturedIdArr.push(value[0].id);
                        vm.imgSrcEdit = value[0].image_path;
                    }
                    else {
                        vm.fileInputEdit.push('')
                        vm.editRelivantIdArr.push(value[0].id);
                        vm.editRelivantPathArr.push(value[0].image_path);
                        vm.upimgedit = vm.upimgedit + 1;
                    }
                })
            }

            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_event').hide();
            $('.my_fav').hide();
            $('.edit_new_training').hide();
            $('.edit_new_ad').show();
            $('.add_new_training').hide();
            console.log(vm.editRelivantIdArr);
            console.log(vm.editFeaturedIdArr);
        }
        vm.addFormInputEdit = addFormInputEdit;
        function addFormInputEdit() {
            if (vm.fileInputEdit.length < vm.limitImgEdit) {
                vm.fileInputEdit.push('');
            }
        }
        vm.delData = {
            ad_id: null,
            images: null,
        }
        vm.removeFormFieldEdit = removeFormFieldEdit;
        function removeFormFieldEdit(pos1) {
            console.log(vm.fileInputEdit);
            console.log(pos1)
            
            if(vm.fileInputEdit.length != 1)
            {
                vm.fileInputEdit.splice(pos1, 1);
            }
            if(vm.upimgedit > 0)
            {
                 vm.upimgedit = vm.upimgedit - 1; 
            }
           
            if (vm.editRelivantIdArr[pos1]) {
                vm.editRelivantIdArr.splice(pos1, 1);
                vm.editRelivantPathArr.splice(pos1, 1);
                vm.delData.ad_id = vm.editAdObj.ad_id
                vm.delData.images = vm.editFeaturedIdArr.concat(vm.editRelivantIdArr).toString();
                manageadServices.deleteRelevant(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        console.log("deleted")
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                });
            }
        }
        function updateAdsFun() {
            if (ifBlank("Ad title", vm.editAdObj.ad_tittle) == false)
                return false;
            if (ifBlank("Ad description", vm.editAdObj.ad_description) == false)
                return false;
            if (ifBlank("Price", vm.editAdObj.ad_price) == false)
                return false;
            if (ifNumeric("Price", vm.editAdObj.ad_price) == false)
                return false;
            vm.ad_title = vm.editAdObj.ad_tittle.toUpperCase();
            vm.ad_descrp = vm.editAdObj.ad_description;
            vm.price = vm.editAdObj.ad_price;
            console.log(vm.price);
            if (vm.price < 0)
            {
                showError("Please Enter correct Price!");
                return false;
            }



            var found3 = 0;
            vm.badword_len = vm.manage_badwords.length
            vm.adtit_len = vm.ad_title.length;
            vm.editadlen = vm.ad_title.split(" ");


            var imgId = vm.editFeaturedIdArr.concat(vm.editRelivantIdArr);
            vm.editAdObj.images = imgId.toString();
            vm.result = [];
            for (var i = 0; i < vm.badword_len; i++) {
                for (var j = 0; j < vm.adtit_len; j++) {
                    if (vm.manage_badwords[i] == vm.ad_title[j]) {
                        vm.result.push(vm.ad_title[j]);
                        console.log(vm.result);
                        found3 = 1;
                        break;
                    }
                }
            }
            vm.result_des = [];

//            for (var x = 0; x < vm.badword_len; x++) {
//                for (var y = 0; y < vm.ad_descrp_len; y++) {
//                    if (vm.manage_badwords[x] == vm.ad_descrp[y]) {
//                        vm.result_des.push(vm.ad_descrp[y]);
//                        console.log(vm.result);
//                        found4 = 2;
//                        break;
//                    }
//                }
//            }

            vm.addespre = $(vm.ad_descrp).text();

            var intRegex = /[0-9]{3}[\-][0-9]{6}|[0-9]{3}[\s][0-9]{6}|[0-9]{3}[\s][0-9]{3}[\s][0-9]{4}|[0-9]{9}|[0-9]{3}[\-][0-9]{3}[\-][0-9]{4} |(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
            if (intRegex.test(vm.ad_title)) {

                showError('phone number are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }
            var regex = /([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})/;
            if (regex.test(vm.ad_title))
            {
                showError('Email are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }


            if (intRegex.test(vm.addespre)) {

                showError('phone number are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (regex.test(vm.addespre))
            {
                showError('Email are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }



            if (vm.addespre.length >= '100' && vm.addespre.length <= '3200')
            {

            } else {
                showError('Description Should be in between 100 to 3200');
                $timeout(function() {
                }, 1000);
                return false;
            }
            vm.adtrim = vm.addespre.replace(/[^a-zA-Z ]/g, " ");
            console.log(vm.adtrim);
            console.log('trimmmmm');

            vm.adbad_desc = vm.adtrim.split(" ");
            console.log(vm.adbad_desc);
            for (var i = 0; i < vm.adbad_desc.length; i++)
            {
                vm.adbad_desc[i] = vm.adbad_desc[i].trim();
            }
            console.log('after bad forloop');
            console.log(vm.adbad_desc);
            vm.adbad = cleanArray(vm.adbad_desc);
            function cleanArray(actual) {
                var newArray = new Array();
                for (var i = 0; i < actual.length; i++) {
                    if (actual[i]) {
                        newArray.push(actual[i]);
                    }
                }
                return newArray;
            }
            console.log(vm.adbad);
            vm.ad_descc = vm.adbad_desc.length;



            var found4 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.ad_descc; y++) {
                    if (vm.manage_badwords[x] == vm.adbad_desc[y]) {
                        vm.result_des.push(vm.adbad_desc[y]);
                        console.log(vm.result_des);
                        console.log('found2');
                        found4 = 2;
                        break;
                    }
                }


            }





            if (found3 == 1) {
                showError("Please change these words " + vm.result.toString());
                $("#adtitle").focus();
                return false;
            }
            else if (found4 == 2) {
                showError("Please change these words " + vm.result_des.toString());
                return false;
            }

            settingServices.editAd(vm.editAdObj).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    localStorage.setItem('selectTab', '0');
                    showSuccess("Ad updated successfully.");
                    $timeout(function() {
                        $state.reload();
                    }, 2000);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });

        }
        $scope.uploadimageEdit = function() {
            vm.DataLoaderedit = true;
            var size = $('#featureEdit').get(0).files[0].size;
            size = size / 1024;
            if (size > 5120) {
                showError("Image size should be less than 5MB");
                return false
            }
             var ext = $('#featureEdit').val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg','bmp']) == -1) {
                showError("Only Image file format are allowed");
               vm.DataLoaderedit = false;
                return false;
            }

            var formData = new FormData(document.forms.namedItem("featureImageFormEdit"));
            vm.imagetype = 'featured';
            formData.append("image_type", vm.imagetype);
            formData.append("image_id", vm.editFeaturedIdArr[0]);
            manageadServices.updateImage($scope, function(response) {
                console.log(response);
                if (response.status == 105) {
                    vm.imgSrcEdit = response.data.image_path;
                    localStorage.setItem('img', vm.imgSrc);
                    vm.DataLoaderedit = false;
                }
                else {
                    showError(response['message']);
                    return false;
                }
            }, formData);
        }

        $scope.uploadRelevantimageEdit = function(position) {
            vm.DataLoaderedit1 = false;
            var index = angular.element(position).scope().$index;
            var pos = index;
            $('.hideLoader' + pos).show();
            var size = $('#imgrelEdit' + pos).get(0).files[0].size;
            size = size / 1024;
            if (size > 5120) {
                showError("Image size should be less than 5MB");
                return false
            }
              var ext = $('#imgrelEdit' + pos).val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg','bmp']) == -1) {
                showError("Only Image file format are allowed");
               $('.hideLoader' + pos).hide();
                return false;
            }
            if (!vm.editRelivantIdArr[pos]) {
                console.log("inside if");
                var formData = new FormData(document.forms.namedItem("relevantImgFormEdit" + index));

                vm.imgLoader = true;
                vm.imagetype = 'relevant';
                formData.append("image_type", vm.imagetype);
                manageadServices.upload_adImage($scope, function(response) {
                    console.log(response);
                    $('.hideLoader' + pos).hide();
                    if (response.status == 105) {
                        vm.upimgedit = vm.upimgedit + 1;
                        vm.imageid = response.data.id;
                        vm.editRelivantIdArr.push(vm.imageid);
                        vm.editRelivantPathArr.push(response.data.image_path);


                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);
            }
            else {
                console.log("inside else");
                var formData = new FormData(document.forms.namedItem("relevantImgFormEdit" + index));

                vm.imagetype = 'relevant';
                formData.append("image_type", vm.imagetype);
                formData.append("image_id", vm.featuredImageIdArray[pos]);
                manageadServices.upload_adImage($scope, function(response) {
                    console.log("relative image response");
                    console.log(response);
                    $('.hideLoader' + pos).hide();
                    if (response.status == 105) {
                        vm.editRelivantPathArr.push(response.data.image_path);
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);
            }

        }



        /*=======================Edit Event=================================*/
        vm.updateEventFun = updateEventFun;
        vm.editEventObj = {
            access_token: localStorage.getItem('a_token'),
//            user_id: localStorage.getItem('user_id'),
            event_id: '',
            event_tittle: '',
            location_type: '',
            plan_id: null,
            event_url: '',
            event_address: '',
            event_lattitude: '',
            event_longitude: '',
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
            timezone: '',
            event_image: '',
            event_phone: '',
            description: '',
            organisor: '',
            performer: '',
            performance_type: '',
            event_ticket_status: '',
            buy_url: '',
            user_email: localStorage.getItem('email'),
            user_first_name: localStorage.getItem('user_name')

        }

        vm.editEventFun = editEventFun;
        vm.editFeaturedIdArr = [];
//        vm.editFeaturedPathArr = [];
        vm.editperInput = editperInput;
        vm.editmoreper = [];
        vm.edit_perfType = [];
        vm.edit_pernamArray = [];
        vm.editRelivantIdArr = [];
        vm.editRelivantPathArr = [];
        vm.fileInputEdit = [];
        vm.perEdit = [];
        vm.limitImgEdit = 5;
        function editperInput() {
//            alert('sgfd')
            vm.editmoreper.push('');
            console.log(vm.editmoreper);
        }
        vm.edit_removePer = edit_removePer;
        function edit_removePer(pos) {
            if (!pos == 0)
            {

            }
            if (vm.editmoreper.length != 1)
            {
//                vm.editmoreper.splice(pos, 1);
                vm.editmoreper.splice(pos, 1);
                vm.edit_perfType.splice(pos, 1);
                console.log(vm.editmoreper);
                console.log(vm.edit_perfType);
//                console.log(vm.perfType);

            }


        }
        $scope.edit_perfomerName = function(position) {

            var index = angular.element(position).scope().$index;
            var pos = index;
            var size = $('#edit_perfomer_name' + pos).val();
            var type = $('#edit_per_type' + pos).find(":selected").text();
            if (size != '')
            {
                vm.editmoreper[pos] = size;
                vm.edit_perfType[pos] = 'Dancer';
            }


        }
        $scope.edit_perfomerType = function(position)
        {
            var index = angular.element(position).scope().$index;
            var pos = index;
            var type = $('#edit_per_type' + pos).find(":selected").text();
//            alert(pos);
//            array_splice(vm.perfType, pos,type);
            vm.edit_perfType[pos] = type;
//           alert(vm.edit_perfType);
        }
        vm.edit_location_type = edit_location_type;
        function edit_location_type(type)
        {

            if (type == 0)
            {
                $('#edit_showtext').css('display', 'block');
                $('#edit_showtext1').css('display', 'none');
//                  $("p").css("color", "red");
//                vm.editEventObj.location_type = type;
                vm.editlocation_type = type;
            }
            else if (type == 1)
            {
                $('#edit_showtext1').css('display', 'block');
                $('#edit_showtext').css('display', 'none');
//                  $("p").css("color", "red");
//                vm.editEventObj.location_type =  type;
                vm.editlocation_type = type;

            }

        }
        $('#edit_timezone').timezones();
        $(".edit_check_ticket").change(function() {

            if (this.checked && this.value === "tt") {
//        alert('checke');
                $("#edit_ticket_url").show();
            } else if (!this.checked && this.value === "tt") {

                $("#edit_ticket_url").hide();
            }
        });
        $('#edit_ticket_url').hide();

        vm.edit_update_status == 1;
        $scope.editEventimage = function() {
            vm.DataLoader = true;
            vm.f_img = true;
            var size = $('#edit_event_img').get(0).files[0].size;
            size = size / 1024;
            if (size > 12000) {
                showError("Image size should be less than 10MB");
                return false
            }
             var ext = $('#edit_event_img').val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg','bmp']) == -1) {
                showError("Only Image file format are allowed");
               vm.DataLoader = true;
                return false;
            }
            if (!vm.editimgsrc) {
                var formData = new FormData(document.forms.namedItem("eventFormEdit"));
//                vm.imagetype = $("#imgfea").attr("img_type");
//                vm.imagetype = 'featured';
//                formData.append("image_type", vm.imagetype);
                if (vm.edit_update_status == 1) {
                    mProfileServices.uploadProfileImage($scope, function(response) {
//                        console.log("featured image response");
                        console.log(response);
                        if (response.status == 105) {
                            vm.edit_event_img.push(response.data.id);

                            vm.editimgsrc = response.data.profile_image_path;
                            vm.editEventObj.event_image = vm.editimgsrc;
                            localStorage.setItem('editimgevent', vm.editimgsrc);
                            vm.DataLoader = false;
                        }
                        else {
                            showError(response['message']);
                            return false;
                        }
                    }, formData);
                }
            }
            else {
                console.log('ffffffffffff');
                var formData = new FormData(document.forms.namedItem("eventFormEdit"));
//                vm.imagetype = 'featured';
//                formData.append("image_type", vm.imagetype);
                formData.append("image_id", vm.editimgsrc[0]);
                mProfileServices.uploadProfileImage($scope, function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        vm.editimgsrc = response.data.profile_image_path;
                        vm.editEventObj.event_image = vm.editimgsrc;

                        localStorage.setItem('editimgevent', vm.editimgsrc);
                        vm.DataLoader = false;
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);
            }

        }




        function editEventFun(data) {
            console.log(data)
            vm.editEventObj.event_id = data.id;
            vm.editEventObj.plan_id = data.plan_id;
            vm.editevent_ticket_status = data.event_ticket_status;
            vm.editevent_tittle = data.event_tittle;
            $scope.editeventdescription = data.description;

            //event edit
            $('#edit_startdate').datepicker({minDate: data.start_date, dateFormat: 'yy-mm-dd'});
            $('#edit_enddate').datepicker({minDate: data.end_date, dateFormat: 'yy-mm-dd'});
            $('#edit_start_time').timepicker();
            $('#edit_end_time').timepicker();
//            document.getElementsByName("edit_start_date")[0].setAttribute('min', data.start_date);
//        document.getElementsByName("edit_end_date")[0].setAttribute('min', data.end_date);

//            vm.strt = data.start_date.split("-");
//            vm.ddt = vm.strt[2].split("T");
//            vm.edit_start_date = new Date(vm.strt[0], vm.strt[1] - 1, vm.ddt[0]);
            $('#edit_startdate').datepicker('setDate', new Date(data.start_date));
//            vm.endd = data.end_date.split("-");
//            vm.eddt = vm.endd[2].split("T");
//            vm.edit_end_date = new Date(vm.endd[0], vm.endd[1] - 1, vm.eddt[0]);
            $('#edit_enddate').datepicker('setDate', new Date(data.end_date));


            vm.editEventObj.start_date = vm.edit_start_date;
            vm.editEventObj.end_date = vm.edit_end_date;

            $('#edit_start_time').val(data.start_time);

            $('#edit_end_time').val(data.end_time);





            $('#edit_Contact_number').val(data.event_phone);
//            vm.editEventObj.start_time = edit_start_time;
//            vm.editEventObj.end_time = vm.edit_end_time;

            vm.editevent_organisor = data.organisor;

            vm.editlocation_type = data.location_type;
            vm.editevent_ticket_status = data.event_ticket_status;
            vm.edit_buy_url = data.buy_url;
            vm.editmoreper = data.performer.split("&&");
            vm.edit_perfType = data.performance_type.split("&&");

            $scope.edit_address = data.event_address;
            $scope.edit_latitude = data.event_lattitude;
            $scope.edit_longitude = data.event_longitude;
            localStorage.setItem('edit_address', $scope.edit_address);
            vm.editimgsrc = data.event_image;

//            vm.eventObj.buy_url = data.buy_url;
            if (vm.editlocation_type == 1)
            {
                $("#edit_on").attr('checked', 'checked');
                $('#edit_showtext').css('display', 'block');
                $('#edit_showtext1').css('display', 'none');
                vm.edit_event_url = data.event_url;
//                vm.editevent_url = data.event_url;
                vm.editEventObj.location_type = vm.editlocation_type;
                console.log('insiade online')
            } else if (vm.editlocation_type == 0)
            {
                $("#edit_off").attr('checked', 'checked');
                $('#edit_showtext').css('display', 'none');
                $('#edit_showtext1').css('display', 'block');
                vm.editEventObj.location_type = vm.editlocation_type;
                vm.editEventObj.event_address = $scope.edit_address;
//                vm.editEventObj.event_lattitude = $scope.edit_latitude;
//                vm.editEventObj.event_longitude = $scope.edit_longitude;

                vm.editEventObj.event_lattitude = localStorage.getItem('current_lat');
                vm.editEventObj.event_longitude = localStorage.getItem('current_lon');
                   console.log('insiade offline')

            }

            if (vm.editevent_ticket_status == 1)
            {
                $("#edit_ticket_url").show();
                $('#edit_ticket').val(vm.edit_buy_url);
                $(".edit_check_ticket").prop("checked", true);

            } else if (vm.editevent_ticket_status == 2) {
                $(".edit_check_ticket").prop("checked", false);
            }
//            if ($('#edit_on').is(':checked'))
//            {
//                $("#edit_type_online").prop('required', true);
//                vm.editEventObj.event_url = vm.edit_event_url;
////                 if (ifBlank("Event Url", vm.edit_event_url) == false)
////                return false;
////              vm.editEventObj.event_address = data.event_address;
////              vm.editEventObj.event_lattitude = data.event_lattitude;
////              vm.editEventObj.event_longitude = data.event_longitude;
//            }
//            if ($('#edit_off').is(':checked'))
//            {
//                $("#edit_type_offline").prop('required', true);
//                vm.editEventObj.event_address = vm.edit_address;
//                vm.editEventObj.event_lattitude = vm.edit_latitude;
//                vm.editEventObj.event_longitude = vm.edit_longitude;
//
////                if (ifBlank("Event Address", vm.edit_address) == false)
////                return false;
//            }






            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_ad').hide();
            $('.my_fav').hide();
            $('.add_new_training').hide();
            $('.edit_new_training').hide();
            $('.edit_new_event').show();

        }

        function updateEventFun() {
            vm.editEventObj.event_tittle = $('#edit_eventTitle').val().toUpperCase();
//            console.log(vm.editEventObj.event_tittle);

            vm.editEventObj.description = $scope.editeventdescription;
//            console.log(vm.editEventObj.description);
            vm.editEventObj.event_lattitude = localStorage.getItem('current_lat');
            vm.editEventObj.event_longitude = localStorage.getItem('current_lon');
            vm.editEventObj.timezone = $('#edit_timezone').val();
            vm.editEventObj.start_time = $('#edit_start_time').val();
            vm.editEventObj.end_time = $('#edit_end_time').val();
            vm.editEventObj.start_date = $('#edit_startdate').val();
            vm.editEventObj.end_date = $('#edit_enddate').val();
            vm.edit_event_phone = $('#edit_Contact_number').val();

            vm.editEventObj.event_phone = vm.edit_event_phone;
            vm.editEventObj.event_image = vm.editimgsrc;
            vm.editEventObj.organisor = vm.editevent_organisor;

//             vm.edit_pertyp = vm.edit_perfType.join("&&");
//            vm.edit_pername = vm.editmoreper.join("&&");
            vm.edit_perfty = cleanArray(vm.edit_perfType);
            vm.edit_pername = cleanArray(vm.editmoreper);
            console.log(vm.perfName);
            console.log('ppperrrrr');
            function cleanArray(actual) {
                var newArray = new Array();
                for (var i = 0; i < actual.length; i++) {
                    if (actual[i]) {
                        newArray.push(actual[i]);
                    }
                }
                return newArray;
            }
            vm.editEventObj.performance_type = vm.edit_perfty.join("&&");
            vm.editEventObj.performer = vm.edit_pername.join("&&");



            if (ifBlank("Event title", vm.editEventObj.event_tittle) == false)
                return false;
            if (vm.editEventObj.description == "")
            {

                showError('Event Description Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }


            if (vm.editlocation_type == 0)
            {
                vm.editEventObj.location_type = '0';
                vm.editEventObj.event_url = $('#edit_type_online').val();
                vm.editEventObj.event_address = '';
                if (vm.editEventObj.event_url == '')
                {
                    showError('Event Location Url Cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;

                }
                if (vm.editEventObj.event_url != '')   // return true or false.
                {

                    var urlregex = new RegExp(
                            "^(http:\/\/www.|http:\/\/|https:\/\/|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
                    if (!urlregex.test(vm.editEventObj.event_url))
                    {
                        showError('Event Location Url Format is not Correct');
                        $timeout(function() {
                        }, 1000);
                        return false;
                    }

                }
            }
            else if (vm.editlocation_type == 1)
            {
                vm.editEventObj.location_type = '1';
                vm.editEventObj.event_address = $scope.edit_address;

                vm.editEventObj.event_lattitude = localStorage.getItem('current_lat');
                vm.editEventObj.event_longitude = localStorage.getItem('current_lon');


//                vm.editEventObj.event_lattitude = $scope.edit_latitude;
//                vm.editEventObj.event_longitude = $scope.edit_longitude;
                if (vm.editEventObj.event_address == '')
                {
                    showError('Event Location Address cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;

                }

            }

            if (ifBlank("Start date", vm.editEventObj.start_date) == false)
                return false;
            if (ifBlank("End date", vm.editEventObj.end_date) == false)
                return false;
            if (vm.editEventObj.start_date > vm.editEventObj.end_date)
            {
                showError('Start Date should be smaller than End Date');
                $timeout(function() {
                }, 1000);
                return false;
            }


            var today_edit = new Date();
            var dd1 = today_edit.getDate();
            var mm1 = today_edit.getMonth() + 1; //January is 0!
            var yyyy1 = today_edit.getFullYear();

            if (dd1 < 10) {
                dd1 = '0' + dd1
            }

            if (mm1 < 10) {
                mm1 = '0' + mm1
            }

            today_edit = yyyy1 + '-' + mm1 + '-' + dd1;


            console.log('today');
            console.log(today_edit);
            if (today_edit > vm.editEventObj.end_date)
            {
                console.log('rtyuioo');
                showError('End Date should be Greater than Today');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (ifBlank("Start time", vm.editEventObj.start_time) == false)
                return false;
            if (ifBlank("End time", vm.editEventObj.end_time) == false)
                return false;

            vm.EditstrtTime = $('#edit_start_time').val();
            vm.EditendTime = $('#edit_end_time').val();


            if (vm.editEventObj.start_date == vm.editEventObj.end_date)
            {
                if (vm.EditstrtTime > vm.EditendTime)
                {
                    showError('Start Time should be smaller than End Time');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }
                if (vm.EditstrtTime == vm.EditendTime)
                {
                    showError('Start Time Cannot be Equal to End Time');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }
            }




            if (ifBlank("Timezone", vm.editEventObj.timezone) == false)
                return false;
            if (ifBlank("Contact Number", vm.editEventObj.event_phone) == false)
                return false;



//            vm.edit_event_phone = vm.edit_event_phone.replace(/^(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
//            if (vm.edit_event_phone.length != 10) {
//                showError('Phone number should be 10 digit number');
//                $timeout(function() {
//                }, 1000);
//                return false;
//            }

            if (ifBlank("Organiser Name", vm.editEventObj.organisor) == false)
                return false;
            if ($('#edit_ischeck').prop("checked") == true) {
//               console.log('sfgdgdg');
                vm.editEventObj.event_ticket_status = '1';
                $(".edit_check_ticket").prop('required', true);
                vm.edit_buy_url = $('#edit_ticket').val();
                if (vm.edit_buy_url != '')   // return true or false.
                {

                    var urlregex = new RegExp(
                            "^(http:\/\/www.|http:\/\/|https:\/\/|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
                    if (!urlregex.test(vm.edit_buy_url))
                    {
                        showError('Event Buy Url Format is not Correct');
                        $timeout(function() {
                        }, 1000);
                        return false;
                    }

                }
                vm.editEventObj.buy_url = vm.edit_buy_url;
//                 alert(vm.ticket_url);e_payment
                if (ifBlank("Buy Url", vm.edit_buy_url) == false)
                    return false;
            }
            else if ($('#edit_ischeck').prop("checked") == false) {
                vm.editEventObj.event_ticket_status = '2';
            }

            if (ifBlank("Event Image", vm.editEventObj.event_image) == false)
                return false;

            vm.edit_title = vm.editEventObj.event_tittle;
            vm.editevent_desc = $scope.editeventdescription;
            vm.edit_descrp = $(vm.editevent_desc).text();
            if (vm.edit_descrp.length >= '100' && vm.edit_descrp.length <= '3200')
            {

            } else {
                showError('Description Should be in between 100 to 3200');
                $timeout(function() {
                }, 1000);
                return false;
            }
            vm.edittrim = vm.edit_descrp.replace(/[^a-zA-Z ]/g, " ");
            console.log(vm.edittrim);
            console.log('eetrimmmmm');

            vm.editbad_desc = vm.edittrim.split(" ");
            console.log(vm.editbad_desc);
            for (var i = 0; i < vm.editbad_desc.length; i++)
            {
                vm.editbad_desc[i] = vm.editbad_desc[i].trim();
            }
            console.log('after bad forloop');
            console.log(vm.editbad_desc);
            vm.editbad = cleanArray(vm.editbad_desc);

            console.log(vm.editbad);
            vm.event_des_len = vm.editbad_desc.length;



            var found3 = 0;
            vm.badword_len = vm.manage_badwords.length
            vm.event_tit_len = vm.edit_title.length;
            vm.editEvent_split = vm.edit_title.split(" ");
            var intRegex = /[0-9]{3}[\-][0-9]{6}|[0-9]{3}[\s][0-9]{6}|[0-9]{3}[\s][0-9]{3}[\s][0-9]{4}|[0-9]{9}|[0-9]{3}[\-][0-9]{3}[\-][0-9]{4} |(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
            if (intRegex.test(vm.edit_title)) {

                showError('phone number are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }
            var regex = /([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})/;
            if (regex.test(vm.edit_title))
            {
                showError('Email are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }


            if (intRegex.test(vm.edit_descrp)) {

                showError('phone number are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (regex.test(vm.edit_descrp))
            {
                showError('Email are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }


            vm.edit_result = [];
            for (var i = 0; i < vm.badword_len; i++) {
                for (var j = 0; j < vm.event_tit_len; j++) {
                    if (vm.manage_badwords[i] == vm.edit_title) {
                        vm.edit_result.push(vm.edit_title);
//                        console.log(vm.edit_result);
                        found3 = 1;
                        break;
                    }
                }
            }
            vm.edit_result_des = [];
            var found4 = 0;
            for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.event_des_len; y++) {
                    if (vm.manage_badwords[x] == vm.editbad_desc[y]) {
                        vm.edit_result_des.push(vm.editbad_desc[y]);
                        console.log(vm.edit_result_des);

                        found4 = 2;
                        break;
                    }
                }
            }
            if (found3 == 1) {
                showError("Please change these words " + vm.edit_result.toString());
                $("#edit_eventTitle").focus();
                return false;
            }
            else if (found4 == 2) {
                showError("Please change these words " + vm.edit_result_des.toString());
                return false;
            }
            localStorage.setItem('editEvent', JSON.stringify(vm.editEventObj));
//                 localStorage.setItem('',vm.editEventObj);
            settingServices.editEvent(vm.editEventObj).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    localStorage.setItem('selectTab', '1');
                    showSuccess("Event updated successfully.");
                    $timeout(function() {
                        $state.reload();
                    }, 2000);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });

        }


        /*=======end edit event=======*/


        vm.chkTitleFun = chkTitleFun;
        vm.chkTitle = true;
        function chkTitleFun(title) {

            vm.chkTitle = false;
            var data = {
                ad_tittle: title,
                ad_category_id: vm.adObj.ad_category_id,
                ad_sub_category_id: vm.adObj.ad_sub_category_id
            }
            if (title == '' || title == null) {

                vm.chkTitle = true;
                return false;
            }
//            var intRegex = /^\d+$/;
//            var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
//
//            
//            if (intRegex.test(title) || floatRegex.test(title)) {
//                showError('Numeric are not allowed in Title');
//                $timeout(function() {
//                }, 1000);
//                return false;
//               
//            }


            settingServices.checkTitle(data).success(function(response) {
                console.log("yes there")
                console.log(response);
                vm.chkTitle = true;
                if (response.status == 105) {
                    if (response.data.status == 0) {
                        showError("This title already exist.");
                        vm.title = '';
                        return false;
                    }
                    else {
                        a_preview();
                    }
                }
                else {
                    vm.chkTitle = true;
                    showError(response['message']);
                    return false;
                }
            });
        }

        /************************event checkTitle*****************/
        vm.chkEventTitleFun = chkEventTitleFun;
        vm.chkEventTitle = true;
        function chkEventTitleFun(title) {
//            alert(title);
            vm.chkEventTitle = false;
            var event_data = {
                event_tittle: title

            }
            if (title == '' || title == null) {

                vm.chkEventTitle = true;
                return false;
            }

//                e_preview();

            settingServices.checkEventTitle(event_data).success(function(response) {
                console.log("check event title");
                console.log(response);
                vm.chkEventTitle = true;
                if (response.status == 105) {
                    if (response.data.status == 0) {
                        showError("This Event title already exist.");
                        vm.event_title = '';
                        return false;
                    }
                    else {
                        e_preview();
                    }
                }
                else {
                    vm.chkEventTitle = true;
                    showError(response['message']);
                    return false;
                }
            });
        }



        /**************end******************/

        $('#timezone').timezones();
        $(".check_ticket").change(function() {

            if (this.checked && this.value === "t") {

                $("#ticket_url").show();
            } else if (!this.checked && this.value === "t") {

                $("#ticket_url").hide();
            }
        });
        $('#ticket_url').hide();

        // ********** top category*******
        vm.cnt = 4;
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


        // ************ add new training *********************************


        vm.training_type = true;
        vm.t_detail = t_detail;
        vm.t_preview = t_preview;
        vm.t_payment = t_payment;
        vm.t_final = t_final;
        vm.planTraining = planTraining;
        vm.course_type = course_type;
        $('#training_timezone').timezones();
        vm.training_img = [];
        vm.saveTrainingFun = saveTrainingFun;
        vm.showpreview = showpreview;
        vm.trainingimgsrc = '';
        vm.coursetype = 'online';


        /********* ************view Course*************************/
        settingServices.viewcourses().success(function(response) {
            vm.courses = [];
            console.log(response);
            if (response.status == 105) {
                console.log('course list');
                vm.courses = response.data;
            }
            else {
                showError(response['message']);
                return false;
            }
        });

        vm.TrainingObj = {
            access_token: localStorage.getItem('a_token'),
            training_user_id: localStorage.getItem('user_id'),
            training_course: '',
            training_tittle: '',
            training_plan_id: null,
            training_course_type: 0,
            training_course_url: '',
            training_course_address: '',
            training_lattitude: localStorage.getItem('current_lat'),
            training_longitude: localStorage.getItem('current_lon'),
            training_start_date: '',
            training_start_time: '',
            training_end_date: '',
            training_end_time: '',
            timezone: '',
            training_image: '',
            training_provider: '',
            training_fee_min: '',
            training_fee_max: '',
            training_description: '',
            training_phone: '',
            training_email: '',
            training_batch: '',
            total_payable: ''
        }



        /************************event checkTitle*****************/
        vm.chkTrainingTitleFun = chkTrainingTitleFun;
        vm.chkTrainingTitle = true;
        function chkTrainingTitleFun(title) {
            vm.training_course = $('#course').val();
            if (vm.training_course == "")
            {

                showError('Course Type Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }
            console.log('inside training titlle');



//            vm.chkTrainingTitle = false;
            var training_data = {
                training_tittle: title

            }
            if (title == '' || title == null) {

//                vm.chkTrainingTitle = true;
                showError('Enter Training Title');
                $timeout(function() {
                }, 1000);
                return false;

            }

//            settingServices.checkTrainingTitle(training_data).success(function(response) {
//                console.log("check training title");
//                console.log(response);
//                if (response.status == 105) {
//                    if (response.data.status == 0) {
////                        vm.chkTrainingTitle = true;
//                        showError("This Training title already exist.");
//                        vm.training_title = '';
//                        return false;
//                    }
//                    else {
//                        t_preview();
//                    }
//                }
//                else {
////                    vm.chkTrainingTitle = true;
//                    showError(response['message']);
//                    return false;
//                }
//            });


          t_preview();
        }



        /**************end******************/










        function planTraining(id) {

            $(".common_footer").removeClass("payment_color");
            $('#' + id).addClass("payment_color");
            vm.TrainingObj.training_plan_id = id;
//            console.log(vm.TrainingObj.training_plan_id);
        }


        function course_type(type)
        {
            console.log(type);
            if (type == 0)
            {
                $('#trainingshowtext').css('display', 'block');
                $('#trainingshowtext1').css('display', 'none');
//                  $("p").css("color", "red");
                vm.TrainingObj.training_course_type = type;
            }
            else if (type == 1)
            {
                $('#trainingshowtext1').css('display', 'block');
                $('#trainingshowtext').css('display', 'none');
//                  $("p").css("color", "red");
                vm.TrainingObj.training_course_type = type;

            }
            else if (type == 2)
            {
                $('#trainingshowtext1').css('display', 'none');
                $('#trainingshowtext').css('display', 'none');
//                  $("p").css("color", "red");
                vm.TrainingObj.training_course_type = type;

            }

        }

        /********* Training Image upload ********/
        $scope.uploadTrainingimage = function() {
            vm.training_DataLoader = true;
            vm.T_img = true;
            var size = $('#training_img').get(0).files[0].size;
            size = size / 1024;
            if (size > 5120) {
                showError("Image size should be less than 5MB");
                return false
            }
            var ext = $('#training_img').val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg','bmp']) == -1) {
                showError("Only Image file format are allowed");
             vm.training_DataLoader = false;
                return false;
            }
            if (!vm.trainingimgsrc) {

                var formData = new FormData(document.forms.namedItem("TrainingForm"));
                mProfileServices.uploadProfileImage($scope, function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        vm.training_img.push(response.data.id);

                        vm.trainingimgsrc = response.data.profile_image_path;
                        vm.TrainingObj.training_image = vm.trainingimgsrc;
                        localStorage.setItem('trainingimg', vm.trainingimgsrc);
                        vm.training_DataLoader = false;
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);

            }
            else {
                var formData = new FormData(document.forms.namedItem("TrainingForm"));
                formData.append("image_id", vm.trainingimgsrc[0]);
                mProfileServices.uploadProfileImage($scope, function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        vm.trainingimgsrc = response.data.profile_image_path;
                        vm.TrainingObj.training_image = vm.trainingimgsrc;
                        console.log('image');
                        console.log(vm.TrainingObj);
                        localStorage.setItem('trainingimg', vm.trainingimgsrc);
                        vm.training_DataLoader = false;
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);
            }

        }

        /******* End Image ********/
        /**** Show Preview *****/
        function showpreview()
        {
            vm.training_titlepre = $('#TrainingTitle').val();
            vm.training_descpre = $scope.trainingckeditor;
            if (ifBlank("Title", vm.training_titlepre) == false)
                return false;

            if (vm.training_descpre == "")
            {

                showError('Description Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }
            vm.trainingImgPre = vm.trainingimgsrc;
            console.log(vm.trainingImgPre);
            if (vm.trainingImgPre == "")
            {
                showError('Upload Image to show preview');
                $timeout(function() {
                }, 1000);
                return false;
            }


            $('#trainingPreview').modal({backdrop: 'static', keyboard: false});
            $('#trainingPreview').modal('show');





        }



        function t_detail() {
            if (vm.TrainingObj.training_plan_id == null) {
                var training_plan_id = '';
//                alert(vm.eventObj.plan_id);
            }


            if (ifBlank("Training Type", training_plan_id) == false)
                return false;

            vm.training_type = false;
            vm.training_preview = false;
            vm.training_payment = false;
            vm.training_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.t_detail').addClass('active_menu');
            vm.training_detail = true;
            if (vm.TrainingObj.training_plan_id == 1) {
                vm.TrainingObj.total_payable = vm.premium_price;
                vm.showMulti = true;

            }
            else if (vm.TrainingObj.training_plan_id == 2) {
                vm.TrainingObj.total_payable = vm.featured_price;
            }
            else {
                vm.TrainingObj.total_payable = 0;
                vm.ifPremium = false;
            }

        }


        function t_preview()
        {
            vm.training_course = $('#course').val();
            vm.training_title = $('#TrainingTitle').val().toUpperCase();
            vm.training_desc = $scope.trainingckeditor;
            vm.training_despre = $(vm.training_desc).text();
            vm.training_webUrl = '';
            vm.training_webUrl = $('#trainingtype_online').val();
            vm.training_startdate = $('#trainingstartdate').val();
            vm.training_enddate = $('#trainingenddate').val();

            vm.training_start_time = $('#training_start_time').val();
            vm.training_end_time = $('#training_end_time').val();
            console.log('timee')
            console.log(vm.training_start_time)
            console.log(vm.training_end_time)
            vm.training_timezone = $('#training_timezone').val();
            vm.training_provider_name = $('#provider_name').val();
            vm.training_Contact_number = $('#Training_Contact_number').val();
            vm.trainig_fee_min = parseFloat($('#fee_min').val());
            vm.trainig_fee_max = parseFloat($('#fee_max').val());
            vm.trainig_email = $('#training_email').val();
            vm.trainig_batch = $('#training_batch').val();
            vm.training_address = $scope.trainingaddress;
            vm.training_latitude = $scope.traininglatitude;
            vm.training_longitude = $scope.traininglongitude;


            if (ifBlank("Course Type", vm.training_course) == false)
                return false;

            if (ifBlank("Title", vm.training_title) == false)
                return false;
            if (vm.training_course == "")
            {

                showError('Course Type Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.training_desc == "")
            {

                showError('Description Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.training_despre.length >= '100' && vm.training_despre.length <= '3200')
            {

            } else {
                showError('Description Should be in between 100 to 3200');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (ifBlank("Image ", vm.trainingimgsrc) == false)
                return false;



            if ($('#training_on').is(':checked'))
            {
                console.log('inside training on');
                $("#trainingtype_online").prop('required', true);
                vm.TrainingObj.training_course_url = vm.training_webUrl;
                vm.TrainingObj.training_course_address = "";
                vm.TrainingObj.training_lattitude = localStorage.getItem('current_lat');
                vm.TrainingObj.training_longitude = localStorage.getItem('current_lon');
                if (ifBlank("Training Url", vm.training_webUrl) == false)
                    return false;

                if (vm.training_webUrl != '')   // return true or false.
                {

                    var urlregex = new RegExp(
                            "^(http:\/\/www.|http:\/\/|https:\/\/|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
                    if (!urlregex.test(vm.training_webUrl))
                    {
                        showError('Website Url Format is not Correct');
                        $timeout(function() {
                        }, 1000);
                        return false;
                    }

                }


            }
            if ($('#training_off').is(':checked'))
            {
                console.log('inside training off');
                $("#trainingtype_offline").prop('required', true);
                vm.TrainingObj.training_course_address = vm.training_address;
                vm.TrainingObj.training_lattitude = localStorage.getItem('current_lat');
                vm.TrainingObj.training_longitude = localStorage.getItem('current_lon');

                if (ifBlank("Training Address", vm.training_address) == false)
                    return false;


                if (vm.training_address == undefined || vm.training_address == 'undefined' || vm.training_address == "")
                {

                    showError('Training Address Cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }

            }

            if (ifBlank("Start date", vm.training_startdate) == false)
                return false;
            if (ifBlank("End date", vm.training_enddate) == false)
                return false;
            if (vm.training_startdate > vm.training_enddate)
            {
                showError('Start Date should be smaller than End Date');
                $timeout(function() {
                }, 1000);
                return false;
            }

            var today_t = new Date();
            var dd2 = today_t.getDate();
            var mm2 = today_t.getMonth() + 1; //January is 0!
            var yyyy2 = today_t.getFullYear();

            if (dd2 < 10) {
                dd2 = '0' + dd2
            }

            if (mm2 < 10) {
                mm2 = '0' + mm2
            }

            today_t = yyyy2 + '-' + mm2 + '-' + dd2;


            console.log('today');
            console.log(today_t);
            if (today_t >= vm.training_enddate)
            {

                showError('End Date should be Greater than Today');
                $timeout(function() {
                }, 1000);
                return false;
            }


            if (ifBlank("Start time", vm.training_start_time) == false)
                return false;
            if (ifBlank("End time", vm.training_end_time) == false)
                return false;



            if (vm.training_startdate == vm.training_enddate)
            {
                if (vm.training_start_time > vm.training_end_time)
                {
                    showError('Start Time should be smaller Than End Time');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }
                if (vm.training_start_time == vm.training_end_time)
                {
                    showError('Start Time shouldnot be Equal to  End Time');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }
            }






            if (ifBlank("Timezone", vm.training_timezone) == false)
                return false;
            if (ifBlank("Provider Name", vm.training_provider_name) == false)
                return false;
//            if (ifBlank("Fee Range", vm.trainig_fee_min) == false)
//                return false;
//            if (ifBlank("Fee Range", vm.trainig_fee_max) == false)
//                return false;
            console.log(vm.trainig_fee_min);
            console.log(vm.trainig_fee_max);


            if (vm.trainig_fee_min == "")
            {

                if (vm.trainig_fee_min == '0')
                {

                } else
                {
                    showError('Fee Range Cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }


            }
            if (vm.trainig_fee_max == "")
            {
                if (vm.trainig_fee_max == "0")
                {

                } else
                {
                    showError('Fee Range Cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }


            }

            if ((vm.trainig_fee_min) >= (vm.trainig_fee_max))
            {
                showError('Fee Range incorrect');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.trainig_fee_min < 0)
            {
                showError('Fee Range must be Greater Than 0');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.trainig_fee_max < 0)
            {
                showError('Fee Range must be Greater Than 0');
                $timeout(function() {
                }, 1000);
                return false;
            }




            if (vm.trainig_fee_min == vm.trainig_fee_max)
            {
                showError('Fee Range Can not be Equal');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (ifNumeric("Fee range", vm.trainig_fee_min) === false)
            {
                showError('Fee Range numeric for min');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (ifNumeric("Fee range", vm.trainig_fee_max) === false)
            {
                showError('Fee Range numeric for max');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (ifBlank("Contact Number", vm.training_Contact_number) == false)
                return false;
            vm.training_Contact_number = vm.training_Contact_number.replace(/^1(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
            if (vm.training_Contact_number.length != 10) {
                showError('Phone number should be 10 digit number');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (ifBlank("Email ", vm.trainig_email) == false)
                return false;
            if (ifValidEmail("Email", vm.trainig_email) == false)
                return false;



            /***** check BAd Word in title and description ******/
            var training_found1 = 0;
            vm.training_badword_len = vm.manage_badwords.length;
            vm.training_title_split = vm.training_title.split(" ");
            vm.training_title_len = vm.training_title_split.length;

            var intRegex = /[0-9]{3}[\-][0-9]{6}|[0-9]{3}[\s][0-9]{6}|[0-9]{3}[\s][0-9]{3}[\s][0-9]{4}|[0-9]{9}|[0-9]{3}[\-][0-9]{3}[\-][0-9]{4} |(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
            if (intRegex.test(vm.training_title)) {

                showError('phone number are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }
            var regex = /([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})/;
            if (regex.test(vm.training_title))
            {
                showError('Email are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }


            if (intRegex.test(vm.training_despre)) {

                showError('phone number are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (regex.test(vm.training_despre))
            {
                showError('Email are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }



//            vm.training_title_split = vm.training_title.split(" ");
            console.log("length badword", vm.training_badword_len);
            console.log("length trtitle", vm.training_title_len)
            vm.training_result = [];
            for (var i = 0; i < vm.training_badword_len; i++) {
                for (var j = 0; j < vm.training_title_len; j++) {
                    if (vm.manage_badwords[i] == vm.training_title_split[j]) {
                        vm.training_result.push(vm.training_title_split[j]);
                        console.log(vm.training_result);
                        console.log('found');
                        training_found1 = 1;
                        break;
                    }
                }
            }

            vm.training_result_des = [];
//            vm.trim = vm.despre.trim();
            vm.training_trim = vm.training_despre.replace(/[^a-zA-Z ]/g, " ");
            console.log(vm.training_trim);
            console.log('trimmmmm');

            vm.training_bad_desc = vm.training_trim.split(" ");
            console.log(vm.training_bad_desc);
            for (var i = 0; i < vm.training_bad_desc.length; i++)
            {
                vm.training_bad_desc[i] = vm.training_bad_desc[i].trim();
            }
            console.log('after bad forloop');
            console.log(vm.training_bad_desc);
            vm.training_bad = cleanArray(vm.training_bad_desc);
            function cleanArray(actual) {
                var newArray = new Array();
                for (var i = 0; i < actual.length; i++) {
                    if (actual[i]) {
                        newArray.push(actual[i]);
                    }
                }
                return newArray;
            }
            console.log(vm.training_bad);
            vm.training_descc = vm.training_bad_desc.length;
            var training_found2 = 0;
            for (var x = 0; x < vm.training_badword_len; x++) {
                for (var y = 0; y < vm.training_descc; y++) {
                    if (vm.manage_badwords[x] == vm.training_bad_desc[y]) {
                        vm.training_result_des.push(vm.training_bad_desc[y]);
                        console.log(vm.training_result_des);
                        console.log('found2');
                        training_found2 = 2;
                        break;
                    }
                }


            }
            if (training_found1 == 1) {
                showError("Please change these word " + vm.training_result.toString() + " in Training Title");
//                $("#eventTitle").focus();
                return false;
            }
            else if (training_found2 == 2) {
                showError("Please change these words " + vm.training_result_des.toString() + " in Training Description");
                return false;
            }




            /******* End bad word *********/



            vm.TrainingObj.training_course = vm.training_course;
            vm.TrainingObj.training_tittle = vm.training_title;
            vm.TrainingObj.training_description = vm.training_desc;
            vm.TrainingObj.training_start_date = vm.training_startdate;
            vm.TrainingObj.training_end_date = vm.training_enddate;
            vm.TrainingObj.training_start_time = vm.training_start_time;
            vm.TrainingObj.training_end_time = vm.training_end_time;
            vm.TrainingObj.timezone = vm.training_timezone;
            vm.TrainingObj.training_provider = vm.training_provider_name;
            vm.TrainingObj.training_phone = vm.training_Contact_number;
            vm.TrainingObj.training_fee_min = vm.trainig_fee_min;
            vm.TrainingObj.training_fee_max = vm.trainig_fee_max;
            vm.TrainingObj.training_email = vm.trainig_email;
            vm.TrainingObj.training_batch = vm.trainig_batch;
            vm.TrainingObj.training_fee_max = vm.trainig_fee_max;
            vm.TrainingObj.training_fee_max = vm.trainig_fee_max;
            vm.TrainingObj.training_fee_max = vm.trainig_fee_max;





            vm.training_type = false;
            vm.training_detail = false;
            vm.training_payment = false;
            vm.training_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.t_preview').addClass('active_menu');
            vm.training_preview = true;
            console.log('preview');
            console.log(vm.TrainingObj);
        }



        function t_payment() {
            vm.training_type = false;
            vm.training_detail = false;
            vm.training_preview = false;
            vm.training_final = false;
            $('.newad_menu').removeClass('active_menu');
            $('.t_payment').addClass('active_menu');
            if (vm.TrainingObj.training_plan_id == '0')
            {
                vm.training_finalfree = true;
                localStorage.setItem('trainingObject', JSON.stringify(vm.TrainingObj));
            }
            else
            {
                vm.training_payment = true;

            }

        }
        if (allData.tx && localStorage.getItem('trainingObject')) {
            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.edit_new_ad').hide();
            $('.edit_new_event').hide();
//            $('.add_new_event').hide();
            $('.add_new_ad').hide();
            $('.add_new_event').hide();
            $('.my_fav').hide();
            $('.edit_new_training').hide();
            $('.add_new_training').show();
            var data = JSON.parse(localStorage.getItem('trainingObject'));
            vm.training_title = data.training_tittle;
            vm.training_description = data.training_description;
            vm.training_provider = data.training_provider;
            vm.training_total_payable = data.total_payable;
            vm.training_start_date = data.training_start_date;
            vm.training_end_date = data.training_end_date;
            vm.training_start_time = data.training_start_time;
            vm.training_end_time = data.training_end_time;

            vm.training_imgg = data.training_image;
            vm.isFromStatus = 1;
            t_final();
        }
        else
        {
            localStorage.removeItem('trainingObject');
        }

        vm.training_checkout = training_checkout;
        function training_checkout() {
//            var imgId = vm.imageIdArray.concat(vm.featuredImageIdArray);
//            vm.adObj.images = imgId.toString();
            if (vm.training_chkTermCondition != true)
            {
                showError("Please accept terms and conditions.");
                return false;
            }
            localStorage.setItem('trainingObject', JSON.stringify(vm.TrainingObj));


//            editionPayment.payment.checkout('PayPal', vm.TrainingObj.total_payable, "http://localhost:8888/epardesh-web/web/#/setting");
            editionPayment.payment.checkout('PayPal', vm.TrainingObj.total_payable, "http://www.epardesh.com/setting");
//            editionPayment.payment.checkout('PayPal', vm.TrainingObj.total_payable, "http://54.172.109.78/epardesh/epardesh-75way/web/#/setting");
//editionPayment.payment.checkout('PayPal', vm.TrainingObj.total_payable, "http://localhost:8888/epardesh-web/web/#/setting");

        }
        ;



        function t_final() {

            vm.training_type = false;
            vm.training_detail = false;
            vm.v_preview = false;
            vm.training_payment = false;
            $('.newad_menu').removeClass('active_menu');
            $('.t_final').addClass('active_menu');
            vm.training_final = true;
        }

        vm.training_afterpayment = training_afterpayment;
        function training_afterpayment() {
            var data = JSON.parse(localStorage.getItem('trainingObject'));
            manageadServices.saveTraining(data).success(function(response) {
                console.log("response for add training")
                console.log(response);
                if (response.status == '105') {
//                    vm.a_final();


                    vm.ApplyObj =
                            {
                                "user_id": localStorage.getItem('user_id'),
                                "promocode": localStorage.getItem('coupon')
                            }
                    manageadServices.ApplyCoupon(vm.ApplyObj).success(function(response) {

                        if (response.status == '105')
                        {
                            console.log('apply couponn')
                        }

                    })
                    vm.saveTrainingFun();
                }
                else {
                    vm.addAction = true;
                    showError(response.message);

                }
            })

        }

        function saveTrainingFun() {
            localStorage.setItem('selectTab', '2');
            localStorage.removeItem('trainingObject');
            localStorage.removeItem('trainingimg');

            vm.TrainingObj = {
                access_token: localStorage.getItem('a_token'),
                training_user_id: localStorage.getItem('user_id'),
                training_course: '',
                training_tittle: '',
                training_plan_id: null,
                training_course_type: 0,
                training_course_url: '',
                training_course_address: '',
                training_lattitude: localStorage.getItem('current_lat'),
                training_longitude: localStorage.getItem('current_lon'),
                training_start_date: '',
                training_start_time: '',
                training_end_date: '',
                training_end_time: '',
                timezone: '',
                training_image: '',
                training_provider: '',
                training_fee_min: '',
                training_fee_max: '',
                training_description: '',
                training_phone: '',
                training_email: '',
                training_batch: '',
                total_payable: ''
            }

            $(".ad_review").show();
            $timeout(function() {
                location.reload();
            }, 1000);

        }




        /*=======================View Training on Page loading=================================*/
        vm.getTrainingObj = {
            user_id: localStorage.getItem('user_id'),
            access_token: localStorage.getItem('a_token')
        }
        settingServices.getTrainingObj(vm.getTrainingObj).success(function(response) {
            console.log("response for view training");
            console.log(response);
            if (response.status == '105') {

//                console.log(response);
                var dt = response.data;
//                console.log(dt);
                var len = response.data.length;
//                console.log(len)
                for (var m = 0; m < len; m++)
                {
                    //start date
                    var d = new Date(dt[m].training_start_date);
//                    console.log(d);
                    var localTime = d.getTime();
                    var localOffset = d.getTimezoneOffset() * 60000;
                    var utc = localTime;
                    var st = utc + (localOffset);
                    var nd = new Date(st);
                    response.data[m].training_start_date = nd;

                    //end date

                    var de = new Date(dt[m].training_end_date);
//                    console.log(de);
                    var localTime_end = de.getTime();
                    var localOffset_end = de.getTimezoneOffset() * 60000;
                    var utc_end = localTime_end;
                    var end = utc_end + (localOffset_end);
                    var nd_end = new Date(end);
                    response.data[m].training_end_date = nd_end;


                }
                vm.TrainingData = response.data;
            }
        })

        /********* Edit Training *********/
        vm.editTrainingObj = {
            access_token: localStorage.getItem('a_token'),
            training_id: '',
            training_course: '',
            training_tittle: '',
            training_plan_id: null,
            training_course_type: 0,
            training_course_url: '',
            training_course_address: '',
            training_lattitude: localStorage.getItem('current_lat'),
            training_longitude: localStorage.getItem('current_lon'),
            training_start_date: '',
            training_start_time: '',
            training_end_date: '',
            training_end_time: '',
            timezone: '',
            training_image: '',
            training_provider: '',
            training_fee_min: '',
            training_fee_max: '',
            training_description: '',
            training_phone: '',
            training_email: '',
            training_batch: '',
            total_payable: '',
            user_email: localStorage.getItem('email'),
            user_first_name: localStorage.getItem('user_name')
        }

        vm.editTrainingFun = editTrainingFun;
        vm.edit_course_type = edit_course_type;
        vm.updateTrainingFun = updateTrainingFun;
        function edit_course_type(type)
        {
            console.log(type);
            if (type == 0)
            {
                $('#edittrainingshowtext').css('display', 'block');
                $('#edittrainingshowtext1').css('display', 'none');
                vm.editTrainingObj.training_course_type = type;
            }
            else if (type == 1)
            {
                $('#edittrainingshowtext').css('display', 'none');
                $('#edittrainingshowtext1').css('display', 'block');
                vm.editTrainingObj.training_course_type = type;

            }
            else if (type == 2)
            {
                $('#edittrainingshowtext').css('display', 'none');
                $('#edittrainingshowtext1').css('display', 'none');
                vm.editTrainingObj.training_course_type = type;

            }

        }

        /**** Show Preview *****/
        vm.editshowpreview = editshowpreview;
        function editshowpreview()
        {
            vm.edittraining_titlepre = $('#editTrainingTitle').val();
            vm.edittraining_descpre = $scope.editTrainingckeditor;
            if (ifBlank("Title", vm.edittraining_titlepre) == false)
                return false;

            if (vm.edittraining_descpre == "")
            {

                showError('Description Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }
            vm.edittrainingImgPre = vm.edittrainingimgsrc;
            console.log(vm.edittrainingImgPre);
            if (vm.edittrainingImgPre == undefined)
            {
                showError('Upload Image to show preview');
                $timeout(function() {
                }, 1000);
                return false;
            }


            $('#edittrainingPreview').modal({backdrop: 'static', keyboard: false});
            $('#edittrainingPreview').modal('show');


        }

        function editTrainingFun(data)
        {
            console.log(data);
            console.log(data.training_start_date)
            vm.editTrainingObj.training_plan_id = data.training_plan;
            vm.editTrainingObj.training_id = data.id;
            $('#editcourse').val(data.training_course);
            vm.editTraining_title = data.training_tittle;
            $scope.editTrainingckeditor = data.training_description;
            // edit training
            $('#edittrainingstartdate').datepicker({minDate: data.training_start_date, dateFormat: 'yy-mm-dd'});
            $('#edittrainingenddate').datepicker({minDate: data.training_end_date, dateFormat: 'yy-mm-dd'});
            $('#edittraining_start_time').timepicker();
            $('#edittraining_end_time').timepicker();
//         vm.tstrt = new Date(data.training_start_date);
//         console.log(vm.tstrt)
//            vm.tddt = vm.tstrt[2].split("T");
//            vm.training_edit_start_date = new Date(vm.tstrt[0], vm.tstrt[1] - 1, vm.tddt[0]);
            $('#edittrainingstartdate').datepicker('setDate', new Date(data.training_start_date));
//            vm.tendd = data.training_end_date.split("-");
//            vm.teddt = vm.tendd[2].split("T");
//            vm.training_edit_end_date = new Date(vm.tendd[0], vm.tendd[1] - 1, vm.teddt[0]);
            $('#edittrainingenddate').datepicker('setDate', new Date(data.training_end_date));




            vm.editTrainingObj.training_start_date = vm.training_edit_start_date;
            vm.editTrainingObj.training_end_date = vm.training_edit_end_date;

            $('#edittraining_start_time').val(data.training_start_time);
            $('#edittraining_end_time').val(data.training_end_time);

            vm.editTraining_course_type = data.training_course_type;
            $scope.edittrainingaddress = data.training_course_address;
            $scope.edittraininglatitude = data.training_lattitude;
            $scope.edittraininglongitude = data.training_longitude;
            if (vm.editTraining_course_type == 0)
            {
                console.log('course type 0');
                $("#edittraining_on").attr('checked', 'checked');
                $('#edittrainingshowtext').css('display', 'block');
                $('#edittrainingshowtext1').css('display', 'none');
                vm.edittraining_type_online = data.training_course_url;
                vm.editTrainingObj.training_course_type = vm.editTraining_course_type;
            } else if (vm.editTraining_course_type == 1)
            {
                console.log('course type 1');
                $("#edittraining_off").attr('checked', 'checked');
                $('#edittrainingshowtext').css('display', 'none');
                $('#edittrainingshowtext1').css('display', 'block');
                vm.editTrainingObj.training_course_type = vm.editTraining_course_type;
                vm.editTrainingObj.training_course_address = $scope.edittrainingaddress;
                vm.editTrainingObj.training_lattitude = $scope.edittraininglatitude;
                vm.editTrainingObj.training_longitude = $scope.edittraininglongitude;
            }
            else if (vm.editTraining_course_type == 2)
            {
                console.log('course type 2');
                $("#edittraining_self").attr('checked', 'checked');
                $('#edittrainingshowtext').css('display', 'none');
                $('#edittrainingshowtext1').css('display', 'none');
                vm.editTrainingObj.training_course_type = vm.editTraining_course_type;
            }

            $('#edittraining_timezone').val(data.timezone);
            $('#editprovider_name').val(data.training_provider);
            $('#editfee_min').val(data.training_fee_min);
            $('#editfee_max').val(data.training_fee_max);
            vm.training_phone = data.training_phone;
//            $('#editTraining_Contact_number').val(training_phone);
            $('#edittraining_email').val(data.training_email);
            $('#edittraining_batch').val(data.training_batch);
            $('#edittraining_timezone').timezones();
            vm.edittrainingimgsrc = data.training_image;



            $('.setting_menu').removeClass('active_setting');
            $('.change_profile').hide();
            $('.change_password').hide();
            $('.manage_ads').hide();
            $('.add_new_ad').hide();
            $('.add_new_event').hide();
            $('.edit_new_ad').hide();
            $('.my_fav').hide();
            $('.add_new_training').hide();
            $('.edit_new_event').hide();
            $('.edit_new_training').show();

        }
        function updateTrainingFun()
        {


            /********dfkgdfkg****/

            vm.editTrainingObj.training_course = $('#editcourse').val();

            if (vm.editTrainingObj.training_course == "")
            {

                showError('Course Type Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }
            vm.editTrainingObj.training_tittle = $('#editTrainingTitle').val().toUpperCase();
            if (ifBlank("Title", vm.editTrainingObj.training_tittle) == false)
                return false;
            vm.editTrainingObj.training_description = $scope.editTrainingckeditor;
            vm.editTrainingObj.training_image = vm.edittrainingimgsrc;
            vm.edittraining_despre = $(vm.editTrainingObj.training_description).text();

            if (vm.editTrainingObj.training_description == "")
            {

                showError('Description Cannot be Empty');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.edittraining_despre.length >= '100' && vm.edittraining_despre.length <= '3200')
            {

            } else {
                showError('Description Should be in between 100 to 3200');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (ifBlank("Image ", vm.edittrainingimgsrc) == false)
                return false;

            if (vm.editTrainingObj.training_course_type == 0)
            {
                vm.editTrainingObj.training_course_type = '0';
                vm.editTrainingObj.training_course_url = $('#edittrainingtype_online').val();
                vm.editTrainingObj.training_course_address = '';
                if (vm.editTrainingObj.training_course_url == '')
                {
                    showError('Training Course Url Cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;

                }
                if (vm.editTrainingObj.training_course_url != '')   // return true or false.
                {

                    var urlregex = new RegExp(
                            "^(http:\/\/www.|http:\/\/|https:\/\/|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
                    if (!urlregex.test(vm.editTrainingObj.training_course_url))
                    {
                        showError('Training Website Format is not Correct');
                        $timeout(function() {
                        }, 1000);
                        return false;
                    }

                }
            }
            else if (vm.editTrainingObj.training_course_type == 1)
            {
                vm.editTrainingObj.training_course_type = '1';
                vm.editTrainingObj.training_course_address = $scope.edittrainingaddress;
//                vm.editTrainingObj.training_lattitude = $scope.edittraininglatitude;
//                vm.editTrainingObj.training_longitude = $scope.edittraininglongitude;
                vm.editTrainingObj.training_lattitude = localStorage.getItem('current_lat');
                vm.editTrainingObj.training_longitude = localStorage.getItem('current_lon');
                if (vm.editTrainingObj.training_course_address == '')
                {
                    showError('Training Location Address cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;

                }

            }
            else if (vm.editTrainingObj.training_course_type == 2)
            {
                vm.editTrainingObj.training_course_type = '2';
                vm.editTrainingObj.training_course_address = '';
            }


            vm.editTrainingObj.training_start_date = $('#edittrainingstartdate').val();
            vm.editTrainingObj.training_end_date = $('#edittrainingenddate').val();
            vm.editTrainingObj.training_start_time = $('#edittraining_start_time').val();
            vm.editTrainingObj.training_end_time = $('#edittraining_end_time').val();
            vm.editTrainingObj.timezone = $('#edittraining_timezone').val();
            vm.editTrainingObj.training_provider = $('#editprovider_name').val();
            vm.editTrainingObj.training_phone = $('#editTraining_Contact_number').val();
            vm.editTrainingObj.training_fee_min = parseFloat($('#editfee_min').val());
            vm.editTrainingObj.training_fee_max = parseFloat($('#editfee_max').val());
            vm.editTrainingObj.training_email = $('#edittraining_email').val();
            vm.editTrainingObj.training_batch = $('#edittraining_batch').val();
//             vm.editTrainingObj.training_address = $scope.edittrainingaddress;
//             vm.editTrainingObj.training_latitude = $scope.edittraininglatitude;
//             vm.editTrainingObj.training_longitude = $scope.edittraininglongitude;





            if (ifBlank("Start date", vm.editTrainingObj.training_start_date) == false)
                return false;
            if (ifBlank("End date", vm.editTrainingObj.training_end_date) == false)
                return false;

            if (vm.editTrainingObj.training_start_date > vm.editTrainingObj.training_end_date)
            {
                showError('Start Date should be smaller than End Date');
                $timeout(function() {
                }, 1000);
                return false;
            }

            var today_et = new Date();
            var dd21 = today_et.getDate();
            var mm21 = today_et.getMonth() + 1; //January is 0!
            var yyyy21 = today_et.getFullYear();

            if (dd21 < 10) {
                dd21 = '0' + dd21
            }

            if (mm21 < 10) {
                mm21 = '0' + mm21
            }

            today_et = yyyy21 + '-' + mm21 + '-' + dd21;


            console.log('today');
            console.log(today_et);
            if (today_et >= vm.editTrainingObj.training_end_date)
            {

                showError('End Date should be Greater than Today');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (ifBlank("Start time", vm.editTrainingObj.training_start_time) == false)
                return false;
            if (ifBlank("End time", vm.editTrainingObj.training_end_time) == false)
                return false;


            if (vm.editTrainingObj.training_start_date == vm.editTrainingObj.training_end_date)
            {
                if (vm.editTrainingObj.training_start_time > vm.editTrainingObj.training_end_time)
                {
                    showError('Start Time should be smaller Than End Time');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }
                if (vm.editTrainingObj.training_start_time == vm.editTrainingObj.training_end_time)
                {
                    showError('Start Time should not be Equal to  End Time');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }
            }




            if (ifBlank("Timezone", vm.editTrainingObj.timezone) == false)
                return false;

            if (ifBlank("Provider Name", vm.editTrainingObj.training_provider) == false)
                return false;

//            if (ifBlank("Fee Range", vm.editTrainingObj.training_fee_min) == false)
//                return false;
//            if (ifBlank("Fee Range", vm.editTrainingObj.training_fee_max) == false)
//                return false;
            console.log('FFFFFFFFFF');
            console.log(vm.editTrainingObj.training_fee_min);
            console.log(vm.editTrainingObj.training_fee_max);
            if (vm.editTrainingObj.training_fee_min > vm.editTrainingObj.training_fee_max)
            {
                showError('Fee Range incorrect');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.editTrainingObj.training_fee_min == vm.editTrainingObj.training_fee_max)
            {
                showError('Fee Range incorrect');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.editTrainingObj.training_fee_min < 0)
            {
                showError('Fee Range must be Greater Than 0');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (vm.editTrainingObj.training_fee_max < 0)
            {
                showError('Fee Range must be Greater Than 0');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (vm.editTrainingObj.training_fee_min == "")
            {

                if (vm.editTrainingObj.training_fee_min == '0')
                {

                } else
                {
                    showError('Fee Range Cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }


            }
            if (vm.editTrainingObj.training_fee_max == "")
            {
                if (vm.editTrainingObj.training_fee_ma == "0")
                {

                } else
                {
                    showError('Fee Range Cannot be Empty');
                    $timeout(function() {
                    }, 1000);
                    return false;
                }


            }



            if (ifNumeric("Fee range", vm.editTrainingObj.training_fee_min) === false)
            {
                showError('Fee Range numeric for min');
                $timeout(function() {
                }, 1000);
                return false;
            }
            if (ifNumeric("Fee range", vm.editTrainingObj.training_fee_max) === false)
            {
                showError('Fee Range numeric for max');
                $timeout(function() {
                }, 1000);
                return false;
            }


            if (ifBlank("Contact Number", vm.editTrainingObj.training_phone) == false)
                return false;

            vm.editTrainingObj.training_phone = vm.editTrainingObj.training_phone.replace(/^(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
            if (vm.editTrainingObj.training_phone.length != 10) {
                showError('Phone number should be 10 digit number');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (ifBlank("Email ", vm.editTrainingObj.training_email) == false)
                return false;
            if (ifValidEmail("Email", vm.editTrainingObj.training_email) == false)
                return false;







            /***** check BAd Word in title and description ******/
            var edittraining_found1 = 0;
            vm.edittraining_badword_len = vm.manage_badwords.length;
            vm.edittraining_title_split = vm.editTrainingObj.training_tittle.split(" ");
            vm.edittraining_title_len = vm.edittraining_title_split.length;
            var intRegex = /[0-9]{3}[\-][0-9]{6}|[0-9]{3}[\s][0-9]{6}|[0-9]{3}[\s][0-9]{3}[\s][0-9]{4}|[0-9]{9}|[0-9]{3}[\-][0-9]{3}[\-][0-9]{4} |(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
            if (intRegex.test(vm.editTrainingObj.training_tittle)) {

                showError('phone number are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }
            var regex = /([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})/;
            if (regex.test(vm.editTrainingObj.training_tittle))
            {
                showError('Email are not allowed in Title');
                $timeout(function() {
                }, 1000);
                return false;
            }


            if (intRegex.test(vm.edittraining_despre)) {

                showError('phone number are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }

            if (regex.test(vm.edittraining_despre))
            {
                showError('Email are not allowed in Description');
                $timeout(function() {
                }, 1000);
                return false;
            }



//            vm.training_title_split = vm.training_title.split(" ");
            console.log("length badword", vm.edittraining_badword_len);
            console.log("length trtitle", vm.edittraining_title_len)
            vm.edittraining_result = [];
            for (var i = 0; i < vm.edittraining_badword_len; i++) {
                for (var j = 0; j < vm.edittraining_title_len; j++) {
                    if (vm.manage_badwords[i] == vm.edittraining_title_split[j]) {
                        vm.edittraining_result.push(vm.edittraining_title_split[j]);
                        console.log(vm.edittraining_result);
                        console.log('found');
                        edittraining_found1 = 1;
                        break;
                    }
                }
            }

            vm.edittraining_result_des = [];
//            vm.trim = vm.despre.trim();
            vm.edittraining_trim = vm.edittraining_despre.replace(/[^a-zA-Z ]/g, " ");
            console.log(vm.edittraining_trim);
            console.log('trimmmmm');

            vm.edittraining_bad_desc = vm.edittraining_trim.split(" ");
            console.log(vm.edittraining_bad_desc);
            for (var i = 0; i < vm.edittraining_bad_desc.length; i++)
            {
                vm.edittraining_bad_desc[i] = vm.edittraining_bad_desc[i].trim();
            }
            console.log('after bad forloop');
            console.log(vm.edittraining_bad_desc);
            vm.edittraining_bad = cleanArray(vm.edittraining_bad_desc);
            function cleanArray(actual) {
                var newArray = new Array();
                for (var i = 0; i < actual.length; i++) {
                    if (actual[i]) {
                        newArray.push(actual[i]);
                    }
                }
                return newArray;
            }
            console.log(vm.edittraining_bad);
            vm.edittraining_descc = vm.edittraining_bad_desc.length;


            var edittraining_found2 = 0;
            for (var x = 0; x < vm.edittraining_badword_len; x++) {
                for (var y = 0; y < vm.edittraining_descc; y++) {
                    if (vm.manage_badwords[x] == vm.edittraining_bad_desc[y]) {
                        vm.edittraining_result_des.push(vm.edittraining_bad_desc[y]);
                        console.log(vm.edittraining_result_des);
                        console.log('found2');
                        edittraining_found2 = 2;
                        break;
                    }
                }


            }
            if (edittraining_found1 == 1) {
                showError("Please change these word " + vm.edittraining_result.toString() + " in Training Title");
//                $("#eventTitle").focus();
                return false;
            }
            else if (edittraining_found2 == 2) {
                showError("Please change these words " + vm.edittraining_result_des.toString() + " in Training Description");
                return false;
            }




            /******* End bad word *********/













            /*****hkdjfdsfhsdhh****/

//               localStorage.setItem('editTraining', JSON.stringify(vm.editTrainingObj));
//                 localStorage.setItem('',vm.editEventObj);
            settingServices.editTraining(vm.editTrainingObj).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    localStorage.setItem('selectTab', '2');
                    showSuccess("Training updated successfully.");
                    $timeout(function() {
                        $state.reload();
                    }, 2000);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });







        }
        vm.edit_training = [];
        $scope.uploadEditTrainingimage = function() {
            vm.training_DataLoader = true;
            vm.tt_img = true;
            var size = $('#edittraining_img').get(0).files[0].size;
            size = size / 1024;
            if (size > 12000) {
                showError("Image size should be less than 10MB");
                return false
            }
              var ext = $('#edittraining_img').val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg','bmp']) == -1) {
                showError("Only Image file format are allowed");
               vm.training_DataLoader = false;
                return false;
            }
            if (!vm.edittrainingimgsrc) {
                var formData = new FormData(document.forms.namedItem("editTrainingForm"));

                mProfileServices.uploadProfileImage($scope, function(response) {
//                        console.log("featured image response");
                    console.log(response);
                    if (response.status == 105) {
                        vm.edit_training.push(response.data.id);

                        vm.edittrainingimgsrc = response.data.profile_image_path;
                        vm.editTrainingObj.training_image = vm.edittrainingimgsrc;
                        localStorage.setItem('editimgtraining', vm.edittrainingimgsrc);
                        vm.training_DataLoader = false;
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);

            }
            else {
                console.log('ffffffffffff');
                var formData = new FormData(document.forms.namedItem("editTrainingForm"));
//                vm.imagetype = 'featured';
//                formData.append("image_type", vm.imagetype);
                formData.append("image_id", vm.edittrainingimgsrc[0]);
                mProfileServices.uploadProfileImage($scope, function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        vm.edittrainingimgsrc = response.data.profile_image_path;
                        vm.editTrainingObj.training_image = vm.edittrainingimgsrc;

                        localStorage.setItem('editimgtraining', vm.edittrainingimgsrc);
                        vm.training_DataLoader = false;
                    }
                    else {
                        showError(response['message']);
                        return false;
                    }
                }, formData);
            }

        }

        /*=======================Remove Event on Page=================================*/

        vm.removeTrainingFun = removeTrainingFun;
        function removeTrainingFun(data) {
            var remTrainingObj = {
                'training_id': data,
                'access_token': localStorage.getItem('a_token')
            }

//            var ch = confirm("Are you sure you want to Delete this ad?");
            vm.training_confirm = true;
            vm.trainingconfirmbox = function(status)
            {
                vm.training_confirm = false;

                if (status == 1)
                {
                    settingServices.removeTraining(remTrainingObj).success(function(response) {
                        console.log("response for view trained")
                        console.log(response);
                        if (response.status == '105') {
                            showSuccess('Training has been Deleted successfully.')
                            $timeout(function() {
                                $state.reload();
                            }, 1000);

                        }
                    })
                }
                else if (status == 0)
                {
                    vm.training_confirm = false;
                }
            }

        }



        /*=======================Upgrade to Feature Training=================================*/
        vm.upgradeToFeaturedPayTraining = upgradeToFeaturedPayTraining;
        function upgradeToFeaturedPayTraining(dat) {
            localStorage.setItem('featuredIdTraining', dat)

//            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://localhost:8888/epardesh-web/web/#/setting");
//            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://54.172.109.78/epardesh/epardesh-75way/web/#/setting");
// editionPayment.payment.checkout('PayPal', vm.featured_price, "http://localhost:8888/epardesh-web/web/#/setting");
            editionPayment.payment.checkout('PayPal', vm.featured_price, "http://www.epardesh.com/setting");
        }
        function upgradeToFeaturedTraining(id) {
            var TrainingdataObj = {
                'status': 2,
                'access_token': localStorage.getItem('a_token'),
                'training_id': id
            }
            settingServices.upgrade_training_plan(TrainingdataObj).success(function(response) {
                console.log("response for upgraded plan")
                console.log(response);
                if (response.status == '105') {

                    vm.ApplyObj =
                            {
                                "user_id": localStorage.getItem('user_id'),
                                "promocode": localStorage.getItem('coupon')
                            }
                    manageadServices.ApplyCoupon(vm.ApplyObj).success(function(response) {

                        if (response.status == '105')
                        {
                            console.log('apply couponn')
                        }

                    })


                    localStorage.removeItem('featuredIdTraining')
                    $state.reload();
                }
            })
        }
        if (allData.tx && localStorage.getItem('featuredIdTraining')) {
            upgradeToFeaturedTraining(localStorage.getItem('featuredIdTraining'));
        }

        /*=======================Upgrade to Premium Training=================================*/
        vm.upgradeToPremiumPayTraining = upgradeToPremiumPayTraining;
        function upgradeToPremiumPayTraining(data) {
            localStorage.setItem('premiumIdTraining', data)
//            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://localhost:8888/epardesh-web/web/#/setting");
            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://www.epardesh.com/setting");

//editionPayment.payment.checkout('PayPal', vm.premium_price, "http://localhost:8888/epardesh-web/web/#/setting");

//            editionPayment.payment.checkout('PayPal', vm.premium_price, "http://54.172.109.78/epardesh/epardesh-75way/web/#/setting");
        }
        function upgradeToPremiumTraining(id) {
            var trainingdataObj = {
                'status': 1,
                'access_token': localStorage.getItem('a_token'),
                'training_id': id
            }
            settingServices.upgrade_training_plan(trainingdataObj).success(function(response) {
                console.log("response for view preimium")
                console.log(response);
                if (response.status == '105') {

                    vm.ApplyObj =
                            {
                                "user_id": localStorage.getItem('user_id'),
                                "promocode": localStorage.getItem('coupon')
                            }
                    manageadServices.ApplyCoupon(vm.ApplyObj).success(function(response) {

                        if (response.status == '105')
                        {
                            console.log('apply couponn')
                        }

                    })



                    localStorage.removeItem('premiumIdTraining')
                    $state.reload();
                }
            })
        }
        if (allData.tx && localStorage.getItem('premiumIdTraining')) {
            upgradeToPremiumTraining(localStorage.getItem('premiumIdTraining'));
        }


        /********* View favourite Event *****/
        var favData =
                {
                    'access_token': localStorage.getItem('a_token'),
                    'user_id': localStorage.getItem('user_id')
                }

        settingServices.view_fav(favData).success(function(response) {
            console.log('fav dat event');
            console.log(response);
            if (response.status == '105')
            {
                vm.fav_event = response.data.favourite_events;
                vm.fav_training = response.data.favourite_training;
                vm.fav_ads = response.data.favourite_ads.ad;
                console.log(vm.fav_event);
                console.log(vm.fav_training);
                console.log(vm.fav_ads);

            }
        })
        vm.eventDetailFun = eventDetailFun;

        function eventDetailFun(id)
        {
            console.log(id);
            localStorage.setItem('track_event', vm.getCurrentState);
            $state.go('event_details', {id: id});

        }

        var remEventFav =
                {
                    'access_token': localStorage.getItem('a_token'),
                    'favourite_id': ''
                }
        vm.eventRemoveFav = eventRemoveFav;
        function eventRemoveFav(favid)
        {
            remEventFav.favourite_id = favid;
            settingServices.remEventFav(remEventFav).success(function(response) {
                console.log('Remove fav event');
                console.log(response);
                if (response.status == '105')
                {
                    vm.favpopup = true;
                    $timeout(function() {
                        vm.favpopup = false;
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $state.reload();
                    }, 2000);


                }
            })

        }


        vm.AdDetailFun = AdDetailFun;
        function AdDetailFun(id)
        {
            console.log('dddddd');
          
          
           
            var data = {
                ad_id: id
            }
            adDataServices.updateAdCount(data).success(function(response) {
                console.log(response)
                localStorage.setItem('track', vm.getCurrentState)
                $state.go('ad_details', {id: id})
            })
        

        }

        var remAdFav =
                {
                    'access_token': localStorage.getItem('a_token'),
                    'favourite_id': ''
                }
        vm.adRemoveFav = adRemoveFav;
        function adRemoveFav(favid)
        {
            remAdFav.favourite_id = favid;
            settingServices.remAdFav(remAdFav).success(function(response) {
                console.log('Remove fav Adt');
                console.log(response);
                if (response.status == '105')
                {
                    vm.favpopup_ad = true;
                    $timeout(function() {
                        vm.favpopup_ad = false;
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $state.reload();
                    }, 2000);


                }
            })

        }











        vm.TrainingDetailFun = TrainingDetailFun;
        function TrainingDetailFun(id)
        {
            localStorage.setItem('track_training', vm.getCurrentState);
            $state.go('training_detail', {id: id});
        }
        vm.TrainingRemoveFav = TrainingRemoveFav;
        var remTrainingFav =
                {
                    'access_token': localStorage.getItem('a_token'),
                    'favourite_id': ''
                }
        function TrainingRemoveFav(favid)
        {
            remTrainingFav.favourite_id = favid;
            settingServices.remTrainingFav(remTrainingFav).success(function(response) {
                console.log('Remove fav training');
                console.log(response);
                if (response.status == '105')
                {
                    vm.favpopup_training = true;
                    $timeout(function() {
                        vm.favpopup_training = false;
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $state.reload();
                    }, 2000);


                }
            })
        }


        vm.eventviewContactFun = eventviewContactFun;
        function eventviewContactFun(data) {
            console.log(data);
//            vm.viewEventCon.user_id = data.id;
            vm.organisor = data.organisor;
            vm.event_phone = data.event_phone;
//            vm.viewEventCon.email = data.email;
            if (localStorage.getItem('user_name')) {
                vm.EventviewContact = true;
            }

        }
        vm.AdviewContactFun = AdviewContactFun;
        function AdviewContactFun(data) {
            console.log(data);
//            vm.viewEventCon.user_id = data.id;
            vm.organisor = data.ad_info.business_name;
            vm.event_phone = data.ad_info.phone;
//            vm.viewEventCon.email = data.email;
            if (localStorage.getItem('user_name')) {
                vm.AdviewContact = true;
            }

        }
        vm.TrainingviewContactFun = TrainingviewContactFun;
        function TrainingviewContactFun(data) {
            console.log(data);
//            vm.viewEventCon.user_id = data.id;
            vm.organisor = data.training_provider;
            vm.event_phone = data.training_phone;
//            vm.viewEventCon.email = data.email;
            if (localStorage.getItem('user_name')) {
                vm.TrainingviewContact = true;
            }

        }
        vm.closeModal = closeModal;
        function closeModal(status) {
            if (status == 1) {
                vm.AdviewContact = false;
            }
            if (status == 2) {
                vm.EventviewContact = false;
            }
            if (status == 3) {
                vm.TrainingviewContact = false;
            }



        }


        /******Apply Promocode******/
        vm.promoname = [];
        vm.promodiscount = [];
        settingServices.viewpromocode().success(function(response) {
            console.log('promocodee')
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
        vm.apply = applypromocode;
        function applypromocode(type_ad)
        {
            vm.checkPromo =
                    {
                        'user_id': localStorage.getItem('user_id'),
                        'promocode': vm.couponText
                    }

            console.log('inside applypromocode')
            console.log(vm.eventObj.plan_id)
            var code = vm.couponText;

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

                    localStorage.setItem('coupon', vm.couponText);
                    settingServices.checkPromocode(vm.checkPromo).success(function(response) {

                        if (response.status == '105')
                        {
                            if (response.data.status == "0")
                            {
                                console.log('inside check promo');

                                vm.msgType = 'danger';
                                vm.msg = 'Already Used This Code';
                                vm.promocheck = true;
                                $timeout(function() {
                                    vm.promocheck = false;
                                }, 3000);
                                return false;
                            } else if (response.data.status == "1")
                            {
                                vm.msgType = 'success';
                                vm.msg = 'You have successfully applied';
                                vm.promocheck = true;
//                    $timeout(function() {
//                        vm.promocheck = false;
//                    }, 3000);vm.doPayment
                                if (type_ad == "0")
                                {

                                    var val = vm.promodiscount[index];
                                    console.log(val + 'eee');
                                    console.log(vm.eventObj.total_payable + 'vm.price');
                                    var per = (vm.eventObj.total_payable * val) / 100;
                                    console.log(per + 'per');
                                    var amnt = vm.eventObj.total_payable - per;
                                    vm.eventObj.total_payable = amnt.toFixed(2);
                                    ;
                                    var price = 'Pay $' + amnt + ' Now';
                                    console.log(amnt + 'amnt');
                                    console.log('price new' + vm.eventObj.total_payable);
                                    $('.txt-apply').text('Applied');
                                    vm.couponApplied = true;
                                    $('.pay').text(price);

                                }
                                else if (type_ad == "1")
                                {

                                    var val = vm.promodiscount[index];
                                    console.log(val + 'eee');
                                    console.log(vm.TrainingObj.total_payable + 'vm.price');
                                    var per = (vm.TrainingObj.total_payable * val) / 100;
                                    console.log(per + 'per');
                                    var amnt = vm.TrainingObj.total_payable - per;
                                    vm.TrainingObj.total_payable = amnt.toFixed(2);
                                    var price = 'Pay $' + amnt + ' Now';
                                    console.log(amnt + 'amnt');
                                    console.log('price new' + vm.TrainingObj.total_payable);
                                    $('.txt-apply').text('Applied');
                                    vm.couponApplied = true;
                                    $('.pay').text(price);

                                }
                                else if (type_ad == "2")
                                {

                                    var val = vm.promodiscount[index];
                                    console.log(val + 'eee');
                                    console.log(vm.adObj.total_payable + 'vm.price');
                                    var per = (vm.adObj.total_payable * val) / 100;
                                    console.log(per + 'per');
                                    var amnt = vm.adObj.total_payable - per;
                                    vm.adObj.total_payable = amnt.toFixed(2);
                                    var price = 'Pay $' + amnt + ' Now';
                                    console.log(amnt + 'amnt');
                                    console.log('price new' + vm.adObj.total_payable);
                                    $('.txt-apply').text('Applied');
                                    vm.couponApplied = true;
                                    $('.pay').text(price);

                                }
                            }


                        }



                    })



                }
                else
                {
                    vm.msgType = 'danger';
                    vm.msg = 'Invalid Promocode';
                    vm.promocheck = true;
                    $timeout(function() {
                        vm.promocheck = false;
                    }, 3000);

                }



            }


        }




        //upgrade apply promocode

        vm.apply_upgrade = applypromocode_upgrade;
        function applypromocode_upgrade(type_ad)
        {
            vm.checkPromo =
                    {
                        'user_id': localStorage.getItem('user_id'),
                        'promocode': vm.couponText
                    }
            var code = vm.couponText;

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

                    localStorage.setItem('coupon', vm.couponText);
                    settingServices.checkPromocode(vm.checkPromo).success(function(response) {

                        if (response.status == '105')
                        {
                            if (response.data.status == "0")
                            {
                                vm.msgType = 'danger';
                                vm.msg = 'Already Used This Code';
                                vm.promocheck = true;
                                $timeout(function() {
                                    vm.promocheck = false;
                                }, 3000);
                                return false;
                            }
                            else if (response.data.status == "1")
                            {
                                vm.msgType = 'success';
                                vm.msg = 'You have successfully applied';
                                vm.promocheck = true;
//                    $timeout(function() {
//                        vm.promocheck = false;
//                    }, 3000);vm.doPayment
                                if (type_ad == "0")
                                {

                                    var val = vm.promodiscount[index];
                                    console.log(val + 'eee');
                                    console.log(vm.premium_price + 'vm.price');
                                    var per = (vm.premium_price * val) / 100;
                                    console.log(per + 'per');
                                    var amnt = vm.premium_price - per;
                                    vm.premium_price = amnt.toFixed(2);
                                    ;
                                    var price = 'Pay $' + amnt + ' Now';
                                    console.log(amnt + 'amnt');
                                    console.log('price new' + vm.premium_price);
                                    $('.txt-apply').text('Applied');
                                    vm.couponApplied = true;
                                    $('.pay').text(price);

                                }
                                else if (type_ad == "1")
                                {

                                    var val = vm.promodiscount[index];
                                    console.log(val + 'eee');
                                    console.log(vm.featured_price + 'vm.price');
                                    var per = (vm.featured_price * val) / 100;
                                    console.log(per + 'per');
                                    var amnt = vm.featured_price - per;
                                    vm.featured_price = amnt.toFixed(2);
                                    ;
                                    var price = 'Pay $' + amnt + ' Now';
                                    console.log(amnt + 'amnt');
                                    console.log('price new' + vm.featured_price);
                                    $('.txt-apply').text('Applied');
                                    vm.couponApplied = true;
                                    $('.pay').text(price);


                                }


                            }


                        }



                    })



                }
                else
                {
                    vm.msgType = 'danger';
                    vm.msg = 'Invalid Promocode';
                    vm.promocheck = true;
                    $timeout(function() {
                        vm.promocheck = false;
                    }, 3000);

                }



            }


        }



        var dateToday = new Date();
//event
        $('#selectstartdate').datepicker({minDate: 0, dateFormat: 'yy-mm-dd'});
        $('#selectenddate').datepicker({minDate: 0, dateFormat: 'yy-mm-dd'});
        $('#start_time').timepicker();
        $('#end_time').timepicker();


//training
        $('#trainingstartdate').datepicker({minDate: 0, dateFormat: 'yy-mm-dd'});
        $('#trainingenddate').datepicker({minDate: 0, dateFormat: 'yy-mm-dd'});
        $('#training_end_time').timepicker();
        $('#training_start_time').timepicker();


        $scope.tabs = [{
                slug: 'Ads',
                title: "Ads",
                content: "Your Dashboard"
            }, {
                slug: 'Event',
                title: "Event",
                content: "Dynamic content 1"
            }, {
                slug: 'Training',
                title: "Training",
                content: "Dynamic content 2"
            }];
        $('.hasDatepicker').on('focus', function() {

            // store the element for use inside the position function
            var $target = $(this);

            // get the elements datepicker widget object and set it's position based on the target element
            $target.datepicker('widget').position({
                my: 'left top',
                at: 'left bottom',
                of: $target
            });
        });




        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();






    }
})();