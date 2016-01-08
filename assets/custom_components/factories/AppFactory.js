app.factory('AppFactory', [
		function (){
			var check;
			var factory = {
				setCheck: function(tmp) {
					check = tmp;
				},

				getCheck: function () {
					return check;
				}
			}

			return factory;
			
		}
	]);