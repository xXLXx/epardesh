(function() {
    'use strict';
    var controllerId = 'viewmatrimonyuserdetails';
    angular
            .module('app')
            .controller(controllerId, viewmatrimonyuserdetails);
    viewmatrimonyuserdetails.$inject = ['$scope', '$timeout', '$state', 'categoriesServices', '$stateParams', 'matrimonyuserServices'];
    function viewmatrimonyuserdetails($scope, $timeout, $state, categoriesServices, $stateParams, matrimonyuserServices) {
        var vm = this;
        $("#preloader").show();

        var url = window.location.href;
        var url_array = url.split("id=");
        var id = url_array[1];
        console.log("url_array" + url_array);
        console.log("id" + id);

        vm.user_Data = {
            'user_id': id,
        }

        matrimonyuserServices.matrimonyuserdetail(vm.user_Data).success(function(response) {
            console.log("in matrimony user details");
            console.log(response);
            //return false;
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';
                var about_me = response.data[0]["about_me"];

                var country = response.data[0]["country"];
                var current_residence = response.data[0]["current_residence"];
                var nationality = response.data[0]["nationality"];
                var employer_name = response.data[0]["employer_name"];
                var family_location = response.data[0]["family_location"];
                var profile_picture = response.data[0]["profile_picture"];
                var relevant_picture = response.data[0]["relevant_picture"];



                if (about_me == null || about_me == "null") {
                    $(".user_about").html("About is not updated yet")
                }
                else {
                    $(".user_about").html(about_me);
                }
                if (country == null || country == "null") {
                    $(".user-country").html("Country is not updated yet")
                }
                else {
                    $(".user-country").html(country);
                }

                if (current_residence == null || current_residence == "null") {
                    $(".user-current-residence").html("Current Residence is not updated yet")
                }
                else {
                    $(".user-current-residence").html(current_residence);
                }
                if (nationality == null || nationality == "null") {
                    $(".user-nationality").html("Nationality is not updated yet")
                }
                else {
                    $(".user-nationality").html(nationality);
                }
                if (employer_name == null || employer_name == "null") {
                    $(".employer-name").html("Employer Name is not updated yet")
                }
                else {
                    $(".employer-name").html(employer_name);
                }
                if (family_location == null || family_location == "null") {
                    $(".user-location").html("Family Location is not updated yet")
                }
                else {
                    $(".user-location").html(family_location);
                }

                if (profile_picture == null || profile_picture == "null") {
                    $(".user-location").html("Family Location is not updated yet")
                    $("#profile-picture").attr('src', "https://img.shaadi.com/imgs/registration/closeup-v2.gif");
                }
                else {
                    $("#profile-picture").attr('src', profile_picture);
                }

                if (relevant_picture == null || relevant_picture == "null") {
                    var str1 = '';
                    str1 += '<img src="https://img.shaadi.com/imgs/registration/closeup-v2.gif" alt="Close Up" title="Close Up" border="0">';
                    $(".relevant_img_div").html(str1)
                }
                else {
                    $(".user-location").html(family_location);
                    if (relevant_picture.indexOf(",") > -1) {
                        var relevant_picture_array = relevant_picture.split(",");
                        var str = '';
                        for (var i = 0; i < relevant_picture_array.length; i++) {
                            str += '<img class="mulimg" src="' + relevant_picture_array[i] + '" alt="Close Up" title="Close Up" border="0">';
                        }

                        $(".relevant_img_div").html(str)

                    }
                    else {
                        
                        var str1 = '';
                    str1 += '<img class="mulimg" src="'+ relevant_picture+'" alt="Close Up" title="Close Up" border="0">';
                    $(".relevant_img_div").html(str1)

                    }



                }




//                for (var i = 0; i < len; i++) {
//                    var plan_type = response.data[i]["plan_type"];
//                    var plan_name = response.data[i]["plan_name"];
//                    var plan_validity = response.data[i]["plan_validity"];
//                    var plan_price = response.data[i]["plan_price"];
//                    var id = response.data[i]["id"];
//                    str += '<tr>';
//                    str += '<td>' + plan_type + '</td>';
//                    str += '<td>' + plan_name + '</td>';
//                    str += '<td>' + plan_validity + '</td>';
//                    str += '<td>' + plan_price + '</td>';
//                    str += '<td><a href="#" class="btn btn-primary btn-sm" id="modal-editplanbtn" plan_id="' + id + '" plan_name="' + plan_name + '" plan_price="' + plan_price + '" data-toggle="modal" data-target="#modal-editplan" style="margin-right:15px;"><i class="fa fa-pencil-square-o"></i> Edit</a>';
//
////                                        str += '<a href="#" class="btn btn-primary btn-sm" id="edit-submodal" data-toggle="modal" name="' + sub_category_name + '" value="' + subcategory_id + '"cat_name="' + parent_id + '" f_type="' + status + '"  data-target="#modal-editsub-Category" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';
//
//                    str += '</tr>';
//
//
//
//                }
//
//
//                $(".view_plan").html(str);
//                $('.data-table').DataTable();
            }
            else {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });







    }
})();