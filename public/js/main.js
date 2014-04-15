

$(document).ready(function () {
    $('pre').addClass('prettyprint');
    prettyPrint();
});

//** MENU TOGGLE ***///
(function () {
    "use strict";
    

    //
    // -------- declare -----------
    //
    
    var $header = $('header.text'),
        $navMenu = $('header.nav'),
        $menuToggle = $('a.menu-toggle'),
        $navItem = $('header.nav ul li'),
        $window = $(window),
        //height in pixels for how far to scroll up before showing menu
        threshhold = 35,
        toggled = false;
        
    //shows the menu in mobile, and fades blog title on scroll
    function onWindowScroll(event) {
        var preceding = $window.scrollTop();
        
        if (preceding > threshhold) {
            $header.css({
                'z-index': '2',
                'opacity': '0'
            });
            
            $navMenu.addClass('retractable');
            $header.addClass('below');

            //if not toggled, wait a beat, then retract the menu
            if (!toggled) {
                setTimeout(function () {
                    $navMenu.addClass('closed');
                }, 800);
            } else {
                
            }

        } else {
            $header.css({
                'z-index' : '3',
                'opacity': '1'
            });

            $navMenu.removeClass('closed');
            $navMenu.removeClass('retractable');
            
            // a little clean up
            setTimeout(function () {
                $header.removeClass('below');
            }, 300);
        }
    }
        
        
    //handles the touch on the menu
    function onMenuToggle(event) {
        (event.preventDefault) ? event.preventDefault() : event.stopPropagation();
        if ($navMenu.hasClass('closed')) {
            toggled = true;
            $navMenu.removeClass('closed');
            $header.addClass('below');
        } else {
            toggled = false;
            $navMenu.addClass('closed');
            $header.removeClass('below');
        }
    }

    // populates the nav-indicator with the 
    // text of the button being hovered over
    function onMenuHover(event) {
        var $target = $(event.currentTarget),
            text = $target.children('a').attr('href');

        text = text.split('/').pop();

        $('.nav-indicator').text(text);
    }
    
    //
    // --- control -------
    //
        
    $window.scroll(onWindowScroll);
    
    $menuToggle.live('click', onMenuToggle);

    $navItem.on('hover', onMenuHover);
}());

