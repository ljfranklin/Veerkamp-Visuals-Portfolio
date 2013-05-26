
define([
    'backbone',
    'underscore',
    'text!../../templates/project-preview-template.html'
], function(Backbone, _, projectPreviewTemplate) {

    var ProjectPreviewView = Backbone.View.extend({
        initialize: function() {

        },
        render: function() {

            var projectData = this.options.projectJson;
            var img = new Image();
            img.onload = function() {
                console.log("Loaded");
            };
            img.src = projectData.previewImg;

            var template = _.template(projectPreviewTemplate, projectData);
            return template;
        }
    });

    return ProjectPreviewView;
});