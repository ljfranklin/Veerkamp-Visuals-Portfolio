
define([
    'backbone',
    'underscore',
    'text!./templates/home-template.html',
    'common/scripts/vendor/plax'
], function(Backbone, _, homeTemplate) {

    var HomeView = Backbone.View.extend({
        initialize: function() {

            var self = this;

            render();
            initParallax();

            function render() {
                var template = _.template(homeTemplate);
                self.$el.html(template);

                addHoverEvents();
            }

            function initParallax() {
                $('.parallax-container img').plaxify();
                $.plax.enable({ 
                    "activityTarget": $('.parallax-container')
                });

                // $('.parallax-container').mouseleave(function() {
                //     var animateTime = 300;
                //     $('.parallax-container img').animate({
                //         left: '0',
                //         top: '0'
                //     }, animateTime);    
                // });
                
            }

            function addHoverEvents() {
                wireHoverEvent($('.home-content-links li a'),
                    $('.home-content-header'),
                    true);

                wireHoverEvent($('.home-content-links .work'),
                    $('.home-content-title-work'));
                wireHoverEvent($('.home-content-links .about'),
                    $('.home-content-title-about'));
                wireHoverEvent($('.home-content-links .blog'),
                    $('.home-content-title-blog'));
            }

            function wireHoverEvent($hoverEl, $textEl, shouldReverse) {

                var shouldFade = false;
                if (shouldReverse) {
                    shouldFade = true;
                }

                $hoverEl.hover(function() {
                    fadeHeader(shouldFade, $textEl);
                }, function () {
                    fadeHeader(!shouldFade, $textEl);
                });
            }

            function fadeHeader(shouldFade, $text) {
                var animateTime = 500;

                var opacity = shouldFade ? 0.4 : 1.0;
                var zIndex = shouldFade ? 0 : 99;
                $text.stop(true);
                $text.animate({
                    'opacity': opacity,
                    'z-index': zIndex,
                    'color': 'yellow'
                }, animateTime);

                //$text.find('span').css('color', 'red');
            }
        }
    });

    return HomeView;
});