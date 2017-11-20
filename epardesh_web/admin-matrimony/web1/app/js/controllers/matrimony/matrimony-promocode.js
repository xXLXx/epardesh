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
//                    str += '<td>';
//                    str += '<a href="#" class="btn btn-primary btn-sm" id="edit-plansmodal" data-toggle="modal" value="' + view_id + '"p_type="' + viewtype + '" name="' + viewname + '" p_price="' + viewprice + '"  data-target="#modal-editplan" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';
//                    str += '</td>';
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
        
        
        
        
        
        
        
        
        
        
        
    }  
})();