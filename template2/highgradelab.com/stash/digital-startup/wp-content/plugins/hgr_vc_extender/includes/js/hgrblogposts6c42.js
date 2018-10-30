jQuery(document).ready(function() {		
	// Blog posts Isotope
	var container = jQuery(".hgr_blog_posts");
	var containerCols = container.attr("data-cols");
	if(typeof containerCols === 'undefined'){
		  containerCols = 3;
	};
	container.isotope({
		animationEngine : "jquery",
		filter:"*",
		animationOptions: {
			duration: 200,
			queue: false
		},
		layoutMode: "masonry"
	});	
	function setColumns() { 
		var container = jQuery(".hgr_blog_posts");	
		container.each(function(){
			var containerCols = jQuery(this).attr("data-cols");			
			var winWidth = jQuery(this).parent().width(), 
				columnNumb = containerCols;			
					if (winWidth > 1024) {
						columnNumb = containerCols;
					} else if (winWidth > 900) {
						columnNumb = containerCols;
					} else if (winWidth > 479) {
						columnNumb = 2;
					} else if (winWidth < 479) {
						columnNumb = 1;
					}
				//columnNumb = containerCols, 
				postWidth = Math.floor(winWidth / columnNumb)-20;
			jQuery(this).find(".hgr_blog_post").each(function () { 
				jQuery(this).css( { 
					width : postWidth + "px" 
				});
			});
		})
	}
	function setProjects() { 
		setColumns();
		container.isotope("layout");
	}
	jQuery(window).bind("load resize", function () { 
		setProjects();			
	});
});