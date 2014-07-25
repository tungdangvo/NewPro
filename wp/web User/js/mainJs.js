var menu_item_per_col = 6;
var sub_menu_padding = 20;
var menu_item_height = 30;

var slide_show_time_delay = 5;

$('document').ready(function(){

	main_menu_initial();
	slideshow_initial();
	
	
		
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