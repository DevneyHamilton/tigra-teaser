(function($){

/*This file has the Backbone Views that make the Teaser logic available and interactive for the user.*/
	/*Sets up the 'home' screen*/
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
				//displays a button for each category
				console.log(cat);
				var container_el = "#cat_entry_container"; //coupled with window.JST["landing"]
				var template = window.JST['cat_entry'];
				var intro = schema[cat]["intro"];
				var btn_id = cat + "-start";
				var done_yet_id = cat + "-done-yet"
				var html = template({btn_id: btn_id,
					 intro: intro, 
					 done_yet_id: done_yet_id});
				console.log(html);
				$(container_el).append(html);
				var selector = "#" + btn_id;
				$(selector).click({category : cat}, that.runErrand);
				var done_yet_classes = "glyphicon glyphicon-unchecked";
				if(Teaser.hasScore(cat)){
					done_yet_classes = "glyphicon glyphicon-check";
				}
				$("#" + done_yet_id).addClass(done_yet_classes);
			});

		}
	,	runErrand :function(e){ //click handler for each category button
			e.preventDefault();
			var category =  e.data["category"];
			console.log("heading out for " + category);
			app.runErrand(category);
		}
	});


	/*Creates the multiple choice question html for each category*/
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
				$(selector).click({score: option_score, cat: cat}, that.getSubscore)
			})
		}
	,	getSubscore: function(e){
			e.preventDefault();
			var score =  e.data["score"];
			var cat = e.data["cat"];
			console.log("Option selected: " + score);
			app.getSubscore(score, cat);
		}
	});


	/*Creates and displays a modal that displays the user's subscore after they answer a category question.
	This could be called 'subScoreVie*/
	var SubscoreView = Backbone.Router.extend({
		el: "#subscore_modal_container"
	,	initialize: function(options){
			this.options = options;
			_.bindAll(this, 'render');
			this.render();
			
		}
	,	render:function(){
			var score = this.options.score
			var cat = this.options.cat
			Teaser.setScore(score, cat);
			console.log("New score for " + cat + ": " + Teaser.getScore(cat));
			var template = window.JST['subscore_modal'];
			var gerund = app.schema[cat]["gerund"];
			var button_text = "Keep playing . ." //case where the user still has more questions to answer
			var close_action = app.home //case where the user still has more questions to answer
			if(Teaser.isReadyForFinalScore()){ //but if they are done answering questions, announce their score!
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


	/*Controls the score-container on the home page. It keeps a in-progress-score out of 7 until the user has 
	answered all three questions. Then it displays a final score out of 7 on the home page. This is different than "FinalScoreAnnounceView" */
	var ScoreView = Backbone.View.extend({
		el: '#score_container'
	,	announce : this.announce
	,	initialize: function(){
			_.bindAll(this, 'render', 'learnMore');
			this.render();
		}
	,	render: function(){
			$(this.el).html(""); //clear
			var html;
			if(Teaser.isReadyForFinalScore()){
				var score = Teaser.getFinalScore();
				html = window.JST['final_score']({score:score, level_name:Teaser.getLevelName(), desc: Teaser.getLevelDesc()});
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
		}
	,	learnMore:function(){
			app.learnMore();
		}	
	});

	/*Announces the score in a modal only right after the user clicks "get citizenship score!" after they have answered all three questions. 
	This is redundant of what happens in 'learn more.'*/
	var FinalScoreAnnounceView = Backbone.View.extend({
		el:'#score_container'
	,	initialize: function(){
			_.bindAll(this, 'render');
			this.render();
		}
	,	render: function(){
			var score = Teaser.getFinalScore();
			var html = window.JST['announce_final_score']({score:score, level_name:Teaser.getLevelName(), desc: Teaser.getLevelDesc()});
			$(this.el).append(html);
			$("#score_modal").modal('show');
		}
	})

	/*A more boring way than FinalScoreAnnounceView to see what your score means.*/
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
			console.log("and we're off to: " + category + "!")
			this.errand_view = new CategoryView({"category" : category});
		}
	,	getSubscore: function(score, cat){
			this.subscore_view = new SubscoreView({score: score, cat:cat});

		}
	,	learnMore: function(){
			this.learn_more_view = new LearnMoreView();
		}
	,	getFinalScore: function(){
			this.landing_view = new LandingView();
			var final_score_view = new ScoreView();	
			var final_score_announce = new FinalScoreAnnounceView();
	}

	});
	//start the app
	
	Teaser.init();
	var app = new AppRouter();
	Backbone.history.start();

	app.schema = Teaser.getSchema();

})(jQuery);