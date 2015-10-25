/*global location, $, console*/
(function () {
    'use strict';

    $(function () {
        $('a[href*=#]:not([href=#])').click(function (e) {

            /* The value of 98 below is hardcoded, this is generally bad. We can do
             ** better.  We can store calculate this from the height of the header
             ** plus the top margin of the heading we want to scroll to */

            //Some debugging info to see what is going on

            console.log('The (this) link clicked had the href of', $(this).attr('href'));
            console.log(e.target === this); // Should print true to the console
            console.log(e.currentTarget === this);
            /* Should also print true to the console
                        but can change depending on the selector used so take care */

            /* We only need to chage the 98 in this scary piece of code */
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 98
                    }, 1000);
                    return false;
                }
            }
        });
    });

}());