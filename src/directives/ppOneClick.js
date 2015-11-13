'use strict';

angular.module('ngPricepilotUtils')
.directive('ppOneClick', function ($q) {
	return {
		restrict: 'A',
		link: function(scope,element,attrs) {
			var expression = attrs['ppOneClick'];
			var disabledClass = attrs['disabledClass'];
			
			function isStateDisabled() {
				return element[0].disabled;
			}

			function setDisabled(isDisabled) {
				if (isDisabled) {
					element.addClass(disabledClass);
				} else {
					element.removeClass(disabledClass);
				}

				element[0].disabled = isDisabled;
			}

			element.on('click', function() {
				var isRealStateDisabled = isStateDisabled();
				setDisabled(true);

				var unregisterWatcher = scope.$watch(isStateDisabled,
						function(isNewStateDisabled){
				 	if (!isNewStateDisabled) {
						setDisabled(true);
				 	}
				});

				var unregisterWatcherForNgDisabled = undefined;
				if (attrs.ngDisabled) {
					unregisterWatcherForNgDisabled = scope.$watch(attrs.ngDisabled,
							function(isNewStateDisabled) {
						isRealStateDisabled = isNewStateDisabled;
					});
				}

				$q.when(scope.$apply(expression), function() {
					unregisterWatcher();
					setDisabled(isRealStateDisabled);

					if (undefined !== unregisterWatcherForNgDisabled) {
						unregisterWatcherForNgDisabled();
					}
				});
			});
		}
	};
});
