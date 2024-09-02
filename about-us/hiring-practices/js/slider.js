jQuery(document).ready(function($){
	//
	var Slider = function (element){
			//element = $(element);
			this.currentSlide = 0;
			this.$container = element;
			this.animating = false;
			this.$slide = element.find('ul li.slide');
			this.$numberCount = element.find('span.number-count');
			this.total = this.$slide.length;
			this.$buttons = element.find('.slider-btns .slide-button');
			this.$nav = element.find('ul.slider-buttons');
			this.auto = element.hasClass('auto');
			this.timer = null;
			this.currentSlideTime = 7000;
			// display first slide at start
			this.$slide.eq(this.currentSlide).addClass('active').fadeTo('fast',1,function(){});
			this.init();
	}
	Slider.prototype = {
		init: function(){
			var self = this;
			this.navigation();
			var thisSlideTime = self.$slide.eq(self.currentSlide).data('slidetime');
			if(this.auto){
				this.slideTimer(thisSlideTime);	
				this.startStop();
			}
			self.$numberCount.html('1/'+self.total);
		},
		_showSlide: function(index){
			var self = this;
			if(self.auto){
				clearInterval( self.timer );
				self.timer = null;
			}
			self.$slide.fadeTo('slow',0).promise().done(function(){
						self.$slide.removeClass('active');
						self.$buttons.removeClass('active');
						self.$buttons.eq(self.currentSlide).addClass('active');
						self.$slide.eq(self.currentSlide).addClass('active').animate({opacity:1}, {'duration':'slow', queue:false , complete:function(){
							self.animating = false;
							var slideNum = self.currentSlide + 1;
							self.$numberCount.html(slideNum+'/'+self.total);
							if(self.auto){
								self.slideTimer(self.$slide.eq(self.currentSlide).data('slidetime'));
							}
						}});
					});
		},
		navigation: function(){
			var self = this;
			self.$nav.find('.slider-button').click(function(){
				if(!self.animating){
					self.animating = true;
					self.currentSlide = $(this).index();
					self._showSlide(self.currentSlide);
				}
			});
			// left arrow
			self.$nav.find('.slider-button-left').click(function(e){
				e.preventDefault();
				// resets all videos
				//$('iframe').attr('src', $('iframe').attr('src'));
				// pause all videos
				if(!self.animating){
					self.animating = true;
					self.currentSlide--;
					if(self.currentSlide < 0){
						self.currentSlide = self.total - 1 ;
					}
					self._showSlide(self.currentSlide);
				}
				return false;
			});
			// right arrow
			self.$nav.find('.slider-button-right').click(function(e){
				e.preventDefault();
				if(!self.animating){
					self.animating = true;
					self.currentSlide++;
					if(self.currentSlide >= self.total){
						self.currentSlide = 0 ;
					}
					self._showSlide(self.currentSlide);
				}
				return false;
			});
		},
		slideTimer: function(time){
			var self = this;	
			
			//console.log(time);
			self.timer = setInterval(function() {
				self.currentSlide++; // Increments the slide
				if( self.currentSlide == self.total ) {
					self.currentSlide = 0; // Resets the slide
				}
				self._showSlide();
			}, time);
		},
		startStop: function(){
			var self = this;	
			self.$slide.hover(function(){
				// pause timer
				clearInterval( self.timer );
				self.timer = null;
			},function(){
				// restart timer
				self.slideTimer(self.$slide.eq(self.currentSlide).data('slidetime'));
			});	
		}
		
	};
	//
	// construct slider objects and resize to set tallest slide height
	//
		var sliders = {};
		$('.slider').each(function(index, element) {
            sliders['slider'+index] = new Slider($(element));
        });
		$(window).resize(function(){
		// for each slider: update the height of the slide holder
			$('.slider').each(function(index, element){
				var maxHeight = 0;
				$(this).find('ul.slider-texts li.slide').each(function(index, element){
					maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
				});
				$(this).find('ul.slider-texts').css({'min-height':maxHeight});	
			});
		}).trigger('resize');
    //
	$('.one-time.testimonial-slider').slick({
	    dots: true,
	    infinite: true,
	    speed: 300,
	    slidesToShow: 1,
	    adaptiveHeight: true,
		arrows: true,
		autoplay: true,
  		autoplaySpeed: 8000,
		pauseOnHover: true,
		prevArrow: '<svg class="prev" xmlns="http://www.w3.org/2000/svg" width="50.1" height="52.9"><path class="inner" fill="#228696" d="M31.334 26.328l9.334-9.333 9.334 9.333-9.334 9.334z"/><path class="outer" d="M45.2 7.5L37.4 0 11.7 26.2 37.4 53l8.1-8.1-19-19L45.2 7.5z" fill="#00dfea"/></svg>',
		
		nextArrow: '<svg class="next" xmlns="http://www.w3.org/2000/svg" width="38.3" height="52.9"><path class="inner" fill="#228696" d="M-.056 26.35l9.334-9.333 9.333 9.334-9.333 9.333z"/><path class="outer" d="M4.9 7.5L12.6 0l25.7 26.2-25.7 26.7-8.1-8.1 19-19L4.9 7.5z" fill="#00dfea"/></svg>',
	});
	$('ul.slick-dots li button').empty();
});