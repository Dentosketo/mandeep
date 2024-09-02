jQuery(document).ready(function($){
	//
	$(document).on('click','nav li.menu-item-has-children > a',function(e){
		e.preventDefault();
		var open = $(this).parent('li').hasClass('show');
		if(open){
			//close it
			$(this).parent('li').removeClass('show');
		}else{
			//check for sub menu click
			var subClick = $(this).parent('li').parent('ul').hasClass('sub-menu');
			if(!subClick){
				$('li.menu-item-has-children').removeClass('show');
			}
			// open it
			$(this).parent('li').addClass('show');
		}
		return false;
	});
	//
	$("#mobile-icon").click(function(e){
		e.preventDefault();
		console.log('clicked');
		var open = $(this).hasClass('is-open');
		if(open){
			$(this).removeClass('is-open');
			$('nav#mobile').removeClass('is-open');
		}else{
			$(this).addClass('is-open');
			$('nav#mobile').addClass('is-open');
		}
	});
	//
	var search_icon = '<svg id="searchIcon" data-name="searchIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"  x="0px" y="0px"><path d="M29.54,26.71l-9.48-9.48a11,11,0,1,0-2.83,2.83l9.48,9.48ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" class="svg-fill"/></svg>';
	$('ul#menu-secondary-menu li.search-open a').after(search_icon);
	//
	$('.drop-archive h2.widget-title').click(function(e){
		//console.log('clicked');
		if($(this).hasClass('show')){
			$(this).removeClass('show');
		}else{
			$('.drop-archive h2.widget-title').removeClass('show');
			$(this).addClass('show');
		}
	});
	$('.search-open').click(function(e){
		e.preventDefault();
		$('#primary-search').slideToggle();
		return false;
	});
});