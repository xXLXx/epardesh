(function() {
    'use strict';
    var controllerId = 'categories';
    angular
            .module('app')
            .controller(controllerId, categories);
    categories.$inject = ['$scope', '$timeout', '$state', 'categoriesServices'];
    function categories($scope, $timeout, $state, categoriesServices) {
        var vm = this;
        vm.alert = true;
        vm.updateCategory = updateCategory;

        /**************add category***************/
        $("#save-category").click(function() {
            var category_name = $("#add_category_name").val();
//            var cat_position = $("#add_cat_position").val();
//            var cat_position = $("#add_cat_position").prop('selectedIndex');
               
            if (ifBlank("Category Name", category_name) == false)
                return false;
            if (ifBlank("Category Name", category_name) == true)
                {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
//            if (ifBlank("Category position", cat_position) == false)
//                return false;
//            if (cat_position == '0' || cat_position == 0) {
//
//                showError("Please Select Category Position");
//                return false;
//            }

            vm.catData = {
                'category_name': category_name,
                'parent_id': 0,
                'status': 0,
                'position': 0,
            }
//                        console.log(name);
            categoriesServices.addcategory(vm.catData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    vm.alert = false;
                    showSuccess("Category Added Successfully");
                    $timeout(function() {
                        $('#modal-addCategory').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $state.reload();
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
        /**************view category***************/

        $("#preloader").show();
        categoriesServices.viewcategory().success(function(response) {
            console.log("jojojo")
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();

                var len = response.data.length;
                var data = response.data;
                var str = '';
                var cat_id = [];
                var subcat_obj = {};
                for (var i = 0; i < len; i++) {

                    var name = data[i]['category_name'];
                    var category_id = data[i]['category_id'];
                    var cat_position = data[i]['position'];
                    subcat_obj = {cat_name: name,
                        cat_id: category_id};
                    cat_id.push(subcat_obj);

                    str += '<tr>';
                    str += '<td style="cursor:pointer" onclick=\'angular.element(this).scope().viewcatFun("' + category_id + '")\'>' + name + '</td>';
//                    str += '<td>' + cat_position + '</td>';
                    str += '<td>';
                    str += '<a class="btn btn-primary btn-sm" id="edit-modal" data-toggle="modal" name="' + name + '"  value="' + category_id + '" c_position="' + cat_position + '" data-target="#modal-editCategory" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';
                    str += '<a class="btn btn-danger" onclick=\'angular.element(this).scope().deleteFun("' + category_id + '")\'>Delete </a>';
                    str += '<a class="btn btn-primary view_subcat" style="margin-left: 10px;" cat_id = "'+category_id+'" >View Subcategory </a>';
                    str += '</td>';
//                     str += '<td>';
//                      str += '<a class="btn btn-primary" >View </a>';
////                    str += '<a class="btn btn-primary btn-sm">View</a>';
//
//                    str += '</td>';
                    str += '</tr>';
                }
                console.log('cat_id');
                console.log(cat_id);
                localStorage.setItem('cate_id', JSON.stringify(cat_id));

                $(".view_category").html(str);
                $('.data-table').DataTable();
            }
            else {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });
        
        $scope.viewcatFun=function(id){
            $state.go('view-category',{id:id})
        }

        /**************update category***************/
        function updateCategory() {

            var category_name = $("#edit_category_name").val();
            var category_id = $("#edit_category_id").val();
//            var cat_position = $("#edit_cat_position").val();
//            console.log(cat_position + "cat_position");
            if (ifBlank("Category Name", category_name) === false)
                return false;
//            if (ifBlank("Category Position", cat_position) == false)
//                return false;


            vm.cat_editData = {
                'category_name': category_name,
                'category_id': category_id,
                'parent_id': '0',
                'status': '0',
                'position': "0",
            }
            categoriesServices.editcategory(vm.cat_editData).success(function(response) {
                console.log(vm.cat_editData);
                console.log(response);
                if (response.status == 105) {
                    vm.alert = false;
                    showSuccess("Category Updated Successfully!");

                    $timeout(function() {
                        $('#modal-editCategory').modal('hide');
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
        }
        ;

 $(document).delegate('.view_subcat', 'click', function(e) {
            var id = $(this).attr("cat_id");
            localStorage.setItem('current_cat_id', id);
            $state.go('view_particular_category');
           
        });

        $(document).delegate('#edit-modal', 'click', function(e) {
            var name = $(this).attr("name");
            var id = $(this).attr("value");
            var cate_position = $(this).attr("c_position");
            $("#edit_category_name").val(name);
            $("#edit_category_id").val(id);
            $("#edit_cat_position option[value=" + cate_position + "]").prop("selected", true);
        });

        /**************delete category***************/
        $(document).delegate('#modal-delete', 'click', function() {

            var del_category = $(this).attr("delete_id");
            $('#delete').val(del_category);
            $(this).modal('show');
        });


        $scope.deleteFun = function(id) {
          
            var ch = confirm("Are you sure you want to delete this Category?");
            vm.delData = {
                'category_id': id
            }
            if (ch == true) {
//                console.log(vm.delData);
              
                categoriesServices.deletecategory(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        alert("Category deleted successfully!");
//                        showSuccess("Category deleted successfully!");
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