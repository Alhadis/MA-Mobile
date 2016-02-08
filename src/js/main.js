(function($){
	"use strict";
	
	var $html     = $("html");
	var toString  = ({}).toString;
	var userAgent = navigator.userAgent;
	
	
	/** Platform/device detection flags used for applying minor UX enhancements. Nothing serious. */
	var is        = {
		Android:        userAgent.indexOf("Android") !== -1,
		iOS:            /iP(ad|hone|od)/.test(userAgent),
		Safari:         /constructor/i.test(window.HTMLElement),
		Chrome:         !!window.chrome,
		OperaMini:      toString.call(window.operamini) === '[object OperaMini]',
		touchEnabled:   "ontouchstart" in document.documentElement
	};
	
	/** Event-type to listen for when pressing something interactive */
	var pressEvent = is.touchEnabled ? "touchend" : "click";
	
	
	/**
	 * Configure the necessary event listeners for the page's navigation controls.
	 */
	function setupNav(){
		
		/** Sidebar navigation */
		$("#toggle-sidebar").click(function(){ $html.toggleClass("open-sidebar") });
		$("#search-type > select").change(function(e){
			this.previousSibling.data = $(this.options[this.selectedIndex]).text();
		});
		
		/** Search bar */
		$("#search-query").focus(function(e){       $html.addClass("open-search");    });
		$("#search-close").mousedown(function(e){   $html.removeClass("open-search"); });
	}
	
	
	
	/** Fired from the page's onReady handler */
	$(document).ready(function(){
		var pageSections = $("#page-sections");
		
		$(".accordion").each(function(){
			new Accordion(this, {
				noAria: true,
				noKeys: true,
				useBorders: !$(this).hasClass("nb")
			});
		});
	});
	
	
	
	/** Export */
	window.setupNav = setupNav;
}(jQuery));
