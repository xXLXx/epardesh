(function() {
    'use strict';
    var controllerId = 'viewmatrimonyuser';
    angular
            .module('app')
            .controller(controllerId, viewmatrimonyuser);
    viewmatrimonyuser.$inject = ['$scope', '$timeout', '$state', 'categoriesServices', '$stateParams', 'matrimonyuserServices'];
    function viewmatrimonyuser($scope, $timeout, $state, categoriesServices, $stateParams, matrimonyuserServices) {
        var vm = this;
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


                for (var i = 0; i < len; i++) {

                    var first_name = response.data.matrimony_users[i]["first_name"];
                    var last_name = response.data.matrimony_users[i]["last_name"];
                    var name = first_name + " " + last_name;
                    var email = response.data.matrimony_users[i]["email"];
                    var mobile = response.data.matrimony_users[i]["mobile"];
                    var religion = response.data.matrimony_users[i]["religion"];
                    var id = response.data.matrimony_users[i]["id"];
                    if (religion == null || religion == "null") {
                        religion = "";
                    }
                    var id = response.data.matrimony_users[i]["id"];



                    str += '<tr>';
                    str += '<td>' + name + '</td>';
                    str += '<td>' + email + '</td>';
                    str += '<td>' + mobile + '</td>';
                    str += '<td>' + religion + '</td>';
                    str += '<td> <a href="javascript:;"><button type="button" id="' + id + '" class="btn detail-btn">View Details</button></a></td>';
                    str += '</tr>';


                }


                $(".view_users").html(str);
                $('.data-table').DataTable();
            }
            else {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });

    }
    
    
      $(document).delegate('.detail-btn', 'click', function(e) {
          e.preventDefault();
          var id = $(this).attr("id");
           window.location.href = "#/view-details?id="+ id;
        });
        
        
})();