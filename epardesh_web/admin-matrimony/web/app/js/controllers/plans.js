(function() {
    'use strict';
    var controllerId = 'plan';
    angular
            .module('app')
            .controller(controllerId, plan);
    plan.$inject = ['$scope', '$timeout', '$state', 'plansservices'];
    function plan($scope, $timeout, $state, plansservices) {
        var vm = this;
        vm.updateplans = updateplans;
        /**************view plans***************/
        $("#preloader").show();
        plansservices.viewplans().success(function(response) {
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';
                for (var i = 0; i < len; i++) {
                    var view_id = data[i]['id'];
                    var viewtype = data[i]['plan_type'];
                    var viewname = data[i]['plan_name'];
                    var viewprice = data[i]['plan_price'];
                    console.log(i);

                    str += '<tr>';
                    str += '<td>' + viewtype + '</td>';
                    str += '<td>' + viewname + '</td>';
                    str += '<td>' + viewprice + '</td>';
                    str += '<td>';
                    str += '<a href="#" class="btn btn-primary btn-sm" id="edit-plansmodal" data-toggle="modal" value="' + view_id + '"p_type="' + viewtype + '" name="' + viewname + '" p_price="' + viewprice + '"  data-target="#modal-editplan" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';
                    str += '</td>';
                    str += '</tr>';
                }
                $("#view_allplan").html(str);
                $('.data-table').DataTable();
            }
            else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });
        /**************update plans***************/
          function updateplans() {
            var plan_id = $("#editplan_id").val();
            var plan_type = $("#editplan_type").val();
            var plan_name = $("#editplan_name").val();
            var plan_price = $("#editplan_price").val();

            if (ifBlank("plan Type", plan_type) === false)
                return false;
            if (ifBlank("plan Type", plan_type) === true)
            {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
            if (ifBlank("plan Name", plan_name) === false)
                return false;
             if (ifBlank("plan Name", plan_name) === true)
                 {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
            if (ifBlank("plan Price", plan_price) === false)
                return false;
        if (ifBlank("plan Price", plan_price) === true)
            {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
                if (ifNumeric("plan Price", plan_price) === false)
                return false;
        if (ifNumeric("plan Price", plan_price) === true)
            {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
                

            vm.plans_editData = {
                'plan_id': plan_id,
                'plan_type': plan_type,
                'plan_name': plan_name,
                'plan_price': plan_price,
            }
            plansservices.editplans(vm.plans_editData).success(function(response) {
                console.log(vm.plans_editData);
                console.log(response);
                if (response.status == 105) {
                    showSuccess("plans updated Successfully...!");
                    $timeout(function() {
                        $('#modal-editplan').modal('hide');
                         $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $state.reload();
                    }, 2000);
                }
                else {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        };
        $(document).delegate('#edit-plansmodal', 'click', function(e) {
            var name = $(this).attr("name");
            var id = $(this).attr("value");
            var pl_type = $(this).attr("p_type");
            var pl_price = $(this).attr("p_price");
            $("#editplan_name").val(name);
            $("#editplan_id").val(id);
            $("#editplan_type").val(pl_type);
            $("#editplan_price").val(pl_price);
        });
    }
})();



