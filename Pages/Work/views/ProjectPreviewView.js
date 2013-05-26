
define([
    'backbone',
    'underscore',
    'text!../templates/project-preview-template.html'
], function(Backbone, _, projectPreviewTemplate) {

    var ProjectPreviewView = Backbone.View.extend({
        initialize: function() {

            var self = this;
            var model = self.model;

            var containerSelector = '.project-preview-container[data-project-cid="' + model.cid + '"]';

            self.render = function() {

                var img = new Image();
                img.onload = function() {
                    console.log("Loaded");

                    var $container = $(containerSelector);
                    var $imageContainer = $container.find('.preview-img-container');
                    $imageContainer.append(img);
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