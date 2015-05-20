(function($){

	var ScoreView = Backbone.View.extend({
		el: '#total-score-container'
	,	initialize: function(){
			_.bindAll(this, 'render', 'learnMore');
			this.render();
		}
	,	render: function(){
			$(this.el).html(""); //clear
			var html;
			if(Teaser.isReadyForTotalScore()){
				var score = Teaser.getTotalScore();
				html = window.JST['score']({score:score })
			}else{
				html = window.JST['no_score']
			}
			$(this.el).html(html);
			$('#learn-more-btn').click(this.learnMore);
		}
	,	learnMore:function(){
			app.learnMore();
		}	
	});

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
			$(this.el).html(''); //clear
			var landing_template = window.JST["landing"]
			$(this.el).append(landing_template);
			//if(Teaser.isReadyForTotalScore()){
				var total_score_view = new ScoreView();
			//}
		}
	,	afterRender : function(){
			var that = this;
			var schema = Teaser.getSchema();
			var cats = Teaser.getCats();  
			_.each(cats, function(cat, i, list){
				console.log(cat);
				var container_el = "#cat-entry-container"; //coupled with window.JST["landing"]
				var template = window.JST['cat_entry'];
				var intro = schema[cat]["intro"];
				var score = Teaser.getScore(cat);
				var btn_id = cat + "-start";
				var score_container_id = cat + "-score-container"
				var html = template({btn_id: btn_id, intro: intro, score_container_id: score_container_id, score: score});
				console.log(html);
				$(container_el).append(html);
				//var button_template = window.JST["cat_button"];
				var selector = "#" + btn_id
				$(selector).click({category : cat}, that.runErrand);
				var score_container_selector = "#" + score_container_id
				var classes = "glyphicon glyphicon-play points pull-right";
				if(Teaser.hasScore(cat)){
					classes = "badge points pull-right";
				}
				$(score_container_selector).addClass(classes);
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
				var btn_id= cat + "-option-" + option_score;
				var container_selector = "#" + that.options.category + "-options-container"
				$(container_selector).append(template({btn_id: btn_id, desc: cat_options[option_score]}))
				var selector = "#" + btn_id;
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
			Teaser.setScore(score, cat);
			console.log("New score for " + cat + ": " + Teaser.getScore(cat));
			alert("Your score is: " + score  + " out of 2. " + scoring_schema[score]);
			app.home();
			
		}
	});

	var LearnMoreView = Backbone.View.extend({
		el: '#teaser-container'
	,	initialize :function(){
			_.bindAll(this, 'render', 'exit');
			this.render();
		}
	,	render: function(){
			var template = window.JST["learn_more"];
			$(this.el).html('');//clear
			$(this.el).html(template());
			$("#exit-learn-more").click(this.exit);
		}
	,	exit: function(){
			app.home();
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
	,	learnMore: function(){
			this.learn_more_view = new LearnMoreView();
		}

	});
	//start the app
	
	Teaser.init();
	var app = new AppRouter();
	Backbone.history.start();

	app.schema = Teaser.getSchema();

})(jQuery);