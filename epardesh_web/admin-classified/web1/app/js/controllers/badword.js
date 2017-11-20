(function() {
    'use strict';
    var controllerId = 'badword';
    angular
            .module('app')
            .controller(controllerId, badword);
    badword.$inject = ['$scope', '$timeout', '$state', 'badwordServices'];
    function badword($scope, $timeout, $state, badwordServices) {
        var vm = this;
        /**************view badwords***************/
         $("#preloader").show();
        badwordServices.viewbadwords().success(function(response) {
            console.log(response);
            if (response.status == 105) {
                $("#preloader").hide();
                var len = response.data.length;
                var data = response.data;
        for (var i = 0; i < len; i++) {
            var badword_id = ['id'];
            var view_badwords =data[i]['badwords']
            $('#mytextarea').val(view_badwords);
            console.log(view_badwords);
            
        }   
            }
            else
            {
                console.log(response)
                showError(response['message']);
                return false;
            }
        });
        /**************update badword***************/
        $('#manage_word').click(function() {
            var text = $('#mytextarea').val();
            if (ifBlank("Text Field", text) == false)
                return false;
            if (ifBlank("Text Field", text) == true)
            {
//                 console.log("yyyy");  
                $(".alert-red").css("display", "none");
            }
            console.log(text);
            vm.badwordData = {
                'badwords_string': text,
            }
            $("#preloader").show();
            badwordServices.manage_word(vm.badwordData).success(function(response) {
                console.log(response);
                if (response.status == 105) {
                    $("#preloader").hide();
                 showSuccess("Badword Updated Successfully!");
//                    console.log("Badword Updated Successfully!");
                    $timeout(function() {
                        }, 1500);
                }
                else
                {
                    console.log(response)
                    showError(response['message']);
                    return false;
                }
            });
        });
    }
})();