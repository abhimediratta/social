/**
 * CareerController
 *
 * @description :: Server-side logic for managing Careers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	gerOverallStats: function (req, res) {
		Career.getOverallStats()
		.then(function (result) {
			sails.log.debug("[CareerController.gerOverallStats] result", result);
			return res.json(200, result);
		})
		.catch(function (error) {
			sails.log.error("[CareerController.gerOverallStats]", error);
		})
	},

	getYearlyData: function (req, res) {
		Career.getYearlyData()
		.then(function (result) {
			sails.log.debug("[CareerController.getYearlyData] result", result);
			return res.json(200, result);
		})
		.catch(function (error) {
			sails.log.error("[CareerController.getYearlyData]", error);
		})
	},

	getStatsByMatchResult: function (req, res) {
		Career.getStatsByMatchResult()
		.then(function (result) {
			sails.log.debug("[CareerController.getStatsByMatchResult] result", result);
			return res.json(200, result);
		})
		.catch(function (error) {
			sails.log.error("[CareerController.getStatsByMatchResult]", error);
		})
	},

	getBasicStatsAgainstAustralia: function (req, res) {
		Career.getBasicStatsAgainstAustralia()
		.then(function (result) {
			sails.log.debug("[CareerController.getBasicStatsAgainstAustralia] result", result);
			return res.json(200, result);
		})
		.catch(function (error) {
			sails.log.error("[CareerController.getBasicStatsAgainstAustralia]", error);
		})
	},

	getDetailedStatsAgainstAustralia: function (req, res) {
		Career.getDetailedStatsAgainstAustralia()
		.then(function (result) {
			sails.log.debug("[CareerController.getDetailedStatsAgainstAustralia] result", result);
			return res.json(200, result);
		})
		.catch(function (error) {
			sails.log.error("[CareerController.getDetailedStatsAgainstAustralia]", error);
		})
	},

	getStatsByMatchesInAustralia: function (req, res) {
		Career.getStatsByMatchesInAustralia()
		.then(function (result) {
			sails.log.debug("[CareerController.getStatsByMatchesInAustralia] result", result);
			return res.json(200, result);
		})
		.catch(function (error) {
			sails.log.error("[CareerController.getStatsByMatchesInAustralia]", error);
		})
	},

	getStatsForMatchesOutside: function (req, res) {
		Career.getStatsForMatchesOutside()
		.then(function (result) {
			sails.log.debug("[CareerController.getStatsForMatchesOutside] result", result);
			return res.json(200, result);
		})
		.catch(function (error) {
			sails.log.error("[CareerController.getStatsForMatchesOutside]", error);
		})
	}
};

