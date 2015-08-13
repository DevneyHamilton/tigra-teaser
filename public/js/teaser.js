/*This file encodes the logic of the Economic Citizenship Teaser game, setting up the questions, and tracking scoring.
It currently uses three categories: grocery, bank, dining. For each category, the user is given
a multiple choice question with three options. Each option maps to a subscore for that category, which is 0, 
1, or 2. After the user has answered for all three categories, they get a total (also called 'final') score, 
from 1 to 7, which is then mapped to a level of economic citizenship: beginner, builder, change-maker. Each level
also has a 'description (desc) that is a message for users with that level. 

Usage: 
Teaser.init();
Teaser.setScore(1, "bank");
Teaser.getScore("bank");
*/

(function(exports){
	var schema = {}; //in init, filled with category schema. 

	//Tracks user's scores. "" means there is no score yet. 
	var scores = {
		"grocery" : ""
	, 	"bank" : ""
	,	"dining" : ""
	,	"total" : "" //total score and final score are the same thing. 
	}

	//defines the three 'levels' of economic citizenship, applicable to subscores and to the total score.
	var levels = {
		"0" : {
			"name" : "beginner"
		,	"desc" : "Start building! You are just at the beginning of your economic citizen journey so the only place to go is forward, one step at a time. Your first step could be switching your bank account from a big bank to a local credit union/regional bank or switching just 10% of your spending (it's only $50, if you spend $500 a month) to local and ethical stores. "
		}
	,	"1" :{
			"name" : "builder"
		,	"desc"	: "You're on your way! You make economic decisions that support the local community and are a strong ECONOMIC CITIZEN but you still have room to grow. Try switching your bank account to a local credit union/bank or shop at more local and ethical stores to meet your every day needs. But no matter what you do, KEEP BUILDING!"
		}
	,	"2" :{
			"name" : "change-maker"
		,	"desc" : " You're making changes! Your daily financial habits are making a great impact on the local community: you are supporting local jobs with higher wages and sustaining our environment. You are a excellent example of an ECONOMIC CITIZEN! Every time you purchase something, you keep your community in mind and we think that's great! Keep making that CHANGE!"
		}
	}


	/*Coupled with init() - these are just the keys to the schema object*/
	var _getCats = function(){
		return ["grocery", "dining", "bank"];
	}

	/*If user has answered a question in all three categories, _getTotalScore will report it. Note that if 
	called when not all categories have been answered, there may be NaN problems. TODO: redundant of
	and worse than getInProgressScore, refactor*/
	var _getTotalScore = function(){
		var cats = _getCats();
		var total = 1; //free point for being at indy awards. 
		_.each(cats, function(cat, i, list){
			total += parseInt(scores[cat])
		});
		return total;
	}

	/*maps a total/final score to a level of economic citizenship*/
	var _getLevel = function(){
		var total = _getTotalScore();
		console.log("total:" + total)
		var map = {
			"1" : "0"
		,	"2"	: "0"
		,	"3"	: "0"
		,	"4"	: "1"
		,	"5"	: "1"
		,	"6"	: "2"
		,	"7"	: "2"
		}
		return map[total];

	}

	/*Coupled with html in jst.js's 'landing' template saying a user gets 1 pt free. This creates a score of 1 to start with, a hack for indie awards.
	This function can be safely called regardless of the user's progress.*/
	exports.getInProgressScore = function(){
		var cats = _getCats();
		var total = 1; //free point for being at indie awards. 
		_.each(cats, function(cat, i, list){
			if(!(scores[cat] === "")){
				total += parseInt(scores[cat])
			}
		});
		return total;

	}

	exports.getCats = function(){
		return _getCats();
	}

	exports.getLevel = function(){
		return _getLevel();
	}

	exports.hasScore = function(cat){
		return (!(scores[cat] === ""))
	}

	exports.getLevelName = function(){
		var level  = _getLevel();
		console.log("level:" + level);
		console.log("Name: " + levels[level]["name"]);
		return levels[level]["name"];
	}

	exports.getLevelDesc= function(){
		var level  = _getLevel();
		return levels[level]["desc"];
	}

	exports.isReadyForFinalScore = function(){
		var cats = _getCats();
		var answer = true;
		_.each(cats, function(cat, i, list){
			if(scores[cat] === ""){
				answer = false;
			}
		});
		return answer;
	}

	/*call ONLY if isReadyForFinalScore  returns true
	TODO: error check in this fn.
	*/
	exports.getFinalScore = function(){
		return _getTotalScore();
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
			"grocery" : {
				"intro" : "Get groceries  " //intro is used in 'cat_entry' template in jst.js
			,	"gerund" : "getting groceries" //gerund is used in displaying the sub_score response
			,	"question" : "Where was the LAST place that you bought groceries?" //multiple choice question
			,	"options" : { //multiple choice answers. Note the key here is also the score
					"0" : "Big-box chain store (like Walmart or Target)"
				,	"1"	: "Local store with good wages or local sourcing (like Berkeley Bowl)"
				,	"2" : "Local store with good wages AND local sourcing (like Rainbow Co-Op)"
				}
			,	"recirculation": { //recirculation is the cents recirculating in the economy, used in the sub_score response
					"0": "13"
				,	"1" : "Between 13 and 48"
				,	"2"	: "48"
				}
			}
		,	"bank" : {
				"intro" : "Go to the bank  "
			,	"gerund" : "banking"
			,	"question" : "Where do you bank?"
			,	"options" : {
					"0" : "Commercial bank (like Wells Fargo)"
				,	"1" : "Regional bank (like Bank of the West)"
				,	"2" : "Credit union or community bank (like Beneficial State Bank)"
				}
			,	"recirculation": {
					"0": "17"
				,	"1" : "Between 17 and 76"
				,	"2"	: "76"
				}

			}
		,	"dining" : {
				"intro" : "Eat out "
			,	"gerund" : "eating out"
			,	"question" : "Where was the last restaurant where you ate out?"
			,	"options" : {
					"0" : "A chain (like Chili's or Denny's)"
				,	"1" : "A local restaurant or cafe without local sourcing (or you're not sure)"
				,	"2" : "A local restaurant or cafe with local sourcing (like Cafe Gab or Miss Ollie's)"

				}
			,	"recirculation": {
					"0": "34"
				,	"1" : "Between 34 and 65"
				,	"2"	: "65"
				}
			}
		}
	};

	exports.getSchema = function(){
		return schema;
	}



})(typeof exports === 'undefined' ? this['Teaser']={} : exports);//end closure