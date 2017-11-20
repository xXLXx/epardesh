(function() {
    'use strict';
    var controllerId = 'manageuser';
    angular
            .module('app')
            .controller(controllerId, manageuser);
    manageuser.$inject = ['$scope', '$timeout', '$state', 'manageuserservices'];
    function manageuser($scope, $timeout, $state, manageuserservices) {
//        vm.exportArr = [];
        var vm = this;
        var table = '';
        /**************view category***************/
        $("#preloader").show();
        manageuserservices.manageuser().success(function(response) {
            console.log(response);
            console.log('users')
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
//                console.log('users' + data);
                var str = '';
                for (var i = 0; i < len; i++) {
                    var first_name = data[i]['first_name'];
                    var last_name = data[i]['last_name'];
                    var user_email = data[i]['email'];
                    var user_phno = data[i]['phone'];
                    var user_type = data[i]['user_type'];
                    var id = data[i]['id'];
                    if (user_type == 2)
                    {
                        var type = "Business";
                    }
                    else
                        var type = "User";
                    str += '<tr>';
                    str += '<td>'
                    str += '<input type="checkbox" name= "check[]" class ="checkbox" id="' + id + '" value ="' + id + '" >';
                    str += '<td>' + first_name + '  ' + last_name + '</td>';
                    str += '<td>' + user_email + '</td>';
                    str += '<td>' + user_phno + '</td>';
                    str += '<td><a class="btn btn-danger" onclick=\'angular.element(this).scope().deleteFun("' + id + '")\'>Delete </a></td>';
//                    str += '<td>' + type + '</td>';
                    str += '</tr>';
                }
                $("#view_manageuser").html(str);
                $('.data-table').DataTable({"iDisplayLength": 50, "aLengthMenu": [[50,100,150,200,-1],[50, 100, 150, 200, "All"]], stateSave: true});
                table = $('.data-table').DataTable();
                      
            }
            else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });
        /**************export to excel***************/
        vm.getHeader = ["Username", "Email_id", "Country", "State", "Region", "No_of_Ads_Posted", "phone_number"];
        vm.exportArr = [];
        var dataObjexport = {};
        manageuserservices.manageuser().success(function(response) {
            vm.data = response.data;
            var totalItems = vm.data.length;

            for (var q = 0; q < totalItems; q++) {
                dataObjexport = {
                    Username: vm.data[q].first_name + ' ' + vm.data[q].last_name,
                    Email_id: vm.data[q].email,
                    Country: vm.data[q].country,
                    State: vm.data[q].state,
                    Region: vm.data[q].city,
                    No_of_Ads_Posted: vm.data[q].id,
                    phone_number: vm.data[q].phone
                }
                vm.exportArr.push(dataObjexport);

            }

        });

        /******* Multiple delete****/
        $('.sub').click(function() {
            var val = [];
            $(':checkbox:checked',table.fnGetNodes()).each(function(i) {
                val[i] = $(this).val();
            });
            console.log(val);
            console.log('selected item')
            console.log(val.length)
            if (val.length == 0)
            {
                alert("Please Select Any User")
            }
            else
            {
                var ch = confirm("Are you sure you want to delete Selected Users?");
                vm.delData = {
                    'user_array': val
                }
                console.log(vm.delData);
                if (ch == true) {
                manageuserservices.deleteuser(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        alert("Users deleted successfully!");                       
                        $timeout(function() {
                            $state.reload();
                        }, 1000);
                    }
                    else {
                        console.log(response)
                        showError("Some error occur!");
                        return false;
                    }

                });
                }
            }
        });

        $("#selectall").click(function(event) {
       if($(this).is(':checked',true))  
    {
           $('.checkbox',table.fnGetNodes()).each(function(i) {
                 $(".checkbox").prop('checked', true);
            });
        
    }  
    else  
    {  
        $(".checkbox").prop('checked',false);  
    }

     })

        /************delete user*******/
        $scope.deleteFun = function(id) {
            var idd = [];
            idd[0] = id;
            var ch = confirm("Are you sure you want to delete this User?");
            vm.delData = {
                'user_array': idd
            }
            if (ch == true) {
                manageuserservices.deleteuser(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        alert("User deleted successfully!");
                        $timeout(function() {
                            $state.reload();
                        }, 1000);
                    }
                    else {
                        console.log(response)
                        showError("Some error occur!");
                        return false;
                    }

                });
            }
        }
    }
})();

