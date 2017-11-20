(function() {
    'use strict';
    var controllerId = 'Mcontact';
    angular
            .module('app')
            .controller(controllerId, Mcontact);
    Mcontact.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'loginRegiServices','mProfileServices'];
    function Mcontact($rootScope, $scope, $state, $timeout, loginRegiServices,mProfileServices) {
        var vm = this;
        vm.send =false;
        vm.sendContactFun = sendContactFun;

        function sendContactFun() {
            var name = $("#name").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            var sub = $("#subject").val();
            var msg = $("#msg").val();

            if (ifBlank("Name", name) == false)
                return false;
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            if (ifBlank("Phone", phone) == false)
                return false;
            
             var found3 = 0;
            vm.badword_len = vm.manage_badwords.length;
            vm.name_split = name.split(" ");
            console.log(vm.name_split)
            console.log('name splited')
            vm.name_len = vm.name_split.length;
            vm.result = [];
            for (var i = 0; i < vm.badword_len; i++) {
                for (var j = 0; j < vm.name_len; j++) {
                    if (vm.manage_badwords[i] == vm.name_split[j]) {
                        vm.result.push(vm.name_split[j]);
                        console.log(vm.result);
                        found3 = 1;
                        break;
                    }
                }
            }
            
            //subject bad word
            vm.sub_split = sub.split(" ");
            console.log(vm.sub_split)
            console.log('sub splited')
            vm.sub_len = vm.sub_split.length;
             vm.result_sub = [];
             var found4 = 0;
            for (var i = 0; i < vm.badword_len; i++) {
                for (var j = 0; j < vm.sub_len; j++) {
                    if (vm.manage_badwords[i] == vm.sub_split[j]) {
                        vm.result_sub.push(vm.sub_split[j]);
                        console.log(vm.result_sub);
                        found4 = 1;
                        break;
                    }
                }
            }
            
            
            //message
             vm.adtrim = msg.replace(/[^a-zA-Z ]/g, "");
             vm.msg_split = vm.adtrim.split(" ");
             console.log(vm.msg_split)
             console.log('mesage')
             vm.msg_len = vm.msg_split.length;
           vm.result_msg = [];
            var found2 = 0;
               for (var x = 0; x < vm.badword_len; x++) {
                for (var y = 0; y < vm.msg_len; y++) {
                    if (vm.manage_badwords[x] == vm.msg_split[y]) {
                        vm.result_msg.push(vm.msg_split[y]);
                        console.log(vm.result_msg);
                        found2 = 2;
                        break;
                    }
                }
            }

            
            
            
              if (found3 == 1) {
                showError("Please change these words " + vm.result.toString() +' in name');
                $("#name").focus();
                return false;
            }
             if (found4 == 1) {
                showError("Please change these words " + vm.result_sub.toString() +' in Subject');
                $("#name").focus();
                return false;
            }
            if (found2 == 2) {
                showError("Please change these words " + vm.result_msg.toString() +' in Message');
                $("#name").focus();
                return false;
            }
            
            
            
            var data = {
                name: name,
                email: email,
                phone: phone,
                message: $("#subject").val()
            }
          console.log(data)
//            loginRegiServices.contactUs(data).success(function(response) {
//                if (response.status == 105) {
//                    showSuccess("Your enquiry has been sent. We will contact you soon.");
//                    $timeout(function() {
//                        $state.reload();
//                    }, 1500);
//                }
//                else {
//                    showError(response['message']);
//                    return false;
//                }
//            })
        }
        vm.go = go;
        function go()
        {
            if(vm.selected== null | vm.selected =="")
            {
                
            }else
            {
                vm.send =true;
                
            }
            
            console.log('goo')
        }
        
        // Bad word for classified
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
        
        
        
        
        
        
        
        

        $('html, body').animate({scrollTop: 0}, 'slow');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();


    }

})();