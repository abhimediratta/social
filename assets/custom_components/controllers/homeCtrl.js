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

		$scope.statsByMatchResult = [];

		if (AppFactory.getCheck()) {
			$scope.message = "Well, let's see what the numbers have to say about it";
		} else {
			$scope.message = "Are you crazy!? Just see the numbers";
		}

		CareerFactory.getOverallStats().then(function (response) {
			$scope.overAllStats = response;
		});

		CareerFactory.getYearlyData().then(function (response) {
			handleYearlyData(response);
		});

		CareerFactory.getStatsByMatchResult().then(function (response) {
			$scope.statsByMatchResult = response;
		});

		function handleYearlyData (response) {
			var labels = [],
				data = [];
			for (var i = 0; i < response.length; i++) {
				labels.push(response[i].match_year);
				data.push(response[i].batting_average);
			};

			$scope.averageYearlyData.labels = labels;
			$scope.averageYearlyData.data = [data];
		}

	}
	]);