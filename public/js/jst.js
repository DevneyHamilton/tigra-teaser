console.log("loading jst")
window.JST = {};

window.JST['landing'] = _.template(
	'<div class="jumbotron">\
  		<h3>How\'s your economic citizenship?</h3>\
  		<p>Let\'s do some errands and find out. Where to?</p>\
  		<div id="cat-entry-container" class="btn-group-vertical">\
  		</div>\
  		<div id="total-score-container"></div>\
	</div>'
	);

window.JST['cat_entry'] = _.template(
	'  <button id="<%=btn_id%>" class="btn btn-default btn-block">  <%=intro%> <small> <span id="<%=score_container_id%>" class="points pull-right"><%=score%> </span></small>   </button>'
	);

window.JST['score'] = _.template(
		'Your Economic Citizenship Score is: <%=score%> out of 6!\
		<button id="learn-more-btn" class="btn btn-default">What does that mean?</button>'
	);

window.JST['learn_more'] = _.template(
	'<div class="jumbotron">\
  		<h3>More info coming soon . .. . </h3>\
  		<button id="exit-learn-more" class="btn btn-default">Exit</button>\
	</div>'
	)

window.JST['no_score'] = _.template(
		'Play all three categories to find out your Economic Citizenship Score!'
	);

window.JST['category_template'] = _.template(
	'<div class="jumbotron">\
  		<p><%=question%></p>\
  		<div class="btn-group-vertical" id="<%=cat%>-options-container">\
  		</div>\
	</div>'
	);

window.JST['option'] = _.template(
		'<button id="<%=btn_id%>" class="btn btn-default"><%=desc%></button>'
	);

