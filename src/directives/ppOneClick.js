'use strict';

angular.module('ngPricepilotUtils')
.directive('ppOneClick', function ($q) {
	return {
		restrict: 'A',
		link: function(scope,element,attrs) {
			var expression = attrs['ppOneClick'];
			var disabledClass = attrs['disabled-class'];

			function isStateEnabled() {
				return !element[0].disabled;
			}

			function setDisabledState () {
				element[0].disabled = true;
				element.addClass(disabledClass);
			}

			function setEnabledState () {
				element[0].disabled = false;
				element.removeClass(disabledClass);
			}

			element.on('click', function() {
				var working = false;
				
				if(isStateEnabled()) {
					working = true;
					setDisabledState();

					var unregisterWatcher = scope.$watch(isStateEnabled,
					 function(_isStateEnabled){
					 	if (_isStateEnabled) {
					 		if (working) {
								setDisabledState();
							} else {
								unregisterWatcher();
							}
					 	}
					});

					$q.when(scope.$apply(expression), function () {
						// success
						working = false;
						setEnabledState();
					}, function () {
						// error
						working = false;
						setEnabledState();
					});

				}
			});
		}
	};
});
