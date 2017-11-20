(function() {
    'use strict';
    var controllerId = 'subcategories';
    angular
            .module('app')
            .controller(controllerId, subcategories);
    subcategories.$inject = ['$scope', '$timeout', '$state', 'categoriesServices'];
    function subcategories($scope, $timeout, $state, categoriesServices) {
        var vm = this;
        vm.updatesubCategory = updatesubCategory;
        /**************Add sub category***************/

        $("#save-subcategory").click(function(ev) {
            ev.preventDefault();
            var name = $("#add_subcategory_name").val();
            var category_id = $("#category_name").val();
//            console.log(category_id);

//            if (category_id == null) {
//                showError("Category name cannot be blank");
//                return false;
//            }
            if (ifBlank("Category Name", category_id) === false)
                return false;
            if (ifBlank("Category Name", category_id) === true)
            {
//                 console.log("yyyy");  
                $(".alert-red").css("display", "none");
            }
            
            if (ifBlank("Sub Category Name", name) === false)
                return false;
            if (ifBlank("Sub Category Name", name) === true)
            {
//                 console.log("yyyy");  
                $(".alert-red").css("display", "none");
            }
            if ($('.addpremium').is(":checked"))
            {
                var status = 1;
            }
            else
                var status = 0;
            vm.subcatData = {
                'category_name': name,
                'parent_id': category_id,
                'status': status,
                'position': 0,
            }
            console.log("status" + status);
            console.log(category_id);

            categoriesServices.addcategory(vm.subcatData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess(" Sub Category Added Successfully");
                    console.log(response);
//                    $state.reload();
                    $timeout(function() {
                        $('#modal-addsub-Category').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $state.reload();
//                        addsubcategory();
                    }, 2000);
                }
                else
                {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        });
        /**************view sub category***************/
//        if(!localStorage.getItem('allsubData') ||  localStorage.getItem('staus')=='1'){
 var store1= localStorage.getItem('cate_id');
 var store = JSON.parse(store1);
        console.log(store);
        var len= store.length;
        console.log(len);
        var str1='';
        for (var i = 0; i < len; i++) {
          var name = store[i]['cat_name'];
          var cat_id= store[i]['cat_id'];
                    console.log(name);
                    str1 += '<option value="' + cat_id + '">' + name + '</option>'  
        }
        $("#category_name").html(str1);
        var category_id = $("#category_id").val();
//        console.log(category_id)
        vm.viewsubcatData = {
            'category_id': category_id,
        }
        $("#preloader").show();
        categoriesServices.viewsubcategory(vm.viewsubcatData).success(function(response) {
//            console.log("hhhhh")
//            console.log(response.data[1]['parent']);
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';
//                var str1 = '';
                for (var i = 0; i < len; i++) {
                    var parent_id = data[i]['parent_id'];
                    var category_name = data[i]['parent'];
                    var subcategory_id = data[i]['sub_category_id'];
                    var sub_category_name = data[i]['sub_category_name'];
                    
                    var status = data[i]['status'];
                    if (status == 0)
                    {
                        var type = "Both";
                    }
                    else
                        var type = "Premium";
                    str += '<tr>';
                    str += '<td>' + sub_category_name + '</td>';
                    str += '<td>' + category_name + '</td>';
                    str += '<td>' + type + '</td>';
                    str += '<td>';
                    str += '<a href="#" class="btn btn-primary btn-sm" id="edit-submodal" data-toggle="modal" name="' + sub_category_name + '" value="' + subcategory_id + '"cat_name="' + parent_id + '" f_type="' + status + '"  data-target="#modal-editsub-Category" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';
                    str += '<a href="#" class="btn btn-danger deletenews"onclick=\'angular.element(this).scope().deleteFun("' + subcategory_id + '")\'>Delete </a>';
                    str += '</td>';
                    str += '</tr>';
                }
                $("#view_sub_category").html(str);
//                $("#category_name").html(str1);
                $("#editcategory_name").html(str1);
                $('.data-table').DataTable();
            }
            else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });
//    }
        /**************update category***************/
        function updatesubCategory() {
            var category_id = $("#editcategory_name").val();
            var subcategory_name = $("#edit_subcategory_name").val();
            var subcategory_id = $("#edit_subcategory_id").val();
            var checkstatus = 0;
            if ($(".editpremium").prop('checked') == true)
            {
                console.log($(".editpremium").prop('checked'));
                checkstatus = '1';
            }
            else
            {
                checkstatus = '0';
            }

            // var sts = $(".editpremium").val();
//            console.log(sts);
//            var featured = $("#featured").val();            
            if (ifBlank("Sub Category Name", subcategory_name) === false)
                return false;
            if (ifBlank("Sub Category Name", subcategory_name) === true)
            {
//                 console.log("yyyy");  
                $(".alert-red").css("display", "none");
            }

            vm.subcat_editData = {
                'category_name': subcategory_name,
                'category_id': subcategory_id,
                'parent_id': category_id,
                'status': checkstatus,
                'position': "0",
            }
            categoriesServices.editcategory(vm.subcat_editData).success(function(response) {
                //console.log(vm.cat_editData);
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Sub Category updated Successfully!");
                    $timeout(function() {
                        $('#modal-editCategory').modal('hide');
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
        }
        ;
//        function updatesubcat(){
//            localstorage.setitem('staus','1');
//            $state.reload();
//        }
        $(document).delegate('#edit-submodal', 'click', function(e) {
            var name = $(this).attr("name");
            var id = $(this).attr("value");
            var category_id = $(this).attr("cat_name");
            var status = $(this).attr("f_type");
            $("#edit_subcategory_name").val(name);
            $("#edit_subcategory_id").val(id);
            $("#editcategory_name option[value=" + category_id + "]").prop("selected", true);
            console.log(status);
            if (status == 0)
            {
                $(".editpremium").prop("checked", false);
                status = 0;
//                      var p_status =1;
//                      $(".editpremium").val(p_status);
            }
            else {
                $(".editpremium").prop("checked", true);
                status = 1;
            }
        });
        $(document).delegate('#modal-delete', 'click', function() {
            var del_category = $(this).attr("delete_id");
            $('#delete').val(del_category);
            $(this).modal('show');
        });
        $scope.deleteFun = function(id) {

            var ch = confirm("Are you sure you want to delete this Sub Category?");
            vm.delData = {
                'category_id': id
            }
            if (ch == true) {
//                console.log(vm.delData);
                categoriesServices.deletecategory(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        showSuccess("Sub Category deleted successfully!");
                        $timeout(function() {
                            $state.reload();
                        }, 2000);
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