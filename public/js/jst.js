console.log("loading jst")
window.JST = {};

window.JST['landing'] = _.template(
	'<div class="jumbotron container-fluid vertical-centered">\
  		<div id="landing-header">\
  			<h2>How\'s your economic citizenship?</h2>\
  			<p>Play all three categories to get your Economic Citizenship Score! </p>\
  		</div>\
  		<div id="cat-entry-container" class="btn-group-vertical">\
  		</div>\
  		<div id="total-score-container"></div>\
	</div>'
	);

window.JST['subscore_modal'] = _.template(
	'<div id="subscore-modal" class="modal fade">\
		<div class="modal-dialog">\
			<div class="modal-header">\
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
			</div>\
			<div class="modal-body">\
				<p> <%=recirculation%> cents for every dollar you spent is re-circulating in the local economy. </p>\
				<p>You score <%=score%> / 2 when it comes to Economic Citizenship and <%=gerund%>.</p>\
				<div class="modal-footer">\
                <button id="close-score-modal" type="button" class="btn btn-default" data-dismiss="modal">Keep playing . . . </button>\
			<div>\
		</div>\
	</div>'
);

window.JST['cat_entry'] = _.template(
		' <button id="<%=btn_id%>" class="btn btn-default btn-block">  <%=intro%> <small> <span id="<%=score_container_id%>" class="points pull-right"><%=score%> </span></small>   </button>'
	);

window.JST['score'] = _.template(
		'Your Economic Citizenship Score is: <%=score%> out of 6. You\'re a <%=name%>! \
		<button id="learn-more-btn" class="btn btn-default">What does that mean?</button>'
	);

window.JST['learn_more'] = _.template(
	'<div class="jumbotron container-fluid">\
  		<h3 class="level"><%=name%></h3>\
  		<p><%=desc%></p>\
  		<button id="exit-learn-more" class="btn btn-default">Exit</button>\
	</div>'
	)

window.JST['no_score'] = _.template(
		''
	);

window.JST['category_template'] = _.template(
	'<div class="jumbotron">\
  		<p><%=question%></p>\
  		<div class="btn-group-vertical" id="<%=cat%>-options-container">\
  		</div>\
  		<div id="subscore-modal-container"></div>\
	</div>'
	);

window.JST['option'] = _.template(
		'<button id="<%=btn_id%>" class="btn btn-default"><%=desc%></button>'
	);

