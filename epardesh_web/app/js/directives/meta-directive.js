angular
        .module('app').directive('ngMeta', function() {
    return {
        restrict: 'A',
        scope: {
            ngMeta: '='
        },
        link: function (scope, element, attrs) {
            element.attr('content', scope.ngMeta);
            scope.$watch('ngMeta', function(value){
                if(value){
                    element.attr('content', value);
                }
            });
        }
    };
});