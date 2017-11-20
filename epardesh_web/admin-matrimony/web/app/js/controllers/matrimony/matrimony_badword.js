(function() {
    'use strict';
    var controllerId = 'Mbadword';
    angular
            .module('app')
            .controller(controllerId, Mbadword);
    Mbadword.$inject = ['$scope', '$timeout', '$state', 'MbadwordServices'];
    function Mbadword($scope, $timeout, $state, MbadwordServices) {
        var vm = this;
        /**************view badwords***************/
         $("#preloader").show();
        MbadwordServices.viewbadwords().success(function(response) {
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
            MbadwordServices.manage_word(vm.badwordData).success(function(response) {
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