console.log("loading jst")
window.JST = {};

window.JST['landing'] = _.template(
	'<div class="jumbotron">\
  		<h3>How\'s your economic citizenship?</h3>\
  		<p>Let\'s find out. Where to?</p>\
  		<div id="cat-entry-container" class="btn-group-vertical">\
  		</div>\
	</div>'
	);

window.JST['cat_entry'] = _.template(
	'<div id="<%=score_container_id%>"><%=score%> /3 </div><button id="<%=btn_id%>" class="btn btn-default"><%=intro%></button>'
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

