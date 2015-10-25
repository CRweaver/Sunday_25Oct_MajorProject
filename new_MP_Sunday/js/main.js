/*global $, console*/
(function () {
    'use strict';
    $(document).ready(function () {
        /* Find the hamburger li and attach a click handler */
        $('nav ul:first-child').click(function () {
            /* toggle the class menu-expanded on the ul
            ** be careful with the "this" context as our selector is a pseudo element and "this" refers to the ul
            **/
            $(this).toggleClass('menu-expanded');
        });
    });

}());

(function () {
    'use strict';
    $(document).ready(function () {
        
        /* This is where we initialise our carousel */
        $('.carousel').slick({
            displayArrows: true,
            centermode: true,
        });
        
        /* We need to place this variable outside of the click 
        ** handler to member the value between clicks */
        var isFiltered = false;
        
        /* Togglable filter for sports category */
        $('#filter-by-sport').click(function (e) {
            e.preventDefault();
            /* Make a jQuery element out of the event target */
            var el = $(e.target);
            
            if (isFiltered === false) {
                
                $('#filter-carousel').slick('slickFilter', '[data-category="sport"]');
                
                el.addClass('active');
                
                el.text('Filtered by Sport');
                
                isFiltered = true;
            } else {
                
                $('#filter-carousel').slick('slickUnfilter');
                
                el.removeClass('active');
                
                el.text('Filter by Sport');
                
                isFiltered = false;
                
            }
            
        });
    });
}());

