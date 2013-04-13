
define([
    'backbone',
    'underscore',
    'text!./templates/about-template.html'
], function(Backbone, _, aboutTemplate) {

    var AboutView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            var template = _.template(aboutTemplate);
            this.$el.html(template);
        }
    });

    return AboutView;
});