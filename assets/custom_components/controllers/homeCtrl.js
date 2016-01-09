app.controller('homeCtrl', [
	'$scope',
	'AppFactory',
	'CareerFactory',
	function ($scope, AppFactory, CareerFactory) {
		Chart.defaults.global.responsive = true;
		console.log("in homeCtrl");
		$scope.overAllStats = {};
		$scope.averageYearlyData = {
			labels: [],
			data: [],
			series: ["Batting average"]
		};

		$scope.runsYearlyData = {
			labels: [],
			data: [],
			series: ["Runs scored over the years"]
		}

		$scope.statsByMatchResult = [];

		$scope.statsAgainstAustralia = {};

		$scope.statsInAustralia = {};

		if (AppFactory.getCheck()) {
			$scope.message = "Well, let's see what the numbers have to say about it";
		} else {
			$scope.message = "Are you crazy!? Just see the numbers";
		}

		CareerFactory.getOverallStats().then(function (response) {
			$scope.overAllStats = response;
		});

		CareerFactory.getYearlyData().then(handleYearlyData);

		CareerFactory.getStatsByMatchResult().then(function (response) {
			$scope.statsByMatchResult = response;
		});

		CareerFactory.getBasicStatsAgainstAustralia().then(function (response) {
			$scope.statsAgainstAustralia = response;
		});

		CareerFactory.getStatsByMatchesInAustralia().then(function (response) {
			$scope.statsInAustralia = response;
		});

		function handleYearlyData (response) {
			var labels = [],
				data = [],
				runs = [];
			for (var i = 0; i < response.length; i++) {
				labels.push(response[i].match_year);
				data.push(response[i].batting_average);
				runs.push(response[i].total_runs);
			};

			$scope.averageYearlyData.labels = labels;
			$scope.runsYearlyData.labels = labels;
			$scope.runsYearlyData.data = [runs];
			$scope.averageYearlyData.data = [data];
		}

	}
	]);