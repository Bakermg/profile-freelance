//  Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

    // API call to WordPress Blog

    $(document).ready(function() {
        // $('#blog-button').on('click', function() {
            // event.preventDefault();
            // getBlog();
        // });
        var fullContent, contentSlug, excerptContent;
    // var getBlog = function() {
        $.ajax({
                method: 'GET',
                url: 'https://blogbybaker.com/wp-json/wp/v2/posts',
                cache: false
            })
            .done(function(data) {
                fullContent = '<p>' + data[0].content.rendered + '</p>';
                contentSlug = '<h2>' + data[0].title.rendered + '</h2>';
                excerptContent = '<p>' + data[0].excerpt.rendered + '</p>';
                $('#content').empty();
                $('#content').append('<h1>Recent Post</h1');
                $('#content').append(contentSlug, excerptContent);

                $('.more-link').click(function(event) {
                    event.preventDefault();
                    updateContent();
                });
            })
            .fail(function() {
                $('#content').append('<h3>Sorry something went wrong please reload page</h3>');
            })

        //Fire off api call

            // $('#blog-button').hide();
            // $('#content').empty();
            // $('#content').append('<h1>Recent Post</h1');
            // $('#content').append(contentSlug, excerptContent);

            // $('.more-link').click(function(event) {
            //     event.preventDefault();
            //     updateContent();
            // });

            // Update to full content if read more
            var updateContent = function() {
                $('#content').empty().append('<h1>Recent Post</h1>', contentSlug, fullContent);
                $('span').css('color', '#ECEFF1');
                $('pre span').css('color', '#333');
                $('#content').append('<a id="close-blog" class="btn btn-lg btn-outline" href="#about"><i class="fa fa-email"></i>Close Blog</a>')
                $('#close-blog').on('click', function() {
                    $('#content').empty();
                    $('#content').append(contentSlug, excerptContent);
                    // $('#blog-button').show();
                })
            }
        // }
    });
})(jQuery); // End of use strict