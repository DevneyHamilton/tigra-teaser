(function(exports){
	var schema = {};

	//dynamic infor for app
	var scores = {
		"grocery" : "?"
	, 	"bank" : "?"
	,	"dining" : "?"
	,	"total" : "?"
	}

	var _getCats = function(){
		return ["grocery", "dining", "bank"];
	}
	exports.getCats = function(){
		return _getCats();
	}

	exports.isReadyForTotalScore = function(){
		var cats = _getCats();
		var answer = true;
		_.each(cats, function(cat, i, list){
			if(scores[cat] === "?"){
				answer = false;
			}
		});
		return answer;
	}

	/*call ONLY if isReadyForTotalScore  returns true
	*/
	exports.getTotalScore = function(){
		var cats = _getCats();
		var total = 0
		_.each(cats, function(cat, i, list){
			total += parseInt(scores[cat])
		});
		return total;
	}

	exports.getScore = function(cat){
		return scores[cat];
	}

	exports.setScore = function(value, cat){
		scores[cat] = value;
	}

	exports.init = function(){
		console.log("initing teaser")
		schema = {
			"sub_score" : {
				"0": "You are beginning your journey to economic citizenship."
			,	"1": "You are a builder!"
			,	"2": "You are a change-maker!"
			}
		,	"grocery" : {
				"intro" : "Get groceries"
			,	"question" : "Where was the LAST place that you bought groceries?"
			,	"options" : {
					"0" : "Big-box chain store (like Walmart or Target)"
				,	"1"	: "Local store with good wages or local sourcing (like Berkeley Bowl)"
				,	"2" : "Local store with good wages AND local sourcing (like Rainbow Co-Op)"
				}
			}
		,	"bank" : {
				"intro" : "Go to the bank"
			,	"question" : "Where do you bank?"
			,	"options" : {
					"0" : "Commercial Bank (like Wells Fargo)"
				,	"1" : "Regional Bank (like Bank of the West)"
				,	"2" : "Credit Union (like Self Help Credit Union)"
				}

			}
		,	"dining" : {
				"intro" : "Get a bite to eat"
			,	"question" : "Where was the last restaurant where you ate out?"
			,	"options" : {
					"0" : "A chain (like Chili's or Denny's)"
				,	"1" : "A local restaurant or cafe without local sourcing (or you're not sure)"
				,	"2" : "A local restaurant or cafe with local sourcing (like Cafe Gab or Miss Ollie's)"

				}

			}
		}
	};

	exports.getSchema = function(){
		return schema;
	}



})(typeof exports === 'undefined' ? this['Teaser']={} : exports);//end closure