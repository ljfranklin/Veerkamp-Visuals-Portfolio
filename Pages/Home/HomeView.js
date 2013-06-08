
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
                $('.parallax-container .layer1').plaxify({"xRange":40,"yRange":40})
                $('.parallax-container .layer2').plaxify({"xRange":20,"yRange":20})
                $.plax.enable();
            }
        }
    });

    return HomeView;
});