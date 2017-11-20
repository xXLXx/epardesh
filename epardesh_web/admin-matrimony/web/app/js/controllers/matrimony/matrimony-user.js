(function() {
    'use strict';
    var controllerId = 'viewmatrimonyuser';
    angular
            .module('app')
            .controller(controllerId, viewmatrimonyuser);
    viewmatrimonyuser.$inject = ['$scope', '$timeout', '$state', 'categoriesServices', '$stateParams', 'matrimonyuserServices'];
    function viewmatrimonyuser($scope, $timeout, $state, categoriesServices, $stateParams, matrimonyuserServices) {
        var vm = this;
        vm.filter = filter;
        var table = "";
        $("#preloader").show();
//        var data={
//             'category_id':$stateParams.id,
//        }
        matrimonyuserServices.matrimonyuser().success(function(response) {
            console.log("in matrimony user");
            console.log(response);
            //return false;
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.matrimony_users.length;
                var data = response.data;
                var str = '';
                var free_users_count = response.data.free_users_count;
                var gold_users_count = response.data.gold_users_count;
                var platinum_users_count = response.data.platinum_users_count;

                $(".free_user_count").html(free_users_count);
                $(".gold_user_count").html(gold_users_count);
                $(".premium_user_count").html(platinum_users_count)

//              console.log(response.data.matrimony_users[0]["state"])
              console.log(len)
                for (var i = 0; i < len; i++) {
                    console.log(i)
                    var prof_id = response.data.matrimony_users[i]["profile_id"];
                    var first_name = response.data.matrimony_users[i]["first_name"];
                    var last_name = response.data.matrimony_users[i]["last_name"];
                    var name = first_name + " " + last_name;
                    var email = response.data.matrimony_users[i]["email"];
                    var mobile = response.data.matrimony_users[i]["mobile"];
                    var religion = response.data.matrimony_users[i]["religion"];
                    var id = response.data.matrimony_users[i]["id"];
                     if(response.data.matrimony_users[i]["mobile"] == null)
                     {
                         mobile = '-';
                     }
                     if(response.data.matrimony_users[i]["state"] != null)
                     {
                         var state = response.data.matrimony_users[i]["state"].split(",");
                        
                         if(response.data.matrimony_users[i]["country"] !=null)
                         {
                             if(response.data.matrimony_users[i]["city"] != null)
                             {
                                  var location = response.data.matrimony_users[i]["city"] + ',' + state[0]+','+response.data.matrimony_users[i]["country"];
                    
                                 
                             }
                             else
                             {
                                 var location = '-';
                             }
                             
                         }
                         else
                         {
                             var location = '-';
                         }                   
                    }
                     else 
                     {
                     
                         var location = '-';
                     }                   
                     
                      
//                    var location = response.data.matrimony_users[i]["city"] + ',' + state[0]+','+response.data.matrimony_users[i]["country"];
                    if (religion == null || religion == "null") {
                        religion = "";
                    }
                    var id = response.data.matrimony_users[i]["id"];
                    var status = "";
                    if (response.data.matrimony_users[i]["email_verified_status"] == 0)
                    {
                        status = "Pending";
                    } else
                    {
                        status = "Activated";

                    }

                    str += '<tr>';
                    str += '<td> <a href="javascript:;" id="' + id + '" class="detail">' + prof_id + '</a></td>';
                    str += '<td>' + name + '</td>';
                    str += '<td>' + email + '</td>';
                     str += '<td>' + location + '</td>';
                    str += '<td>' + mobile + '</td>';
                    str += '<td>' + religion + '</td>';
                    str += '<td>' + status + '</td>';
                    str += '<td> <a href="javascript:;"><button type="button" id="' + id + '" onclick=\'angular.element(this).scope().deleteFun("' + email + '","'+first_name+'","'+last_name+'")\'class="btn detail-btn">Delete</button></a></td>';
                    
                    str += '</tr>';


                }

                $(".view_users").html(str);
                table = $('.data-table').DataTable();
                 $('.data-table').DataTable();
            }
            else {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });


//        $(document).delegate('.detail-btn', 'click', function(e) {
//            e.preventDefault();
//            var id = $(this).attr("id");
//            window.location.href = "#/view-details?id=" + id;
//        });
        $(document).delegate('.detail', 'click', function(e) {
            e.preventDefault();
            var id = $(this).attr("id");
            window.location.href = "#/view-details?id=" + id;
        });

        // filter
        vm.filterData =
                {
                    'activate_status': '',
                    'plan_type': '',
                    'days_to_expire': ''
                }
        function filter()
        {
            
            console.log(vm.sortByplan);
            console.log(vm.sortBydate);
            console.log(vm.sortBystatus);
            if(vm.sortByplan == undefined)
            {
                vm.filterData.plan_type = "";
            }else
            {
                 vm.filterData.plan_type = vm.sortByplan;
            }
              if(vm.sortBydate == undefined)
            {
                vm.filterData.days_to_expire = "";
            }else
            {
                 vm.filterData.days_to_expire = vm.sortBydate;
            }
              if(vm.sortBystatus == undefined)
            {
                vm.filterData.activate_status = "";
            }else
            {
                 vm.filterData.activate_status = vm.sortBystatus;
            }
            
         
            console.log(vm.filterData)
            matrimonyuserServices.filterUser(vm.filterData).success(function(response) {
                if(response.status == 105)
                {
                     $(".data-table").dataTable().fnDestroy();
                    console.log('indise filteres')
                    console.log(response)
                     var str1 = '';
                    var len = response.data.length;
                for (var i = 0; i < len; i++) {
                    var prof_id = response.data[i].profile_id;
                    var first_name = response.data[i].first_name;
                    var last_name = response.data[i].last_name;
                    var name = first_name + " " + last_name;
                    var email = response.data[i].email;
                    var mobile = response.data[i].mobile;
                    var religion = response.data[i].religion;
                    var id = response.data[i].id;
                    
                    if(response.data[i].mobile == null)
                    {
                        mobile = '-'
                    }
                     if(response.data[i].state != null)
                     {
                        var state = response.data[i].state.split(",");
                        
                        if(response.data[i].country != null)
                        {
                        if(response.data[i].city != null)
                        {
                             var location = response.data[i].city +','+ state[0]+','+response.data[i].country;
                            
                        }else
                        {
                             var location = '-';
                        }    
                        }else
                        {
                             var location = '-'
                        }
                        
                   
                        
                        }
                     else
                     {
                          var location = '-';
                        
                        
                        }
                    
                    
                    
                   
                    if (religion == null || religion == "null") {
                        religion = "";
                    }
                    var id = response.data[i].id;
                    var status = "";
                    if (response.data[i].email_verified_status == 0)
                    {
                        status = "Pending";
                    } else
                    {
                        status = "Activated";

                    }


                    str1 += '<tr>';
                    str1 += '<td> <a href="javascript:;" id="' + id + '" class="detail">' + prof_id + '</a></td>';
                    str1 += '<td>' + name + '</td>';
                    str1 += '<td>' + email + '</td>';
                    str1 += '<td>' + location + '</td>';
                    str1 += '<td>' + mobile + '</td>';
                    str1 += '<td>' + religion + '</td>';
                    str1 += '<td>' + status + '</td>';
//                    str1 += '<td> <a href="javascript:;"><button type="button" id="' + id + '" class="btn detail-btn">View Details</button></a></td>';
                     str1 += '<td> <a href="javascript:;"><button type="button" id="' + id + '" onclick=\'angular.element(this).scope().deleteFun("' + email + '","'+first_name+'","'+last_name+'")\'class="btn detail-btn">Delete</button></a></td>';
                    
                        str1 += '</tr>';
                }
                $(".view_users").html(str1);
                $('.data-table').DataTable();
                    
                }
            

            })
        }
        
        
        
         $scope.deleteFun = function(email,fist_name,last_name) {

            var ch = confirm("Are you sure you want to delete this User?");
            vm.delData = {
                'user_email': email,
                        'user_first_name':fist_name,
                        'user_last_name':last_name
            }
            if (ch == true) { 
                console.log(vm.delData)
                matrimonyuserServices.matrimonydeleteUser(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status === 105 || response.status === '105') {
                        alert("User deleted successfully!");
                        $timeout(function() {
                            $state.reload();
                        }, 1000);
                    }
                }).error(function() {
                    alert('Internal server error');
                });
            }

        }

    }










})();