
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

            $(".home-content-links .work").hover(function() {
                //hover in
                fadeOutHeader();
            }, function () {
                //hover out
                fadeInHeader();
            });

            function fadeOutHeader() {
                fadeHeader(true);
            }

            function fadeInHeader() {
                fadeHeader(false);
            }

            function fadeHeader(shouldFade) {
                var $header = $('.home-content-header');
                var animateTime = 500;

                var opacity = shouldFade ? 0.4 : 1.0;

                $header.animate({
                    opacity: opacity
                }, animateTime);

                //$header.find('span').css('color', '#222');
            }
        }
    });

    return HomeView;
});