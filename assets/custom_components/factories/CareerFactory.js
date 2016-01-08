app.factory('CareerFactory', ['$http', '$q',
		function ($http, $q){
			var factory = {
				getOverallStats: function () {
					var deferred = $q.defer();

					$http.get('/api/v1/getOverallStats').then(function(data){
						deferred.resolve(data.data);
					},function(err){
						deferred.reject(err.data);
						console.log(err);
					});

					return deferred.promise;
				},

				getYearlyData: function () {
					var deferred = $q.defer();

					$http.get('/api/v1/getYearlyData').then(function(data){
						deferred.resolve(data.data);
					},function(err){
						deferred.reject(err.data);
						console.log(err);
					});

					return deferred.promise;
				},

				getStatsByMatchResult: function () {
					var deferred = $q.defer();

					$http.get('/api/v1/getStatsByMatchResult').then(function(data){
						deferred.resolve(data.data);
					},function(err){
						deferred.reject(err.data);
						console.log(err);
					});

					return deferred.promise;
				},

				getBasicStatsAgainstAustralia: function () {
					var deferred = $q.defer();

					$http.get('/api/v1/getBasicStatsAgainstAustralia').then(function(data){
						deferred.resolve(data.data);
					},function(err){
						deferred.reject(err.data);
						console.log(err);
					});

					return deferred.promise;
				},

				getDetailedStatsAgainstAustralia: function () {
					var deferred = $q.defer();

					$http.get('/api/v1/getDetailedStatsAgainstAustralia').then(function(data){
						deferred.resolve(data.data);
					},function(err){
						deferred.reject(err.data);
						console.log(err);
					});

					return deferred.promise;
				},

				getStatsByMatchesInAustralia: function () {
					var deferred = $q.defer();

					$http.get('/api/v1/getStatsByMatchesInAustralia').then(function(data){
						deferred.resolve(data.data);
					},function(err){
						deferred.reject(err.data);
						console.log(err);
					});

					return deferred.promise;
				},

				getStatsForMatchesOutside: function () {
					var deferred = $q.defer();

					$http.get('/api/v1/getStatsForMatchesOutside').then(function(data){
						deferred.resolve(data.data);
					},function(err){
						deferred.reject(err.data);
						console.log(err);
					});

					return deferred.promise;
				},
			}

			return factory;
			
		}
	]);