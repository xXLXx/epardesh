(function() {
    'use strict';
    var controllerId = 'viewmatrimonyplan';
    angular
            .module('app')
            .controller(controllerId, viewmatrimonyplan);
    viewmatrimonyplan.$inject = ['$scope', '$timeout', '$state', 'categoriesServices', '$stateParams', 'matrimonyplanServices'];
    function viewmatrimonyplan($scope, $timeout, $state, categoriesServices, $stateParams, matrimonyplanServices) {
        var vm = this;
        //vm.updateplan = updateplan;
        $("#preloader").show();
//        var data={
//             'category_id':$stateParams.id,
//        }
        matrimonyplanServices.matrimonyplan().success(function(response) {
            console.log("in matrimony user");
            console.log(response);
            //return false;
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';

                for (var i = 0; i < len; i++) {
                    var plan_type = response.data[i]["plan_type"];
                    var plan_name = response.data[i]["plan_name"];
                    var plan_validity = response.data[i]["plan_validity"];
                    var plan_price = response.data[i]["plan_price"];
                    var id = response.data[i]["id"];
                    str += '<tr>';
                    str += '<td>' + plan_type + '</td>';
                    str += '<td>' + plan_name + '</td>';
                    str += '<td>' + plan_validity + '</td>';
                    str += '<td>' + plan_price + '</td>';
                    str += '<td><a href="#" class="btn btn-primary btn-sm" id="modal-editplanbtn" plan_id="' + id + '" plan_name="' + plan_name + '" plan_price="' + plan_price + '" data-toggle="modal" data-target="#modal-editplan" style="margin-right:15px;"><i class="fa fa-pencil-square-o"></i> Edit</a>';

//                                        str += '<a href="#" class="btn btn-primary btn-sm" id="edit-submodal" data-toggle="modal" name="' + sub_category_name + '" value="' + subcategory_id + '"cat_name="' + parent_id + '" f_type="' + status + '"  data-target="#modal-editsub-Category" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';

                    str += '</tr>';



                }


                $(".view_plan").html(str);
                $('.data-table').DataTable();
            }
            else {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });




        /**************update plan***************/
        //function updateplan() {
        $(document).delegate('#update-category', 'click', function() {
            console.log("in update plan");
            var edit_plan_name = $("#edit_plan_name").val();
            var edit_plan_type = $("#edit_plan_type").val();
            var edit_plan_price = $("#edit_plan_price").val();
            var edit_plan_id = $("#edit_plan_id").val();
          
            if (ifBlank("Plan Name", edit_plan_name) === false)
                return false;
            if (ifBlank("Plan Price", edit_plan_price) === false)
                return false;

            vm.plan_editData = {
                'plan_name': edit_plan_name,
                'plan_price': edit_plan_price,
                'plan_id': edit_plan_id,
            }
            matrimonyplanServices.editmatrimonyplan(vm.plan_editData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Plan updated Successfully!");
                    $timeout(function() {
                        $('#modal-editplan').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $state.reload();
                    }, 1000);

//                    return false;
                }
                else {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
            });
        //};

        $(document).delegate('#modal-editplanbtn', 'click', function() {
            var plan_name = $(this).attr("plan_name");
            var plan_price = $(this).attr("plan_price");
            var plan_id = $(this).attr("plan_id");
            $("#edit_plan_name").val(plan_name);
            $("#edit_plan_price").val(plan_price);
            $("#edit_plan_id").val(plan_id);
        });




    }
})();