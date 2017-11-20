(function() {
    'use strict';
    var controllerId = 'mheader';
    angular
            .module('app')
            .controller(controllerId, mheader);
    mheader.$inject = ['$rootScope', '$scope', '$state', '$http', 'loginRegiServices', 'mProfileServices'];
    function mheader($rootScope, $scope, $state, $http, loginRegiServices, mProfileServices) {
        var vm = this;
        vm.logout = logout;
        vm.isLogIn = true;
        //vm.onInfoChagne = onInfoChagne;
        vm.searchFun = searchFun;
        vm.changeCountry = changeCountry;
        vm.getCurrentState = $state.current.name;
        console.log($state.current.name);
        if (localStorage.getItem('m_user_id')) {
            vm.userId = localStorage.getItem('m_user_id');
        }
        else {
            vm.userId = '';
        }
        vm.user_name = localStorage.getItem('m_user_name');
        if (localStorage.getItem('m_user_id')) {
            vm.isLogIn = false;
        }
        $scope.$on("reloadState", function(event) {
            $state.reload();
        });
        function logout() {
            console.log('logout');
            var con = confirm('Are you sure want to Logout?');
            if(con == false) {
                return false;
            } else {
               localStorage.clear();
               $state.go('mlogin'); 
            }
        }
        if (localStorage.getItem('searchObj')) {
            vm.searchDataObj = JSON.parse(localStorage.getItem('searchObj'));
            vm.searchObj = {
                status: vm.searchDataObj.status,
                keyword: vm.searchDataObj.keyword,
                gender: vm.searchDataObj.gender,
                min_age: vm.searchDataObj.min_age,
                max_age: vm.searchDataObj.max_age,
                caste: vm.searchDataObj.caste,
                country: vm.searchDataObj.country,
                religion: vm.searchDataObj.religion,
                id: vm.userId,
                mother_tounge:vm.searchDataObj.mother_tounge,
                min_height: vm.searchDataObj.min_height,
                max_height: vm.searchDataObj.max_height,
                current_residence:vm.searchDataObj.current_residence,
                education:vm.searchDataObj.education
            }
        }
        else {
            vm.searchObj = {
                status: '',
                keyword: '',
                gender: '',
                min_age: '18',
                max_age: '50',
                caste: '',
                country: '',
                religion: '',
                id: vm.userId,
                mother_tounge:'',
                min_height:'134',
                max_height:'213',
                current_residence:'',
                education: ''
            }
        }
        function broadcastFun() {
            console.log("Broadcasted from header");
            $rootScope.$broadcast('searchDataFromHeader', vm.searchObj);
            if($state.current.name == "mhome"){
                localStorage.setItem("keywordFromMainPage", vm.searchObj.keyword);
                $state.go("matrimony_profile");
            }
             console.log('current   :   ' + $state.current.name);
        }
        $scope.$on("searchDataFromContent", function(event, data) {
            console.log("Listened in header");
            vm.searchObj = data;
        });

//        function onInfoChagne() {
//            //broadcastFun();
//        }

        function searchFun() {
            broadcastFun();
//            vm.searchObj.country = localStorage.getItem('m_country_name');
//            localStorage.setItem('searchObj', JSON.stringify(vm.searchObj));
//            mProfileServices.search(vm.searchObj).success(function(response) {
//                console.log(response);
//                console.log('response');
//                if (response.status == 105) {
//                    vm.allProfile = response.data;
////                    localStorage.setItem('mSearchData', JSON.stringify(response.data));
////                    if (vm.getCurrentState == 'matrimony_profile') {
////                        $rootScope.$broadcast('reloadState');
////                    }
////                    else {
////                        $state.go('matrimony_profile');
////                    }
//                } else {
//                    var str = "<h4 class='danger'>" + response['message'] + "<h4>"
//                    $('.msg').html(str);
//                    $('#showMsgModal').modal('show');
//                    return false;
//                }
//            });
        }

        function changeCountry(cntry) {
            if (cntry == 'India') {
                localStorage.setItem('m_country', 1);
                $('.country_toggle').html($('#ct1').html() + '<span class="caret"></span>');
            }
            else {
                localStorage.setItem('m_country', 2);
                $('.country_toggle').html($('#ct2').html() + '<span class="caret"></span>');
            }
            localStorage.setItem('m_country_name', cntry);
            $rootScope.$broadcast('countryFromHeader', cntry);
        }

        if (!localStorage.getItem('m_country_name')) {
            $.ajax({
                url: '//freegeoip.net/json/',
                type: 'POST',
                async: false,
                dataType: 'jsonp',
                success: function(response) {
                    console.log("location");
                    console.log(response);
                    if (response.country_name) {
                        if (response.country_name == 'INDIA' || response.country_name == 'India') {
                            localStorage.setItem('m_country', 1);
                            localStorage.setItem('m_country_name', 'India');

                            $('.country_toggle').html($('#ct1').html() + '<span class="caret"></span>');
                        }
                        //else if (response.country_name == 'UNITED STATES' || response.country_name == 'United States' || response.country_name == 'united states' || response.country_name == 'US' || response.country_name == 'us') 
                        else {
                            localStorage.setItem('m_country', 2);
                            localStorage.setItem('m_country_name', 'USA');

                            $('.country_toggle').html($('#ct2').html() + '<span class="caret"></span>');
                        }

                    }
                    else {
                        alert('please allow us to get your location');
                    }
                }
            });
        }
        else {
            if (localStorage.getItem('m_country_name') == 'India') {
                $('.country_toggle').html($('#ct1').html() + '<span class="caret"></span>');
            }
            else {
                $('.country_toggle').html($('#ct2').html() + '<span class="caret"></span>');
            }
        }
    }
})();

                                    
