(function() {
    'use strict';
    var controllerId = 'promocodeCtrl';
    angular
            .module('app')
            .controller(controllerId, promocodeCtrl);
    promocodeCtrl.$inject = ['$scope', '$timeout', '$state', 'categoriesServices', '$stateParams', 'promocodeServices'];
    function promocodeCtrl($scope, $timeout, $state, categoriesServices, $stateParams, promocodeServices) {
        var vm = this;

        /**************add Promocode***************/
        $("#save-promocode").click(function() {
            var promocode = $("#add_promocode").val();

            var discount_amnt = parseFloat($("#discount_amnt").val());
            var desc = $("#description").val();

            if (ifBlank("Promocode Name", promocode) == false)
                return false;
            if (ifBlank("Discount Amount", discount_amnt) == true)
            {
//                 console.log("yyyy");  
                $(".alert-red").css("display", "none");
            }

            if (discount_amnt < 0)
            {

//               alert('Price can not be negative');
                showError("Discount Amount can not be negative");
//                $timeout(2000);
                return false;
            }
             if (discount_amnt > 100)
            {

//               alert('Price can not be negative');
                showError("Discount Amount can not be More than 100");
//                $timeout(2000);
                return false;
            }
            var intRegex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;

            if (!intRegex.test(discount_amnt))
            {
                showError("Discount Amount should be number only");
//                $timeout(2000);
                return false;

            }

            if (ifBlank("Description", desc) == false)
                return false;
            var dis = 0;
            vm.promocodeData = {
                'name': promocode,
                'discount': discount_amnt,
                'description': desc,
                'is_active_status': '1',
                'display_status': dis

            }

            if ($('.check').is(':checked')) {
                console.log('fffffff');
                dis = 1;
                vm.promocodeData.display_status = dis;
            }



            console.log(vm.promocodeData);
            promocodeServices.addpromocode(vm.promocodeData).success(function(response) {
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
        promocodeServices.viewpromocode().success(function(response) {
            console.log('promocodes')
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                console.log('promo' + data);
                var str = '';
                for (var i = 0; i < len; i++) {
                    var promo_id = data[i]['id'];
                    var promocode_name = data[i]['name'];
                    var discount = data[i]['discount'];
                    var desc = data[i]['description'];

                    str += '<tr>';
//                    str += '<td>'
//                    str += '<input type="checkbox" name= "check[]" class ="checkbox" id="' + promo_id + '" value ="'+promo_id+'" >';
                    str += '<td>' + promocode_name + '</td>';
                    str += '<td>' + discount + '</td>';
                    str += '<td style="word-break: break-all;">' + desc + '</td>';
//                    str += '<td>';
//                    str += '<a href="#" class="btn btn-primary btn-sm" id="edit-plansmodal" data-toggle="modal" value="' + view_id + '"p_type="' + viewtype + '" name="' + viewname + '" p_price="' + viewprice + '"  data-target="#modal-editplan" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';
//                    str += '</td>';

                    str += '<td class="action_col">'
                    str += ' <span><a href="javascript:;"><button type="button" id="' + promo_id + '" onclick=\'angular.element(this).scope().deleteFun("' + promo_id + '")\'class="btn btn-danger" >Delete</button></a></span>';


                    str += '</tr>';
                }

                $(".view_promocode").html(str);
                $('.data-table').DataTable({
                    /* Disable initial sort */
                    "bDestroy": true,
//                          "bRetrieve": true,
                    "aaSorting": []
                });
                
            }
            else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });
/*********** Multiple Delete ********/
//	$("#selectall").click(function () {
//		  $('.checkbox').attr('checked', this.checked);
//	});
//
//
//$(".checkbox").click(function(){
//
//		if($(".checkbox").length == $(".checkbox:checked").length) {
//			$("#selectall").attr("checked", "checked");
//		} else {
//			$("#selectall").removeAttr("checked");
//		}
//
//	});


//
//$('.sub').click(function(){
//        var val = [];
//        $(':checkbox:checked').each(function(i){
//          val[i] = $(this).val();
//        });
//        console.log(val);
//        console.log('selected item')
//      });
//
//
//
//        vm.allVals = [];
////
//$("#selectall").click(function(){
//       if($(this).is(':checked',true))  
//    {
//        $(".checkbox").prop('checked', true);  
//    }  
//    else  
//    {  
//        $(".checkbox").prop('checked',false);  
//    }
//    
//})
////         
//        $(".checkbox").click(function(){
//            
//            if(vm.allVals.length <=0)  
//        {  
//            alert("Please select row.");  
//        } 
////            
////            
//            $(".checkbox:checked").each(function() {  
//            vm.allVals.push($(this).attr('id'));
//        });
//        });
//        var uniqueNames = [];
//$.each(vm.allVals, function(i, el){
//    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
//});
//            console.log(uniqueNames);
//        })
        
//        $(".sub_chk").click(function(e){
//        console.log('checkk');
//        var id = $(this).attr('id');
//        vm.allVals.splice(id,1);
//        console.log(vm.allVals);
//        
//        })
//select all checkboxes
//$("#select_all").change(function(){  //"select all" change 
//    var status = this.checked; // "select all" checked status
//    $('.checkbox').each(function(){ //iterate all listed checkbox items
//        this.checked = status; //change ".checkbox" checked status
//    });
//});
////
//$('.checkbox').change(function(){ //".checkbox" change 
//    //uncheck "select all", if one of the listed checkbox item is unchecked
//    if(this.checked == false){ //if this item is unchecked
//        $("#select_all")[0].checked = false; //change "select all" checked status to false
//    }
//    
    //check "select all" if all checkbox items are checked
//    if ($('.checkbox:checked').length == $('.checkbox').length ){ 
//        $("#select_all")[0].checked = true; //change "select all" checked status to true
//    }
//});

        /**************Delete Promocode***************/
        $scope.deleteFun = function(id) {

            var ch = confirm("Are you sure you want to delete this Promocode?");
            vm.delData = {
                'promocode_id': id
            }
            if (ch == true) {
                promocodeServices.deletePromocode(vm.delData).success(function(response) {
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