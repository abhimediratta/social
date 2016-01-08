app.controller('questionCtrl', [
	'$scope',
	'$location',
	'AppFactory',
	function ($scope, $location, AppFactory) {
		console.log("in questionCtrl");
		$scope.handleAnswer = function (yes) {
			AppFactory.setCheck(yes);

			$location.path("stats");
		}
	}
	]);