(function() {
    'use strict';
    var controllerId = 'manageads';
    angular
            .module('app')
            .controller(controllerId, manageads);
    manageads.$inject = ['$scope', '$timeout', '$state', 'manageaddServices'];
    function manageads($scope, $timeout, $state, manageaddServices) {
        var vm = this;
        vm.status = 1;
//       vm.date = response.data[i]['expiry_date'];
        /**************view category***************/
        $("#preloader").show();
        manageaddServices.viewads().success(function(response) {
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';
                for (var i = 0; i < len; i++) {
                    var business_name = data[i]['business_name'];
                    var ad_title = data[i]['ad_tittle'];
                    var ad_type = data[i]['ad_type'];
                    var expiry_date = data[i]['expiry_date'];
                    vm.date = new Date(expiry_date);
                    console.log('date' + vm.date);
                    var adid = data[i]['id'];
                    var status = data[i]['approved_status'];
                    if (status == '2')
                    {
                        var text = "Rejected";

                    }
                    else if (status == '1')
                    {
                        var text = "Accepted";
                    }
                    else {
                        var text = "NA";
                    }
                    if (ad_type == 0)
                    {
                        var type = "Free";
                    }
                    else if (ad_type == 1)
                    {
                        var type = "Premium";
                    }
                    else {
                        var type = "Featured";
                    }

                    var d = new Date(expiry_date);

                    var month = d.getMonth() + 1  // 10
                    var date = d.getDate()     // 30
                    var year = d.getFullYear()
                    var d_post = new Date(data[i]['date_posted']);

                    var ad_month = d_post.getMonth() + 1  // 10
                    var ad_date = d_post.getDate()     // 30
                    var ad_year = d_post.getFullYear()

                    str += '<tr>';
                    str += '<td>' + business_name + '</td>';
                    str += '<td>' + ad_title + '</td>';
                    str += '<td>' + text + '</td>';
                    str += '<td>' + type + '</td>';
                    if (d_post != 'Invalid Date') {
                        str += '<td>' + ad_month + '/' + ad_date + '/' + ad_year + '</td>';
                    }
                    else {
                        str += '<td>-</td>';
                    }
                    if (d != 'Invalid Date') {
                        str += '<td>' + month + '/' + date + '/' + year + '</td>';
                    }
                    else {
                        str += '<td>-</td>';
                    }
                    str += '<td>';
                    str += '<a onclick=\'angular.element(this).scope().acceptFun("' + adid + ',1")\' class="btn btn-primary btn-sm accept_ads" id="accept_ads" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Accept</a>';
                    str += '<a onclick=\'angular.element(this).scope().rejectFun(' + adid + ',2)\' class="btn btn-primary btn-sm accept_ads" id="accept_ads" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Reject</a>';
                      str += '<a onclick=\'angular.element(this).scope().viewParticular(' + adid + ')\' class="btn btn-primary btn-sm accept_ads" id="accept_ads" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>View</a>';
                    str += '</td>';
                    ;
                    str += '</tr>';
                }

                $("#view_manageads").html(str);
                $('.data-table').DataTable();
            }
            else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });
          /**************View Particular***************/
         $scope.viewParticular = function(id) {
             $state.go('view-particular-ad',{id:id})
         }
        
        /**************manage ads***************/
        $scope.acceptFun = function(data) {

            var temp = data.split(",");
            var add_id = temp[0];
            var stat = temp[1];
            console.log(add_id);
            vm.approvedad = {
                'status': stat,
                'ad_id': add_id,
            }
            manageaddServices.approved(vm.approvedad).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Manage Ads Updated Successfully!");
                    $timeout(function() {
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


        }
        
         vm.rejectObj= {
                'status': null,
                'ad_id': null,
                'message':null,
            }
           /**************manage ads***************/
        $scope.rejectFun = function(id,status) {   
            vm.rejectObj= {
                'status': status,
                'ad_id': id,
            }
             $("#modal-reason").modal('show');
        }
         $scope.rejectAndNote = function() {
 
           
            if(vm.rejectObj.message !=null){
                console.log("fsg")
                manageaddServices.rejectReason(vm.rejectObj).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                   $scope.rejectAd();
                }
                else
                {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
            }
            else{
                $scope.rejectAd();  
            }
          


        }
        $scope.rejectAd=function(){
            console.log("yes there")
              manageaddServices.approved(vm.rejectObj).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Manage Ads rejected Successfully!");
                    $timeout(function() {
                         $("#modal-reason").modal('hide');
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
        }
        
    }
})();