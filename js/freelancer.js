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
    $('.navbar-collapse ul li a').click(function(){
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
    $('#blog-button').on('click', function(e) {
        e.preventDefault();
        getBlog();
    });

    //Fire off api call
    var getBlog = function() {
        $('#blog-button').hide();
        var fullContent, contentSlug, excerptContent;
        $('#content').empty();
        $.ajax({
            method: 'GET',
            url: 'http://blogbybaker.com/wp-json/wp/v2/posts'
        })
        .done(function(data) {
            $('#content').append('<h1>Recent Post</h1');
             fullContent = '<p>' + data[0].content.rendered + '</p>';
             contentSlug = '<h2>' + data[0].title.rendered + '</h2>';
             excerptContent = '<p>' + data[0].excerpt.rendered + '</p>';
            console.log(contentSlug);
            $('#content').append(contentSlug, excerptContent);

            $('.more-link').click(function(e) {
                e.preventDefault();
                updateContent();
            });
        })
        .fail(function() {
            $('#content').append('<h1 id="error">Sorry something went wrong try again</h1>');
        })

        // Update to full content if read more
        var updateContent = function() {
            $('#content').empty().append('<h1>Recent Post</h1>', contentSlug, fullContent);
            $('span').css('color', '#ECEFF1');
            $('pre span').css('color', '#333');
            $('#content').append('<a id="close-blog" class="btn btn-lg btn-outline" href="#about"><i class="fa fa-email"></i>Close Blog</a>')
            $('#close-blog').on('click', function() {
                $('#content').empty();
                $('#blog-button').show();
         })
        }

    };






})(jQuery); // End of use strict
