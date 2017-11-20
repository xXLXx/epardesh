(function () {
    'use strict';
    var controllerId = 'training';
    angular
            .module('app')
            .controller(controllerId, training);
    training.$inject = ['$scope', '$timeout', '$state','$window','trainingServices'];
    function training($scope, $timeout, $state,$window, trainingServices) {
        var vm = this;
        vm.status = 1;

        /**************view training***************/
       
            $("#preloader").show();
            trainingServices.viewtraining().success(function (response) {
                console.log(response);
                console.log('ddddddd');
                if (response.status == 105) {
                    $("#preloader").hide();
                    var len = response.data.length;
                    var data = response.data;
                    var str = '';
                    for (var i = 0; i < len; i++) {
                        var id = data[i]['id'];
                        var training_provider = data[i]['training_provider'];
                        var training_tittle = data[i]['training_tittle'];
                        var training_plan = data[i]['training_plan'];
                        var start_date = data[i]['training_start_date'];
                         var end_date = data[i]['training_end_date'];
                          var start_time = data[i]['training_start_time'];
                           var end_time = data[i]['training_end_time'];

                        if (training_plan == 0)
                        {
                            var type = "Free";
                        } else if (training_plan == 1)
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
                         str += '<td>' + id + '</td>';
                        str += '<td>' + training_provider + '</td>';
                        str += '<td>' + training_tittle + '</td>';

                        str += '<td>' + type + '</td>';
                        str += '<td>' + month + '/' + date + '/' + end_year + '</td>';
                        str += '<td>' +  start_time + '</td>';
                         str += '<td>' + end_month + '/' + end_date + '/' + year + '</td>';                       
                         str += '<td>' + end_time + '</td>';
                         

                        str += '<td class="action_col">'
                        str += ' <span><a href="javascript:;"><button type="button" id="' + id + '" onclick=\'angular.element(this).scope().deleteFun("' + id + '")\'class="btn btn-danger" >Delete</button></a></span>';

                        str += '</td>'
                        str += '</tr>';
                    }

                    $("#view_training").html(str);
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
          
            var ch = confirm("Are you sure you want to delete this Training Ad?");
            vm.delData = {
                'training_id': id
            }
            if (ch == true) {
            trainingServices.deleteTraining(vm.delData).success(function (response) {
                    console.log(response);
                    if (response.status === 105 || response.status === '105') {
                        alert("Training Ad deleted successfully!");
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