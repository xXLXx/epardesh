(function() {
    'use strict';
    var controllerId = 'matrimonypromocode';
    angular
            .module('app')
            .controller(controllerId, matrimonypromocode);
    matrimonypromocode.$inject = ['$scope', '$timeout', '$state', 'categoriesServices', '$stateParams', 'matrimonypromocode'];
    function matrimonypromocode($scope, $timeout, $state, categoriesServices, $stateParams, matrimonypromocode) {
        var vm = this;
        
         /**************add Promocode***************/
        $("#save-promocode").click(function() {
            var promocode = $("#add_promocode").val();

            var discount_amnt = $("#discount_amnt").val();

            if (ifBlank("Promocode Name", promocode) == false)
                return false;
            if (ifBlank("Discount Amount", discount_amnt) == true)
                {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }
                
                 if(discount_amnt < 0)
            {
                
//               alert('Price can not be negative');
               showError("Discount Amount can not be negative");
//                $timeout(2000);
                return false;
            }
            var intRegex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
           
            if(!intRegex.test(discount_amnt)) 
            {
                showError("Discount Amount should be number only");
//                $timeout(2000);
                return false;
   
             }
            


            vm.promocodeData = {
                'promocode_name': promocode,
                'discount': discount_amnt,
                
            }
//                        console.log(vm.promocodeData);
            matrimonypromocode.addpromocode(vm.promocodeData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Promocode Added Successfully");
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
        
        
          /**************view plans***************/
        $("#preloader").show();
        matrimonypromocode.viewpromocode().success(function(response) {
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                console.log('promo'+data);
                var str = '';
                for (var i = 0; i < len; i++) {
                    var promo_id = data[i]['id'];
                    var promocode_name = data[i]['name'];
                    var discount = data[i]['discount'];
                    console.log(i);

                    str += '<tr>';
                   
                    str += '<td>' + promocode_name + '</td>';
                    str += '<td>' + discount + '</td>';
                    str += '<td>';
                    str += '<td><a href="javascript:;"class="btn btn-primary btn-sm" id="modal-editplanbtn" promo_id="' + promo_id + '" promocode_name="' + promocode_name + '" discount="' + discount + '" data-toggle="modal" data-target="#modal-editpromo" style="margin-right:15px;"><i class="fa fa-pencil-square-o"></i> Edit</a>';

                    str += ' <span><a href="javascript:;"><button type="button" id="' + promo_id + '" onclick=\'angular.element(this).scope().deleteFun("' + promo_id + '")\'class="btn btn-danger" >Delete</button></a></span>';

                    
                    str += '</td>';
                    str += '</tr>';
                }
               
                $(".view_promocode").html(str);
                $('.data-table').DataTable();
            }
            else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });
        
        
         $(document).delegate('#modal-editplanbtn', 'click', function() {
            var promocode_name = $(this).attr("promocode_name");
            var discount = $(this).attr("discount");
            var promo_id = $(this).attr("promo_id");
            $("#edit_promo_name").val(promocode_name);
            $("#edit_discount_price").val(discount);
            $("#edit_promo_id").val(promo_id);
        });
        
        
        /**************update plan***************/
        //function updateplan() {
        $(document).delegate('#update-category', 'click', function() {
            console.log("in update plan");
            var edit_promo_name = $("#edit_promo_name").val();
            var edit_discount_price = $("#edit_discount_price").val();
            var edit_promo_id = $("#edit_promo_id").val();
          
            if (ifBlank("Promocode Name", edit_promo_name) === false)
                return false;
            if (ifBlank("promocode Price", edit_discount_price) === false)
                return false;
             
                
                 if(edit_discount_price < 0)
            {
                
//               alert('Price can not be negative');
               showError("Discount Amount can not be negative");
//                $timeout(2000);
                return false;
            }
            var intRegex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
           
            if(!intRegex.test(edit_discount_price)) 
            {
                showError("Discount Amount should be number only");
//                $timeout(2000);
                return false;
   
             }
            vm.promo_editData = {
                'promocode_name': edit_promo_name,
                'promocode_discount': edit_discount_price,
                'promocode_id': edit_promo_id,
            }
            matrimonypromocode.editmatrimonypromocode(vm.promo_editData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Promocode updated Successfully!");
                    $timeout(function() {
                        $('#modal-editpromo').modal('hide');
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
        
         $scope.deleteFun = function(id) {

            var ch = confirm("Are you sure you want to delete this Promocode?");
            vm.delData = {
                'promocode_id': id
            }
            if (ch == true) {
                matrimonypromocode.deletePromocode(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status === 105 || response.status === '105') {
                        alert("Promocode deleted successfully!");
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