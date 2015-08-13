/*This file contains most of the html in the app. If you're looking for a particular div, it's probably in here.*/

console.log("loading jst")
window.JST = {};

/*TODO: currently customized for IndieAwards. Generalize language.*/
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

/*subscore modal should appear after a user answers a multiple-choice question*/
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

/*subscore modal should appear after a user answers a multiple-choice question*/
window.JST['in_progress_score'] = _.template(
	'<div  id="in_progress_score_container">\
		Current Score: <span id="in_progress_score" class="points badge"><%=score%></span>\
	</div>')

window.JST['cat_entry'] = _.template(
		' <button id="<%=btn_id%>" class="btn btn-default btn-block">  <small>  <span id="<%=done_yet_id%>" class=""></span>  </small> <%=intro%> <small> <span id="<%=score_container_id%>" class="points pull-right"><%=score%> </span></small>   </button>'
	);

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


window.JST['final_score'] = _.template(
		'<p>You\'re a <%=level_name%>! Your Economic Citizenship Score is: <%=score%> out of 7.  </p>\
		<button id="learn_more_btn" class="btn btn-default">Learn more . . . </button>'
	);

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

window.JST['category_template'] = _.template(
	'<div class="jumbotron">\
  		<p><%=question%></p>\
  		<div class="btn-group-vertical" id="<%=cat%>_options_container">\
  		</div>\
  		<div id="subscore_modal_container"></div>\
	</div>'
	);

window.JST['option'] = _.template(
		'<button id="<%=btn_id%>" class="btn btn-default"><%=desc%></button>'
	);

