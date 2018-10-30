(function($){

	$(document).ready(function() {

		var templateUrl = theme_path.templateUrl;

		/* ----- Vaariables and user agent check ----- */
		isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);


		/* ----- Safari class if is Safari ----- */
		if (isSafari) {
			$('html').addClass('is-safari');
		} else {
			$('html').removeClass('is-safari');
		};

		if (isiOS) {
			$('html').addClass('is-ios');
		} else {
			$('html').removeClass('is-ios');
		};

		/* ----- Function to prevent Default Events ----- */
		function pde(e){
			if(e.preventDefault)
				e.preventDefault();
			else
				e.returnValue = false;
		}


		/* ----- Preloader ----- */
		$(window).load(function(){
			$('#preloader').fadeOut('slow',function(){
				$(this).remove();
			});
		});


		/* ----- Portfolio grid ----- */
		Grid.init();


		/* ----- Initialize fitVids ----- */
		$('.portfolio-post-video').fitVids();
		$('.entry-content').fitVids();


		/* ----- Covervid ----- */
		$(window).on( 'load debouncedresize', function(){
			if ( $('picseel-video-bg').length ) {
				var winW = parseInt($(window).width());
				if (winW > 767) {
					var fixed = ( $('.picseel-video-bg').css('position') == 'fixed' ) ? true : false;
					$('.picseel-video-bg').css({display: 'block'});
					$('.picseel-video-bg').coverVid(1280, 720, fixed);
				} else {
					$('.picseel-video-bg').css({display: 'none'});
				}
			}
		});


		/* ----- Progress circles ----- */
		$('.knob').each(function () {

			var $this = $(this);
			var myVal = $this.attr("value");
			if($this.hasClass('animated')) {
				$(this).attr("value", '0');
			}
			
			$this.knob();

			if($this.hasClass('animated')) {

				var fired = false;
				$this.waypoint(function(){
					if(fired == false) {
						$({value: 0}).animate({
							value: myVal
						}, {
							duration: 2500,
							easing: 'easeOutCubic',
							step: function () {
								$this.val(Math.ceil(this.value)).trigger('change');
							}
						});
					}
					fired = true;
				}, {offset: '80%'});
			}
		});


		/* ---- Entrance Animations ----- */
		if (isMobile) {
			$('.animated').each(function(){
				$(this).removeClass('animated');
			});
		};
		animatedEntrance('.team-row', 'rotateIn', 400);
		animatedEntrance('.pretty-row', 'bounceIn', 400);
		animatedEntrance('.carousel', 'bounceIn', 100);
		animatedEntrance('.promobox', 'fadeInUp', 400);
		animatedEntrance('.recent-posts', 'fadeIn', 300);
		animatedEntrance('.features-row', 'fadeInUp', 300);
		animatedEntrance('.pricing-col', 'fadeIn', 300);
		// animatedEntrance('.og-grid', 'fadeIn', 200);


		/* ----- Darken the revealed menu on mobile ----- */
		$('.navbar-toggle').on('click', function(){
			if (!$('.navbar-collapse').hasClass("in")) {
				$('.navbar').addClass('darken-menu');
			} else if ($('.navbar-collapse').hasClass("in")) {
				$('.navbar').removeClass('darken-menu');
			}
		});


		/* ----- Darken/lighten transparent menus on mobile and scroll ----- */
		$('.transparentmenulight .navbar-toggle').on('click', function(){
			if (!$('.navbar-collapse').hasClass("in")) {
				$('.transparentmenulight').css({
					backgroundColor: 'rgba(0,0,0,0.6)',
				});
				console.log('click');
			} else if ($('.navbar-collapse').hasClass("in")) {
				$('.transparentmenulight').css({
					backgroundColor: 'none',
				});
			}
		});

		$('.transparentmenudark .navbar-toggle').on('click', function(){
			if (!$('.navbar-collapse').hasClass("in")) {
				$('.transparentmenudark').css({
					backgroundColor: 'rgba(255,255,255,0.8)',
				});
				console.log('click');
			} else if ($('.navbar-collapse').hasClass("in")) {
				$('.transparentmenudark').css({
					backgroundColor: 'none',
				});
			}
		});



		// Center home menu dropdowns
		centerDropDown();
		$(window).on( 'debouncedresize', function(){
			centerDropDown();
		});


		/* ----- Center title on post header ----- */
		$('body').imagesLoaded(function(){
			positionBlogTitle();
		});
		$(window).on( 'debouncedresize', function(){
			positionBlogTitle();
		});



		/* ----- Opacity effect on welcome screen ----- */
		$(document).scroll(function () {
			var position = $(document).scrollTop();

			if (!isMobile) {
				$(".welcome-section .content-wrapper").css({
					opacity : (1 - position/500)
				});
			};
		});


		/* ----- Collapse navigation on click (Bootstrap 3 is missing it) ----- */
		$('.nav a').on('click', function () {
			$('#home_nav').removeClass('in').addClass('collapse');
		});

		/* ----- Add class .contains-image to anchors to make them block ----- */
		$('img').parent('a').addClass('contains-image');


		/* ----- Special heading border color ----- */
		$('.special-heading-container').each(function(index){
			headingColor = $(this).data('color');
			$(this).find('.special-heading').css({
				borderColor: headingColor
			});
		});


		/* ----- Inner menu button actions ----- */
		$('.reveal-inner-menu').click(function(evt){
			if(!$('.inner-menu-container').hasClass('menu-visible')) {
				$('.inner-menu-container').addClass('menu-visible').animate({opacity: 1});
				$('.reveal-inner-menu').addClass('reveal-active');
			} else {
				$('.inner-menu-container').animate({opacity: 0}, 100, function(){
					$('.inner-menu-container').removeClass('menu-visible');
					$('.reveal-inner-menu').removeClass('reveal-active');
				});
			}
			evt.stopPropagation();
		});

		$('html').click(function() {
			$('.inner-menu-container').animate({opacity: 0}, 100, function(){
				$('.inner-menu-container').removeClass('menu-visible');
				$('.reveal-inner-menu').removeClass('reveal-active');
			});
		});


		$('.languages').hover(function(){
			$(this).find('ul').slideToggle(500, 'easeInOutQuint');
		});


		/* ----- Scroll down from Welcome screen ----- */
		$('.welcome-section .scroll-more').click(function(evt) {
			var place = $('body').children('section').eq(1);
			// var offsetTop = $('.navbar').outerHeight();
			$('html, body').animate({scrollTop: $(place).offset().top}, 1200, 'easeInOutCubic');
			pde(evt);
		});


		/* ----- Nice scroll to Sections ----- */
		$('.navbar-nav li a').click(function(evt){
			var place = $(this).attr('href');

			if (place == '#home') {
				var off = 0;
			} else {
				var off = $(place).offset().top;
			};
			$('html, body').animate({
				scrollTop: off
			}, 1600, 'easeInOutExpo');
			pde(evt);
		});

		
		/* ----- Minimize and darken the Menu Bar ----- */
		$('body').waypoint(function(direction) {
			$('.navbar').toggleClass('minified dark-menu');
			if (direction == 'down') {
				$('.transparentmenulight').css({backgroundColor: 'rgba(0,0,0,0.6)',});
				$('.transparentmenudark').css({backgroundColor: 'rgba(255,255,255,0.8)',});
			} else {
				$('.transparentmenulight').css({background: 'none',});
				$('.transparentmenudark').css({background: 'none',});
			}
		}, { offset: '-200px' });


		/* ----- Testimonials rotator ----- */
		$( '.testimonials-rotator' ).slick({
			slide: '.testimonial',
			arrows: false,
			dots: true,
			draggable: false,
			fade: true,
			cssEase: 'ease-in-out',
			autoplay: true,
			pauseOnHover: true,
		});



		/* ----- Single portfolio slider ----- */
		$('.portfolio-slider').slick({
			dots: true,
			infinite: true,
			speed: 500,
			fade: true,
			slide: '.pslide',
			cssEase: 'ease',
			easing: 'easeInOutQuint'
		});


		/* ----- Single post slider ----- */
		$('.blogpost-slider').slick({
			dots: true,
			infinite: true,
			speed: 500,
			fade: false,
			slide: '.bslide',
			cssEase: 'ease',
			easing: 'easeInOutQuint'
		});



		/* ----- Text Rotator ----- */
		$(".rotating-words").textrotator({
			animation: "dissolve",
			separator: ",",
			speed: 3000
		});



		/* ----- PrettyPhoto ----- */
		$("a[rel^='prettyPhoto']").prettyPhoto({
			theme: 'facebook', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			deeplinking: false,
			social_tools: false,
		});
		$(".gallery-item a").prettyPhoto({
			theme: 'facebook', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			deeplinking: false,
			social_tools: false,
		});



		/* ----- Image Carousel ----- */
		$(".carousel").each(function(i) {

			$(this).attr('id', "carousel_" + (i + 1));
			var carouselID = $(this).attr('id');
			var car = $('#'+carouselID);

			if (car.hasAttr('data-infinite')) {var infiniteCar = car.data('infinite')};
			if (car.hasAttr('data-show')) {var showCar = car.data('show')};
			if (car.hasAttr('data-scroll')) {var scrollCar = car.data('scroll')};
			if (car.hasAttr('data-arrows')) {var arrowsCar = car.data('arrows')};
			if (car.hasAttr('data-bullets')) {var bulletsCar = car.data('bullets')};
			if (car.hasAttr('data-speed')) {var speedCar = car.data('speed')};

			car.slick({
				onInit: function(){
					// Fix vertical alignement on carousel slides
					var slide = car.find('.carousel-slide');
					slide.each(function(){
						var slideH = $(this).height();
						var sliderH = $(this).parent().height();
						$(this).css('margin-top', (sliderH - slideH) / 2);
					});
				},
				infinite: infiniteCar,
				slidesToShow: showCar,
				slidesToScroll: scrollCar,
				slide: 'div',
				dots: bulletsCar,
				arrows: arrowsCar,
				easing: 'easeInOutQuart',
				speed: speedCar,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: infiniteCar,
						dots: bulletsCar,
						arrows: arrowsCar,
						easing: 'easeInOutQuart',
						speed: speedCar,
					}
				},{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: infiniteCar,
						dots: bulletsCar,
						arrows: arrowsCar,
						easing: 'easeInOutQuart',
						speed: speedCar,
					}
				},{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: infiniteCar,
						dots: bulletsCar,
						arrows: false,
						easing: 'easeInOutQuart',
						speed: speedCar,
					}
				}]
			});
		});



		/* ----- Image Slider ----- */
		$(".image-slider").each(function(n) {

			$(this).attr('id', "image-slider_" + (n + 1));
			var sliderID = $(this).attr('id');
			var slider = $('#'+sliderID);

			if (slider.hasAttr('data-arrows')) {var arrowsSlider = slider.data('arrows')};
			if (slider.hasAttr('data-bullets')) {var bulletsSlider = slider.data('bullets')};
			if (slider.hasAttr('data-speed')) {var speedSlider = slider.data('speed')};
			if (slider.hasAttr('data-autospeed')) {var autospeedSlider = slider.data('autospeed')};
			if (slider.hasAttr('data-autoplay')) {var autoplaySlider = slider.data('autoplay')};
			if (slider.hasAttr('data-fade')) {var fadeSlider = slider.data('fade')};

			var beforeChange = function(slider,i) {
				$(slider.$slides[i]).children('.slide-content').each(function(){
					if ($(this).hasAttr('data-animation')) {
						var animSlide = $(this).data('animation');
						$(this).removeClass('animated '+animSlide);
						$(this).css('opacity', '0');
					};
				});
			};

			var afterChange = function(slider,i) {
				$(slider.$slides[i]).children('.slide-content').each(function(n){
					if ($(this).hasAttr('data-animation')) {
						var animSlide = $(this).data('animation');
						$(this).addClass('animated '+animSlide);
						$(this).css('opacity', '1');
					};
				});
			};

			var afterInit = function(slider,i) {
				$(slider.$slides[0]).children('.slide-content').each(function(n){
					if ($(this).hasAttr('data-animation')) {
						var animSlide = $(this).data('animation');
						$(this).addClass('animated '+animSlide);
						$(this).css('opacity', '1');
					};
				});
			};

			slider.slick({
				onInit: afterInit,
				onAfterChange: afterChange,
				onBeforeChange: beforeChange,
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				slide: 'div',
				dots: bulletsSlider,
				arrows: arrowsSlider,
				speed: speedSlider,
				fade: fadeSlider,
				autoplay: autoplaySlider,
				autoplaySpeed: autospeedSlider,
				touchMove: false,
				draggable: false,
				swipe: true,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							dots: true,
							arrows: false,
						}
					}
				]
			});
		});



		/* ----- Show "Back to Top" button ----- */
		$(document).scroll(function () {
			var position = $(document).scrollTop();
			var headerHeight = $('#welcome').outerHeight();
			if (position >= headerHeight - 100){
				$('.scrolltotop').addClass('show-to-top');
			} else {
				$('.scrolltotop').removeClass('show-to-top');
			}
		});

		// Scroll on Top
		$('.scrolltotop, .navbar-brand').click(function(e) {
			$('html, body').animate({scrollTop: '0'}, 1200, 'easeInOutCubic');
			pde(e);
		});


		/* ----- Filterable Portfolio effect ----- */
		$('ul.og-grid li').append('<div class="hidden-overlay"></div>');
		$('.filter-bar ul.filter-list li').click(function() {
			$(this).css('outline','none');

			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			
			var filterVal = $(this).attr('data-id');
					
			if(filterVal == 'all') {
				$('ul.og-grid li.hidden-item').addClass('visible-item');
				$('ul.og-grid li.hidden-item').removeClass('hidden-item').animate({opacity: 1}, 600);
			} else {
				
				$(this).parents().eq(1).siblings('.main').find('li').each(function() {

					var attrArr = $(this).attr('data-id').split(' ');
					var found = $.inArray(filterVal, attrArr);

					if(found == -1) {
						$(this).animate({opacity: 0.2}, 600, function(){
							$(this).removeClass('visible-item').addClass('hidden-item');
						});
					} else {
						$(this).addClass('visible-item');
						$(this).removeClass('hidden-item').animate({opacity: 1}, 600);
					}
				});
			}
			
			return false;
		});


		/* ----- Contact form ----- */
		$("#submit_btn").click(function(e) {
			e.preventDefault();

			$('#submit_btn').text('').append('<i class="fa fa-spinner fa-spin"></i>');

			//get input field values
			var user_name       = $('input[name=name]').val(); 
			var user_email      = $('input[name=email]').val();
			var user_human      = $('input[name=human]').val();
			var user_message    = $('textarea[name=message]').val();

			//simple validation at client's end
			//we simply change border color to red if empty field using .css()
			var proceed = true;
			if(user_name==""){ 
				$('#contact_form input[name=name]').css('border-color','red');
				$('#submit_btn').remove('i').text('Submit');
				proceed = false;
			}
			if(user_email==""){ 
				$('input[name=email]').css('border-color','red');
				$('#submit_btn').remove('i').text('Submit');
				proceed = false;
			}
			if( user_human == "" ) {    
				$('input[name=human]').css('border-color','red');
				$('#submit_btn').remove('i').text('Submit');
				proceed = false;
			}
			if(user_message=="") {  
				$('textarea[name=message]').css('border-color','red');
				$('#submit_btn').remove('i').text('Submit'); 
				proceed = false;
			}

			//everything looks good! proceed...
			if (proceed == true) {

				//data to be sent to server
				post_data = {'userName':user_name, 'userEmail':user_email, 'userHuman':user_human, 'userMessage':user_message};

				//Ajax post data to server
				$.post(templateUrl+'/contact.php', post_data, function(response){  

					//load json data from server and output message     
					if(response.type == 'error') {
						output = '<div class="error">'+response.text+'</div>';
						$('#submit_btn').remove('i').text('Submit');
					} else {
						output = '<div class="success">'+response.text+'</div>';

						$('#submit_btn').remove('i').text('Message sent!');
						$('#submit_btn').attr("disabled", true);

						//reset values in all input fields
						$('#contact_form input').val(''); 
						$('#contact_form textarea').val(''); 
					}

					$("#result").hide().html(output).slideDown();

				}, 'json');

			}

		});

		// //reset previously set border colors and hide all message on .keyup()
		// $("#contact_form input, #contact_form textarea").keyup(function() { 
		// 	$("#contact_form input, #contact_form textarea").css('border-color',''); 
		// 	$("#result").slideUp();
		// });


		/* ----- Forms Placeholder fix for IE8 and IE9 ----- */
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() {
			var input = $(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
			}
			})
		});
		

		/* ----- Initialize Portfolio Grid ----- */
		// initializeGrid();


		/* ----- Initialize Parallax effect ----- */
		parallaxed('.parallax');


	});



	/* ----- Functions ----- */

	function parallaxed(obj) {

		$(window).bind("load resize scroll",function() {
			$(obj).each(function(){
				var windowHeight = $(window).height();
				var windowWidth = $(window).width();
				var scrollPos = $(window).scrollTop();
				var objectPos = $(this).offset().top;
				var position = objectPos - scrollPos;

				if ((!isMobile || !isSafari) && windowWidth >= 768) {
					$(this).css('background-position', '50% ' + parseInt(position*0.2) + 'px');
				} else {
					$(this).css({
						backgroundPosition: '50% 0px',
						backgroundSize: 'cover'
					});
				}
			});
		});

	}

	function positionBlogTitle() {
		$('.blog-post-loop').each(function(){
			var elemH = $(this).find('.entry-header').height();
			var titleH = $(this).find('.entry-title').outerHeight();
			var titleTop = ( elemH - titleH ) / 2;
			$(this).find('.entry-title').css({top: titleTop});
			console.log(elemH, titleH);
		});
	}

	function centerDropDown() {
		var winWidth = $('body').outerWidth();
		if (winWidth > 768) {
			$(".navbar .navbar-nav li").each( function() {
				if( $(this).find("ul").length > 0 ) {
					var parent_width = $(this).outerWidth();
					var child_width = $(this).find("ul").outerWidth();
					var new_width = parseInt((child_width - parent_width)/2);
					$(this).find("ul").css('left', -new_width+"px");
				}
			});
		};
	}

	function animatedEntrance(elemParent, anim, delay) {
		if (!isMobile) {
			$(elemParent).each(function(){
				$(this).waypoint(function(){
					if ($(this).hasClass('animated')) {
						$(this).addClass(anim);
						$(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							$(this).css({opacity: 1});
						});
					} else {
						$(this).find('.animated').each(function(index){
							var $el = $(this);
							setTimeout(function() {
								$el.addClass(anim);
								$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									$el.css({opacity: 1});
								});
							}, index*delay);
						});
					};
				},
				{
					offset: '80%',
					triggerOnce: true
				});
			});
		} else {
			$(elemParent).each(function(){
				if ($(this).hasClass('animated')) {
					$(this).css({opacity: 1});
				} else {
					$(this).find('.animated').css({opacity: 1});;
				};
			});
		}
	}



/*
* debouncedresize: special jQuery event that happens once after a window resize
*
* latest version and complete README available on Github:
* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
*
* Copyright 2011 @louis_remi
* Licensed under the MIT license.
*/
var $event = $.event,
$special,
resizeTimeout;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 250
};





// ======================= imagesLoaded Plugin ===============================
// https://github.com/desandro/imagesloaded

// $('#my-container').imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// callback function gets image collection as argument
//  this is the container

// original: MIT license. Paul Irish. 2010.
// contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};

var Grid = (function() {

		// list of items
	var $grid = $( '#og-grid' ),
		// the items
		$items = $grid.children( 'li' ),
		// current expanded item's index
		current = -1,
		// position (top) of the expanded item
		// used to know if the preview will expand in a different row
		previewPos = -1,
		// extra amount of pixels to scroll the window
		scrollExtra = 0,
		// extra margin when expanded (between preview overlay and the next items)
		marginExpanded = 30,
		$window = $( window ), winsize,
		$body = $( 'html, body' ),
		// transitionend events
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support for csstransitions
		support = Modernizr.csstransitions,
		// default settings
		settings = {
			minHeight : 500,
			speed : 350,
			easing : 'ease'
		};

	function init( config ) {
		
		// the settings..
		settings = $.extend( true, {}, settings, config );

		// preload all images
		$grid.imagesLoaded( function() {

			// save item´s size and offset
			saveItemInfo( true );
			// get window´s size
			getWinSize();
			// initialize some events
			initEvents();

		} );

	}

	// add more items to the grid.
	// the new items need to appended to the grid.
	// after that call Grid.addItems(theItems);
	function addItems( $newitems ) {

		$items = $items.add( $newitems );

		$newitems.each( function() {
			var $item = $( this );
			$item.data( {
				offsetTop : $item.offset().top,
				height : $item.height()
			} );
		} );

		initItemsEvents( $newitems );

	}

	// saves the item´s offset top and height (if saveheight is true)
	function saveItemInfo( saveheight ) {
		$items.each( function() {
			var $item = $( this );
			$item.data( 'offsetTop', $item.offset().top );
			if( saveheight ) {
				$item.data( 'height', $item.height() );
			}
		} );
	}

	function initEvents() {
		
		// when clicking an item, show the preview with the item´s info and large image.
		// close the item if already expanded.
		// also close if clicking on the item´s cross
		initItemsEvents( $items );
		
		// on window resize get the window´s size again
		// reset some values..
		$window.on( 'debouncedresize', function() {
			
			scrollExtra = 0;
			previewPos = -1;
			// save item´s offset
			saveItemInfo();
			getWinSize();
			var preview = $.data( this, 'preview' );
			if( typeof preview != 'undefined' ) {
				hidePreview();
			}

		} );

	}

	function initItemsEvents( $items ) {
		$items.on( 'click', 'span.og-close', function() {
			hidePreview();
			$("#prevdesc").niceScroll();
			return false;
		} ).children( 'a' ).on( 'click', function(e) {

			var $item = $( this ).parent();
			// check if item already opened
			current === $item.index() ? hidePreview() : showPreview( $item );
			$("#prevdesc").niceScroll({
				cursorcolor:        "#999999",
				cursoropacitymin:   "0.2",
				cursorwidth:        "6px",
				cursorborder:       "0px solid #fff",
				scrollspeed:        "80",
				background:         "rgba(0,0,0,0.04)"
			}).resize();
			return false;

		} );
	}

	function getWinSize() {
		winsize = { width : $window.width(), height : $window.height() };
	}

	function showPreview( $item ) {

		var preview = $.data( this, 'preview' ),
			// item´s offset top
			position = $item.data( 'offsetTop' );

		scrollExtra = 0;

		// if a preview exists and previewPos is different (different row) from item´s top then close it
		if( typeof preview != 'undefined' ) {

			// not in the same row
			if( previewPos !== position ) {
				// if position > previewPos then we need to take te current preview´s height in consideration when scrolling the window
				if( position > previewPos ) {
					scrollExtra = preview.height;
				}
				hidePreview();
			}
			// same row
			else {
				preview.update( $item );
				return false;
			}
			
		}

		// update previewPos
		previewPos = position;
		// initialize new preview for the clicked item
		preview = $.data( this, 'preview', new Preview( $item ) );
		// expand preview overlay
		preview.open();

	}

	function hidePreview() {
		current = -1;
		var preview = $.data( this, 'preview' );
		preview.close();
		$.removeData( this, 'preview' );
	}

	// the preview obj / overlay
	function Preview( $item ) {
		this.$item = $item;
		this.expandedIdx = this.$item.index();
		this.create();
		this.update();
	}

	Preview.prototype = {
		create : function() {
			// create Preview structure:
			this.$title = $( '<h3></h3>' );
			this.$links = $( '' );
			this.$description = $( '<div id="prevdesc" class="preview-description"></div>' );
			this.$iconCategory = $( '<i class="fa fa-folder-o"></i>' );
			this.$iconDate = $( '<i class="fa fa-calendar"></i>' );
			this.$category = $( '<span class="preview-category"></span>' );
			this.$date = $( '<span class="preview-date"></span>' );
			this.$meta = $( '<div class="preview-meta"></div>' ).append( this.$iconCategory, this.$category, this.$iconDate, this.$date );
			this.$linkButton = $( '<a class="btn btn-medium btn-outline btn-darkblue" href="#">Read more</a>' );
			this.$details = $( '<div class="col-sm-5 og-details"></div>' ).append( this.$title, this.$meta, this.$description, this.$linkButton );
			this.$loading = $( '<div class="og-loading"></div>' );
			this.$fullimage = $( '<div class="col-sm-7 og-fullimg"></div>' ).append( this.$loading );
			this.$closePreview = $( '<span class="og-close"></span>' );
			this.$previewRow = $( '<div class="row"></div>' ).append( this.$closePreview, this.$fullimage, this.$details );
			this.$previewInner = $( '<div class="container og-expander-inner preview"></div>' ).append( this.$previewRow );
			this.$previewEl = $( '<div class="og-expander"></div>' ).append( this.$previewInner );
			// append preview element to the item
			this.$item.append( this.getEl() );
			// set the transitions for the preview and the item
			if( support ) {
				this.setTransition();
			}
		},
		update : function( $item ) {

			if( $item ) {
				this.$item = $item;
			}
			
			// if already expanded remove class "og-expanded" from current item and add it to new item
			if( current !== -1 ) {
				var $currentItem = $items.eq( current );
				$currentItem.removeClass( 'og-expanded' );
				this.$item.addClass( 'og-expanded' );
				// position the preview correctly
				this.positionPreview();
			}

			// update current value
			current = this.$item.index();

			// update preview´s content
			var $itemEl = this.$item.children( 'a' ),
				eldata = {
					href : $itemEl.attr( 'href' ),
					largesrc : $itemEl.data( 'largesrc' ),
					video: $itemEl.data( 'video' ),
					category : $itemEl.data( 'category' ),
					date : $itemEl.data( 'date' ),
					title : $itemEl.data( 'title' ),
					description : $itemEl.data( 'description' ),
					postlinks : $itemEl.data( 'postlinks' )
				};

			this.$title.html( eldata.title );
			this.$description.html( eldata.description );
			this.$linkButton.attr( 'href', eldata.href );
			this.$category.html( eldata.category );
			this.$date.html( eldata.date );
			this.$links.html( eldata.postlinks );

			var self = this;
			
			// remove the current image in the preview
			if( typeof self.$largeImg != 'undefined' ) {
				self.$largeImg.remove();
			}

			// preload large image and add it to the preview
			// for smaller screens we don´t display the large image (the media query will hide the fullimage wrapper)
			if( self.$fullimage.is( ':visible' )) {
				this.$loading.show();
				if (eldata.video !== '') {
						self.$loading.hide();

						if (eldata.video.match('y_')) {
							var videoID = eldata.video.substring(2);
							console.log(videoID);
							var videoEmbed = '<div class="portfolio-video" style="display: none"><iframe width="670" height="440" src="//www.youtube.com/embed/'+videoID+'?rel=0" frameborder="0" allowfullscreen></iframe></div>';
						} else if (eldata.video.match('v_')) {
							var videoID = eldata.video.substring(2);
							console.log(videoID);
							var videoEmbed = '<div class="portfolio-video" style="display: none"><iframe src="//player.vimeo.com/video/'+videoID+'?title=0&amp;byline=0&amp;portrait=0&amp;color=b11623" width="670" height="440" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
						}

						self.$fullimage.find( 'img' ).remove();
						self.$fullimage.find( '.portfolio-video' ).remove();
						self.$fullimage.append(videoEmbed);
						self.$fullimage.find( '.portfolio-video' ).delay(1000).fadeIn(600);
						$('.portfolio-video').fitVids();
				} else {
					$( '<img/>' ).load( function() {
						var $img = $( this );
						if( $img.attr( 'src' ) === self.$item.children('a').data( 'largesrc' ) ) {
							self.$loading.hide();
							self.$fullimage.find( '.portfolio-video' ).remove();
							self.$fullimage.find( 'img' ).remove();
							self.$largeImg = $img.fadeIn( 350 );
							self.$fullimage.append( self.$largeImg );
						}
					} ).attr( 'src', eldata.largesrc );
				}
			}

		},
		open : function() {

			setTimeout( $.proxy( function() {	
				// set the height for the preview and the item
				this.setHeights();
				// scroll to position the preview in the right place
				this.positionPreview();
			}, this ), 25 );

		},
		close : function() {

			var self = this,
				onEndFn = function() {
					if( support ) {
						$( this ).off( transEndEventName );
					}
					self.$item.removeClass( 'og-expanded' );
					self.$previewEl.remove();
				};

			setTimeout( $.proxy( function() {

				if( typeof this.$largeImg !== 'undefined' ) {
					this.$largeImg.fadeOut( 'fast' );
				}
				this.$previewEl.css( 'height', 0 );
				// the current expanded item (might be different from this.$item)
				var $expandedItem = $items.eq( this.expandedIdx );
				$expandedItem.css( 'height', $expandedItem.data( 'height' ) ).on( transEndEventName, onEndFn );

				if( !support ) {
					onEndFn.call();
				}

			}, this ), 25 );
			
			return false;

		},
		calcHeight : function() {

			var heightPreview = winsize.height - this.$item.data( 'height' ) - marginExpanded,
				itemHeight = winsize.height;

			if( heightPreview < settings.minHeight ) {
				heightPreview = settings.minHeight;
				itemHeight = settings.minHeight + this.$item.data( 'height' ) + marginExpanded;
			}

			this.height = heightPreview;
			this.itemHeight = itemHeight;

		},
		setHeights : function() {

			var self = this,
				onEndFn = function() {
					if( support ) {
						self.$item.off( transEndEventName );
					}
					self.$item.addClass( 'og-expanded' );
				};

			this.calcHeight();
			this.$previewEl.css( 'height', this.height );
			this.$item.css( 'height', this.itemHeight ).on( transEndEventName, onEndFn );

			if( !support ) {
				onEndFn.call();
			}

		},
		positionPreview : function() {

			// scroll page
			// case 1 : preview height + item height fits in window´s height
			// case 2 : preview height + item height does not fit in window´s height and preview height is smaller than window´s height
			// case 3 : preview height + item height does not fit in window´s height and preview height is bigger than window´s height
			var position = this.$item.data( 'offsetTop' ),
				previewOffsetT = this.$previewEl.offset().top - scrollExtra,
				scrollVal = this.height + this.$item.data( 'height' ) + marginExpanded <= winsize.height ? position : this.height < winsize.height ? previewOffsetT - ( winsize.height - this.height ) : previewOffsetT;
			
			$body.animate( { scrollTop : scrollVal }, settings.speed );

		},
		setTransition  : function() {
			this.$previewEl.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
			this.$item.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
		},
		getEl : function() {
			return this.$previewEl;
		}
	}

	return { 
		init : init,
		addItems : addItems
	};

})();

// $(function() {
// 	Grid.init();
// });

$.fn.hasAttr = function(name) {  
   return (typeof this.attr(name) !== 'undefined' || this.attr(name) !== false);
};


})(jQuery);
