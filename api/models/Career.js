/**
* Career.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Promise = require("bluebird-extra");

module.exports = {

	attributes: {
		batting_score: {
			type: "integer"
		},

		not_out: {
			type: "boolean"
		},

		wickets: {
			type: "integer"
		},

		runs_conceded: {
			type: "integer"
		},

		catches: {
			type: "integer"
		},

		stumps: {
			type: "integer"
		},

		opposition: {
			type: "string"
		},

		ground: {
			type: "string"
		},

		match_date: {
			type: "date"
		},

		match_result: {
			type: "string"
		},

		result_margin: {
			type: "string"
		},

		margin: {
			type: "integer"
		},

		toss: {
			type: "boolean"
		},

		innings: {
			type: "integer"
		},

	},
	getOverallStats: getOverallStats,
	getYearlyData: getYearlyData,
	getStatsByMatchResult: getStatsByMatchResult,
	getBasicStatsAgainstAustralia: getBasicStatsAgainstAustralia,
	getDetailedStatsAgainstAustralia: getDetailedStatsAgainstAustralia,
	getStatsByMatchesInAustralia: getStatsByMatchesInAustralia,
	getStatsForMatchesOutside: getStatsForMatchesOutside,
};

function getOverallStats () {
	var myQuery = " with stats as ( SELECT "
    				+ " CASE WHEN batting_score >= 100 then 1 else 0 END century, "
    				+ " CASE WHEN batting_score >= 50 and batting_score < 100  THEN 1 ELSE 0 END  half_century, "
    				+ " batting_score "
    				+ " FROM career "
    				+ " ) "
					+ " SELECT SUM(century) century, SUM(half_century) half_century, sum(batting_score) as total_runs, round(avg(batting_score),2) as batting_average "
					+ " FROM stats;";

	return new Promise(function (resolve, reject){
		Career.query(myQuery, function (err, result){
			if(err){
				reject(err);
			} else {
				result = result && result.rows || [];
				resolve(result[0]);
			}
		})
	});
}

function getYearlyData () {
	var myQuery = " with stats as (SELECT "
    			+ " CASE WHEN batting_score >= 100 then 1 else 0 END century, "
    			+ " CASE WHEN batting_score >= 50 and batting_score < 100  THEN 1 ELSE 0 END  half_century, "
    			+ " batting_score, "
    			+ " to_char(match_date, 'YYYY') as match_year "
    			+ " FROM career "
    			+ " )SELECT SUM(century) century, SUM(half_century) half_century, sum(batting_score) as total_runs, round(avg(batting_score),2) as batting_average, match_year "
				+ " FROM stats "
				+ " group by match_year "
				+ " order by match_year; "

	return new Promise(function (resolve, reject){
		Career.query(myQuery, function (err, result){
			if(err){
				reject(err);
			} else {
				result = result && result.rows || [];
				resolve(result);
			}
		})
	});
}


function getStatsByMatchResult () {
	var myQuery = " select match_result,json_agg(career.batting_score) as runs_scored,count(*) as total_matches,round(avg(batting_score),2) as batting_average,sum(career.batting_score) as total_runs "
				+ " from career "
				+ " group by career.match_result;"

	return new Promise(function (resolve, reject){
		Career.query(myQuery, function (err, result){
			if(err){
				reject(err);
			} else {
				result = result && result.rows || [];
				resolve(result);
			}
		})
	});
}

function getBasicStatsAgainstAustralia () {
	var myQuery = " with stats as (SELECT "
	    		+ " CASE WHEN batting_score >= 100 then 1 else 0 END century, "
	    		+ " CASE WHEN batting_score >= 50 and batting_score < 100  THEN 1 ELSE 0 END  half_century, "
	    		+ " batting_score "
	    		+ " FROM career "
	    		+ " where opposition = 'Australia' "
	    		+ " ) SELECT SUM(century) century, SUM(half_century) half_century, sum(batting_score) as total_runs, round(avg(batting_score),2) as batting_average "
				+ " FROM stats;"

	return new Promise(function (resolve, reject){
		Career.query(myQuery, function (err, result){
			if(err){
				reject(err);
			} else {
				result = result && result.rows || [];
				resolve(result[0]);
			}
		})
	});
}

function getDetailedStatsAgainstAustralia () {
	var myQuery = " select match_result,json_agg(career.batting_score) as runs_scored,count(*) as total_matches,round(avg(batting_score),2) as batting_average, sum(career.batting_score) as total_runs "
				+ " from career "
				+ " where career.opposition = 'Australia' "
				+ " group by career.match_result;"

	return new Promise(function (resolve, reject){
		Career.query(myQuery, function (err, result){
			if(err){
				reject(err);
			} else {
				result = result && result.rows || [];
				resolve(result);
			}
		})
	});
}

function getStatsByMatchesInAustralia () {
	var myQuery = " with stats as (select round(avg(batting_score),2) as total_average, sum(career.batting_score) as total_runs "
	        	+ " from career "
	        	+ " where ground in(select name from city where country = 'Australia' or country = 'New Zealand')) "
				+ " select match_result,json_agg(batting_score) as runs_scored,count(*) as total_matches,round(avg(batting_score),2) as batting_average, sum(career.batting_score) as total_runs,total_average, total_runs "
				+ " from career, stats "
				+ " where ground in(select name from city where country = 'Australia' or country = 'New Zealand') "
				+ " group by career.match_result, stats.total_average, stats.total_runs;"

	return new Promise(function (resolve, reject){
		Career.query(myQuery, function (err, result){
			if(err){
				reject(err);
			} else {
				result = result && result.rows || [];
				resolve(result);
			}
		})
	});
}

function getStatsForMatchesOutside () {
	var myQuery = " with cities as (select distinct country from city) "
				+ " select json_agg(career.batting_score) as runs_scored, cities.country, sum(career.batting_score), count(career) as no_of_matches, round(avg(career.batting_score),2) as batting_average "
				+ " from career, cities "
				+ " where cities.country =  (select country from city where career.ground = city.name limit 1) "
				+ " and cities.country != 'India' "
				+ " group by cities.country;"

	return new Promise(function (resolve, reject){
		Career.query(myQuery, function (err, result){
			if(err){
				reject(err);
			} else {
				result = result && result.rows || [];
				resolve(result);
			}
		})
	});
}
