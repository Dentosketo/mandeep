jQuery(document).ready(function($){
	// $ code here
	const faders_left = gsap.utils.toArray('.fade-left');
	faders_left.forEach(fade_left => {
	  gsap.from(fade_left, { 
		x: -50,
		opacity: 0,
		autoAlpha: 0,
		duration: 1.2,
		ease: "circ.out",
		scrollTrigger: {
		  	trigger: fade_left,
			start: "top 95%",
			toggleActions: "play none none reverse",
		}
	  })
	});
	
	const faders_right = gsap.utils.toArray('.fade-right');
	faders_right.forEach(fade_right => {
	  gsap.from(fade_right, { 
		x: 50,
		opacity: 0,
		autoAlpha: 0,
		duration: 1.2,
		ease: "circ.out",
		scrollTrigger: {
		  	trigger: fade_right,
			start: "top 95%",
			toggleActions: "play none none reverse",
		}
	  })
	});
	
	const faders_in = gsap.utils.toArray('.fade-in');
	faders_in.forEach(fade_in => {
	  gsap.from(fade_in, { 
		y: 20,
		opacity: 0,
		autoAlpha: 0,
		duration: 1.2,
		ease: "circ.out",
		scrollTrigger: {
		  	trigger: fade_in,
			start: "top 85%",
			toggleActions: "play none none reverse",
		}
	  })
	});
});