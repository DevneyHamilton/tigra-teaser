console.log("loading jst")
window.JST = {};

window.JST['landing'] = _.template(
	'<div class="jumbotron">\
  		<h1>How\'s your economic citizenship?</h1>\
  		<p>Let\'s do some errands to find out. Where to?</p>\
  		<div class="btn-group-vertical">\
  			<button id="groceries-start" class="btn btn-lg">Get groceries.</button>\
  			<button id="bank-start" class="btn btn-lg">Go to the bank.</button>\
  		</div>\
	</div>'
	);


window.JST['groceries'] = _.template(
	'<div class="jumbotron">\
  		<p>Where will you get groceries?</p>\
  		<div class="btn-group-vertical" id="grocery-options-container">\
  		</div>\
	</div>'
	);

window.JST['grocery-option'] = _.template(
		'<button id="<%=id%>" class="btn btn-lg"><%=desc%></button>'
	);

window.JST['groceries2'] = _.template(
	'<div class="jumbotron">\
		<div class="dropdown">\
			<button class="btn btn-default dropdown-toggle" type="button" id="groceries-drop-down" data-toggle="dropdown" aria-expanded="true">\
				Where will you get groceries?\
				<span class="caret"></span>\
			</button>\
			<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">\
				 <li role="presentation"><a role="menuitem" tabindex="-1" href="#">A local co-op</a></li>\
				 <li role="presentation"><a role="menuitem" tabindex="-1" href="#">A local store with unknown labor and sourcing practices. </a></li>\
				 <li role="presentation"><a role="menuitem" tabindex="-1" href="#">A large chain with good labor practices and local sourcing.</a></li>\
				 <li role="presentation"><a role="menuitem" tabindex="-1" href="#">A large chain with unknown labor and sourcing practices</a></li>\
			</ul>\
		</div>\
	</div>'
);