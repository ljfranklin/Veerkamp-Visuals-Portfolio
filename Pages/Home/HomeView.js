
define([
    'backbone',
    'underscore',
    'text!./templates/home-template.html',
    'common/scripts/vendor/plax'
], function(Backbone, _, homeTemplate) {

    var HomeView = Backbone.View.extend({
        initialize: function() {

            var self = this;

            var fadeColor = '#111';

            render();
            initParallax();

            function render() {
                var template = _.template(homeTemplate);
                self.$el.html(template);

                addHoverEvents();
                fadeOutHeaders();
            }

            function initParallax() {
                $('.parallax-container img').plaxify();
                $.plax.enable({ 
                    "activityTarget": $('.parallax-container')
                });

                $('.parallax-container').mouseleave(function() {
                     var animateTime = 300;
                     $('.parallax-container img').animate({
                         left: '0',
                         top: '0'
                     }, animateTime);
                });
                
            }

            function fadeOutHeaders() {
                $('.home-content-titles-container li').css('color', fadeColor);
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

                saveOriginalColors($textEl);

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

                var opacity = shouldFade ? 0.7 : 1.0;
                var zIndex = shouldFade ? -1 : 99;

                $text.css('z-index', zIndex);

                var $spans = $text.find('span');
                $spans = $spans.add($text);

                $spans.each(function() {
                    var $span = $(this);

                    $span.stop(true);

                    var origColor = $span.data('orig-color');
                    var color = shouldFade ? '#111' : origColor;

                    $span.animate({
                        'color': color,
                        'opacity': opacity
                    }, animateTime);
                });

            }

            function saveOriginalColors($content) {

                var $spans = $content.find('span');
                $spans = $spans.add($content);

                $spans.each(function() {
                    var $span = $(this);

                    var currColor = $span.css('color');
                    $span.data('orig-color', currColor);
                });
            }
        }
    });

    return HomeView;
});