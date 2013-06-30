
define([
    'backbone',
    'underscore',
    'text!./templates/about-template.html',
    '../../common/scripts/app/scroll-manager'
], function(Backbone, _, aboutTemplate, scrollManager) {

    var AboutView = Backbone.View.extend({
        initialize: function() {

            var self = this;

            self.render = function() {
                var template = _.template(aboutTemplate);
                self.$el.html(template);
            };
            self.render();
            makeScrollable();

            function makeScrollable() {

                var $container = self.$el.find('.about-container');
                scrollManager.makeScrollable($container);

                var $imgs = $container.find('img');
                $imgs.on('load', function() {
                    scrollManager.refresh();
                });
            }
        }
    });

    return AboutView;
});