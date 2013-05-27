
define([
    'backbone',
    'underscore',
    'text!../templates/project-detail-view-template'
], function (Backbone, _, detailTemplate) {

    var ProjectDetailView = Backbone.View.extend({
        initialize: function () {

            var self = this;

            var model = self.model;

            self.render = function () {

                var viewProperties = model.toJSON();

                var template = _.template(detailTemplate, viewProperties);
                self.$el.html(template);
            };
        }
    });

    return ProjectDetailView;
});