
define([
    'backbone',
    'underscore',
    'text!../templates/project-detail-view-template.html'
], function (Backbone, _, detailTemplate) {

    var ProjectDetailView = Backbone.View.extend({
        initialize: function () {

            var self = this;

            var model = self.model;

            self.render = function () {

                var viewProperties = model.toJSON();
                viewProperties.cid = model.cid;

                var template = _.template(detailTemplate, viewProperties);
                self.$el.html(template);
                console.log(model.get('prevProject'));
                console.log(model.get('nextProject'));
                loadSlides();
            };

            function loadSlides() {

                var slidesSrc = model.get('slides');

                var loadedImgs = [];
                _.each(slidesSrc, function(src) {
                    var img = new Image();
                    img.onload = function () {
                        loadedImgs.push(img);
                        if (loadedImgs.length === slidesSrc.length) {
                            displaySlides(loadedImgs);
                        }
                    };
                    img.src = src;
                });
            }

            function displaySlides(loadedImgs) {
                var $slideContainer = self.$el.find('.project-slides-container');

                _.each(loadedImgs, function(img) {
                    var $wrapper = $('<div>').addClass('project-slide');
                    $wrapper.append(img);

                    $slideContainer.append($wrapper);
                });
            }
        }
    });

    return ProjectDetailView;
});