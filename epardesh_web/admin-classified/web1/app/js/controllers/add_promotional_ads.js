(function() {
    'use strict';
    var controllerId = 'addpromotional';
    angular
            .module('app')
            .controller(controllerId, addpromotional);
    addpromotional.$inject = ['$scope', '$timeout', '$state', 'promotionalServices'];
    function addpromotional($scope, $timeout, $state, promotionalServices) {
        var vm = this;
        vm.states = [];
        vm.showLoading = true;
        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("startdate")[0].setAttribute('min', today);
        document.getElementsByName("enddate")[0].setAttribute('min', today);
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
        var arr = []

        /******************************** upload image edit *****************************************/
        $scope.uploadimageEdit = function() {
            vm.showLoading = false;
            imageindex = $('#prom_ads').val();

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
                reader.onload = function(e) {

                    //Initiate the JavaScript Image object.
                    var image = new Image();
                    //Set the Base64 string return from FileReader as source.
                    image.src = e.target.result;
                    image.onload = function() {
                        //Determine the Height and Width.
                        var height = this.height;
                        var width = this.width;
                        console.log(height + ' ' + width);
                        if (imageindex == "Banner") {
                            if (height >= 600 && width >= 1280) {

                                var formData = new FormData(document.forms.namedItem("promotional_form"));
                                console.log(formData);
//            if (image_status != 1) {
                                promotionalServices.uploadimage($scope, function(response) {
                                    console.log(response);
                                    if (response.status == 105) {
                                        vm.showLoading = true;
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
                                promotionalServices.uploadimage($scope, function(response) {
                                    console.log(response);
                                    vm.showLoading = true;
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



        /*--------------------------------view promotionals ads----------------------------------------*/
        $("#preloader").show();
        promotionalServices.viewpromotionalads().success(function(response) {
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';
                var display_nation ='';
                for (var i = 0; i < len; i++) {
                    var prom_id = data[i].ad_id;
                    var image_type = data[i].image_type;
                    var ad_image = data[i].image_url;
                    var con = data[i].country;
                    var state = data[i].state;
                    var city = data[i].city;
                    var is_nation = data[i].is_nationwide;
                    if(is_nation =='1')
                    {
                        display_nation = "Nation Wide";
                    }
                    else
                    {
                        display_nation = city;
                    }
                    var strt = data[i].start_date.split("-");
                    var ddt = strt[2].split("T");
                    var start_date = new Date(strt[0], strt[1] - 1, ddt[0]);
                    vm.endd = data[i].end_date.split("-");
                    vm.eddt = vm.endd[2].split("T");
                    var end_date = new Date(vm.endd[0], vm.endd[1] - 1, vm.eddt[0]);
                    str += '<tr>';
                    str += '<td>' + image_type + '</td>';
                    str += '<td><img src="' + ad_image + '" style="width: 100px;"></td>';
                    str += '<td>'+display_nation+'</td>';
                    str += '<td>';
                    str += '<a  class="btn btn-primary  btn-sm" onclick=\'angular.element(this).scope().editFunc("' + prom_id + '","' + image_type + '","' + ad_image + '","' + con + '","' + state + '","' + city + '","' + is_nation + '","' + start_date + '","' + end_date + '")\' id="edit-modal" data-toggle="modal" image_type="' + image_type + '" edit_id="' + prom_id + '" real_img="' + ad_image + '" start_date="' + start_date + '" end_date="' + end_date + '" contry="' + con + '" state ="' + state + '" city ="' + city + '" nation="' + is_nation + '" data-target="#modal-prom_ads" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';
                    str += '<a  class="btn btn-danger" onclick=\'angular.element(this).scope().deleteFun("' + prom_id + '")\'>Delete </a>';

//                    str += '<a class="btn btn-primary btn-sm" onclick=\'angular.element(this).scope().EditPromo("'+prom_id+'")\' id="edit-modal"  image_type="' + image_type + '" edit_id="' + prom_id + '" real_img="' + ad_image + '"  ng-click="vm.EditPromo();" style="margin-right:15px;><i class="fa fa-pencil-square-o"></i>Edit</a>';



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


        $scope.edit_Country = function(position, obj)
        {

            var index = position;
            var country_name = obj.country;
            console.log('conutry obj');
            console.log(position);
            console.log(obj);
            console.log('countryyyy');
            vm.r[position].city = "0";
            vm.r[position].state = "0";
//    vm.r[index].country = country_name; 
            console.log(vm.r)
           vm.stateData = {
                'country_id': '',
            }

            if (country_name == 'USA')
            {
                vm.stateData.country_id = 2;
            } else if (country_name == 'India')
            {
                vm.stateData.country_id = 1;
            }


            promotionalServices.view_states(vm.stateData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    vm.states[position] = response.data;
                    console.log(vm.states);
                } else {
                    showError(response['message']);
                    return false;
                }
            });
        }
        var state_id = 0;
        $scope.edit_State = function(position, data)
        {
            console.log('inside state edit')
            var country_name = data.country;
            if (country_name == 'USA')
            {
                country_id = 2;
            } else if (country_name == 'India')
            {
                country_id = 1;
            }

            var s_id = position;
            var state_name = data.state;
              vm.r[position].city = "0";
            
            var len = vm.states[position].length;
            console.log(state_name);
            if (s_id == "0")
            {
                for (var i = 0; i < len; i++) {
                    if (state_name == vm.states[position][i].location_name)
                    {
                        state_id = vm.states[position][i].id;
                        vm.r[position].state = state_name;
                        console.log(state_id);
                    }
                }

                vm.cityData = {
                    'country_id': country_id,
                    'state_id': state_id,
                }

                promotionalServices.view_cities(vm.cityData).success(function(response) {
                    console.log(response);
//                    vm.cities = [];
                    if (response.status == 105) {
//                        vm.cities = response.data
                        vm.cities[s_id] = response.data;
                        console.log(vm.cities);
                    } else {
                        showError(response['message']);
                        return false;
                    }
                });
            } else {
                for (var i = 0; i < len; i++) {
                    if (state_name == vm.states[position][i].location_name)
                    {
                        state_id = vm.states[position][i].id;
                        vm.r[position].state = state_name;
                        console.log(state_id);
                    }
                }

                vm.cityData = {
                    'country_id': country_id,
                    'state_id': state_id,
                }

                promotionalServices.view_cities(vm.cityData).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
//                        vm.cities = response.data;
                        vm.cities[s_id] = response.data;
                        console.log(vm.cities);
                        console.log('check cityfffffff')

                        var cList = $('#region' + s_id);
                        $.each(vm.cities, function(i)
                        {
                            var li = $('<option/>')
                                    .text(vm.cities[i].city_name)
                                    .val(vm.cities[i].city_name)
                                    .appendTo(cList);
                        });
                    }
                });
            }



        }

        $scope.edit_Region = function(pos, data)
        {

            console.log('inside Region seled', pos, data)
            vm.r[pos].city = data.city;
            console.log(vm.r)



        }


//        /********************** state and city*************************/
        var country_id = 0;

//        $(document).delegate('.chose_country', "change", function() {
//            var country_name = $(this).find(":selected").val();
//            var c_id = $(this).attr("id");
//            var length = c_id.length;
//            c_id = c_id[length - 1];
//
//            if (country_name == 'USA')
//            {
//                country_id = 2;
//            } else if (country_name == 'India')
//            {
//                country_id = 1;
//            }
//
//            vm.stateData = {
//                'country_id': country_id,
//            }
//            if (c_id == "0")
//            {
//                console.log('inside first country');
//                promotionalServices.view_states(vm.stateData).success(function(response) {
//                    console.log(response);
//                    if (response.status == 105) {
//                        vm.states = response.data;
//                        console.log(vm.states);
//                    } else {
//                        showError(response['message']);
//                        return false;
//                    }
//                });
//            } else {
//
//                console.log('inside 2nd country');
//                promotionalServices.view_states(vm.stateData).success(function(response) {
//                    if (response.status == 105) {
//                        vm.states = response.data;
//                        console.log(vm.states);
//                        var firstoption = $('#state option:first_child');
//                        var cList = $('#state' + c_id);
//                        cList.empty();
//                        cList.append('<option>choose a state<option/>');
//                        console.log(firstoption);
//                        $('#state option:gt(0)').remove();
//                        $.each(vm.states, function(i)
//                        {
//                            var li = $('<option/>')
//                                    .text(vm.states[i].location_name)
//                                    .appendTo(cList);
//                        });
//                    }
//                });
//            }
//
//
//        });
//
//        var state_id = 0;
//        $(document).delegate('.state', "change", function() {
//////
//////            console.log(country_str);
//            var s_id = $(this).attr("id");
//            var length = s_id.length;
//            s_id = s_id[length - 1];
//            console.log(s_id);
//            var state_name = $(this).find(":selected").val();
//            var len = vm.states.length;
//            console.log(state_name);
//            if (s_id == "0")
//            {
//                for (var i = 0; i < len; i++) {
//                    if (state_name == vm.states[i].location_name)
//                    {
//                        state_id = vm.states[i].id;
//                        console.log(state_id);
//                    }
//                }
//
//                vm.cityData = {
//                    'country_id': country_id,
//                    'state_id': state_id,
//                }
//
//                promotionalServices.view_cities(vm.cityData).success(function(response) {
//                    console.log(response);
//                    vm.cities = [];
//                    if (response.status == 105) {
//                        vm.cities = response.data;
//                        console.log(vm.cities);
//                        console.log('dddddd')
//                    } else {
//                        showError(response['message']);
//                        return false;
//                    }
//                });
//            } else {
//                for (var i = 0; i < len; i++) {
//                    if (state_name == vm.states[i].location_name)
//                    {
//                        state_id = vm.states[i].id;
//                        console.log(state_id);
//                    }
//                }
//
//                vm.cityData = {
//                    'country_id': country_id,
//                    'state_id': state_id,
//                }
//
//                promotionalServices.view_cities(vm.cityData).success(function(response) {
//                    console.log(response);
//                    if (response.status == 105) {
//                        vm.cities = response.data;
//                        
//                        console.log(vm.cities);
//                        console.log('check city')
//                       
//                        var cList = $('#region' + s_id);
//                        $.each(vm.cities, function(i)
//                        {
//                            var li = $('<option/>')
//                                    .text(vm.cities[i].city_name)
//                                    .val(vm.cities[i].city_name)
//                                    .appendTo(cList);
//                        });
//                    }
//                });
//            }
//
//        });

        function displayVals() {
            console.log("in function");
            $('.state > option:selected').each(function(i) {
                if ($(this).val() != "0" && $(this).val() != 0 && $(this).val() != "choose a state") {
                    console.log()
                    stateArray.push($(this).val().toString());
                }

            });
            $('.chose_country > option:selected').each(function(i) {
                if ($(this).val() != "0" && $(this).val() != 0 && $(this).val() != "Choose Country") {
                    countryArray.push($(this).val().toString());
                }

            });
//            $('.region').each(function() {
//                var id = $(this).attr("id");
//                if ($('#' + id).val()) {
//                    var len = $('#' + id).val().length;
//                }
//
//                $('#' + id + '> option:selected:checked').each(function(key) {
//                    if ($(this).val() != "Choose a region") {
//                        arr.push($(this).val());
//                    }
//                    if (len == (key + 1)) {
//                        if (arr[parseInt(arr.length) - 1] != "&&") {
//                            arr.push('&&');
//                        }
//                    }
//                })
//            })

            $('.region > option:selected').each(function(i) {
                if ($(this).val() != "0" && $(this).val() != 0 && $(this).val() != "Choose a region") {
                    arr.push($(this).val().toString());
                }

            });



        }
////        /**************delete promotional ads***************/

        $scope.deleteFun = function(p_id) {
            console.log(p_id);

            vm.delPData = {
                'ad_id': p_id,
            }
            console.log(vm.delPData);
            var ch = confirm("Are you sure you want to delete this promotional ads?");
            console.log(ch);
            if (ch == true) {
                promotionalServices.deletepromotionalads(vm.delPData).success(function(response) {
                    console.log(response);
                    if (response.status == 105) {
                        showSuccess("promotional ads deleted successfully!");
                        $timeout(function() {
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



        /******fdljlgjdlfjgj*/
        $scope.editFunc = function(id, image_type, ad_image, country, state, city, is_nation, start_date, end_date)
        {

            console.log('inside editmodal')
            vm.edit_start_date = new Date(start_date);
            vm.edit_end_date = new Date(end_date);
            vm.image_url_edit = ad_image;
            console.log(start_date)
            var real_img = '<img src="' + ad_image + '" width="150" height="150" alt="Nba">';
            $('.img-pre').html(real_img)
            $("#prom_ads").val(image_type);
            $("#editpromotional_id").val(id);
//            $("#editstartdate").val(start_date);
            $("#editpromotional_id").val(id);
            if (is_nation == 1)
            {
                $(".check").prop("checked", true);
            } else if (is_nation == 0) {
                $(".check").prop("checked", false);
            }

            var con = country.split(",");
            var st = state.split(",");
            var ct = city.split(",");
            var wrapper = $(".add_more_select_edit");
            var country_id = 0;
            vm.r = [];
            vm.states = [];
            vm.cities = [];
            vm.India_stat = [];
            vm.Usa_stat = [];
            vm.Ind_index = [];
            vm.USA_index = [];
            vm.Country = [];
            vm.Country_usa = [];

            var r = [];
            for (var a = 0; a < con.length; a++)
            {
                vm.selectregion =
                        {
                            'country': "",
                            "state": "",
                            "city": ""
                        }
                vm.selectregion.country = con[a];
                vm.selectregion.state = st[a];
                vm.selectregion.city = ct[a];
                vm.r.push(vm.selectregion);
                if (con[a] == "India")
                {
                    console.log('inside ind')
                    console.log(a)
                    vm.India_stat.push(st[a]);
                    vm.Ind_index.push(a)
                    vm.Country.push("1");
                                
    

                } else
                {
                     console.log('inside USA')
                    console.log(a)
                    vm.Usa_stat.push(st[a]);
                    vm.USA_index.push(a)
                    vm.Country.push("2");                                     
                }

            }
            console.log(vm.r);
            console.log(vm.India_stat)
            console.log(vm.Usa_stat)
             console.log(vm.Country)
            
            
           vm.con_array = 
                   {
               'country_array' : vm.Country
                   }
                   if(con.length > 0)
                   {
                       promotionalServices.find_state(vm.con_array).success(function(response){
                           if(response.status == 105)
                           {
                               console.log('all contry')
                               console.log(response.data)
                                vm.states = response.data;
                           }
                       })
                   }
                   
                   
            vm.state_array =
                    {
                        'state_array': vm.India_stat
                    }
            if (vm.India_stat.length > 0)
            {
                promotionalServices.find_cities(vm.state_array).success(function(response) {
                    if (response.status == 105)
                    {
                         for (var a = 0; a < response.data.length; a++)
                        {
                            vm.cities[vm.Ind_index[a]] = response.data[a];
                        }
                    }

                })
            }

            if (vm.Usa_stat.length > 0)
            {
                vm.state_usa =
                        {
                            'state_array': vm.Usa_stat
                        }
                promotionalServices.find_cities_USA(vm.state_usa).success(function(response) {
                    if (response.status == 105)
                    {
                        for (var a = 0; a < response.data.length; a++)
                        {

                          vm.cities[vm.USA_index[a]] = response.data[a];
                        }
                    }

                })
            }


        }
        vm.AddMore = AddMore;
        function AddMore()
        {

            vm.r.push({'country': '0', 'state': '0', 'city': '0'});
            console.log(vm.r)
        }


        /**************edit promotional ads***************/
        $(".chngType").change(function()
        {
            $("#ad_img").val('');
            vm.image_url_edit = '';
            $('.img-pre img').attr('src', '')
        });
        function editads() {

            var select_type = $("#prom_ads").val();
//            var add_image = $("#ad_img").val();
            var e_id = $("#editpromotional_id").val();
            var start_date = $("#editstartdate").val();
            var end_date = $("#editenddate").val();
            if (ifBlank("Type", select_type) == false)
            {
                return false;
            }
            if (ifBlank("Image", vm.image_url_edit) == false) {

                return false;
            }
            if (start_date == "")
            {
                $(".alert-red").html("Please enter start date").show();
                $timeout(function() {
                    $(".alert-red").html("").hide();

                }, 2000);
                return false;
            }
            if (end_date == "")
            {
                $(".alert-red").html("Please enter end date").show();
                $timeout(function() {
                    $(".alert-red").html("").hide();

                }, 2000);
                return false;
            }

            if (start_date >= end_date)
            {
                $(".alert-red").html("End date Should be greater than start date").show();
                $timeout(function() {
                    $(".alert-red").html("").hide();

                }, 2000);
                return false;
            }

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = yyyy + '-' + mm + '-' + dd;

            if (today >= end_date)
            {
                showError('End Date should be Greater than Today');
                $timeout(function() {
                }, 1000);
                return false;
            }



//            if (select_type == '0' || select_type == 0) {
//
//                showError("Please select your image type");
//                return false;
//            }

            /********* Edit new *****/
            countryArray = [];
            arr = [];
            stateArray = [];
            displayVals();
            var regionArray = [];
            console.log(arr)
            console.log('city check')
//            arr.splice(-1, 1);
            var copyRegionArray = arr;
//            arr = arr.toString()
//            if (arr.indexOf("&&") > -1) {
//                regionArray = arr.split("&&");
//            } else {
//                regionArray = ["hi"];
//            }
            console.log(regionArray)
            var countryArraylength = countryArray.length;
            var stateArraylength = stateArray.length;
            var regionArraylength = copyRegionArray.length;

            console.log("countryArraylength")
            console.log(countryArraylength)
            console.log("stateArraylength")
            console.log(stateArraylength)
            console.log("regionArraylength")
            console.log(regionArraylength)

            if (countryArraylength != stateArraylength || stateArraylength != regionArraylength) {
                //showError("Please make sure that you select atleast one region and state coressponding to each selected country");
                $(".alert-red").html("Please make sure that you select atleast one region and state coressponding to each selected country").show();
                $timeout(function() {
                    $(".alert-red").html("").hide();

                }, 6000);
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
            cityStr = '';
            for (var i = 0; i < copyRegionArray.length; i++)
            {
                if (cityStr == '')
                {
                    cityStr = cityStr + copyRegionArray[i];
                } else {
                    cityStr = cityStr + ',&&,' + copyRegionArray[i];
                }

            }
            console.log('city string');
            console.log(cityStr);



            vm.EditData = {
                'ad_id': e_id,
                'image_type': select_type,
                'image_url': vm.image_url_edit,
                'country': countryStr,
                'state': stateStr,
                'city': cityStr,
                'is_nationwide': "0",
                'start_date': start_date,
                'end_date': end_date
            }
//            var nationwide = 0;
            if ($('.check').is(':checked')) {
                console.log('fffffff');

                vm.EditData.is_nationwide = "1";
            }
            /*******end edit new *************/
            console.log(vm.EditData);
            promotionalServices.editpromotionalads(vm.EditData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    showSuccess("Promotional ads edit Successfully");
                    $timeout(function() {
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
//        vm.edit_start_date = '';


        vm.r = [];
        vm.removePer = removePer;
        function removePer(pos) {
            console.log(pos);
            if (vm.r.length != 1)
            {
                vm.r.splice(pos, 1);
                vm.states.splice(pos, 1);
                vm.cities.splice(pos, 1);
                console.log(vm.r)
                console.log(vm.states)
                console.log(vm.cities)

            }
        }


// vm.AddMore = AddMore;
//        function AddMore()
//        {
//            vm.r.push('');
//        }
//        $('#edit-modal').click( function() {
//            console.log('inside editmodal')
//            var image_type = $(this).attr("image_type");
//            var id = $(this).attr("edit_id");
//            var image_url = $(this).attr("real_img");
//            var country = $(this).attr("contry");
//            var state = $(this).attr("state");
//            var city = $(this).attr("city");
//            var nation = $(this).attr("nation");
//
//            var con = country.split(",");
//            var st = state.split(",");
//            var ct = city.split(",");
//            var wrapper = $(".add_more_select_edit");
//
//            vm.selectregion =
//                    {
//                        'country': "",
//                        "state": "",
//                        "city": ""
//                    }
//           
//            for (var a = 0; a < con.length; a++)
//            {
//                vm.selectregion =
//                        {
//                            'country': "",
//                            "state": "",
//                            "city": ""
//                        }
//                vm.selectregion.country = con[a];
//                vm.selectregion.state = st[a];
//                vm.selectregion.city = ct[a];
//                vm.r.push(vm.selectregion);
//            }
//            console.log(vm.r);
//            angular.forEach(vm.r, function(val) {
//                if (val.country == "India")
//                {
//                    country_id = 1;
//                    vm.stateData = {
//                        'country_id': 1,
//                    }
//                    console.log('inside India');
//                    console.log(val.state);
//                    promotionalServices.view_states(vm.stateData).success(function(response) {
//                        console.log(response);
//                        if (response.status == 105) {
//                            vm.states = response.data;
//                            console.log('inside state')
//                            console.log(val.state);
//                            /******region****/
//                            angular.forEach(vm.states, function(value) {
//                                if (value.location_name == val.state) {
//
//                                    vm.state = value.location_name;
//                                    console.log(vm.state);
//                                    vm.cityData = {
//                                        'country_id': 1,
//                                        'state_id': value.id,
//                                    }
//
//                                    promotionalServices.view_cities(vm.cityData).success(function(response) {
//
//                                        vm.cities = [];
//                                        if (response.status == 105) {
//                                            vm.cities = response.data
//                                            console.log('view cities for', val.state);
//                                            console.log(vm.cities);
//                                            angular.forEach(vm.cities, function(value) {
//                                                if (value.city_name == val.city)
//                                                {
//                                                    vm.city = val.city;
//                                                }
//
//                                            })
//
//
//                                        } else {
//                                            showError(response['message']);
//                                            return false;
//                                        }
//                                    });
//
//                                }
//                            })
//
//                            /*end region****/
//
//                        } else {
//                            showError(response['message']);
//                            return false;
//                        }
//                    });
//
//                }
//
//
//
//
//
//                if (val.country == "USA")
//                {
//                    country_id = 2;
//                    vm.stateData = {
//                        'country_id': 2,
//                    }
//                    console.log('inside second country');
//                    promotionalServices.view_states(vm.stateData).success(function(response) {
//                        console.log(response);
//                        if (response.status == 105) {
//                            vm.states = response.data;
//                            console.log(vm.states);
//
//                            /******region****/
//                            angular.forEach(vm.states, function(value) {
//                                if (value.location_name == val.state) {
//
//                                    vm.state = value.location_name;
////                                    console.log(vm.selectState);
//                                    vm.cityData = {
//                                        'country_id': 2,
//                                        'state_id': value.id,
//                                    }
//
//                                    promotionalServices.view_cities(vm.cityData).success(function(response) {
//                                        console.log(response);
//                                        vm.cities = [];
//                                        if (response.status == 105) {
//                                            vm.cities = response.data
//                                            console.log(vm.cities);
//                                            
//                                            
//                                              angular.forEach(vm.cities, function(value) {
//                                                if (value.city_name == val.city)
//                                                {
//                                                    vm.city = val.city;
//                                                }
//
//                                            })
//                                            
//                                           
//                                        } else {
//                                            showError(response['message']);
//                                            return false;
//                                        }
//                                    });
//
//                                }
//                            })
//                            /*end region****/
//
//                        } else {
//                            showError(response['message']);
//                            return false;
//                        }
//                    });
//                }
//
//
//            })
//


        /******** Add Region *******/
//        for(var w=1;w < con.length;w++)
//        {
//           
//            console.log(con.length);
//            console.log(w);
//            console.log('werrrrrr');
//        $(wrapper).append('<div class="new_added">\n\
// <div class="form-group col-md-4">\n\
//                     <select id="chose_country' + w + '" class="form-control chose_country" required>\n\
//                                    <option >Choose Country</option>\n\
//                                    <option value="USA">USA</option>\n\
//                                    <option value="India">India</option>\n\
//                                </select>\n\
//                            </div>\n\
//               <div class="form-group col-md-4">\n\
//                  <select class="form-control select_control state" id="state' + w + '" ng-model="vm.state" required>\n\
//                                <option ng-selected= "{{st.location_name == vm.state}}" ng-repeat="st in vm.states">{{st.location_name}}</option>\n\
//                            </select></div>\n\
//                            <div class="form-group col-md-3">\n\
//                               <select class="form-control select_control region" ng-model="vm.city" id="region' + w + '" multiple required>\n\
//                                <option ng-selected= "{{st.city_name == vm.city}}" ng-repeat="st in vm.cities" value="{{st.city_name}}">{{st.city_name}}</option>\n\
//            </select></div>\n\
//         <div class="col-md-1 remove_field"><button href = "#" class = "" >close</button></div></div>'); //add input box
//
//                 $("#chose_country"+w).val(con[w]);
//                 
//                 if (con[w] == "India")
//            {
//               country_id = 1;
//                vm.stateData = {
//                    'country_id': 1,
//                }
//                console.log('inside first country');
//                promotionalServices.view_states(vm.stateData).success(function(response) {
//                    console.log(response);
//                    if (response.status == 105) {
//                        vm.states = response.data;
//                        console.log(vm.states);
//
//
//
//                        /******region****/
//                        angular.forEach(vm.states, function(value) {
//                            if (value.location_name == st[w]) {
//
//                                vm.state = value.location_name;
////                                    console.log(vm.selectState);
//                                vm.cityData = {
//                                    'country_id': 1,
//                                    'state_id': value.id,
//                                }
//
//                                promotionalServices.view_cities(vm.cityData).success(function(response) {
//                                    console.log(response);
//                                    vm.cities = [];
//                                    if (response.status == 105) {
//                                        vm.cities = response.data
//                                        
//                                          angular.forEach(vm.cities, function(value) {
//                            if (value.city_name == ct[w]) {
//                                vm.city = value.city_name;
//                                
//                                
//                            }
//                        })
//                                        
//                                        
//                                    } else {
//                                        showError(response['message']);
//                                        return false;
//                                    }
//                                });
//
//                            }
//                        })
//
//
//
//
//                    } else {
//                        showError(response['message']);
//                        return false;
//                    }
//                });
//
//            }
//                 
//  
//        }
        /*end region****/


//
//            vm.edit_start_date = $(this).attr("start_date");
//            vm.edit_end_date = $(this).attr("end_date");
//            vm.image_url_edit = image_url;
//            var real_img = '<img src="' + image_url + '" width="150" height="150" alt="Nba">';
//            $('.img-pre').html(real_img)
//            $("#prom_ads").val(image_type);
//            $("#editpromotional_id").val(id);
////             $("#editstartdate").val(vm.edit_start_date);
//            $("#editpromotional_id").val(id);
//            if (nation == 1)
//            {
//                $(".check").prop("checked", true);
//            } else if (nation == 0) {
//                $(".check").prop("checked", false);
//            }
//            
//          console.log('start date')
//          console.log(vm.edit_start_date);
//
//        });
//        





        /*-------------------------validation--------------------------------- */

        $(document).ready(function() {
            var max_fields = 10; //maximum input boxes allowed
            var wrapper = $(".add_more_select"); //Fields wrapper
            var add_button = $(".add_more"); //Add button ID

            var x = 0; //initlal text box count
            var i = 0;
            console.log('ddddddd');
            $(add_button).click(function() {
                $(".add_more_select").css("display", "block");
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

            $(wrapper).on("click", ".remove_field", function(e) { //user click on remove text
                e.preventDefault();
                $(this).parent('div').remove(); //Remove field html
                x--;

            });
            $("#prom_ads").change(function()
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