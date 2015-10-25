jQuery(document).ready(function($) {
 
    var widthScreen = $(window).width();
    
    // global
    $('.fitvid').fitVids();
    
    $('.js-search').on('click',function(e){
      
      if ($('#primary-navigation').hasClass('active')) {
        closePrimaryNavigation();
      }
      
      e.preventDefault();
      
      overlay();
      
      $(this).toggleClass('active');
      
      $('#primary-search').toggleClass('active');
      
    });
    
    $('.js-menu').on('click',function(e){

      if ($('#primary-search').hasClass('active')) {
        closePrimarySearch();
      }
      
      e.preventDefault();
      
      overlay();
      
      $(this).toggleClass('active');
      
      $('#primary-navigation').toggleClass('active');
      
    });
          
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        $('#primary-search,.js-search,.js-menu,#primary-navigation,#site-overlay').removeClass('active');
      }
    });
    
    $('.navigate').on('click',function(e){
      e.preventDefault();
      var $target = $($(this).attr('href'));
      scrollTo($target);
    });

    // newsletter

    $('.js-close').on('click', function(event) {
      event.preventDefault();
      
      var $target = $($(this).attr('href'));

      $target.removeClass('open')
      overlay();

    }); 

    $('.js-open-newsletter').on('click', function(event) {
      event.preventDefault();
      
      $('#newsletter-popup').addClass('open');
      overlay();

    });

    $('#form-newsletter').on('submit', function(event) {

      event.preventDefault();

      var data = $(this).serialize();
      var rqrd = $('input.rqrd',this);

      rqrd.each(function(index, el) {

        var $t = $(this);
        
        if ($t.val() === '') {
          $t.addClass('error');
        }else{
          $t.removeClass('error');
        };

      });

      if ($('.rqrd.error').length === 0) {
        $.ajax({
          url: AJAX.url,
          type: 'post',
          dataType: 'json',
          data: data,
        })
        .done(function(data) {
          $('#newsletter-popup').addClass('confirmed');
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });    
      };

    });

    // load more
    $('.load-more a').on('click', function(event) {
      event.preventDefault();
      
      var $target = $($(this).data('more'));

      var $find = $target.find('article.hide:lt(4)');

      $find.fadeIn().removeClass('hide');
      
      if ($target.find('.end:visible').length > 0) {
        $(this).remove();
      };

    });

    // bar
    $('.action-show-bar').on('click', function(event) {
      event.preventDefault();
      $('#information-bar').slideDown('200');
    });
    
    // masonry

    $('#masonry').imagesLoaded(function() {
      
      $('#masonry').masonry({
            transitionDuration: 0,
            itemSelector: '.article',
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
            isAnimated: false
          });
      
    });        
        
    // front page   
    
    if (!Modernizr.touch) {
      $('.intro article').on('mouseenter',function(){
        $(this).find('.collapseable').stop().slideDown(400);
      });
    
      $('.intro article').on('mouseleave',function(){
        $(this).find('.collapseable').stop().slideUp(400);
      });
    }

    
    var $filmslides = $('#film-slides');
    
    $filmslides.slick({
      slide: '.slide',
      slidesToShow: 2,
      arrows: false,
      dots: false,
      responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
      ]
    });
    
    $('#film-left').on('click',function(e){
      e.preventDefault();
      $filmslides.slickPrev();
    });
    
    $('#film-right').on('click',function(e){
      e.preventDefault();
      $filmslides.slickNext();
    });
    
    // form
    
    $('.filter-selectable .link > a').on('click',function(e){
      e.preventDefault();
      
      var value = $(this).text();
      
      $(this).parents('.filter-selectable').children('.action').addClass('active').text(value);
      $('#form-requested').val(value);
      
    });

    // stories

    var go = true;

    if (!Modernizr.touch) {
    
      $(window).on('scroll', function(event) {

        var top = $(window).scrollTop();
        var height = ($(document).height() - $(window).height()) - 150;
        
        if (top > height && go) {

          go = false;
          
          var $find = $('#archive-stories').find('article.hide:lt(8)');
          
          $find.fadeIn(500,function(){
            go = true;
            $('#masonry').masonry();
          }).removeClass('hide');

        };
        
      });
      
    }


    //  intro
    
    var $carousel = $('#intro-slides');

    $carousel.slick({
      slide: '.slide',
      speed: 1000,
      fade: true,
      draggable: true,
      prevArrow: $('#intro-previous'),
      nextArrow: $('#intro-next')
    });   

    if ($carousel.length > 0) {

      var $intro = $('#intro');
      var opacity = 1;
      var winheight = $(document).height() / 3.8;

      $(window).on('scroll', function(event) {

        offset = 1 - (winheight / Math.min(winheight - $(window).scrollTop(),winheight));

        opacity = 1 - Math.abs(Math.min(1,offset));

        $intro.css({'opacity': opacity});

      });

    };


    // kickstarter
    //Cookies.remove('kickstarter');

    // set the Cookie
    Cookies.set('kickstarter', 'set',{expires: 1});
    
    
    // helpers
    
    function overlay(){
      $('#site-overlay').toggleClass('active');
    }
    
    function closePrimaryNavigation(){
      $('.js-menu,#primary-navigation,#site-overlay').removeClass('active');
    }
    
    function closePrimarySearch(){
      $('#primary-search,.js-search,#site-overlay').removeClass('active');
    }
    
    function scrollTo($element){
      $('html, body').animate({scrollTop: $element.offset().top}, 700);
    }
      
});


