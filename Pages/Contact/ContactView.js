
define([
    'backbone',
    'underscore',
    'text!./templates/contact-template.html'
], function(Backbone, _, contactTemplate) {

    var ContactView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            var template = _.template(contactTemplate);
            this.$el.html(template);
        }
    });

    return ContactView;
});