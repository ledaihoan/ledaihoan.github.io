 (function($){
   $(function(){

     $('.button-collapse').sideNav();
     $('.parallax').parallax();
     $('.collapsible').collapsible();
     $('.carousel.carousel-slider').carousel({fullWidth: true});
     $('.materialboxed').materialbox();
     $('.scrollspy').scrollSpy();
     $('.tap-target').tapTarget('open');
     $('img + em').each(function() {
        var text = $(this).text();
        $(this).replaceWith("<figcaption style='text-align: center; font-size: 12px;'>" + text + "</figcaption>")
     });
     if (localStorage.getItem('cookieconsent') === 'true') {
       $('#cookies').hide()
     }

     jQuery('#cookies').on('click', function(event) {
            localStorage.setItem('cookieconsent', 'true')
            jQuery('#cookies').toggle('hide');
       });

   }); // end of document ready
 })(jQuery);
