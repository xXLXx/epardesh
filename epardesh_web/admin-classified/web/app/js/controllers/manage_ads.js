(function() {
    'use strict';
    var controllerId = 'manageads';
    angular
            .module('app')
            .controller(controllerId, manageads);
    manageads.$inject = ['$scope', '$timeout', '$state', '$window', 'manageaddServices'];
    function manageads($scope, $timeout, $state, $window, manageaddServices) {
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
                    var id = data[i]['id'];
                    var business_name = data[i]['business_name'];
                    var email = data[i]['email'];
                    var ad_title = data[i]['ad_tittle'];
                    var ad_type = data[i]['ad_type'];
                    var expiry_date = data[i]['expiry_date'];
                    vm.date = new Date(expiry_date);
                    console.log('date' + vm.date);
                    var adid = data[i]['id'];
                    var status = data[i]['approved_status'];
                    var block_status = data[i]['block_status'];
                    if (status == '2')
                    {
                        var text = "Rejected";

                    } else if (status == '1')
                    {
                        var text = "Accepted";
                    } else {
                        var text = "Pending";
                    }
                    if (ad_type == 0)
                    {
                        var type = "Free";
                    } else if (ad_type == 1)
                    {
                        var type = "Premium";
                    } else {
                        var type = "Featured";
                    }

if (expiry_date == null){
    var d = 'Invalid Date';
}
else{
   var d = new Date(expiry_date);

                    var month = d.getMonth() + 1  // 10
                    var date = d.getDate()     // 30
                    var year = d.getFullYear()
                    var d_post = new Date(data[i]['date_posted']);

                    var ad_month = d_post.getMonth() + 1  // 10
                    var ad_date = d_post.getDate()     // 30
                    var ad_year = d_post.getFullYear()   
}
//                    var d = new Date(expiry_date);
//
//                    var month = d.getMonth() + 1  // 10
//                    var date = d.getDate()     // 30
//                    var year = d.getFullYear()
//                    var d_post = new Date(data[i]['date_posted']);
//
//                    var ad_month = d_post.getMonth() + 1  // 10
//                    var ad_date = d_post.getDate()     // 30
//                    var ad_year = d_post.getFullYear()

                    str += '<tr>';
                     str += '<td class="action_col"><a href="http://www.epardesh.com/ad-details/'+id+'" target="_blank">EPCA' + id + '</a></td>';
                    str += '<td>' + business_name + '</td>';
                     str += '<td>' + email + '</td>';
                    str += '<td style="word-break: break-all;">' + ad_title + '</td>';
                    str += '<td>' + text + '</td>';
                    str += '<td>' + type + '</td>';
                    if (d_post != 'Invalid Date') {
                        str += '<td>' + ad_month + '/' + ad_date + '/' + ad_year + '</td>';
                    } else {
                        str += '<td>-</td>';
                    }
                    if (d != 'Invalid Date') {
                        str += '<td>' + month + '/' + date + '/' + year + '</td>';
                    } else {
                        str += '<td>-</td>';
                    }
//                    str += '<td>';
//                    str += '<a onclick=\'angular.element(this).scope().acceptFun("' + adid + ',1")\' class="btn btn-primary btn-sm accept_ads" id="accept_ads" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Accept</a>';
//                    str += '<a onclick=\'angular.element(this).scope().rejectFun(' + adid + ',2)\' class="btn btn-primary btn-sm accept_ads" id="accept_ads" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Reject</a>';
//                      str += '<a onclick=\'angular.element(this).scope().viewParticular(' + adid + ')\' class="btn btn-primary btn-sm accept_ads" id="accept_ads" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>View</a>';
//                    str += '</td>';
                    ;
                    str += '<td class="action_col">'
                    str += ' <span><a href="javascript:;"><button type="button" id="' + id + '" class="btn btn-danger" onclick=\'angular.element(this).scope().deleteFun("' + id + '")\'>Delete</button></a></span>';
                    if (block_status == '0') {
                        str += '<span> <a href="javascript:;"><button type="button" id="' + id + '" status="1" class="btn block-btn btn-primary blck">Block</button></a></span>';
                    } else {
                        str += ' <span><a href="javascript:;"><button type="button" id="' + id + '" status="0" class="btn btn-primary block-btn">Unblock</button></a></td>';
                    }
                    str += '</td>'
                    str += '</tr>';
                }

                $("#view_manageads").html(str);
                $('.data-table').DataTable({
                    /* Disable initial sort */
                    "bDestroy": true,
                    "aaSorting": []
                });


//                $('#example').dataTable({
//        /* Disable initial sort */
//        "aaSorting": []
//    });
            } else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });



        /**************View Particular***************/
        $scope.viewParticular = function(id) {
            $state.go('view-particular-ad', {id: id})
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
                } else
                {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });


        }

        vm.rejectObj = {
            'status': null,
            'ad_id': null,
            'message': null,
        }
        /**************manage ads***************/
        $scope.rejectFun = function(id, status) {
            vm.rejectObj = {
                'status': status,
                'ad_id': id,
            }
            $("#modal-reason").modal('show');
        }
        $scope.rejectAndNote = function() {


            if (vm.rejectObj.message != null) {
                console.log("fsg")
                manageaddServices.rejectReason(vm.rejectObj).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        $scope.rejectAd();
                    } else
                    {
                        console.log(response)
                        showError(response['message']);
                        return false;
                    }
                });
            } else {
                $scope.rejectAd();
            }



        }
        $scope.rejectAd = function() {
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
                } else
                {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        }
//        $(document).delegate('.delete-btn', 'click', function (e) {
//            e.preventDefault();
//            var id = $(this).attr("id");
//
//            var delData = {'ad_id': id};
//            var con = confirm('Are you sure want to delete this ad?');
//            if (con == true) {
//                manageaddServices.deleteAd(delData).success(function (response) {
//                    console.log(response);
//                    if (response.status === 105 || response.status === '105') {
//                        viewadsFun();
//                    }
//                }).error(function () {
//                    alert('Internal server error');
//                });
//            }
//        });


        $scope.deleteFun = function(id) {

            var ch = confirm("Are you sure you want to delete this Ads?");
            vm.delData = {
                'ad_id': id
            }
            if (ch == true) {


                manageaddServices.deleteAd(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status === 105 || response.status === '105') {
                        $timeout(function() {
                            $state.reload();
                        }, 1000);
                    }
                }).error(function() {
                    alert('Internal server error');
                });
            }

        }

        $(document).delegate('.block-btn', 'click', function(e) {
            e.preventDefault();
            var id = $(this).attr("id");
            var status = $(this).attr("status");
            var blckAdData = {
                'status': status,
                'ad_id': id
            }
            manageaddServices.blockAd(blckAdData).success(function(response) {
                console.log(response);
                if (response.status === 105 || response.status === '105') {
//                    viewadsFun();
//                    $window.scrollTo(0, 0);
                    $timeout(function() {
                        $state.reload();
                    }, 1000);
                }

            }).error(function() {
                alert('Internal server error');
            });
        });
    }



})();