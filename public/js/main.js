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
			$("#groceries-start").click(this.getGroceries);
		}
	,	getGroceries :function(){
			console.log("heading out for groceries")
			app.getGroceries();
		}
	});

	var GroceriesView = Backbone.View.extend({
		el: '#teaser-container'
	,	initialize:function(){
			_.bindAll(this, 'render');
			this.render = _.wrap(this.render, function(render) {	//keeps 'this' this in afterRender
                render();
                this.afterRender();
            });
			this.render();
		}
	,	render: function(){
			$(this.el).html(''); //clear
			var groceries_template = window.JST["groceries"]
			$(this.el).append(groceries_template);		
		}
	,	afterRender:function(){
			var that = this;
			var grocery_options = {
				"3" : "A local co-op"
			,	"2"	: "A grocery with good labor practices and local sourcing"
			,	"1" : "A big-name grocery with unknown labor practices and the most convenient sourcing."
			}
			var keys = Object.keys(grocery_options);
			_.each(keys, function(option_id, i, list){
				var template = window.JST["grocery-option"]
				var id = "grocery-option-" + option_id;
				$("#grocery-options-container").append(template({id: id, desc: grocery_options[option_id]}))
				var selector = "#" + id;
				$(selector).click({option: option_id}, that.getResult)
			})
		}
	,	getResult: function(e){
			e.preventDefault();
			var score =  e.data["option"];
			console.log("Option selected: " + e.data["option"]);
			app.getResult(score);
		}
	});



	var ResultsView = Backbone.Router.extend({
		initialize: function(options){
			this.options = options;
			_.bindAll(this, 'render');
			this.render();
			
		}
	,	render:function(){
			var score = this.options.score
			var groceries_scoring = {
				"1": "You are beginning your journey to economic citizenship."
			,	"2": "You are a builder!"
			,	"3": "You are a change-maker!"
			}
			alert("Your score is: " + score  + " out of 3. " + groceries_scoring[score]);
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
			this.groceries_view = new GroceriesView();
	}
	,	getResult: function(score){
			this.results_view = new ResultsView({score: score});

		}
	});
	//start the app
	

	var app = new AppRouter();
	Backbone.history.start();

})(jQuery);