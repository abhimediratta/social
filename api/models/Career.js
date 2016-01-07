/**
* Career.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	migrate: 'alter',

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

  }
};

