
define([
    'backbone',
    'underscore',
    'text!./templates/home-template.html'
], function(Backbone, _, homeTemplate) {

    var HomeView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            var template = _.template(homeTemplate);
            this.$el.html(template);
        }
    });

    return HomeView;
});