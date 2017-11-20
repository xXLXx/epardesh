(function() {
    'use strict';
    var controllerId = 'mSignCtrl';
    angular
            .module('app')
            .controller(controllerId, mSignCtrl);
    mSignCtrl.$inject = ['$scope', '$state', '$timeout', '$location', 'loginRegiServices', 'mLoginRegiServices', 'editionPayment', 'matrimonypromocode'];
    function mSignCtrl($scope, $state, $timeout, $location, loginRegiServices, mLoginRegiServices, editionPayment, matrimonypromocode) {
        var vm = this;
        vm.registered = false;
        vm.goTologin = goTologin;
        vm.infoFun = infoFun;
        vm.planFun = planFun;
        vm.paymentFun = paymentFun;
        vm.info = true;
        vm.payment = false;
        vm.plan = false;
        vm.getState = getState;
        vm.notMatch = false;
        vm.showLoader = true;
        vm.payNow = payNow;
        vm.registerNow = registerNow;
        vm.freeArr = [];
        vm.goldArr = [];
        vm.platinumArr = [];
        vm.planselect = planselect;
        vm.getValidity = getValidity;
        vm.showPlan = true;
        vm.index = null;
        vm.palanSelectedType = null;
        vm.validity = '0';
        vm.planSelected = false;
        vm.showSelectedBtn = true;
        vm.paymentStatus = $location.search();
        vm.rmPlan = null;
        vm.showValidity = true;
        vm.toggleShowVal = toggleShowVal;
        vm.apply = applypromocode;
        vm.promoname = [];
        vm.promodiscount = [];
        vm.couponApplied = false;
        vm.couponText = '';

        if (localStorage.getItem('m_user_token')) {
            $state.go('matrimony_profile');
            return false;
        }




        console.log(vm.paymentStatus);
        vm.signObj = {
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            mobile: null,
            city: null,
            state: null,
            country: null,
            gender: null,
            plan: null,
            txn_id: null,
            alternate_mobile: null,
        }
        function infoFun() {

            vm.info = true;
            vm.payment = false;
            vm.plan = false;
            $('.newad_menu').removeClass('active_menu');
            $('.register').addClass('active_menu');

        }
        mLoginRegiServices.mPlan().success(function(response) {
            console.log(response);
            console.log("see above");
            if (response.status == 105) {
                angular.forEach(response.data, function(value) {
                    console.log(value)
                    if (value.plan_type == 'free' || value.plan_type == 'Free' || value.plan_type == 'FREE') {
                        vm.freePlan = value.plan_price;
                        vm.freeArr.push(value)
                    }
                    else if (value.plan_name == 'gold' || value.plan_name == 'Gold' || value.plan_name == 'GOLD') {
                        vm.goldArr.push(value)
                    }
                    else {
                        vm.platinumPlan = value.plan_price;
                        ;
                        vm.platinumArr.push(value)
                    }
                });
                vm.freePlan = vm.freeArr[0].plan_price;
                vm.goldPlan = vm.goldArr[0].plan_price;
                vm.platinumPlan = vm.platinumArr[0].plan_price;
            }
            else {
                showError(response['message']);
                return false;
            }
        });
        function toggleShowVal(v) {
            if (v == 0) {
                vm.showValidity = true;
            } else {
                vm.showValidity = false;
            }
        }

        toggleShowVal(0);

        function getValidity(index) {
            console.log('validity model');
            console.log('vm.rmPlan : ' + vm.rmPlan + ' validity : ' + vm.validity + 'index : ' + index);
            console.log(vm.rmPlan);
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
                vm.freePlan = vm.freeArr[index].plan_price;
                vm.goldPlan = vm.goldArr[index].plan_price;
                vm.platinumPlan = vm.platinumArr[index].plan_price;
                vm.showPlan = true
            } else if (index != '') {
                vm.index = index;
                vm.freePlan = vm.freeArr[index].plan_price;
                vm.goldPlan = vm.goldArr[index].plan_price;
                vm.platinumPlan = vm.platinumArr[index].plan_price;
                vm.showPlan = true
            }
            else {
                vm.showPlan = false;
            }

            if (vm.rmPlan == 0 || vm.rmPlan == "0" || vm.rmPlan== null) {
                vm.signObj.plan = vm.freeArr[index].id;
                vm.btnTitle = 'Submit';
                
                vm.price = vm.freeArr[vm.index].plan_price;
                vm.price_silver = vm.freeArr[vm.index].plan_price;
                vm.price_gold = vm.goldArr[vm.index].plan_price;
                vm.price_platinum = vm.platinumArr[vm.index].plan_price;
                console.log('free')
            }
            if (vm.rmPlan == 1 || vm.rmPlan == "1") {
                vm.price = vm.goldArr[vm.index].plan_price;
                vm.signObj.plan = vm.goldArr[index].id;
                vm.price_silver = vm.freeArr[vm.index].plan_price;
                vm.price_gold = vm.goldArr[vm.index].plan_price;
                vm.price_platinum = vm.platinumArr[vm.index].plan_price;
                vm.btnTitle = 'Pay $' + vm.price + ' Now';
            }
            if (vm.rmPlan == 2 || vm.rmPlan == "2") {
                vm.price = vm.platinumArr[vm.index].plan_price;
                vm.signObj.plan = vm.platinumArr[index].id;
                vm.price_silver = vm.freeArr[vm.index].plan_price;
                vm.price_gold = vm.goldArr[vm.index].plan_price;
                vm.price_platinum = vm.platinumArr[vm.index].plan_price;
                vm.btnTitle = 'Pay $' + vm.price + ' Now';
            }
            
            
            
            
            vm.couponText = '';
            $('.txt-apply').text('Apply');
            vm.couponApplied = false;

        }


        /*=======================Get selected plan from user=========================*/
        function planselect(status) {
            console.log('vm.rmPlan : ' + vm.rmPlan + ' validity : ' + vm.validity + 'status : ' + status);
            if (status == 0 || status == "0") {
                console.log("in free")
                toggleShowVal(vm.rmPlan);
                vm.btnTitle = 'Submit';
                $(".payment").css("display", "none");
                $(".next-plan").css("display", "none");
                $(".submit-btn").css("display", "block");
            }
            else {
                toggleShowVal(vm.rmPlan);
                $(".payment").css("display", "block");
                $(".next-plan").css("display", "block");
                $(".submit-btn").css("display", "none");
            }
            $(".common_footer").removeClass("payment_color");
            $('#' + status).addClass("payment_color");
            vm.showSelectedBtn = false;
            vm.palanSelectedType = status;
            if (status == 0) {
                vm.price = vm.freeArr[vm.validity].plan_price;
                vm.signObj.plan = vm.freeArr[vm.validity].id;
                vm.price_silver = vm.freeArr[vm.validity].plan_price;
            } else if (status == 1) {
                vm.price = vm.goldArr[vm.validity].plan_price;
                vm.signObj.plan = vm.goldArr[vm.validity].id;
                 vm.price_gold = vm.goldArr[vm.validity].plan_price;
            } else if (status == 2) {
                vm.price = vm.platinumArr[vm.validity].plan_price;
                vm.signObj.plan = vm.platinumArr[vm.validity].id;
                 vm.price_platinum = vm.platinumArr[vm.validity].plan_price;
            }
            vm.couponText = '';
            $('.txt-apply').text('Apply');
            vm.couponApplied = false;
        }

        function planFun() {
            if (vm.signObj.password != vm.c_password) {
                vm.notMatch = true;
                return false;
            }
            if (vm.chkTermCondition != true)
            {
                showError("Please accept terms and conditions.");
                return false;
            }
            vm.getValidity(0);
            vm.info = false;
            vm.payment = false;
            vm.plan = true;
            $('.newad_menu').removeClass('active_menu');
            $('.plan').addClass('active_menu');
        }

        function paymentFun() {
            if (vm.palanSelectedType == 0) {
                vm.btnTitle = 'Submit';
            } else {
                console.log("yes inside else");
                vm.btnTitle = 'Pay $' + vm.price + ' Now';
            }

            vm.info = false;
            vm.payment = true;
            vm.plan = false;
            $('.newad_menu').removeClass('active_menu');
            $('.payment').addClass('active_menu');
        }

        if (localStorage.getItem('fromPaypal')) {
            localStorage.removeItem('fromPaypal');
            vm.info = false;
            vm.payment = true;
            vm.plan = false;
            $('.newad_menu').removeClass('active_menu');
            $('.payment').addClass('active_menu');
            if (vm.paymentStatus.st == 'Completed') {
                vm.msgType = 'success';
                vm.msg = 'Payment done successfully.';
//                alert('register data');
                var data = JSON.parse(localStorage.getItem('regiData'));
                console.log(vm.signObj)
                vm.signObj = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    mobile: data.mobile,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    gender: data.gender,
                    plan: data.plan,
                    txn_id: vm.paymentStatus.tx,
                    alternate_mobile: ""
                }
                vm.registerNow();
            } else {
                vm.msgType = 'danger';
                vm.msg = 'Payment failed. Please try again.';
            }
        }

        function payNow() {
            if (vm.btnTitle != 'Submit') {
                console.log("in if submit");
                localStorage.setItem('regiData', JSON.stringify(vm.signObj));
                localStorage.setItem('fromPaypal', 'paypal');
//                editionPayment.payment.checkout('PayPal', vm.price, "http://54.172.109.78/epardesh/epardesh-75way/web/#/msign");
//                editionPayment.payment.checkout('PayPal', vm.price, "http://localhost:8888/epardesh-web/web/#/msign");

                editionPayment.payment.checkout('PayPal', vm.price, "http://www.epardesh.com/#/msign");
            } else {
                console.log("in else submit");
                vm.registerNow();
            }
        }
        function registerNow() {
            vm.btnTitle = 'Processing';
            mLoginRegiServices.mRegister(vm.signObj).success(function(response) {
                vm.showLoader = true;
                if (response.status == 105) {
                    vm.msgType = 'success';
                    vm.msg = 'You have successfully registered with us. Please check your email to activate your account and then use the below button to login.';
//                     $("html, body").animate({scrollTop: 0});
//                    $timeout(function() {
                    vm.registered = true;
                    localStorage.removeItem('regiData');
//                        $state.go('mlogin');
//                    }, 1500);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }

        /*============================Get country state and city==================================*/

        $.ajax({
            url: '//freegeoip.net/json/',
            type: 'POST',
            async: false,
            dataType: 'jsonp',
            success: function(response) {
                console.log("location");
                console.log(response);
                if (response.country_name) {
                    vm.signObj.country = response.country_name;
                    if (response.country_name == 'INDIA' || response.country_name == 'India') {
                        localStorage.setItem('m_country', 1);
                        vm.stateData = {
                            'country_id': 1,
                        }
                    }
                    else {
                        localStorage.setItem('m_country', 2);
                        vm.stateData = {
                            'country_id': 2,
                        }
                    }
                    loginRegiServices.view_states(vm.stateData).success(function(response) {
                        console.log("API Hit For States");
                        console.log(response);
                        if (response.status == 105) {
                            vm.states = response.data;

                        }
                        else {
                            showError(response['message']);
                            return false;
                        }
                    });
                }
                else {
                    alert('please allow us to get your location');
                }
            }
        });

        function getState(state) {
            var state_id = state.split(',')[1];
            vm.cityData = {
                'country_id': localStorage.getItem('m_country'),
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

        vm.mChkEamilFun = mChkEamilFun;
        function mChkEamilFun(email) {
            var data = {
                email: email
            }
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            mLoginRegiServices.mChkEmail(data).success(function(response) {
                console.log(response);
                vm.cities = [];
                if (response.status == 105) {
                    if (response.data.status == 0) {
                        showError("This email already exist.");
                        vm.signObj.email = '';
                    }
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }
        function goTologin() {
            $state.go('mlogin');
        }


        /**************Apply promocode***************/

        matrimonypromocode.viewpromocode().success(function(response) {
            console.log(response);
            if (response.status == 105) {
//                localStorage.setItem('promocode',response.data);
//                var len = response.data.length;
//                var data = response.data;
//                console.log('promo'+data);





                var len = response.data.length;
                var data = response.data;


                for (var i = 0; i < len; i++) {
                    var name = response.data[i]["name"];
                    var id = response.data[i]["id"];
                    var discount = response.data[i]["discount"];
//                    vm.objname={
//            name:name
//                    }
//                     vm.objdiscount={
//            
//            discount:discount,
//            
//                    }

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

            if (code == '')
            {
//                alert('Please enter promocode');

                vm.msgType = 'danger';
                vm.msg = 'Please Enter Promocode';
                vm.promocheck = true;
                $timeout(function() {
                    vm.promocheck = false;
                }, 2000);



            }
            else
            {


//               console.log('coupon'+vm.promoname); 
//               console.log('discount'+vm.promodiscount); 
                var index = vm.promoname.indexOf(code);
//               console.log(index+'rfdsgfvdh');

                if (index >= 0)
                {

                    vm.msgType = 'success';
                    vm.msg = 'You have successfully applied';
                    vm.promocheck = true;
                    $timeout(function() {
                        vm.promocheck = false;
                    }, 3000);

                    var val = vm.promodiscount[index];
                    console.log(val + 'eee');
                    console.log(vm.price + 'vm.price');
                    var per = (vm.price * val) / 100;
                    console.log(per + 'per');
                    var amnt = vm.price - per;
                    vm.price = amnt;
                    var price = 'Pay $' + amnt + ' Now';
                    console.log(amnt + 'amnt');
                    console.log('price new' + vm.price);
                    $('.txt-apply').text('Applied');
                    //$('#apply').attr('readonly', true);
                    // $('#apply').css('background-color', '#BDBDBD');
                    vm.couponApplied = true;
                    //$('.pay').attr('disable', true);
                    vm.btnTitle = price;
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

    }
})();