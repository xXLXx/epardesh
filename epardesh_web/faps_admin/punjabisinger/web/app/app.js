
'use strict';

var app = angular.module('app', [
    'ngAnimate', // animations
    'ngResource', // Rest
//    'ngSanitize', // sanitizes html bindings (ex: sidebar.js)
    'ui.router', // UI Router
    'ngStorage', // Local Storage
//    'angularSpinner',
    'ngMaterial',
    'ngMessages',
    //......... data table ..............\\
     //'ui.utils', 
    //'datatables',
    //......... ./data table ..............\\ 
//        'rzModule',

//        'nvd3ChartDirectives',
    // 3rd Party Modules
    'ui.bootstrap', // ui-bootstrap (ex: carousel, pagination, dialog)
//        'angularSelectbox',
//    'ui.grid',
//    'ngImgCrop',
//    'ImageCropper',
//    'djds4rce.angular-socialshare',
//    'satellizer',
//    'ngAutocomplete'


])
//        .run(function($FB, $rootScope, $location, $timeout, $interval, $state, $document, lastActive) {
//    $FB.init('232178350466666');
//    // Timeout timer value
//    var TimeOutTimerValue = 900000;
//
//    // Start a timeout
//    var TimeOut_Thread = $timeout(function() {
//        LogoutByTimer()
//    }, TimeOutTimerValue);
//    var bodyElement = angular.element($document);
//
//    angular.forEach(['keydown', 'keyup', 'click', 'mousemove', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'scroll', 'focus'],
//            function(EventName) {
//                bodyElement.bind(EventName, function(e) {
//                    TimeOut_Resetter(e)
//                });
//            });
//
//    function LogoutByTimer() {
//        if (localStorage.getItem('user_id') && localStorage.getItem('token')) {
//            lastActive.afterLogout();
//        }
//    }
//
//    function TimeOut_Resetter(e) {
//        /// Stop the pending timeout
//        $timeout.cancel(TimeOut_Thread);
//
//        /// Reset the timeout
//        TimeOut_Thread = $timeout(function() {
//            LogoutByTimer()
//        }, TimeOutTimerValue);
//    }
//
//});

