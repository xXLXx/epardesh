(function() {
    'use strict';
    var controllerId = 'viewCatSub';
    angular
            .module('app')
            .controller(controllerId, viewCatSub);
    viewCatSub.$inject = ['$scope', '$timeout', '$state', 'categoriesServices','$stateParams'];
    function viewCatSub($scope, $timeout, $state, categoriesServices,$stateParams) {
        var vm = this;
        $("#preloader").show();
        var data={
             'category_id':$stateParams.id,
        }
        categoriesServices.viewsubBycategory(data).success(function(response) {
            console.log("jojojo")
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
                var str = '';
              
                for (var i = 0; i < len; i++) {
                    str += '<tr>';
                    str += '<td>' + data[i].id + '</td>';
                    str += '<td>' + data[i].name  + '</td>';              
                    str += '</tr>';
                }
          

                $(".view_category").html(str);
                $('.data-table').DataTable();
            }
            else {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });


    }
})();