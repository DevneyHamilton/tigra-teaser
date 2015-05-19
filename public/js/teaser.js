(function(exports){
	var schema = {};

	exports.init = function(){
		console.log("initing teaser")
		schema = {
			"sub_score" : {
				"1": "You are beginning your journey to economic citizenship."
			,	"2": "You are a builder!"
			,	"3": "You are a change-maker!"
			}
		,	"grocery" : {
				"intro" : "Get groceries"
			,	"question" : "Where was the LAST place that you bought groceries?"
			,	"options" : {
					"1" : "Big-box chain store (like Walmart or Target)"
				,	"2"	: "Local store with good wages or local sourcing (like Berkeley Bowl)"
				,	"3" : "Local store with good wages AND local sourcing (like Rainbow Co-Op)"
				}
			}
		,	"bank" : {
				"intro" : "Go to the bank"
			,	"question" : "Where do you bank?"
			,	"options" : {
					"1" : "Commercial Bank (like Wells Fargo)"
				,	"2" : "Regional Bank (like Bank of the West)"
				,	"3" : "Credit Union (like Self Help Credit Union)"
				}

			}
		,	"dining" : {
				"intro" : "Get a bite to eat"
			,	"question" : "Where was the last restaurant where you ate out?"
			,	"options" : {
					"1" : "A chain (like Chili's or Denny's)"
				,	"2" : "A local restaurant or cafe without local sourcing (or you're not sure)"
				,	"3" : "A local restaurant or cafe with local sourcing (like Cafe Gab or Miss Ollie's)"

				}

			}
		}
	};

	exports.getSchema = function(){
		return schema;
	}



})(typeof exports === 'undefined' ? this['Teaser']={} : exports);//end closure