jQuery(document).ready(function($){
	
	// get "all testimonials" out of container
	//$('.cd-testimonials-all').appendTo('#fullscreen_modals');
	
	//create the slider
	$('.cd-testimonials-wrapper').flexslider({
		selector: ".cd-testimonials > li",
		animation: "slide",
		controlNav: false,
		slideshow: false,
		smoothHeight: true,
		start: function(){
			$('.cd-testimonials').children('li').css({
				'opacity': 1,
				'position': 'relative'
			});
		}
	});
	
	// lock scroll position, but retain settings for later
      var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
      ];

	//open the testimonials modal page
	$('.cd-see-all').on('click', function(){
		$('.top_info_bar').addClass('hidden_for_modals'); // mod by eugen
		$('#masthead').addClass('hidden_for_modals'); // mod by eugen
		$('.cd-testimonials-all').addClass('is-visible');
		
		var html = $('html'); // it would make more sense to apply this to body, but IE7 won't have that
		html.data('scroll-position', scrollPosition);
		html.data('previous-overflow', html.css('overflow'));
		html.css('overflow', 'hidden');
		//window.scrollTo(scrollPosition[0], scrollPosition[1]);
		
		//build the grid for the testimonials modal page
		$('.cd-testimonials-all-wrapper').children('ul').masonry({
			itemSelector: '.cd-testimonials-item',
		});
	});

	//close the testimonials modal page
	$('.cd-testimonials-all .close-btn, .cd-testimonials-all').on('click', function(){
		$('.top_info_bar').removeClass('hidden_for_modals'); // mod by eugen
		$('#masthead').removeClass('hidden_for_modals'); // mod by eugen
		$('.cd-testimonials-all').removeClass('is-visible');
		
		// un-lock scroll position
		var html = $('html');
		var scrollPosition = html.data('scroll-position');
		html.css('overflow', html.data('previous-overflow'));
		//window.scrollTo(scrollPosition[0], scrollPosition[1])
	});
	$(document).keyup(function(event){
		//check if user has pressed 'Esc'
    	if(event.which=='27'){
			$('.top_info_bar').removeClass('hidden_for_modals'); // mod by eugen
			$('#masthead').removeClass('hidden_for_modals'); // mod by eugen
			// un-lock scroll position
			var html = $('html');
			var scrollPosition = html.data('scroll-position');
			html.css('overflow', html.data('previous-overflow'));
			//window.scrollTo(scrollPosition[0], scrollPosition[1])
			
    		$('.cd-testimonials-all').removeClass('is-visible');	
	    }
    });
    
	
});