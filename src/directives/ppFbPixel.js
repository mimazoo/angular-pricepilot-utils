'use strict';

angular.module('ngPricepilotUtils')
.directive('ppFbPixel', function() {

    function insertFbScript() {
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','//connect.facebook.net/en_US/fbevents.js');
        }

        return {
            link: link,
            restrict: 'EA',
            scope: {
                ev: '@',
                value: '@',
                currency: '@'
            }
        };

        function link(scope) {
            if (!window._fbq) {
                insertFbScript();
                fbq('init', {});
            }

            var ev = scope.ev;
            var value = scope.value || '0.00';
            var currency = scope.currency || 'USD';

            fbq('track', ev, {value: value, currency: currency});

            console.log(["FB conversion", ev, value, currency].join(' '));
        }
    });
