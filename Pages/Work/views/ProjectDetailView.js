
define([
    'backbone',
    'underscore',
    'text!../templates/project-detail-view-template'
], function (Backbone, _, detailTemplate) {

    var ProjectDetailView = Backbone.View.extend({
        initialize: function () {

            var self = this;

            self.render = function () {
                var template = _.template(detailTemplate, {});
                self.$el.html(template);
                console.log("Detail render");
            };
        }
    });

    return ProjectDetailView;
});