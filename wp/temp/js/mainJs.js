var menu_item_per_col = 6;
var sub_menu_padding = 20;
var menu_item_height = 30;

var slide_show_time_delay = 5;

$('document').ready(function(){

	main_menu_initial();
	slideshow_initial();
	playingPlaylistInit();

	
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
function playingPlaylistInit() {

    var playing_items = $(".horizontal-music-list .item .ranking-number");
    var nextbt = $(".control-bar .control-wrapper .next");
    var previousbt = $(".control-bar .control-wrapper .previous");

    //first init
    changeSongInPlaylist(0);

    //on items selected
    playing_items.each(function (index, obj) {
        $(this).on("click", function () {
       
            changeSongInPlaylist(index);

        });


    });
    //on nextbt clicked
    nextbt.on("click", function () {
        playNextSong();
    });
    previousbt.on("click", function () {
        playPrevSong();
    });

}


function playNextSong() {
    var order = 0;
    $(".horizontal-music-list .item").each(function (index, obj) {
        if ($(this).hasClass("playing")) {
            order = index + 1;
        }
    });
    if (order > $(".horizontal-music-list .item").size() - 1)
        order = 0;
    changeSongInPlaylist(order);
}

function playPrevSong() {
    var order = 0;
    $(".horizontal-music-list .item").each(function (index, obj) {
        if ($(this).hasClass("playing")) {
            order = index - 1;
        }
    });
    if (order < 0)
        order = $(".horizontal-music-list .item").size() - 1;
    changeSongInPlaylist(order);
}

function changeSongInPlaylist(num) {

    var mediaPlayer = $('.media-player');
    var media = mediaPlayer.find("video")[0];
    var item = $(".horizontal-music-list .item").eq(num);
    var src = item.attr("src");
    $(".horizontal-music-list .item").removeClass("playing");
    item.addClass("playing");
    media.src = src;
    media.load();
    media.play();

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

		    var mediaPlayer = $(this);
			var media = $(this).find("video")[0];

			var controlBar = $(this).find(".control-bar");
			var playPause = controlBar.find(".play-pause");
			var fullscreen = controlBar.find(".fullscreen");
			var videoLoading = $(this).find(".video-loading");
			var progress = controlBar.find(".progress");
			var timeHolder = controlBar.find(".time");
			var currentTimeTextHolder = timeHolder.find(".ctime");
			var totalTimeTextHolder = timeHolder.find(".ttime");
			var playingProgress = progress.find(".play-progress");
			var loadingProgress = progress.find(".load-progress");
			var volBox = controlBar.find(".volume");
			var volProgress = volBox.find(".volume-holder");
			var volNode = volProgress.find(".volume-node");



		    //Time format converter - 00:00
			var timeFormat = function (seconds) {
			    var m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
			    var s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
			    return m + ":" + s;
			};
		
		    //video waiting for more data event
			$(media).on('waiting', function () {
			    videoLoading.css({ "display": "block" });
			});
		    //VIDEO PROGRESS BAR
		    //when video timebar clicked
			var timeDrag = false;	/* check for drag event */
			progress.on('mousedown', function (e) {
			    timeDrag = true;
			    updatebar(e.pageX);
			});
			$(document).on('mouseup', function (e) {
			    if (timeDrag) {
			        timeDrag = false;
			        updatebar(e.pageX);
			    
			    }
			});
			$(document).on('mousemove', function (e) {
			    if (timeDrag) {
			        updatebar(e.pageX);
			    }
			});
			var updatebar = function (x) {
			    var progress = $('.progress');

			    //calculate drag position
			    //and update video currenttime
			    //as well as progress bar
			    var maxduration = media.duration;
			    var position = x - progress.offset().left;
			    var percentage = 100 * position / progress.width();
			    if (percentage > 100) {
			        percentage = 100;
			    }
			    if (percentage < 0) {
			        percentage = 0;
			    }
			    media.currentTime = maxduration * percentage / 100;
			    updatePlayingProgress();
			};

		    //VOLUME BAR
		    //volume bar event
			var volumeDrag = false;
			volProgress.on('mousedown', function (e) {
			    volumeDrag = true;
			    media.muted = false;
			    volBox.removeClass('icon-volume-mute2');
			    updateVolume(e.pageX);
			});
			$(document).on('mouseup', function (e) {
			    if (volumeDrag) {
			        volumeDrag = false;
			        updateVolume(e.pageX);
			    }
			});
			$(document).on('mousemove', function (e) {
			    if (volumeDrag) {
			        updateVolume(e.pageX);
			    }
			});
			var updateVolume = function (x) {

			    var percentage;
			    //if only volume have specificed
			    //then direct update volume

			    var position = x - volProgress.offset().left;
			    percentage = 100 * position / volProgress.width();
			    

			    if (percentage > 100) {
			        percentage = 100;
			    }
			    if (percentage < 0) {
			        percentage = 0;
			    }

			    //update volume bar and video volume

			    media.volume = percentage / 100;
			    updateVolUI();
			    

			};
			var updateVolUI = function () {
			    var pos = (media.volume * 100);
			    if(media.volume ==1)
			     pos-= ((15 / volProgress.width()) * 100);
			    volNode.css('left',pos + '%');
			  

			    //change sound icon based on volume
			    if (media.volume == 0) {
			        volBox.removeClass('icon-volume-low').removeClass('icon-volume-high').removeClass('icon-volume-medium').addClass('icon-volume-mute2');
			    }
			    else if (media.volume <= 0.2 && media.volume > 0) {
			        volBox.addClass('icon-volume-low').removeClass('icon-volume-high').removeClass('icon-volume-medium').removeClass('icon-volume-mute2');
			    }
			    else if (media.volume <= 0.6 && media.volume > 0.2) {
			        volBox.removeClass('icon-volume-low').removeClass('icon-volume-high').addClass('icon-volume-medium').removeClass('icon-volume-mute2');

			    } else {

			        volBox.removeClass('icon-volume-low').addClass('icon-volume-high').removeClass('icon-volume-medium').removeClass('icon-volume-mute2');

			    }

			}
            /////////////////////////
		

		    ///Function for updating the loading progrss bar

			function updateLoadingProgress() {
			    var currentPart = current_bufferring(media.currentTime);
			    if (currentPart >= 0 || typeof currentPart !== "undefined") {
                   
			        var end = media.buffered.end(currentPart);

			        var percentage = (end / media.duration) * 100;

			        loadingProgress.css('width', percentage + '%');

			    }
			}

			function current_bufferring(currentTime) {

			    var i = media.buffered.length - 1;

			    while (i >= 0) {
			        if (currentTime >= media.buffered.start(i) && currentTime <= media.buffered.end(i))
			            return i;
			        i--;
			    }
			}


			$(media).on("progress", function () {
                
			    updateLoadingProgress();

			});
		    ////////////////////////
			function updatePlayingProgress() {
			    var pos = (media.currentTime/media.duration) * 100;
			    playingProgress.css("left", "0px");
			    playingProgress.css("width", pos + "%");
			 
			    currentTimeTextHolder.html(timeFormat(media.currentTime));
			    totalTimeTextHolder.html(timeFormat(media.duration));
			}

			$(media).on("timeupdate", function () {

			    updatePlayingProgress();

			});
            ///////////////
			function changePlayPauseUI() {
			    if (media.paused) {
			     
			        playPause.addClass("icon-play2");
			        playPause.removeClass("icon-pause");
			    } else if (media.played) {
			      
			        playPause.removeClass("icon-play2");
			        playPause.addClass("icon-pause");
			    } else if (media.ended) {
			       

			        playPause.addClass("icon-play2");
			        playPause.removeClass("icon-pause");
			    }
			}

			playPause.on("click",function(){
			    //alert("play clicked !");
			    if (media.paused) {
			        media.play();
			    } else if (media.played) {
			        media.pause();
			    } else if (media.ended) {
			        media.play();
			    }
			    changePlayPauseUI();
					
				
			});

			$(media).on("play", function () {
			    changePlayPauseUI();
			});
			$(media).on("pause", function () {
			    changePlayPauseUI();
			});
			$(media).on("ended", function () {
			    playPause.addClass("icon-play2");
			    playPause.removeClass("icon-pause");
			    playNextSong();
			});
			
			function fullscreenChange(element) {
			    if (
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement ||
                    document.msFullscreenElement
                    ) {
			        fullscreen.removeClass("icon-contract").addClass("icon-expand");
			        if (document.exitFullscreen) {
			            document.exitFullscreen();
			        } else if (document.webkitExitFullscreen) {
			            document.webkitExitFullscreen();
			        } else if (document.mozCancelFullScreen) {
			            document.mozCancelFullScreen();
			        } else if (document.msExitFullscreen) {
			            document.msExitFullscreen();
			        }
			    } else {
			        fullscreen.addClass("icon-contract").removeClass("icon-expand");
			        if (element.requestFullscreen) {
			            element.requestFullscreen();
			        } else if (element.mozRequestFullScreen) {
			            element.mozRequestFullScreen();
			        } else if (element.webkitRequestFullscreen) {
			            element.webkitRequestFullscreen();
			        } else if (element.msRequestFullscreen) {
			            element.msRequestFullscreen();
			        }




			    }
			}

			fullscreen.on("click",function(){
			

				
				var element = document.getElementById("player");
				fullscreenChange(element);


			});

			$(media).on("canplay",function(){
				videoLoading.css({"display":"none"});
			});
			$(media).on("seeking",function(){
				videoLoading.removeAttr("style");
			});
			
			$(media).on('loadedmetadata', function () {
			    videoLoading.css({ "display": "none" });
			    updateVolUI();
			    updateLoadingProgress();
			    updatePlayingProgress();

			});


			
		});
	
	}
	
})(jQuery);




