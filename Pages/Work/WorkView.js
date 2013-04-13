
define([
    'backbone',
    'underscore',
    'text!./templates/work-template.html'
], function(Backbone, _, workTemplate) {

    var WorkView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            var template = _.template(workTemplate);
            this.$el.html(template);
        }
    });

    return WorkView;
});