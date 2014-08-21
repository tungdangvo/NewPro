var menu_item_per_col = 6;
var sub_menu_padding = 20;
var menu_item_height = 30;

var slide_show_time_delay = 5;

$('document').ready(function(){

	main_menu_initial();
	slideshow_initial();
	

	
	$('.media-player').videoPlayer();
	
	$(".post-comment").click(function(e){
		e.preventDefault();
		var comment_input = $(this).closest(".comment-input");
		var input = comment_input.find(".comment-item-content");
		alert(input.val().replace("/\n/g","<br/>"));
		$(".comment-item-content").html(input.val().replace("/\n/g","<br/>"));
	
	});
	
});

function slideshow_initial(){
	generate_sub_items();
	
	change_index();
	
	var timer = setInterval(slide_progress_update,slide_show_time_delay);
	$('.my-slide').mouseover(function(){

		window.clearInterval(timer);
	});
	$('.my-slide').mouseleave(function(){
		timer = setInterval(slide_progress_update,slide_show_time_delay);
	
	});
	
	$('.slide-button').click(function(){
		
		reset_slide_progress();
		
	});
	$('.slide-button-left').click(function(){
		
		change_index(0);
	});
	$('.slide-button-right').click(function(){
		
		change_index(1);
	});
	$('.slide-sub-item-text').click(function(){
		var index=$(this).attr('index');
		change_index_to(index);
		
	});
}
function generate_sub_items(){
	$('li.slide-item').each(function(){
		var index = $(this).attr('index');
		var image_src = $(this).children('a').children('img').attr('src');
		
		 var item = "<div class='slide-sub-item-text'  index='"+index+"'><div class='slide-sub-item-img' style='background-image:url("+image_src+")' ></div></div>";

		$('.my-slide-footer').append(item);
	
	});
	
}
function reset_slide_progress(){
	$('div.my-slide-progress-value').width(0);
}
function slide_progress_update(){
	
	var slide_progress_max_val=$('section.my-slide-progress-bar').width();
	var slide_progress_gap_val = slide_progress_max_val*0.001;
	var width = $('div.my-slide-progress-value').width();
	width +=slide_progress_gap_val;
	
	if(width<slide_progress_max_val)
		 $('div.my-slide-progress-value').width(width);
	else{
		 $('div.my-slide-progress-value').width(0);
		change_index(1);
	}
	
	
}
function change_index(flag){
	if(flag==1)
		$('.slide-item:first-of-type').appendTo($('.my-slide-body ul'));
	else
		$('.slide-item:last-of-type').prependTo($('.my-slide-body ul'));
		
	$('.slide-item').removeClass('slide-item-active');
	$('.slide-item:first-of-type').addClass('slide-item-active');
	var index = $('.slide-item:first-of-type').attr('index');	
	$('.slide-sub-item-text').removeClass('slide-sub-item-text-activated');
	$('.slide-sub-item-text[index="'+index+'"]').addClass('slide-sub-item-text-activated');

	
	
}

function change_index_to(new_index){

	
	var start_flag=0;
	$('.slide-item').each(function(){
		var cur_index = $(this).attr('index');
		if(start_flag==1){
			$(this).prependTo($('.my-slide-body ul'));
			
		}else if(cur_index == new_index){
			$(this).appendTo($('.my-slide-body ul'));
			start_flag = 1;
		}
		
	});
	reset_slide_progress();
	change_index(0);
	
}
function main_menu_initial(){
	
	$("li.menu-item").each(function(){
		
		var max_width = 0;
		var max_heignt = 0;
		var children_counter = $(this).children('ul').children('li').size();
	
		if(children_counter > 0 ){
			
			max_heignt += 10;
		}
		
		if(children_counter <= menu_item_per_col){
			
			max_heignt += (menu_item_height * children_counter);
		
		} else if(Math.ceil((children_counter/menu_item_per_col))==2){
			
			max_heignt += (children_counter/2) * menu_item_height;
			
		} else {
			
			max_heignt += (Math.ceil((children_counter/3)) * menu_item_height);
			
		}
		
		
		$(this).mouseenter(function(){
		
			$(this).children('ul').css('height',max_heignt+"px");
			$(this).children('ul').css('padding-top',"10px");
			
		}).mouseleave(function(){
			$(this).children('ul').css('height',"0px");
			$(this).children('ul').css('padding-top',"0px");
		});
		
		
		$(this).children('ul').children('li').each(function(){
			
			var new_width = parseInt($(this).children('a').width());
		
			if(new_width>max_width){
				
				max_width = new_width;
			}
			
		});
	
		max_width +=((max_width*30)/100)+20;
		
		$(this).children('ul').children('li').width(max_width);
		
		var col_counter = Math.ceil((children_counter/menu_item_per_col));

		if(col_counter == 2){
		
				max_width*=2;
			
		} else if(col_counter>=3){
			
				max_width*=3;
				
		}
	
		$(this).children('ul').width(max_width);
		
	});
	
	$(document).scroll(function(e) {
			var curr = $(document).scrollTop();
			
			if(curr > 80){
				if($('.menu-scroll-button').hasClass('rotate-180-deg')){
					
					$('.top-box').addClass('menu-move-up').removeClass('menu-move-down');
					
					$('.menu-scroll-button').addClass('.rotate-180-deg').css('opacity','1');
					
				}else{
					$('.top-box').addClass('menu-move-down').removeClass('menu-move-up');
					$('.menu-scroll-button').remove('.rotate-180-deg').css('opacity','1');
				}
				$('.top-box').removeClass('menu-background-display');
			}
			else{
				
				$('.top-box').addClass('menu-move-down').removeClass('menu-move-up');
				$('.menu-scroll-button').addClass('.rotate-180-deg').css('opacity','0');
				$('.top-box').addClass('menu-background-display');
			}
			
			
		});
		$('.menu-scroll-button').click(function(){
			if($(this).css('opacity') != "0"){
				
				if($(this).hasClass('rotate-180-deg')){
					$('.top-box').addClass('menu-move-down').removeClass('menu-move-up');
					$(this).removeClass('rotate-180-deg');
					
				}else{
					$('.top-box').addClass('menu-move-up').removeClass('menu-move-down');
					$(this).addClass('rotate-180-deg');
					
				}
					
				
			}
				
		});
	
}

(function($) {

	$.fn.initCollapse = function(){
	

		
		var children = $(this).find(".collapsable[collParent]");
		var uncollapsable ;
		var collapsable = new Array();
		children.each(function(index,obj){
			var name = $(this).attr("collParent");
			var content = $(this).find(".collapse-content[collParent='"+name+"']");
			var height = $(content).height();
		
			if((height-20) > 50){
				collapsable.push($(this));
				//$(this).attr("canCollapse","");
				//$(this).attr("collapsed","");
		
			}
			else{
				
				$(this).removeAttr("canCollapse");
				var bt = $(this).find(".collapse[collParent='"+name+"']");
				bt.remove();
			}
				
		});
		
		$(collapsable).each(function(){
			$(this).attr("canCollapse","");
			$(this).attr("collapsed","");
		});
		
		$(this).find(".collapse").click(function(e){
			e.preventDefault();
			var parent = $(this).closest(".collapsable");
			var attr = parent.attr("collapsed");
			var content = parent.find(".collapse-content").eq(0);
			var height = $(content).height();
			
	
			if (typeof attr !== typeof undefined && attr !== false){
		
				parent.removeAttr("collapsed");
			}
			else
				parent.attr("collapsed","");
			var bottom = parent.offset().top + parent.height() - 300;

			//$("body").animate({scrollTop: bottom },'slow');
			
			
			
		
		});
	
	}
	$.fn.videoPlayer = function() {
		
		return this.each(function() {	
		
			var media = $(this).find("video")[0];
			
			//alert($(media).attr("src"));
			/*$(media).on("loadstart",function(){
				alert("loadstart");
			});
			$(media).on("durationchange",function(){
				alert("durationchange");
			});
			$(media).on("loadedmetadata",function(){
				alert("loadedmetadata");
			});
			$(media).on("loadeddata",function(){
				alert("loadeddata");
			});
			$(media).on("progress",function(){
				alert("progress");
			});
			$(media).on("canplay",function(){
				alert("canplay");
			});
			$(media).on("canplaythrough",function(){
				alert("canplaythrough");
			});*/
			
			$(media).on('durationchange', function() {
				//	alert("loadstart");
				// Basic Variables 
				var $this = $(this);
				var $settings = settings;
				
				// Wrap the video in a div with the class of your choosing
				$this.wrap('<div class="'+$settings.videoClass+'"></div>');
				
			
				// Select the div we just wrapped our video in for easy selection.
				var $that = $this.parent('.'+$settings.videoClass);
				
				// The Structure of our video player
				{
				
				$( '<div class="control-bar">'
				     + '<div class="play-pause play">'
				       + '<span class="play-button">&#9658;</span>'
				       + '<div class="pause-button">'
				         + '<span> </span>'
					         + '<span> </span>'
				       + '</div>'
				     + '</div>'
				     + '<div class="progress">'
				       + '<div class="progress-bar">'
				         + '<div class="button-holder">'
				           + '<div class="progress-button"> </div>'
				         + '</div>'
				       + '</div>'
				       + '<div class="time">'
				         + '<span class="ctime">00:00</span>' 
				         + '<span class="stime"> / </span>'
				         + '<span class="ttime">00:00</span>'
				       + '</div>'
				     + '</div>'
				     + '<div class="volume">'
				       + '<div class="volume-holder">'
				         + '<div class="volume-bar-holder">'
				           + '<div class="volume-bar">'
				             + '<div class="volume-button-holder">'	
				               + '<div class="volume-button"> </div>'
				             + '</div>'
				           + '</div>'
				         + '</div>'
				       + '</div>'
				       + '<div class="volume-icon v-change-0">'
				         + '<span> </span>'
				       + '</div>'
				     + '</div>'
				     + '<div class="fullscreen"> '
				       + '<a href="#"> </a>'
				     + '</div>'
				   + '</div>').appendTo($that);
				
				}
				
				
				// Width of the video
				$videoWidth = $this.width();
				$that.width($videoWidth+'px');
				
				// Set width of the player based on previously noted settings
				$that.find('.player').css({'width' : ($settings.playerWidth*100)+'%', 'left' : ((100-$settings.playerWidth*100)/2)+'%'});
				
				
				// Video information
				var $spc = $(this)[0], // Specific video
					$duration = $spc.duration, // Video Duration
					$volume = $spc.volume, // Video volume
					currentTime;
				
				// Some other misc variables to check when things are happening
				var $mclicking = false, 
				    $vclicking = false, 
				    $vidhover = false,
				    $volhover = false, 
				    $playing = false, 
				    $drop = false,
				    $begin = false,
				    $draggingProgess = false,
				    $storevol,	
				    x = 0, 
				    y = 0, 
				    vtime = 0, 
				    updProgWidth = 0, 
				    volume = 0;
				    
				// Setting the width, etc of the player
				var $volume = $spc.volume;
				
				// So the user cant select text in the player
				$that.bind('selectstart', function() { return false; });
						
				// Set some widths
				var progWidth = $that.find('.progress').width();
				

				var bufferLength = function() {
				
					// The buffered regions of the video
					var buffered = $spc.buffered;
					
					// Rest all buffered regions everytime this function is run
					$that.find('[class^=buffered]').remove();
					
					// If buffered regions exist
					if(buffered.length > 0) {
							
						// The length of the buffered regions is i
						var i = buffered.length;
							
						while(i--) {
							// Max and min buffers
							$maxBuffer = buffered.end(i);
							$minBuffer = buffered.start(i);
									
							// The offset and width of buffered area				
							var bufferOffset = ($minBuffer / $duration) * 100;			
							var bufferWidth = (($maxBuffer - $minBuffer) / $duration) * 100;
											
							// Append the buffered regions to the video
							$('<div class="buffered"></div>').css({"left" : bufferOffset+'%', 'width' : bufferWidth+'%'}).appendTo($that.find('.progress'));
							
						}
					}
				} 
				
				// Run the buffer function
				bufferLength();
				
				// The timing function, updates the time.
				var timeUpdate = function($ignore) {
					
					// The current time of the video based on progress bar position
					var time = Math.round(($('.progress-bar').width() / progWidth) * $duration);
					
					// The 'real' time of the video
					var curTime = $spc.currentTime;
					
					// Seconds are set to 0 by default, minutes are the time divided by 60
					// tminutes and tseconds are the total mins and seconds.
					var seconds = 0,
						minutes = Math.floor(time / 60),
						tminutes = Math.round($duration / 60),
						tseconds = Math.round(($duration) - (tminutes*60));
					
					// If time exists (well, video time)
					if(time) {
						// seconds are equal to the time minus the minutes
						seconds = Math.round(time) - (60*minutes);
						
						// So if seconds go above 59
						if(seconds > 59) {
							// Increase minutes, reset seconds
							seconds = Math.round(time) - (60*minutes);
							if(seconds == 60) {
								minutes = Math.round(time / 60); 
								seconds = 0;
							}
						}
						
					} 
					
					// Updated progress width
					updProgWidth = (curTime / $duration) * progWidth
					
					// Set a zero before the number if its less than 10.
					if(seconds < 10) { seconds = '0'+seconds; }
					if(tseconds < 10) { tseconds = '0'+tseconds; }
					
					// A variable set which we'll use later on
					if($ignore != true) {
						$that.find('.progress-bar').css({'width' : updProgWidth+'px'});
						$that.find('.progress-button').css({'left' : (updProgWidth-$that.find('.progress-button').width())+'px'});
					}
					
					// Update times
					$that.find('.ctime').html(minutes+':'+seconds) 
					$that.find('.ttime').html(tminutes+':'+tseconds);
				
					// If playing update buffer value
					if($spc.currentTime > 0 && $spc.paused == false && $spc.ended == false) {
						bufferLength();
					}
					
				}
				
				// Run the timing function twice, once on init and again when the time updates.
				timeUpdate();
				$spc.addEventListener('timeupdate', timeUpdate);
								
				// When the user clicks play, bind a click event	
				$that.find('.play-pause').bind('click', function() {
					
					// Set up a playing variable
					if($spc.currentTime > 0 && $spc.paused == false && $spc.ended == false) {
						$playing = false;
					} else { $playing = true; }
					
					// If playing, etc, change classes to show pause or play button
					if($playing == false) {
						$spc.pause();
						$(this).addClass('play').removeClass('pause');
						bufferLength();
					} else {
						$begin = true;
						$spc.play();
						$(this).addClass('pause').removeClass('play');
					} 				
					
				});
				
				
				// Bind a function to the progress bar so the user can select a point in the video
				$that.find('.progress').bind('mousedown', function(e) {
					
					// Progress bar is being clicked
					$mclicking = true;
					
					// If video is playing then pause while we change time of the video
					if($playing == true) {
						$spc.pause();
					}
					
					// The x position of the mouse in the progress bar 
					x = e.pageX - $that.find('.progress').offset().left;
					
					// Update current time
					currentTime = (x / progWidth) * $duration;
					
					$spc.currentTime = currentTime;
					
				});
				
				// When the user clicks on the volume bar holder, initiate the volume change event
				$that.find('.volume-bar-holder').bind('mousedown', function(e) {
					
					// Clicking of volume is true
					$vclicking = true;
					
					// Y position of mouse in volume slider
					y = $that.find('.volume-bar-holder').height() - (e.pageY - $that.find('.volume-bar-holder').offset().top);
					
					// Return false if user tries to click outside volume area
					if(y < 0 || y > $(this).height()) {
						$vclicking = false;
						return false;
					}
					
					// Update CSS to reflect what's happened
					$that.find('.volume-bar').css({'height' : y+'px'});
					$that.find('.volume-button').css({'top' : (y-($that.find('.volume-button').height()/2))+'px'});
					 
					// Update some variables
					$spc.volume = $that.find('.volume-bar').height() / $(this).height();
					$storevol = $that.find('.volume-bar').height() / $(this).height();
					$volume = $that.find('.volume-bar').height() / $(this).height();
					
					// Run a little animation for the volume icon.
					volanim();
					
				});
				
				// A quick function for binding the animation of the volume icon
				var volanim = function() {
				
					// Check where volume is and update class depending on that.
					for(var i = 0; i < 1; i += 0.1) {
									
						var fi = parseInt(Math.floor(i*10)) / 10;
						var volid = (fi * 10)+1;
						
						if($volume == 1) {
							if($volhover == true) {
								$that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-11');
							} else {
								$that.find('.volume-icon').removeClass().addClass('volume-icon v-change-11');
							}
						}
						else if($volume == 0) {
							if($volhover == true) {
								$that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-1');
							} else {
								$that.find('.volume-icon').removeClass().addClass('volume-icon v-change-1');
							}
						}
						else if($volume > (fi-0.1) && volume < fi && !$that.find('.volume-icon').hasClass('v-change-'+volid)) {
							if($volhover == true) {
								$that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-'+volid);	
							} else {
								$that.find('.volume-icon').removeClass().addClass('volume-icon v-change-'+volid);	
							}
						}		
						
					}
				}
				// Run the volanim function
				volanim();
				
				// Check if the user is hovering over the volume button
				$that.find('.volume').hover(function() {
					$volhover = true;
				}, function() {
					$volhover = false;
				});
				
				
				// For usability purposes then bind a function to the body assuming that the user has clicked mouse
				// down on the progress bar or volume bar
				$('body, html').bind('mousemove', function(e) {
					
					// Hide the player if video has been played and user hovers away from video
					if($begin == true) {
						$that.hover(function() {
							$that.find('.player').stop(true, false).animate({'opacity' : '1'}, 0.5);
						}, function() {
							$that.find('.player').stop(true, false).animate({'opacity' : '0'}, 0.5);
						});
					}
					
					// For the progress bar controls
					if($mclicking == true) {	
						
						// Dragging is happening
						$draggingProgress = true;
						// The thing we're going to apply to the CSS (changes based on conditional statements);
						var progMove = 0;
						// Width of the progress button (a little button at the end of the progress bar)
						var buttonWidth = $that.find('.progress-button').width();
						
						// Updated x posititon the user is at
						x = e.pageX - $that.find('.progress').offset().left;
						
						// If video is playing
						if($playing == true) {
							// And the current time is less than the duration				
							if(currentTime < $duration) {		
								// Then the play-pause icon should definitely be a pause button 
								$that.find('.play-pause').addClass('pause').removeClass('play');
							}
						}
						
						
						if(x < 0) { // If x is less than 0 then move the progress bar 0px
							progMove = 0;
							$spc.currentTime = 0;
						} 
						else if(x > progWidth) { // If x is more than the progress bar width then set progMove to progWidth
							$spc.currentTime = $duration;
							progMove = progWidth;	
						}
						else { // Otherwise progMove is equal to the mouse x coordinate
							progMove = x;
							currentTime = (x / progWidth) * $duration;
							$spc.currentTime = currentTime;	
						}
						
						// Change CSS based on previous conditional statement
						$that.find('.progress-bar').css({'width' : $progMove+'px'});
						$that.find('.progress-button').css({'left' : ($progMove-buttonWidth)+'px'});
						
					}
					
					// For the volume controls
					if($vclicking == true) {	
						
						// The position of the mouse on the volume slider
						y = $that.find('.volume-bar-holder').height() - (e.pageY - $that.find('.volume-bar-holder').offset().top);
						
						// The position the user is moving to on the slider.
						var volMove = 0;
						
						// If the volume holder box is hidden then just return false
						if($that.find('.volume-holder').css('display') == 'none') {
							$vclicking = false;
							return false;
						}
						
						// Add the hover class to the volume icon
						if(!$that.find('.volume-icon').hasClass('volume-icon-hover')) {
							$that.find('.volume-icon').addClass('volume-icon-hover');
						}
						
						
						if(y < 0 || y == 0) { // If y is less than 0 or equal to 0 then volMove is 0.
							
							$volume = 0; 
							volMove = 0;
							
							$that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-11');
							
						} else if(y > $(this).find('.volume-bar-holder').height() || (y / $that.find('.volume-bar-holder').height()) == 1) { // If y is more than the height then volMove is equal to the height
							
							$volume = 1; 
							volMove = $that.find('.volume-bar-holder').height();
							
							$that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-1');
							
						} else { // Otherwise volMove is just y
						
							$volume = $that.find('.volume-bar').height() / $that.find('.volume-bar-holder').height();
							volMove = y;
							
						}
					
						// Adjust the CSS based on the previous conditional statmeent
						$that.find('.volume-bar').css({'height' : volMove+'px'});
						$that.find('.volume-button').css({'top' : (volMove+$that.find('.volume-button').height())+'px'});
						
						// Run the animation function
						volanim();
						
						// Change the volume and store volume
						// Store volume is the volume the user last had in place
						// in case they want to mute the video, unmuting will then
						// return the user to their previous volume.
						$spc.volume = $volume;
						$storevol = $volume;
						
						
					}
					
					// If the user hovers over the volume controls, then fade in or out the volume
					// icon hover class
					
					if($volhover == false) {
						
						$that.find('.volume-holder').stop(true, false).fadeOut(100);
						$that.find('.volume-icon').removeClass('volume-icon-hover');	
						
					}
					
					else {
						$that.find('.volume-icon').addClass('volume-icon-hover');
						$that.find('.volume-holder').fadeIn(100);			
					}
					
						
				})	
				
				// When the video ends the play button becomes a pause button
				$spc.addEventListener('ended', function() {
					
					$playing = false;
					
					// If the user is not dragging
					if($draggingProgress == false) {
						$that.find('.play-pause').addClass('play').removeClass('pause');
					}
					
				});
				
				// If the user clicks on the volume icon, mute the video, store previous volume, and then
				// show previous volume should they click on it again.
				$that.find('.volume-icon').bind('mousedown', function() {
					
					$volume = $spc.volume; // Update volume
					
					// If volume is undefined then the store volume is the current volume
					if(typeof $storevol == 'undefined') {
						 $storevol = $spc.volume;
					}
					
					// If volume is more than 0
					if($volume > 0) {
						// then the user wants to mute the video, so volume will become 0
						$spc.volume = 0; 
						$volume = 0;
						$that.find('.volume-bar').css({'height' : '0'});
						volanim();
					}
					else {
						// Otherwise user is unmuting video, so volume is now store volume.
						$spc.volume = $storevol;
						$volume = $storevol;
						$that.find('.volume-bar').css({'height' : ($storevol*100)+'%'});
						volanim();
					}
					
					
				});
				
				
				// If the user lets go of the mouse, clicking is false for both volume and progress.
				// Also the video will begin playing if it was playing before the drag process began.
				// We're also running the bufferLength function
				$('body, html').bind('mouseup', function(e) {
					
					$mclicking = false;
					$vclicking = false;
					$draggingProgress = false;
					
					if($playing == true) {	
						$spc.play();
					}
					
					bufferLength();
					
					
				});
				
				// Check if fullscreen supported. If it's not just don't show the fullscreen icon.
				if(!$spc.requestFullscreen && !$spc.mozRequestFullScreen && !$spc.webkitRequestFullScreen) {
					$('.fullscreen').hide();
				}
				
				// Requests fullscreen based on browser.
				$('.fullscreen').click(function() {
				
					if ($spc.requestFullscreen) {
						$spc.requestFullscreen();
					}
				
					else if ($spc.mozRequestFullScreen) {
						$spc.mozRequestFullScreen();
					}
					
					else if ($spc.webkitRequestFullScreen) {
						$spc.webkitRequestFullScreen();
					}
				
				});
				
				
				
			});
			
		});
	
	}
	
})(jQuery);




