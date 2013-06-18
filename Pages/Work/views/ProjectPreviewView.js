
define([
    'backbone',
    'underscore',
    'text!../templates/project-preview-template.html',
    './ProjectDetailView'
], function(Backbone, _, projectPreviewTemplate, detailViewInstance) {

    var ProjectPreviewView = Backbone.View.extend({
        initialize: function() {

            var self = this;
            var model = self.model;
            var animateTime = 500;

            var views = [];

            var containerSelector = '.project-preview-container[data-project-cid="' + model.cid + '"]';

            self.render = function() {

                var img = new Image();
                img.onload = function() {

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

                detailViewInstance.render({
                    el: $('.project-breakdown-container'),
                    model: self.model,
                    animateTime: animateTime
                });

                $('.timeline-container').animate({
                    left: '-100%'
                }, animateTime, function () {
                    $('.timeline-container').hide();
                });
            });

            var projectDetailContainer = '.project-detail-container[data-model-cid="' + model.cid +  '"] .project-detail-back';
            $(document).on('click', projectDetailContainer, function () {

                $('.timeline-container').show();
                $('.timeline-container').animate({
                    left: '0'
                }, animateTime);

                detailViewInstance.hide({
                    el: $('.project-breakdown-container'),
                    animateTime: animateTime
                });
            });
        }
    });

    return ProjectPreviewView;
});