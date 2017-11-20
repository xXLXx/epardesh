(function () {
    'use strict';
    var controllerId = 'events';
    angular
            .module('app')
            .controller(controllerId, events);
    events.$inject = ['$scope', '$timeout', '$state','$window','manageEventServices'];
    function events($scope, $timeout, $state,$window, manageEventServices) {
        var vm = this;
        vm.status = 1;

        /**************view Events***************/
       
            $("#preloader").show();
            manageEventServices.viewevents().success(function (response) {
                console.log(response);
                console.log('ddddddd');
                if (response.status == 105) {
                    $("#preloader").hide();
                    var len = response.data.length;
                    var data = response.data;
                    var str = '';
                    for (var i = 0; i < len; i++) {
                        var id = data[i]['id'];
                        var organisor = data[i]['organisor'];
                        var event_tittle = data[i]['event_tittle'];
                        var plan_id = data[i]['plan_id'];
                        var start_date = data[i]['start_date'];
                         var end_date = data[i]['end_date'];
                          var start_time = data[i]['start_time'];
                           var end_time = data[i]['end_time'];

                        if (plan_id == 0)
                        {
                            var type = "Free";
                        } else if (plan_id == 1)
                        {
                            var type = "Premium";
                        } 
                        else {
                            var type = "Featured";
                        }

                        var d = new Date(start_date);

                        var month = d.getMonth() + 1  // 10
                        var date = d.getDate()     // 30
                        var year = d.getFullYear()
                        var d_end = new Date(end_date);

                        var end_month = d_end.getMonth() + 1  // 10
                        var end_date = d_end.getDate()     // 30
                        var end_year = d_end.getFullYear()

                        str += '<tr>';
                        str += '<td>' + organisor + '</td>';
                        str += '<td>' + event_tittle + '</td>';

                        str += '<td>' + type + '</td>';
                        str += '<td>' + month + '/' + date + '/' + end_year + '</td>';
                         str += '<td>' + end_month + '/' + end_date + '/' + year + '</td>';
                         str += '<td>' +  start_time + '</td>';
                         str += '<td>' + end_time + '</td>';
                         

                        str += '<td class="action_col">'
                        str += ' <span><a href="javascript:;"><button type="button" id="' + id + '" onclick=\'angular.element(this).scope().deleteFun("' + id + '")\'class="btn btn-danger" >Delete</button></a></span>';

                        str += '</td>'
                        str += '</tr>';
                    }

                    $("#view_events").html(str);
                    $('.data-table').DataTable({
                        /* Disable initial sort */
                        "bDestroy": true,
//                          "bRetrieve": true,
                        "aaSorting": []
                    });

                } else
                {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        

        
    
        /**************manage Events***************/
            $scope.deleteFun = function(id) {
          
            var ch = confirm("Are you sure you want to delete this Event?");
            vm.delData = {
                'event_id': id
            }
            if (ch == true) {

              
            manageEventServices.deleteEvent(vm.delData).success(function (response) {
                    console.log(response);
                    if (response.status === 105 || response.status === '105') {
                         $timeout(function() {
                            $state.reload();
                        }, 1000);
                    }
                }).error(function () {
                    alert('Internal server error');
                });
            }

        }
   

//        $(document).delegate('.btn-danger', 'click', function (e) {
//            e.preventDefault();
//            e.stopPropagation();
//            var id = $(this).attr("id");
//
//            var delData = {'event_id': id};
//            var con = confirm('Are you sure want to delete this Event?');
//            if (con == true) {
//                manageEventServices.deleteEvent(delData).success(function (response) {
//                    console.log(response);
//                    if (response.status === 105 || response.status === '105') {
//                        viewEventsFun();
//                    }
//                }).error(function () {
//                    alert('Internal server error');
//                });
//            }
//           
//        });

  
    }



})();