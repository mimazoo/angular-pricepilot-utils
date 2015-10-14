'use strict';

angular.module('ngPricepilotUtils')
.directive('ppOneClick', function ($q) {
	return {
		restrict: 'A',
		link: function(scope,element,attrs) {
			var working = undefined;
			var expression = attrs['ppOneClick'];
			var disabledClass = attrs['disabled-class'];

			function set () {
				working = element[0].disabled = true;
				element.addClass(disabledClass);
			}

			function unset () {
				working = element[0].disabled = false;
				element.removeClass(disabledClass);
			}

			element.on('click', function() {
				if(!working) {
					set();

					$q.when(scope.$apply(expression), function () {
						// success
						unset();
					}, function () {
						// error
						unset();
					});
				}
			});
		}
	};
});
