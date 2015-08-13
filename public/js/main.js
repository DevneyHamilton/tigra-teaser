(function($){

	var ScoreView = Backbone.View.extend({
		el: '#score_container'
	,	initialize: function(){
			_.bindAll(this, 'render', 'learnMore');
			this.render();
		}
	,	render: function(){
			$(this.el).html(""); //clear
			var html;
			if(Teaser.isReadyForTotalScore()){
				var score = Teaser.getTotalScore();
				html = window.JST['score']({score:score, level_name:Teaser.getLevelName(), desc: Teaser.getLevelDesc()});
			}else{
				console.log("doing in progress score");
				var score = Teaser.getInProgressScore();
				var in_progress_template = window.JST['in_progress_score']
				//html = window.JST['no_score']
				html = in_progress_template({score:score})
				console.log(html)
			}
			$(this.el).html(html);
			$('#learn_more_btn').click(this.learnMore);
			//$("#close-score-modal").click(app.home);
			$("#score_modal").modal('show');
		}
	,	learnMore:function(){
			app.learnMore();
		}	
	});

	var LandingView = Backbone.View.extend({
		el: '#teaser_container'
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
		}
	,	afterRender : function(){
			var that = this;
			var schema = Teaser.getSchema();
			var cats = Teaser.getCats();  
			_.each(cats, function(cat, i, list){
				console.log(cat);
				var container_el = "#cat_entry_container"; //coupled with window.JST["landing"]
				var template = window.JST['cat_entry'];
				var intro = schema[cat]["intro"];
				var score = Teaser.getScore(cat);
				score = ""
				var btn_id = cat + "-start";
				var score_container_id = cat + "_score_container"
				var done_yet_id = cat + "-done-yet"
				var html = template({btn_id: btn_id,
					 intro: intro, 
					 score_container_id: score_container_id, 
					 score: score,
					 done_yet_id: done_yet_id});
				console.log(html);
				$(container_el).append(html);
				//var button_template = window.JST["cat_button"];
				var selector = "#" + btn_id;
				$(selector).click({category : cat}, that.runErrand);
				var score_container_selector = "#" + score_container_id
				var score_container_classes = "glyphicon glyphicon-play";
				var done_yet_classes = "glyphicon glyphicon-unchecked";
				if(Teaser.hasScore(cat)){
					score_container_classes = "badge";
					done_yet_classes = "glyphicon glyphicon-check";
				}
				//$(score_container_selector).addClass(score_container_classes);
				$(score_container_selector).addClass(done_yet_classes);
				//$("#" + done_yet_id).addClass(done_yet_classes);
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
		el: '#teaser_container'
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
				var btn_id= cat + "_option_" + option_score;
				var container_selector = "#" + that.options.category + "_options_container"
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
		el: "#subscore_modal_container"
	,	initialize: function(options){
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
			var template = window.JST['subscore_modal'];
			var gerund = app.schema[cat]["gerund"];
			var button_text = "Keep playing . ."
			var close_action = app.home
			if(Teaser.isReadyForTotalScore()){
				button_text = "Get my Economic Citizenship Score!"
				close_action = app.getFinalScore
			}
			var recirculation  = app.schema[cat]["recirculation"][score];
			var html = template({score: score, gerund: gerund, recirculation:recirculation, button_text: button_text});
			$(this.el).html(html);	
			$("#close_subscore_modal").click(close_action);
			$("#subscore_modal").modal('show');
		}
	});

	var LearnMoreView = Backbone.View.extend({
		el: '#teaser_container'
	,	initialize :function(){
			_.bindAll(this, 'render', 'exit');
			this.render();
		}
	,	render: function(){
			var template = window.JST["learn_more"];
			$(this.el).html('');//clear
			$(this.el).html(template({name: Teaser.getLevelName(), desc: Teaser.getLevelDesc()}));
			$("#exit_learn_more").click(this.exit);
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
			this.score_view = new ScoreView();
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
	,	getFinalScore: function(){
			this.landing_view = new LandingView();
			var final_score_view = new ScoreView();
	}

	});
	//start the app
	
	Teaser.init();
	var app = new AppRouter();
	Backbone.history.start();

	app.schema = Teaser.getSchema();

})(jQuery);