
define([
    'backbone',
    'underscore',
    'text!../templates/project-preview-template.html',
    './ProjectDetailView'
], function(Backbone, _, projectPreviewTemplate, ProjectDetailView) {

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

            $(document).on('click', containerSelector + ' .preview-img-container', function() {
                console.log("swap");

                var detailView = new ProjectDetailView({
                    el: $('.project-breakdown-container'),
                    model: self.model
                });
                detailView.render();

                var animateTime = 500;
                $('.project-breakdown-container').show();

                $('.timeline-container').animate({
                    left: '-100%'
                }, animateTime, function () {
                    $('.timeline-container').hide();
                });
                $('.project-breakdown-container').animate({
                    left: '0%'
                }, animateTime);
            });

            $(document).on('click', '.project-detail-container', function () {
                var animateTime = 500;
                $('.timeline-container').show();
                $('.timeline-container').animate({
                    left: '0'
                }, animateTime);
                $('.project-breakdown-container').animate({
                    left: '100%'
                }, animateTime, function () {
                    $('.project-breakdown-container').hide();
                });
            });
        }
    });

    return ProjectPreviewView;
});