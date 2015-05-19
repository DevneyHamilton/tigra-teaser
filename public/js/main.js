(function($){

	var LandingView = Backbone.View.extend({
		el: '#teaser-container'
	,	initialize :function(){
			console.log("initing LandingView");
			_.bindAll(this, 'render', 'runErrand');
			this.render = _.wrap(this.render, function(render) {	//keeps 'this' this in afterRender
                render();
                this.afterRender();
            });
			this.render();
		}
	,	render :function(){
			var landing_template = window.JST["landing"]
			$(this.el).append(landing_template);
		}
	,	afterRender : function(){
			var that = this;
			var schema = Teaser.getSchema();
			console.log(JSON.stringify(schema));
			var cats = ["grocery", "bank", "dining"]; //coupled with schema 
			_.each(cats, function(cat, i, list){
				console.log(cat);
				var container_el = "#cat-entry-container"; //coupled with window.JST["landing"]
				var template = window.JST['cat_entry'];
				var intro = schema[cat]["intro"];
				var id = cat + "-start";
				var html = template({id: id, intro: intro});
				console.log(html);
				$(container_el).append(html);
				//var button_template = window.JST["cat_button"];
				var selector = "#" + id
				$(selector).click({category : cat}, that.runErrand);
			});

		}
	,	runErrand :function(e){
			e.preventDefault();
			var category =  e.data["category"];
			console.log("heading out for " + category);
			app.runErrand(category);
		}
	});

	var CategoryView = Backbone.View.extend({
		el: '#teaser-container'
	,	initialize:function(options){
			this.options = options;
			_.bindAll(this, 'render');
			this.render = _.wrap(this.render, function(render) {	//keeps 'this' this in afterRender
                render();
                this.afterRender();
            });
			this.render();
		}
	,	render: function(){
			var cat = this.options.category;
			$(this.el).html(''); //clear
			var cat_template = window.JST['category_template'];
			var question = app.schema[cat]["question"];
			$(this.el).append(cat_template({question: question, cat: cat}));		
		}
	,	afterRender:function(){
			var that = this;
			var cat = this.options.category;
			var cat_options = app.schema[this.options.category]["options"];
			var keys = Object.keys(cat_options);
			_.each(keys, function(option_score, i, list){
				var template = window.JST["option"]
				var id = that.options.category + "-option-" + option_score;
				var container_selector = "#" + that.options.category + "-options-container"
				$(container_selector).append(template({id: id, desc: cat_options[option_score]}))
				var selector = "#" + id;
				$(selector).click({score: option_score, cat: cat}, that.getResult)
			})
		}
	,	getResult: function(e){
			e.preventDefault();
			var score =  e.data["score"];
			var cat = e.data["cat"];
			console.log("Option selected: " + score);
			app.getResult(score, cat);
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
			var cat = this.options.cat
			var scoring_schema = app.schema.sub_score; //map from score to message
			app.scores[cat]= score;
			console.log(JSON.stringify(app.scores));
			alert("Your score is: " + score  + " out of 3. " + scoring_schema[score]);
			
		}
	});

	

	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "home"
		}
	,	home: function(){
			this.landing_view = new LandingView();
		}
	,	runErrand: function(category){
			console.log("and we're off: " + category + "!")
			this.errand_view = new CategoryView({"category" : category});
	}
	,	getResult: function(score, cat){
			this.results_view = new ResultsView({score: score, cat:cat});

		}
	});
	//start the app
	
	Teaser.init();
	var app = new AppRouter();
	Backbone.history.start();

	app.schema = Teaser.getSchema();
	//static info for app
	// app.schema = {}
	// app.schema["sub_score"] = {
	// 			"1": "You are beginning your journey to economic citizenship."
	// 		,	"2": "You are a builder!"
	// 		,	"3": "You are a change-maker!"
	// 		};
	// app.schema["grocery"] = {
	// 			"intro" : "Get groceries"
	// 		,	"question" : "Where was the LAST place that you bought groceries?"
	// 		,	"options" : {
	// 				"1" : "Big-box chain store (like Walmart or Target)"
	// 			,	"2"	: "Local store with good wages or local sourcing (like Berkeley Bowl)"
	// 			,	"3" : "Local store with good wages AND local sourcing (like Rainbow Co-Op)"
	// 			}
	// 		}


	//dynamic infor for app
	app.scores = {
		"grocery" : "?"
	, 	"bank" : "?"
	,	"dining" : "?"
	,	"total" : "?"
	}

})(jQuery);