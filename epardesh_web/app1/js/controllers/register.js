(function() {
    'use strict';
    var controllerId = 'sign';
    angular
            .module('app')
            .controller(controllerId, sign);
    sign.$inject = ['$scope', '$state', '$timeout', 'loginRegiServices'];
    function sign($scope, $state, $timeout, loginRegiServices) {
        var vm = this;
        vm.getcity = getcity;
        vm.getState = getState;
        vm.ownBusinessFun = ownBusinessFun;
        vm.regData = {
            'first_name': '',
            'last_name': '',
            'email': '',
            'password': '',
            'phone': '',
            'city': '',
            'state': '',
            'country': '',
            'business_name': '',
            'website': '',
            'address': '',
            'user_type': 2,
        }

        function ownBusinessFun() {
           if (vm.ownBusiness == false) {
                vm.regData.user_type = 1;
                $('.business-fields').hide();
            }
            else {
                vm.regData.user_type = 2;
                $('.business-fields').show();
            }
        };
        
        /***********Register******************/
        $("#register-user").click(function() {
            $(".issign").show();
            $(".islogin").hide();
            if (vm.chkTermCondition != true)
            {
                showError("Please accept terms and conditions.");
                return false;
            }
            var first_name = $("#exampleInputName").val();
            var last_name = $("#exampleInputName2").val();
            var business_name = $("#businessNamenew").val();
            var email = $("#exampleInputEmail").val();
            var password = $("#exampleInputPassword1").val();
            var confirm_password = $("#exampleInputPassword2").val();
            var phone = $("#mobno").val();
            var address = $("#addressnew").val();
            var website = $("#websitenew").val();
            var city = $("#region").val();
            var state = $("#state").val().split(',')[0]; //localStorage.getItem("state_name");
            var country = localStorage.getItem("country");
            console.log("business_name" + business_name);
            console.log("address" + address);
            console.log("website" + website);

            if (ifBlank("First Name", first_name) == false)
                return false;
            if (ifBlank("Last Name", last_name) == false)
                return false;
//            if (vm.regData.user_type == 2) {
//                if (ifBlank("Business Name", business_name) == false)
//                    return false;
//            }
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            if (ifBlank("Password", password) == false)
                return false;
            if (ifBlank("Confirm Password", confirm_password) == false)
                return false;
            if (ifMatch("Passwords", password, confirm_password) == false)
                return false;
            if (ifBlank("Mobile No.", phone) == false)
                return false;
  phone = phone.replace(/^1(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
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
//            if (vm.regData.user_type == 2) {
                if (ifBlank("Address", address) == false)
                    return false;
//            }
            if (ifBlank("State", state) == false)
                return false;
            if (ifBlank("City", state) == false)
                return false;
            vm.regData.first_name = first_name;
            vm.regData.last_name = last_name,
                    vm.regData.email = email;
            vm.regData.password = password;
            vm.regData.phone = phone;
            vm.regData.city = city;
            vm.regData.state = state;
            vm.regData.country = country;
            vm.regData.business_name = business_name;
            vm.regData.website = website;
            vm.regData.address = address;
            loginRegiServices.register(vm.regData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Congratulations ! Registered successfully..");
                    localStorage.setItem('a_token', response.data.access_token);
                    localStorage.setItem('user_id', response.data.id);
                    localStorage.setItem('user_name', response.data.first_name);
                    localStorage.setItem('user_l_name', response.data.last_name);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('phone', response.data.phone);
                    localStorage.setItem('business', response.data.business_name);
                    localStorage.setItem('user_type', response.data.user_type);
                    $timeout(function() {
                        $state.go('home');
                    }, 1500);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        });

        /********************** state and city*************************/

        vm.stateData = {
            'country_id': localStorage.getItem("country")
        }
        console.log(vm.stateData.country_id);
        loginRegiServices.view_states(vm.stateData).success(function(response) {
            vm.states = [];
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
            vm.cityData = {
                'country_id': country_id,
                'state_id': state_id,
            }
            loginRegiServices.view_cities(vm.cityData).success(function(response) {
                console.log(response);
                vm.cities = [];
                if (response.status == 105) {
                    vm.cities = response.data
                    console.log(vm.cities);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }
        function getcity() {
            console.log(vm.selectcity);
            var city_name = vm.selectcity.split(',')[0];
            var country_id = vm.selectcity.split(',')[1];
            var city_id = vm.selectcity.split(',')[2];
            console.log(city_name);
            localStorage.setItem('city_name', city_name);
            console.log(country_id);
            console.log(city_id);
        }


        vm.chkEamilFun = chkEamilFun;
        function chkEamilFun(email) {
            var data = {
                email: email
            }
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            loginRegiServices.chkEmail(data).success(function(response) {
                console.log(response);
                vm.cities = [];
                if (response.status == 105) {
                    if (response.data.status == 0) {
                        showError("This email already exist.");
                        vm.u_email = '';
                        vm.b_email = '';
                    }
                }
                else {
                    showError(response['message']);
                    return false;
                }
            });
        }
        
        
         $('body').removeClass('modal-open');
$('.modal-backdrop').remove();
        
    }
})();
