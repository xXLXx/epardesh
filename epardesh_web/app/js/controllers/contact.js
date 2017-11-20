(function() {
    'use strict';
    var controllerId = 'contactCtrl';
    angular
            .module('app')
            .controller(controllerId, contactCtrl);
    contactCtrl.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'loginRegiServices','manageadServices','mProfileServices'];
    function contactCtrl($rootScope, $scope, $state, $timeout, loginRegiServices, manageadServices,mProfileServices) {
        var vm = this;
        vm.show_type = true;
        vm.show_classified =false;
        vm.show_matrimony = false;
        vm.send = false;
        vm.sendContactFun_class = sendContactFun_class;
        vm.sendContactFun_matri = sendContactFun_matri;
        vm.sendContactFun = sendContactFun;
        function sendContactFun()
        {
            
            var name = $("#name1").val();
            var email = $("#email1").val();
            var phone = $("#phone1").val();
            var sub = $("#subject1").val();
            var msg = $("#msg1").val();

            if (ifBlank("Name", name) == false)
                return false;
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            if (ifBlank("Phone", phone) == false)
                return false;
            if (ifBlank("Subject", sub) == false)
                return false;
            if (ifBlank("Message", msg) == false)
                return false;
            
             vm.number = phone.replace(/^1(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
            if (vm.number.length != 10) {
                showError('Phone number should be 10 digit number');
                $timeout(function() {
                }, 1000);
                return false;
            }
            
            
            var data = {
                name: name,
                email: email,
                phone: phone,
                subject: sub,
                message: msg,
                query_for: "other",
                query_type: vm.selected
            }
          console.log(data)
            loginRegiServices.contactUs(data).success(function(response) {
                if (response.status == 105) {
                    showSuccess("Your enquiry has been sent. We will contact you soon.");
                    $timeout(function() {
                        $state.reload();
                    }, 3000);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            })
            
            
            
            
            
            
            
            
            
        }
        
        
        
        
        
        function sendContactFun_class() {
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
            if (ifBlank("Subject", sub) == false)
                return false;
            if (ifBlank("Message", msg) == false)
                return false;
            
             vm.number = phone.replace(/^1(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
            if (vm.number.length != 10) {
                showError('Phone number should be 10 digit number');
                $timeout(function() {
                }, 1000);
                return false;
            }
            
            
            
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
                subject: sub,
                message: msg,
                query_for: "classified",
                query_type: vm.selected_classified
            }
          console.log(data)
            loginRegiServices.contactUs(data).success(function(response) {
                if (response.status == 105) {
                    showSuccess("Your enquiry has been sent. We will contact you soon.");
                    $timeout(function() {
                        $state.reload();
                    }, 3000);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            })
        }
        
        
        // Send message fro matrimony
        
        function sendContactFun_matri() {
            var name = $("#mname").val();
            var email = $("#memail").val();
            var phone = $("#mphone").val();
            var sub = $("#msubject").val();
            var msg = $("#mmsg").val();

            if (ifBlank("Name", name) == false)
                return false;
            if (ifBlank("Email", email) == false)
                return false;
            if (ifValidEmail("Email", email) == false)
                return false;
            if (ifBlank("Phone", phone) == false)
                return false;
            if (ifBlank("Subject", sub) == false)
                return false;
            if (ifBlank("Message", msg) == false)
                return false;
            
            
             vm.number = phone.replace(/^1(|-|\(|\)|\.| )*|-|\(|\)|\.| /g, '');
            if (vm.number.length != 10) {
                showError('Phone number should be 10 digit number');
                $timeout(function() {
                }, 1000);
                return false;
            }
            
            
            
             var found3 = 0;
            vm.badword_len = vm.manage_badwords_matri.length;
            vm.name_split = name.split(" ");
            console.log(vm.name_split)
            console.log('name splited')
            vm.name_len = vm.name_split.length;
            vm.result = [];
            for (var i = 0; i < vm.badword_len; i++) {
                for (var j = 0; j < vm.name_len; j++) {
                    if (vm.manage_badwords_matri[i] == vm.name_split[j]) {
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
                    if (vm.manage_badwords_matri[i] == vm.sub_split[j]) {
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
                    if (vm.manage_badwords_matri[x] == vm.msg_split[y]) {
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
                subject:sub,
                message: msg,
                query_for: 'matrimony',
                query_type: vm.selected_matrimony
            }
            console.log('matrimony')
          console.log(data)
            loginRegiServices.contactUs(data).success(function(response) {
                if (response.status == 105) {
                    showSuccess("Your enquiry has been sent. We will contact you soon.");
                    $timeout(function() {
                        $state.reload();
                    }, 3000);
                }
                else {
                    showError(response['message']);
                    return false;
                }
            })
        }
        
        
        
        
        vm.go = go;
        function go(val)
        {
            
                if(val=="0")
                {
                   
                    if(vm.selected_classified == undefined)
                    {
                        showError('Select query type');
                    }else
                    {
                        vm.send_classified =true;
                    vm.send_matrimony =false;
                    vm.send = false; 
                    }
                    
                }else if(val == "1")
                {
                    if(vm.selected_matrimony == undefined)
                    {
                        showError('Select query type');
                    }else
                    {
                        vm.send_matrimony =true;
                    vm.send_classified =false;
                    vm.send = false;
                        
                    }
                    
                    
                   
                    
                }
                
                
            
            
            console.log('goo')
        }
        
        vm.go_type = go_type;
        function go_type()
        {
            
            console.log(vm.selected_type);
            if(vm.selected_type == "0")
            {
                vm.show_classified = true;
                vm.show_matrimony = false;
                vm.send = false;
                vm.send_classified =false;
                vm.send_matrimony =false;
                vm.show_type = false;
            }else if(vm.selected_type == "1")
            {
                vm.show_matrimony = true;
                vm.show_classified = false;
                vm.send = false;
                vm.send_classified =false;
                vm.send_matrimony =false;
                vm.show_type = false;
            }else if(vm.selected_type == "2")
            {
//                vm.show_type = false;
               vm.selected = "Others"
                vm.show_matrimony = false;
                vm.show_classified = false;
                vm.send_classified =false;
                    vm.send_matrimony =false;
                vm.send = true;
            }else
            {
                showError('Please select Query');
            }
        }
        
        
        vm.check_type = check_type;
        function check_type()
        {
             if(vm.selected_type == "0")
            {
                vm.show_classified = true;
                vm.show_matrimony = false;
                vm.send = false;
                vm.send_classified =false;
                vm.send_matrimony =false;
//                vm.show_type = false;
            }else if(vm.selected_type == "1")
            {
                vm.show_matrimony = true;
                vm.show_classified = false;
                vm.send = false;
                vm.send_classified =false;
                vm.send_matrimony =false;
//                vm.show_type = false;
            }else
            {
//                vm.show_type = false;
               vm.selected = "Others"
                vm.show_matrimony = false;
                vm.show_classified = false;
                vm.send_classified =false;
                    vm.send_matrimony =false;
                vm.send = true;
            }
        }
        
        
        
        // Bad word for classified
        vm.badArray = []
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
        
        //bad word for matrimony
        vm.barArray_matri = [];
          mProfileServices.viewbadwords().success(function(response) {
            console.log(response);
            if (response.status == 105) {
                console.log("*manage badwords matrimony*")
                vm.manage_badwords_matri = response.data[0].badwords.split(",");

                console.log(vm.manage_badwords_matri);
                angular.forEach(vm.manage_badwords, function(value, key) {

                    vm.barArray_matri.push({name: value});
                })
                console.log(vm.barArray_matri);

            }
            else {
                showError(response['message']);
                return false;
            }
        });
        
        
        
         vm.redirect = redirect;
           function redirect()
           {
               
               if(vm.getCurrentState == "home")
               {
                   $state.go("main")
               }else
               {
                   $state.go("home")
               }
               
           }
        
        
        
        

        $('html, body').animate({scrollTop: 0}, 'slow');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();


    }

})();