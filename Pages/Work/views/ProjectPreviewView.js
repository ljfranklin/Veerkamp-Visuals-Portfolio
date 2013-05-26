
define([
    'backbone',
    'underscore',
    'text!../templates/project-preview-template.html'
], function(Backbone, _, projectPreviewTemplate) {

    var ProjectPreviewView = Backbone.View.extend({
        initialize: function() {

            var self = this;
            var model = self.model;

            self.render = function() {

                var img = new Image();
                img.onload = function() {
                    console.log("Loaded");
                };
                img.src = model.get('previewImg');

                var templateData = model.toJSON();
                templateData.cid = model.cid;

                var template = _.template(projectPreviewTemplate, templateData);
                self.$el.append(template);
            };


        }
    });

    return ProjectPreviewView;
});