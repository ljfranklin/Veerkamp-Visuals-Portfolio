
define([
    'backbone',
    'underscore',
    'text!../templates/project-preview-template.html',
    './ProjectDetailView',
    '../../../common/scripts/app/scroll-manager'
], function(Backbone, _, projectPreviewTemplate, detailViewInstance, scrollManager) {

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

                    scrollManager.refresh();
                };
                img.src = model.get('previewImg');

                var templateData = model.toJSON();
                templateData.cid = model.cid;

                var template = _.template(projectPreviewTemplate, templateData);
                self.$el.append(template);

                bindHoverEvent();
            };

            function bindHoverEvent() {

                var $container = $(containerSelector);
                var $leftCorner = $container.find('.left-corner');
                var $rightCorner = $container.find('.right-corner');

                $container.hover(function () {
                    $leftCorner.add($rightCorner).stop(true);
                    $leftCorner.animate({
                        'border-right-width': '500px'
                    }, animateTime);
                    $rightCorner.animate({
                        'border-left-width': '500px'
                    }, animateTime);

                    var $hoverDetail = $container.find('.hover-detail');
                    $hoverDetail.stop(true);

                    $hoverDetail.animate({
                       'opacity': 1.0
                    });

                }, function() {
                    $leftCorner.add($rightCorner).stop(true);
                    $leftCorner.animate({
                        'border-right-width': '60px'
                    }, animateTime);
                    $rightCorner.animate({
                        'border-left-width': '60px'
                    }, animateTime);

                    var $hoverDetail = $container.find('.hover-detail');
                    $hoverDetail.stop(true);

                    $hoverDetail.animate({
                        'opacity': 0
                    });
                });
            }

            $(document).on('click', containerSelector, function() {

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

                scrollManager.refresh();
            });
        }
    });

    return ProjectPreviewView;
});