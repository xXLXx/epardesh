(function() {
    'use strict';

    angular
            .module('app')
            .provider('meta', metaProvider);

    metaProvider.$inject = [];
    function metaProvider() {
        var provider = {};
        provider.defaults = {};
        provider.$get = 
        [
            '$rootScope', '$injector', function($rootScope, $injector) {
                return new Meta($rootScope, $injector);
            }
        ];

        return provider;
        function Meta($rootScope, $injector)
        {
            var model = {};
            model.enable = enable;
            model.setTitle = setTitle;
            model.setDescription = setDescription;
            
            return model;
            function enable()
            {
                $rootScope.meta = {};
                $rootScope.$on('$routeChangeSuccess', update);
                $rootScope.$on('$stateChangeSuccess', update);
                if ($injector.has('$transitions')) {
                    var $transitions = $injector.get('$transitions');
                    $transitions.onSuccess({}, function(transition) {
                        update(null, transition.$to());
                    });
                }
            }
            function update(event, current)
            {
                var data = angular.copy((current.data && current.data.meta) || provider.defaults);
                console.log(data);
                setTitle(data.title);
                setDescription(data.description);
            }
            function setTitle(title)
            {
                $rootScope.meta.title = title;
            }
            function setDescription(description)
            {
                $rootScope.meta.description = description;
            }
        }
    }

})();