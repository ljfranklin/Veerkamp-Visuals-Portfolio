
define([
    'backbone',
    'underscore',
    'text!./templates/about-template.html'
], function(Backbone, _, aboutTemplate) {

    var AboutView = Backbone.View.extend({
        initialize: function() {

            var self = this;

            self.render = function() {
                var template = _.template(aboutTemplate);
                self.$el.html(template);
            };
            self.render();
        }
    });

    return AboutView;
});