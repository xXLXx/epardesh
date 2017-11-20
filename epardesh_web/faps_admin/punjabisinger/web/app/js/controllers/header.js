(function() {
    'use strict';

    var controllerId = 'header';

    angular
            .module('app')
            .controller(controllerId, header)
    header.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$mdSidenav', '$log', '$mdDialog'];
    function header($rootScope, $scope, $timeout, $state, $location, $mdSidenav, $log, $mdDialog) {
//


        (function() {
//            "use strict";

            //
            /* //.....custom scrollbar....\\

            $("html").niceScroll({styler: "fb", cursorcolor: "#45B39D", cursorwidth: '5', cursorborderradius: '10px', background: '#444', spacebarenabled: false, cursorborder: '0', zindex: '1000'});

            $(".left-side").niceScroll({styler: "fb", cursorcolor: "#45B39D", cursorwidth: '3', cursorborderradius: '10px', background: '#444', spacebarenabled: false, cursorborder: '0'});


            $(".left-side").getNiceScroll();
            if ($('body').hasClass('left-side-collapsed')) {
                $(".left-side").getNiceScroll().hide();
            }
//..... ./custom scrollbar....\\  */


            // Toggle Left Menu
            $('.menu-list > a').click(function() {

                var parent = $(this).parent();
                var sub = parent.find('> ul');

                if (!$('body').hasClass('left-side-collapsed')) {
                    if (sub.is(':visible')) {
                        sub.slideUp(200, function() {
                            parent.removeClass('nav-active');
                            $('.main-content').css({height: ''});
                            mainContentHeightAdjust();
                        });
                    } else {
                        visibleSubMenuClose();
                        parent.addClass('nav-active');
                        sub.slideDown(200, function() {
                            mainContentHeightAdjust();
                        });
                    }
                }
                return false;
            });

            function visibleSubMenuClose() {
                $('.menu-list').each(function() {
                    var t = $(this);
                    if (t.hasClass('nav-active')) {
                        t.find('> ul').slideUp(200, function() {
                            t.removeClass('nav-active');
                        });
                    }
                });
            }
$scope.logout = function() {
            localStorage.clear();
            // console.log($scope.logout);
            $state.go('home');
        }
        //  if (!localStorage.getItem('accesstoken')) {
        //     localStorage.clear();
        //     $state.go('home');
        // }
            function mainContentHeightAdjust() {
                // Adjust main content height
                var docHeight = $(document).height();
                if (docHeight > $('.main-content').height())
                    $('.main-content').height(docHeight);
            }

            //  class add mouse hover
            $('.custom-nav > li').hover(function() {
                $(this).addClass('nav-hover');
            }, function() {
                $(this).removeClass('nav-hover');
            });


            // Menu Toggle
//            $('.toggle-btn').click(function() {
//                $(".left-side").getNiceScroll().hide();
//
//                if ($('body').hasClass('left-side-collapsed')) {
//                    $(".left-side").getNiceScroll().hide();
//                }
//                var body = $('body');
//                var bodyposition = body.css('position');
//
//                if (bodyposition != 'relative') {
//
//                    if (!body.hasClass('left-side-collapsed')) {
//                        body.addClass('left-side-collapsed');
//                        $('.custom-nav ul').attr('style', '');
//
//                        $(this).addClass('menu-collapsed');
//
//                    } else {
//                        body.removeClass('left-side-collapsed chat-view');
//                        $('.custom-nav li.active ul').css({display: 'block'});
//
//                        $(this).removeClass('menu-collapsed');
//
//                    }
//                } else {
//
//                    if (body.hasClass('left-side-show'))
//                        body.removeClass('left-side-show');
//                    else
//                        body.addClass('left-side-show');
//
//                    mainContentHeightAdjust();
//                }
//
//            });

            $('.toggle-btn').click(function() {
              //  $(".left-side").getNiceScroll().hide();

                if ($('body').hasClass('left-side-collapsed')) {
                    //$(".left-side").getNiceScroll().hide();
                    $('body').removeClass('left-side-collapsed')
                } else {
                    $('body').addClass('left-side-collapsed')
                }
                var body = $('body');
                var bodyposition = body.css('position');

                if (bodyposition != 'relative') {

                    if (!body.hasClass('left-side-collapsed')) {
                        body.addClass('left-side-collapsed');
                        $('.custom-nav ul').attr('style', '');

                        $(this).addClass('menu-collapsed');

                    } else {
                        body.removeClass('left-side-collapsed chat-view');
                        $('.custom-nav li.active ul').css({display: 'block'});

                        $(this).removeClass('menu-collapsed');

                    }
                } else {

                    if (body.hasClass('left-side-show'))
                        body.removeClass('left-side-show');
                    else
                        body.addClass('left-side-show');

                    mainContentHeightAdjust();
                }

            });


            searchform_reposition();

            $(window).resize(function() {

                if ($('body').css('position') == 'relative') {

                    $('body').removeClass('left-side-collapsed');

                } else {

                    $('body').css({left: '', marginRight: ''});
                }

                searchform_reposition();

            });

            function searchform_reposition() {
                if ($('.searchform').css('position') == 'relative') {
                    $('.searchform').insertBefore('.left-side-inner .logged-user');
                } else {
                    $('.searchform').insertBefore('.menu-right');
                }
            }
        })(jQuery);






        /************** Search ****************/
        $(function() {
            var button = $('#loginButton');
            var box = $('#loginBox');
            var form = $('#loginForm');
            button.removeAttr('href');
            button.mouseup(function(login) {
                box.toggle();
                button.toggleClass('active');
            });
            form.mouseup(function() {
                return false;
            });
            $(this).mouseup(function(login) {
                if (!($(login.target).parent('#loginButton').length > 0)) {
                    button.removeClass('active');
                    box.hide();
                }
            });
        });

    }
})();
