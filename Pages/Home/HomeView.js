
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

                $('.parallax-container').mouseleave(function() {
                    var animateTime = 300;
                    $('.parallax-container img').animate({
                        left: '0',
                        top: '0'
                    }, animateTime);    
                });
                
            }
        }
    });

    return HomeView;
});