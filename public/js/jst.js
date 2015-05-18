console.log("loading jst")
window.JST = {};

window.JST['landing'] = _.template(
	'<div class="jumbotron">\
  		<h1>How\'s your economic citizenship?</h1>\
  		<p>Let\'s do some errands to find out. What do you want to do?</p>\
  		<div class="btn-group-vertical">\
  			<button id="groceries-start" class="btn btn-lg">Get groceries.</button>\
  			<button id="bank-start" class="btn btn-lg">Go to the bank.</button>\
  		</div>\
	</div>'
	);
