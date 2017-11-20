(function() {
    'use strict';
    var controllerId = 'viewParticularCategory';
    angular
            .module('app')
            .controller(controllerId, viewParticularCategory);
    viewParticularCategory.$inject = ['$scope', '$timeout', '$state', 'categoriesServices'];
    function viewParticularCategory($scope, $timeout, $state, categoriesServices) {
        var vm = this;
        //vm.updatesubCategory = updatesubCategory;
       
        /**************view sub category***************/
//        if(!localStorage.getItem('allsubData') ||  localStorage.getItem('staus')=='1'){
 var category_id= localStorage.getItem('current_cat_id');
 
        vm.viewsubcatData = {
            'category_id': category_id,
        }
        $("#preloader").show();
        categoriesServices.viewsubBycategory(vm.viewsubcatData).success(function(response) {
//            console.log("hhhhh")
//            console.log(response.data[1]['parent']);
            console.log("response from particular category");
                        console.log(response);

            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';
//                var str1 = '';
                for (var i = 0; i < len; i++) {
                    var sub_category_name = data[i]['name'];
                    var status = data[i]['status'];
                    if (status == 0)
                    {
                        var type = "Both";
                    }
                    else
                    var type = "Premium";   
                    str += '<tr>';
                    str += '<td>' + sub_category_name + '</td>';
                    str += '<td>' + type + '</td>';
                    str += '</tr>';
                }
                $("#view_sub_category").html(str);
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