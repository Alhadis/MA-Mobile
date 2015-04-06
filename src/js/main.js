/**
 * Paul Irish's magical smartResize trick.
 * @usage $(window).smartResize(function(){ ... })
 * @url http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
 */
(function($,sr){

	/**
	 * Debouncing function from John Hann
	 * @url http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	 */
	var debounce	=	function(func, threshold, execAsap){
		var timeout;

		return function debounced(){
			var obj = this, args = arguments;
			function delayed(){
				if(!execAsap)
					func.apply(obj, args);
				timeout = null;
			};

			if(timeout)			clearTimeout(timeout);
			else if(execAsap)	func.apply(obj, args);
			timeout = setTimeout(delayed, threshold || 100);
		};
	}

	// smartResize 
	jQuery.fn[sr] = function(fn){return fn ? this.on("resize", debounce(fn)) : this.trigger(sr);};

})(jQuery, "smartResize");



/** Mediate those wretched vendor prefixes for onTransitionEnd. */
(function(o){
	if(o.END) return;

	var names	=	"transitionend webkitTransitionEnd oTransitionEnd otransitionend".split(" ");
	for(var i = 0; i < 4; ++i)
		if("on"+names[i].toLowerCase() in window)
			return (o.END = names[i]);
	return (o.END = names[0]);
}(TransitionEvent || {}));






var MA	=	new function(){
	var	body		=	$("body"),
		toString	=	Object.prototype.toString,
		userAgent	=	navigator.userAgent,

		/** Platform/device detection flags used for applying minor UX enhancements. Nothing serious. */
		is	=	{
			Android:		userAgent.indexOf("Android") !== -1,
			iOS:			/iP(ad|hone|od)/.test(userAgent),
			Safari:			/constructor/i.test(window.HTMLElement),
			Chrome:			!!window.chrome,
			OperaMini:		toString.call(window.operamini) === '[object OperaMini]',
			touchEnabled:	"ontouchstart" in document.documentElement
		};


	/** Configure sidebar */
	$("#toggle-sidebar").on("click", function(){
		body.toggleClass("open-sidebar");
	});



	/** Configure search-bar */
	$("#toggle-search, #search-close").on("click", function(){
		body.toggleClass("open-search");
	});


	/**
	 * The following is a fucked-up attempt to bring the device's keyboard up whenever the search bar's opened.
	 * Many devices won't display the keyboard if input focus is triggered programmatically (... why?!), and some
	 * (particularly Android) reduce the search bar's sliding animation to choppy shit if it's playing whilst the
	 * keyboard's flipping open.
	 *
	 * Worst-case scenario: it doesn't look/feel very elegant. Whatevs.
	 */
	$("#search-query").on("focus", function(){
		body.addClass("open-search");

		if(this.value && window.innerWidth < 1024){
			var THIS	=	this;
		}
	});



	/** Folding/collapsible content */
	$(".fold").each(function(){
		var	$this	=	$(this);
		$this.children().first().click(function(){
			$this.toggleClass("closed");
		});
	});
	
	/** Handle section "hot-linking". */
	var targetElement	=	$(window.location.hash);
	if(targetElement.hasClass("fold"))
		targetElement.removeClass("closed");



	/** Optimise max-heights for expandable/collapsible content */
	$(window).smartResize(function(){

		$(".fold > :nth-child(2)").each(function(){
			$(this).css("max-height", this.scrollHeight + 10);
		});

	}).resize();


	/** Update the text displayed behind every "hidden" select menu. */
	$(".select-wrap").each(function(){
		var $this		=	$(this),
			children	=	$this.children(),
			select		=	children.filter("select"),
			value		=	children.filter(".value");

			select.on("change", function(){
				var option	=	$("option:selected", select);
				value.text(option.text());
			}).change();
	});
};