(function() {
    'use strict';
    var controllerId = 'course';
    angular
            .module('app')
            .controller(controllerId, course);
    course.$inject = ['$scope', '$timeout', '$state', 'trainingServices'];
    function course($scope, $timeout, $state, trainingServices) {
        var vm = this;
          vm.updateCourse = updateCourse;
        /**************add Course***************/
        $("#save-course").click(function() {
            var course_name = $("#add_course_name").val();
            if (ifBlank("Course Name", course_name) == false)
                return false;
            if (ifBlank("Course Name", course_name) == true)
                {
//                 console.log("yyyy");  
                 $(".alert-red").css("display","none");
                }


            vm.courseData = {
                'course_name': course_name
                
            }
            trainingServices.addcourse(vm.courseData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Course Added Successfully");
                    $timeout(function() {
                        $('#Add-course').modal('hide');
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



               /**************view Courses***************/

        $("#preloader").show();
        trainingServices.viewcourses().success(function(response) {
            console.log("jojojo")
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();

                var len = response.data.length;
                var data = response.data;
                var str = '';
               
                for (var i = 0; i < len; i++) {

                    var name = data[i]['course_name'];
                    var id = data[i]['id'];


                    str += '<tr>';
                    str += '<td style="cursor:pointer">'+ name + '</td>';

                    str += '<td>';
                    str += '<a class="btn btn-primary btn-sm" id="edit-modal" data-toggle="modal" name="' + name + '"  value="' + id + '" data-target="#modal-editCourse" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';
                    str += '<a class="btn btn-danger" onclick=\'angular.element(this).scope().deleteFun("'+ id +'","' +name + '")\'>Delete </a>';
                    str += '</td>';
//       
                    str += '</tr>';
                }
                console.log('id');
                console.log(id);
               

                $(".view_course").html(str);
                $('.data-table').DataTable();
            }
            else {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });

 /**************update Course***************/
        function updateCourse() {

            var course_name = $("#edit_course_name").val();
            var course_id = $("#edit_course_id").val();
            if (ifBlank("Course Name", course_name) === false)
                return false;


            vm.CourseEditData = {
                'course_name': course_name,
                'course_id': course_id
               
            }
            trainingServices.editcourse(vm.CourseEditData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Course Updated Successfully!");

                    $timeout(function() {
                        $('#modal-editCourse').modal('hide');
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
        };


              $scope.deleteFun = function(id,name) {
               console.log(id)
            var ch = confirm("Are you sure you want to delete this Course?");
            vm.delData = {
                'training_course': name
            }
            vm.del =
                    {
                'training_id':id
                    }
            if (ch == true) {
                trainingServices.deleteTrainingCount(vm.delData).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
//                        alert("Course deleted successfully!");
//
//                        $timeout(function() {
//                            $state.reload();
//                        }, 1000);
                           console.log(response.data[0].count)
                         if(response.data[0].count > 0)
                         {
                             var chk = confirm("This Course have "+response.data[0].count+' of Training Ads.Still want to Delete?')
                             if(chk == true)
                             {
                                 trainingServices.deleteCourse(vm.del).success(function(response) {
                                     if(response.status == 105)
                                     {
                                         alert("Course deleted successfully!");
//
                                        $timeout(function() {
                                            $state.reload();
                                        }, 1000);
                                         
                                     }
                                 })
                             }
                         }else
                         {
                              trainingServices.deleteCourse(vm.del).success(function(response) {
                                     if(response.status == 105)
                                     {
                                         alert("Course deleted successfully!");
//
                                        $timeout(function() {
                                            $state.reload();
                                        }, 1000);
                                         
                                     }
                                 })
                             
                         }
                    }
                    else {
                        console.log(response)
                        showError("Some error occur!");
                        return false;
                    }

                });
            }

        }















         $(document).delegate('#edit-modal', 'click', function(e) {
            var name = $(this).attr("name");
            var id = $(this).attr("value");
            
            $("#edit_course_name").val(name);
            $("#edit_course_id").val(id);
        });



  
      

      

    }
})();