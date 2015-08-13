/*This file contains underscore html templates
used in main.js. It contains most of the html in the app, so if you're looking for some html, it's probably in here.*/

console.log("loading jst")
window.JST = {};

/*
'landing' html has the introduction for the user, and creates the cat_entry_container that will will be filled 
with a button for each category and give the user a handle into the game, and the score container that will 
display score info. 

TODO: currently customized for IndieAwards. Generalize language.

no vars.
 */
window.JST['landing'] = _.template(
	'<div class="jumbotron container-fluid vertical-centered">\
  		<div id="landing_header">\
  			<h2>How\'s your economic citizenship?</h2>\
  			<p>When we support businesses with good employment practices, local sourcing, and local ownership, we exercise good economic citizenship. These practices re-circulate money in our local economy. </p>\
  			<p id="play_invitation"> Play all three categories to get your Economic Citizenship Score. You get a free point for coming to the IndieAwards!</p>\
  		</div>\
  		<div id="cat_entry_container" class="btn-group-vertical">\
  		</div>\
  		<div id="score_container"></div>\
	</div>'
	);

/*subscore modal should appear after a user answers a multiple-choice question
vars: gerund (from Teaser schema), recirculation (from Teaser schema), score (0, 1, or 2, for this category) */
window.JST['subscore_modal'] = _.template(
	'<div id="subscore_modal" class="modal fade">\
		<div class="modal-dialog">\
			<div class="modal-header">\
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
			<div class="modal-body">\
				<p><small> <%=recirculation%> cents for every dollar you spent is re-circulating in the local economy.</small></small> </p>\
				<p><small>You score <%=score%> out of 2 when it comes to Economic Citizenship and <%=gerund%>.</small></p>\
				<div class="modal-footer">\
                <button id="close_subscore_modal" type="button" class="btn btn-default preferred-button" data-dismiss="modal"><%=button_text%></button>\
			<div>\
		</div>\
	</div>'
);

/*used to display the user's score so far in the score_container*/
window.JST['in_progress_score'] = _.template(
	'<div  id="in_progress_score_container">\
		Current Score: <span id="in_progress_score" class="points badge"><%=score%></span>\
	</div>')

/*html for each of the three buttons a user sees on the landing page. 
vars: intro, id, btn_id, done_yet_id, */
window.JST['cat_entry'] = _.template(
		' <button id="<%=btn_id%>" class="btn btn-default btn-block">  <small> <%=intro%> <span id="<%=done_yet_id%>" class="pull-right"></span>  </small>  </button>'
	);

// window.JST['cat_entry'] = _.template(
// 		' <button id="<%=btn_id%>" class="btn btn-default btn-block">  <small>  <span id="<%=done_yet_id%>" class=""></span>  </small> <%=intro%>  </button>'
// 	);

window.JST['announce_final_score'] = _.template(
		'<div id="score_modal" class="modal fade">\
			<div class="modal-dialog">\
				<div class="modal-header">\
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
					<h1>You\'re a <%=level_name%>!</h1>\
				</div>\
				<div class="modal-body">\
					<p> Your Economic Citizenship Score is: <%=score%> out of 7.</p>\
					<p><small><%=desc%></small></p>\
				</div>\
				<div class="modal-footer">\
						<a href="https://docs.google.com/forms/d/1a4K2qgeDhaR2mJWCIPC89dWL6W7JZy_deKdiuM63axc/viewform" class="btn btn-default preferred-button">Sign up for TIGRA\'s Economic Citizenship Challenge! </a>\
	                	<button id="close_score_modal" type="button" class="btn btn-default" data-dismiss="modal">Go Home</button>\
				</div>\
			</div>\
		</div>')


/*used in score-container on homepage after user has answered all 3 questions*/
window.JST['final_score'] = _.template(
		'<p>You\'re a <%=level_name%>! Your Economic Citizenship Score is: <%=score%> out of 7.  </p>\
		<button id="learn_more_btn" class="btn btn-default">Learn more . . . </button>'
	);

/*a more boring way to see your score and what it means, always available (instead of modal that only pops up when you're done)*/
window.JST['learn_more'] = _.template(
	'<div class="jumbotron container-fluid" id="learn_more">\
  		<h3 class="level"><%=name%></h3>\
  		<p><%=desc%></p>\
  		<a href="https://docs.google.com/forms/d/1a4K2qgeDhaR2mJWCIPC89dWL6W7JZy_deKdiuM63axc/viewform" class="btn btn-default preferred-button">Sign up for TIGRA\'s Economic Citizenship Challenge! </a>\
  		<button id="exit_learn_more" class="btn btn-default">Exit</button>\
	</div>'
	)

window.JST['no_score'] = _.template(
		''
	);

/*sets up skeleton for the multiple-choice questions for a category */
window.JST['category_template'] = _.template(
	'<div class="jumbotron">\
  		<p><%=question%></p>\
  		<div class="btn-group-vertical" id="<%=cat%>_options_container">\
  		</div>\
  		<div id="subscore_modal_container"></div>\
	</div>'
	);

/*This is a multiple choice option*/
window.JST['option'] = _.template(
		'<button id="<%=btn_id%>" class="btn btn-default"><%=desc%></button>'
	);

