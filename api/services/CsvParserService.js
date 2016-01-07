
var filePath = "/Users/abhimediratta/Downloads/sachin.csv",
	cityFile = "/Users/abhimediratta/MilkyWay/city_db.csv"
	csv = require("fast-csv");


module.exports = {
	parseCsv: function (argument) {
		var records = [];
		
		csv.fromPath(filePath, { headers: true, trim: true})
		.on("data", function (data) {
			
			try {
				var score = data.batting_score,
					batting_score = (!isNaN(parseInt(score)) || undefined) && parseInt(score),
					wickets = (!isNaN(parseInt(data.wickets)) || undefined) && parseInt(data.wickets),
					runs_conceded = (!isNaN(parseInt(data.runs_conceded)) || undefined) && parseInt(data.runs_conceded),
					catches = (!isNaN(parseInt(data.catches)) || undefined) && parseInt(data.catches),
					stumps = (!isNaN(parseInt(data.stumps)) || undefined) && parseInt(data.stumps),
					opposition = data.opposition.replace("v ",""),
					ground = data.ground,
					match_date = new Date(data.date),
					match_result = data.match_result,
					result_margin = data.result_margin,
					margin = (!isNaN(parseInt(data.result_margin)) || undefined) && parseInt(data.result_margin),
					toss = (data.toss === "won" && true) || (data.toss === "lost" && false),
					innings = (!isNaN(parseInt(data.batting_innings)) || undefined) && parseInt(data.batting_innings),
					not_out = (score.indexOf("*") > 0 && true) || false;


				var career = {
					batting_score: batting_score,
					wickets: wickets,
					runs_conceded: runs_conceded,
					catches: catches,
					stumps: stumps,
					opposition: opposition,
					ground: ground,
					match_date: match_date,
					match_result: match_result,
					result_margin: result_margin,
					margin: margin,
					toss: toss,
					innings: innings,
					not_out: not_out
				};
				
				//console.log("data",career);

				records.push(career);
			} catch(e) {
				console.error(e.message)
			}
		})

		.on("end", function () {
			Career.create(records).then(function (careers) {
				sails.log.debug("CsvParserService", careers);
			}).catch(function (err) {
				sails.log.error("CsvParserService", err);
			})
		})
	},

	parseCityCsv: function () {
		var records = [],
			country = ["India", "Australia", "New Zealand"];

		csv.fromPath(cityFile, { headers: true, trim: true})
		.on("data", function (data) {
			//console.log(data);
			if (country.indexOf(data.country_name) > -1) {
				var city = {
					country: data.country_name,
					name: data.city_name
				};

				console.log(city);
				records.push(city);	
			};
			
		})
		.on("end", function () {
			console.log(records.length);
			City.create(records)
			.then(function (all) {
				console.log("done");
			})
			.catch(function (error) {
				console.log("error");
			})
		})
	}
}