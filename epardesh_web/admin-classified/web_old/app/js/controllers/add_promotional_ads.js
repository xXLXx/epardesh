(function () {
    'use strict';
    var controllerId = 'addpromotional';
    angular
            .module('app')
            .controller(controllerId, addpromotional);
    addpromotional.$inject = ['$scope', '$timeout', '$state', 'promotionalServices'];
    function addpromotional($scope, $timeout, $state, promotionalServices) {
        var vm = this;
        vm.states = [];
        vm.showLoading=true;
//        vm.getcity = getcity;
//        vm.getState = getState;
        var image_status = 0;
        vm.editads = editads;
        vm.cities = [];
        var countryStr = "";
        var stateStr = "";
        var cityStr = "";
        vm.image_url = "";
        var image_url = "";
        vm.new_state = [];
        var imageindex;
        vm.displayVals = displayVals;
//         var ar = new Array();
        var stateArray = new Array();
        var countryArray = new Array();
        var cityArray = new Array();
        var cityId = [];

        /******************************** upload image *****************************************/
        $scope.uploadimage = function () {

            var fileUpload = $("#ad_img")[0];
            $("#dvPreview").html("");
            //Check whether HTML5 is supported.
            if ($.browser && parseFloat(jQuery.browser.version) <= 9.0) {
                $("#dvPreview").show();
                $("#dvPreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = $(this).val();
            }
            if (typeof (fileUpload.files) != "undefined") {
                $("#dvPreview").show();
                $("#dvPreview").append("<img />");

                //Initiate the FileReader object.
                var reader = new FileReader();
                //Read the contents of Image File.
                reader.readAsDataURL(fileUpload.files[0]);
                reader.onload = function (e) {

                    //Initiate the JavaScript Image object.
                    var image = new Image();
                    //Set the Base64 string return from FileReader as source.
                    image.src = e.target.result;
                    image.onload = function () {
                        //Determine the Height and Width.
                        var height = this.height;
                        var width = this.width;
                        console.log(height + ' ' + width);
                        if (imageindex == "Banner") {
                            if (height >= 600 && width >= 1280) {

                                var formData = new FormData(document.forms.namedItem("promotional_form"));
                                console.log(formData);
//            if (image_status != 1) {
                                promotionalServices.uploadimage($scope, function (response) {
                                    console.log(response);
                                    if (response.status == 105) {
                                        $("#dvPreview img").attr("src", e.target.result);
                                        //showSuccess("Image upload Successfully");
//                                        vm.image_url = response.data.profile_image_path;
//                                        console.log(vm.image_url);
                                        //image_url = response.data.profile_image_path;
                                        vm.image_url = response.data.profile_image_path
                                        console.log(image_url);

                                    } else
                                    {
                                        console.log(response)
                                        showError(response['message']);
                                        return false;
                                    }

                                }, formData);

                            } else {
                                alert('Please choose image dimenstion minimum 1280*600');
                                $("#ad_img").val("");
                                image_status = 1;
                            }
                        } else if (imageindex == "Rolling") {

                            if (height >= 150 && width >= 265) {
                                var formData = new FormData(document.forms.namedItem("promotional_form"));
                                console.log(formData);
//            if (image_status != 1) {
                                promotionalServices.uploadimage($scope, function (response) {
                                    console.log(response);
                                    if (response.status == 105) {
                                        $("#dvPreview img").attr("src", e.target.result);
                                        //showSuccess("Image upload Successfully");
                                       // image_url = response.data.profile_image_path;
                                        vm.image_url = response.data.profile_image_path
                                        console.log(image_url);

                                    } else
                                    {
                                        console.log(response)
                                        showError(response['message']);
                                        return false;
                                    }

                                }, formData);
                            } else {
                                alert('Please choose image dimenstion minimum 265*150');
                                $("#ad_img").val("");
                                image_status = 1;
                            }
                        } else {
                            alert('please choose image type first')
                            $("#ad_img").val("");
                        }
                    };
                }
//                reader.readAsDataURL($(this)[0].files[0]);
            }

//            } else {
//                alert('please change image');
//            }
        }
        

    /******************************** upload image edit *****************************************/
        $scope.uploadimageEdit = function () {
            vm.showLoading=false;
          imageindex=$('#prom_ads').val();
          
            var fileUpload = $("#ad_img")[0];
            $("#dvPreview").html("");
            //Check whether HTML5 is supported.
            if ($.browser && parseFloat(jQuery.browser.version) <= 9.0) {
                $("#dvPreview").show();
                $("#dvPreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = $(this).val();
            }
            if (typeof (fileUpload.files) != "undefined") {
                $("#dvPreview").show();
                $("#dvPreview").append("<img />");

                //Initiate the FileReader object.
                var reader = new FileReader();
                //Read the contents of Image File.
                reader.readAsDataURL(fileUpload.files[0]);
                reader.onload = function (e) {

                    //Initiate the JavaScript Image object.
                    var image = new Image();
                    //Set the Base64 string return from FileReader as source.
                    image.src = e.target.result;
                    image.onload = function () {
                        //Determine the Height and Width.
                        var height = this.height;
                        var width = this.width;
                        console.log(height + ' ' + width);
                        if (imageindex == "Banner") {
                            if (height >= 600 && width >= 1280) {

                                var formData = new FormData(document.forms.namedItem("promotional_form"));
                                console.log(formData);
//            if (image_status != 1) {
                                promotionalServices.uploadimage($scope, function (response) {
                                    console.log(response);
                                    if (response.status == 105) {
                                          vm.showLoading=true;
                                        $(".img-pre img").attr("src", e.target.result);
                                        //showSuccess("Image upload Successfully");
//                                        vm.image_url = response.data.profile_image_path;
//                                        console.log(vm.image_url);
                                        //image_url = response.data.profile_image_path;
                                        vm.image_url_edit = response.data.profile_image_path
                                        console.log(image_url);

                                    } else
                                    {
                                        console.log(response)
                                        showError(response['message']);
                                        return false;
                                    }

                                }, formData);

                            } else {
                                alert('Please choose image dimenstion minimum 1280*600');
                                $("#ad_img").val("");
                                image_status = 1;
                            }
                        } else if (imageindex == "Rolling") {

                            if (height >= 150 && width >= 265) {
                                var formData = new FormData(document.forms.namedItem("promotional_form"));
                                console.log(formData);
//            if (image_status != 1) {
                                promotionalServices.uploadimage($scope, function (response) {
                                    console.log(response);
                                      vm.showLoading=true;
                                    if (response.status == 105) {
                                        $(".img-pre img").attr("src", e.target.result);
                                        //showSuccess("Image upload Successfully");
                                       // image_url = response.data.profile_image_path;
                                        vm.image_url_edit = response.data.profile_image_path
                                        console.log(image_url);

                                    } else
                                    {
                                        console.log(response)
                                        showError(response['message']);
                                        return false;
                                    }

                                }, formData);
                            } else {
                                alert('Please choose image dimenstion minimum 265*150');
                                $("#ad_img").val("");
                                image_status = 1;
                            }
                        } else {
                            alert('please choose image type first')
                            $("#ad_img").val("");
                        }
                    };
                }
//                reader.readAsDataURL($(this)[0].files[0]);
            }

//            } else {
//                alert('please change image');
//            }
        }









        /**************add promotional ads***************/
        var arr = [];
        $("#save_ads").click(function () {
            countryArray = [];
            arr = [];
            stateArray = [];
            var error = 0;
            var select_type = $("#prom_ads").val();
            var add_image = $("#ad_img").val();
            var chose_country = $("#chose_country").val();
            var chose_state = $("#choose_state").val();
            var chose_region = $("#choose_region").val();
            var id = $("#edit_promotional_id").val();
            console.log(select_type);
            if (ifBlank("Choose image", add_image) == false)
                return false;
            if (ifBlank("Choose image", add_image) == true)
            {
//                 console.log("yyyy");  
                $(".alert-red").css("display", "none");
            }

            //var selectedregion = 
            displayVals();
            var regionArray = [];
            
            arr.splice(-1, 1);
            var copyRegionArray = arr;
            arr = arr.toString()
            if (arr.indexOf("&&") > -1) {
                regionArray = arr.split("&&");
            } else {
                regionArray = ["hi"];
            }
            var countryArraylength = countryArray.length;
            var stateArraylength = stateArray.length;
            var regionArraylength = regionArray.length;

            console.log("countryArraylength")
            console.log(countryArraylength)
            console.log("stateArraylength")
            console.log(stateArraylength)
            console.log("regionArraylength")
            console.log(regionArraylength)

            if (countryArraylength != stateArraylength || stateArraylength != regionArraylength) {
                //showError("Please make sure that you select atleast one region and state coressponding to each selected country");
                $(".alert-red").html("Please make sure that you select atleast one region and state coressponding to each selected country").show();
                $timeout(function () {
                    $(".alert-red").html("").hide();

                }, 2000);
                return false;
            }


           // return false;


            stateStr = '';
            for (var i = 0; i < stateArray.length; i++)
            {
                if (stateStr == '')
                {
                    stateStr = stateStr + stateArray[i];
                } else {
                    stateStr = stateStr + '&&' + stateArray[i];
                }

            }
            console.log('state final string');
            console.log(stateStr);


            countryStr = '';
            for (var i = 0; i < countryArray.length; i++)
            {
                if (countryStr == '')
                {
                    countryStr = countryStr + countryArray[i];
                } else {
                    countryStr = countryStr + '&&' + countryArray[i];
                }

            }
            console.log('country final string');
            console.log(countryStr);
            
            console.log('copyRegionArray');
            console.log(copyRegionArray);
            console.log(copyRegionArray.length);

            for (var i = 0; i < copyRegionArray.length ; i++)
            {
                if (cityStr == '')
                {
                    cityStr = copyRegionArray[i];
                } else {
                    cityStr = cityStr + ',' + copyRegionArray[i];
                }

            }
            console.log('city string');
            console.log(cityStr);


            vm.adddata = {
                'image_type': select_type,
                'image_url': vm.image_url,
                'country': countryStr,
                'state': stateStr,
                'city': cityStr,
            }
            console.log(countryArray.length + '' + stateArray.length + '' + arr.length);
            promotionalServices.addpromotionalads(vm.adddata).success(function (response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("promotional ads add successfully!");
                    $timeout(function () {
                        $state.reload();
                        $state.go('promotion-ads');
                    }, 2000);
                } else {
                    console.log(response)
                    showError("Some error occur!");
                    return false;
                }

            });
        });
        /*--------------------------------view promotionals ads----------------------------------------*/
        $("#preloader").show();
        promotionalServices.viewpromotionalads().success(function (response) {
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';
                for (var i = 0; i < len; i++) {
                    var prom_id = data[i]['id'];
                    var image_type = data[i]['image_type'];
                    var ad_image = data[i]['image_url'];

                    str += '<tr>';
                    str += '<td>' + image_type + '</td>';
                    str += '<td><img src="' + ad_image + '" style="width: 100px;"></td>';
                    str += '<td>';
                    str += '<a href="#" class="btn btn-primary btn-sm" id="edit-modal" data-toggle="modal" image_type="' + image_type + '" edit_id="' + prom_id + '" real_img="' + ad_image + '"  data-target="#modal-prom_ads" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';
                    str += '<a href="#" class="btn btn-danger" onclick=\'angular.element(this).scope().deleteFun("' + prom_id + '")\'>Delete </a>';
                    str += '</td>';

                    str += '</tr>';
                }
                $("#view_ads").html(str);
                $('.data-table').DataTable();
            } else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });

        /********************** state and city*************************/
        var country_id = 0;

        $(document).delegate('.chose_country', "change", function () {
            var country_name = $(this).find(":selected").val();
            var c_id = $(this).attr("id");
            var length = c_id.length;
            c_id = c_id[length - 1];
            console.log(c_id);
            if (country_name == 'USA')
            {
                country_id = 2;
            } else if (country_name == 'India')
            {
                country_id = 1;
            }
            vm.stateData = {
                'country_id': country_id,
            }
            if (c_id == "0")
            {
                console.log('inside first country');
                promotionalServices.view_states(vm.stateData).success(function (response) {
                    console.log(response);
                    if (response.status == 105) {
                        vm.states = response.data;
                        console.log(vm.states);
                    } else {
                        showError(response['message']);
                        return false;
                    }
                });
            } else {

                console.log('inside 2nd country');
                promotionalServices.view_states(vm.stateData).success(function (response) {
                    if (response.status == 105) {
                        vm.new_state = response.data;
                        console.log(vm.new_state);
                        var firstoption = $('#state option:first_child');
                        var cList = $('#state' + c_id);
                        cList.empty();
                        cList.append('<option>choose a state<option/>');
                        console.log(firstoption);
                        $('#state option:gt(0)').remove();
                        $.each(vm.new_state, function (i)
                        {
                            var li = $('<option/>')
                                    .text(vm.new_state[i].location_name)
                                    .appendTo(cList);
                        });
                    }
                });
            }


        });

        var state_id = 0;
        $(document).delegate('.state', "change", function () {
//
//            console.log(country_str);
            var s_id = $(this).attr("id");
            var length = s_id.length;
            s_id = s_id[length - 1];
            console.log(s_id);
            var state_name = $(this).find(":selected").val();
            var len = vm.states.length;
            console.log(state_name);
            if (s_id == "0")
            {
                for (var i = 0; i < len; i++) {
                    if (state_name == vm.states[i].location_name)
                    {
                        state_id = vm.states[i].id;
                        console.log(state_id);
                    }
                }

                vm.cityData = {
                    'country_id': country_id,
                    'state_id': state_id,
                }

                promotionalServices.view_cities(vm.cityData).success(function (response) {
                    console.log(response);
                    vm.cities = [];
                    if (response.status == 105) {
                        vm.cities = response.data
                        console.log(vm.cities);
                    } else {
                        showError(response['message']);
                        return false;
                    }
                });
            } else {
                for (var i = 0; i < len; i++) {
                    if (state_name == vm.new_state[i].location_name)
                    {
                        state_id = vm.new_state[i].id;
                        console.log(state_id);
                    }
                }

                vm.cityData = {
                    'country_id': country_id,
                    'state_id': state_id,
                }

                promotionalServices.view_cities(vm.cityData).success(function (response) {
                    console.log(response);
                    if (response.status == 105) {
                        vm.new_city = response.data;
                        console.log(vm.new_city);
                        var cList = $('#region' + s_id);
                        $.each(vm.new_city, function (i)
                        {
                            var li = $('<option/>')
                                    .text(vm.new_city[i].city_name)
                                    .val(vm.new_city[i].city_name)
                                    .appendTo(cList);
                        });
                    }
                });
            }

        });

        function displayVals() {
            console.log("in function");
            $('.state > option:selected').each(function (i) {
                if ($(this).val() != "0" && $(this).val() != 0 && $(this).val() != "choose a state") {
                    console.log()
                    stateArray.push($(this).val().toString());
                }

            });
            $('.chose_country > option:selected').each(function (i) {
                if ($(this).val() != "0" && $(this).val() != 0 && $(this).val() != "Choose Country") {
                    countryArray.push($(this).val().toString());
                }

            });
            $('.region').each(function () {
                var id = $(this).attr("id");
                if ($('#' + id).val()) {
                    var len = $('#' + id).val().length;
                }

                $('#' + id + '> option:selected:checked').each(function (key) {
                    if ($(this).val() != "Choose a region") {
                        arr.push($(this).val());
                    }
                    if (len == (key + 1)) {
                        if (arr[parseInt(arr.length) - 1] != "&&") {
                            arr.push('&&');
                        }
                    }
                })
            })

        }
//        /**************delete promotional ads***************/

        $scope.deleteFun = function (p_id) {
            console.log(p_id);

            vm.delPData = {
                'ad_id': p_id,
            }
            console.log(vm.delPData);
            var ch = confirm("Are you sure you want to delete this promotional ads?");
            console.log(ch);
            if (ch == true) {
                promotionalServices.deletepromotionalads(vm.delPData).success(function (response) {
                    console.log(response);
                    if (response.status == 105) {
                        showSuccess("promotional ads deleted successfully!");
                        $timeout(function () {
                            $state.reload();
                        }, 2000);
                    } else {
                        console.log(response)
                        showError("Some error occur!");
                        return false;
                    }

                });
            }
        }
        /**************edit promotional ads***************/
            $(".chngType").change(function ()
            {
                $("#ad_img").val('');
                   vm.image_url_edit='';
                   $('.img-pre img').attr('src','') 
            });
        function editads() {
        
            var select_type = $("#prom_ads").val();
//            var add_image = $("#ad_img").val();
            var e_id = $("#editpromotional_id").val();
            if (ifBlank("Type", select_type) == false)
                {
                return false;
                }
            if (ifBlank("Image",  vm.image_url_edit) == false){
          
                  return false;
            }

//            if (select_type == '0' || select_type == 0) {
//
//                showError("Please select your image type");
//                return false;
//            }
            vm.EditData = {
                'ad_id': e_id,
                'image_url': vm.image_url_edit,
                'image_type': select_type,
            }
//                        console.log(name);
            promotionalServices.editpromotionalads(vm.EditData).success(function (response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Promotional ads edit Successfully");
                    $timeout(function () {
                        $('#modal-prom_ads').modal('hide');
                        $('body').removeClass('modal-open');
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
        ;
        $(document).delegate('#edit-modal', 'click', function () {
            var image_type = $(this).attr("image_type");
            var id = $(this).attr("edit_id");
            var image_url = $(this).attr("real_img");
            vm.image_url_edit=image_url;
            var real_img = '<img src="' + image_url + '" width="150" height="150" alt="Nba">';
            $('.img-pre').html(real_img)
            $("#prom_ads").val(image_type);
            $("#editpromotional_id").val(id);
//            $("#ad_img").val(image_path);
//            $("#ad_img [value=" + image_url + "]").val(true);

        });
        /*-------------------------validation--------------------------------- */

        $(document).ready(function () {
            var max_fields = 10; //maximum input boxes allowed
            var wrapper = $(".add_more_select"); //Fields wrapper
            var add_button = $(".add_more"); //Add button ID

            var x = 1; //initlal text box count
            var i = 1;

            $(add_button).click(function () {
                if (x < max_fields) { //max input box allowed
                    x++;
                    //text box increment
                    $(wrapper).append('<div class="new_added">\n\
 <div class="form-group col-md-4">\n\
                     <select id="chose_country' + i + '" class="form-control chose_country" required>\n\
                                    <option  selected="choose country">Choose Country</option>\n\
                                    <option value="USA">USA</option>\n\
                                    <option value="India">India</option>\n\
                                </select>\n\
                            </div>\n\
               <div class="form-group col-md-4">\n\
                  <select class="form-control select_control state" id="state' + i + '" required>\n\
                                <option>choose a state</option>\n\
                            </select></div>\n\
                            <div class="form-group col-md-3">\n\
                               <select class="form-control select_control region" id="region' + i + '" multiple required>\n\
                                <option>Choose a region</option>\n\
            </select></div>\n\
         <div class="col-md-1 remove_field"><button href = "#" class = "" >close</button></div></div>'); //add input box

                }
                i++;
                console.log("iii");
                console.log(i);
            });

            $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
                e.preventDefault();
                $(this).parent('div').remove(); //Remove field html
                x--;

            });
            $("#prom_ads").change(function ()
            {
                imageindex = $(this).val();
             
                var dataString = 'id=' + imageindex;
//                alert(dataString);
                return false;
            });
          
//            $("#ad_img").change(function() {
//
//                var fileUpload = $("#ad_img")[0];
//                //Check whether HTML5 is supported.
//                if (typeof (fileUpload.files) != "undefined") {
//                    //Initiate the FileReader object.
//                    var reader = new FileReader();
//                    //Read the contents of Image File.
//                    reader.readAsDataURL(fileUpload.files[0]);
//                    reader.onload = function(e) {
//                        //Initiate the JavaScript Image object.
//                        var image = new Image();
//                        //Set the Base64 string return from FileReader as source.
//                        image.src = e.target.result;
//                        image.onload = function() {
//                            //Determine the Height and Width.
//                            var height = this.height;
//                            var width = this.width;
//                            console.log(height + ' ' + width);
//                            if (imageindex == "Banner") {
//                                if (height == 600 && width == 1280) {
////                    alert('please choose image of size less than 1mb')
//
//                                }
//                                else {
//                                    alert('please choose image dimenstion is 1280*600');
//                                    image_status = 1;
//                                }
//                            }
//                            else if (imageindex == "Rolling") {
//
//                                if (height == 150 && width == 265) {
////                    alert('please choose image of size less than 250kb')
//                                }
//                                else {
//                                    alert('please choose image dimenstion is 265*150');
//                                    image_status = 1;
//                                }
//                            }
//                            else {
//                                alert('please choose valid image')
//                            }
//                        };
//                    }
//                }
//            });





        });
    }
})();