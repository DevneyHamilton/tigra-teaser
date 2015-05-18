(function($){

	var LandingView = Backbone.View.extend({
		el: '#teaser-container'
	,	initialize :function(){
			console.log("initing LandingView");
			_.bindAll(this, 'render', 'getGroceries');
			this.render();
		}
	,	render :function(){
			var landing_template = window.JST["landing"]
			$(this.el).append(landing_template);
			$("#groceries-start").click(this.getGroceries());
		}
	,	getGroceries :function(){
			console.log("heading out for groceries")
			app.getGroceries();
	}
	});

	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "home"
		}
	,	home: function(){
			this.landing_view = new LandingView();
		}
	,	getGroceries: function(){
			console.log("and we're off for groceries!")
	}
	});
	//start the app
	

	var app = new AppRouter();
	Backbone.history.start();

})(jQuery);