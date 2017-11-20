    $(function() {
        $(window).scroll(function() {
            if ($(document).scrollTop() > 200)
            {
                $('.logo-left').addClass("shrink-left-logo");
                $('.logo-right').addClass("shrink-right-logo");
                $('.logo-left').removeClass("left-logo");
                $('.logo-right').removeClass("right-logo");
                $('nav').addClass("main-shrink");
                $('nav').removeClass("main-header");
                $('.menu').addClass("menubar-shrink");
                $('.menu').removeClass("menubar");
            }
            else
            {
                $('.logo-left').removeClass("shrink-left-logo");
                $('.logo-right').removeClass("shrink-right-logo");
                $('.logo-left').addClass("left-logo");
                $('.logo-right').addClass("right-logo");
                $('nav').addClass("main-header");
                $('nav').removeClass("main-shrink");
                $('.menu').removeClass("menubar-shrink");
                $('.menu').addClass("menubar");

            }
        });

        $(document.body).on('show.bs.modal', function() {
            $('body').css('padding-right', "0px");
        })
                .on('hide.bs.modal', function() {
            $('body').css('padding-right', "0px");
        });

    })