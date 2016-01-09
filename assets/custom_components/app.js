'use strict';

var app = angular.module('app', [
	'ui.router',
	'chart.js',
	'ngMaterial',
	'ngAnimate'
	]);

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('question', {
		url: "/question",
		templateUrl: "/custom_components/templates/question.html",
		controller: "questionCtrl"
	})
	.state('stats', {
		url: "/stats",
		templateUrl: "/custom_components/templates/home.html",
		controller: "homeCtrl"
	});
	

	$urlRouterProvider.otherwise('/question');
});

app.config(["$locationProvider", function($locationProvider) {
	$locationProvider.html5Mode(true);
}]);

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

