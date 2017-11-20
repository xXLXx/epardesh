(function() {
    'use strict';
    var controllerId = 'manageuser';
    angular
            .module('app')
            .controller(controllerId, manageuser);
    manageuser.$inject = ['$scope', '$timeout', '$state', 'manageuserservices'];
    function manageuser($scope, $timeout, $state, manageuserservices) {
        var vm = this;
        /**************view category***************/
        $("#preloader").show();
        manageuserservices.manageuser().success(function(response) {
            console.log(response);
            if (response.status == 105) {
                 $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';
                for (var i = 0; i < len; i++) {
                    var user_name = data[i]['first_name'];
                    var user_email = data[i]['email'];
                    var user_phno = data[i]['phone'];
                    var user_type = data[i]['user_type'];
                    if (user_type == 2)
                    {
                        var type = "Business";
                    }
                    else
                        var type = "User";
                    str += '<tr>';
                    str += '<td>' + user_name + '</td>';
                    str += '<td>' + user_email + '</td>';
                    str += '<td>' + user_phno + '</td>';
                    str += '<td>' + type + '</td>';
                    str += '</tr>';
                }
                $("#view_manageuser").html(str);
                $('.data-table').DataTable();
            }
            else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });


    }
})();

