
define([
    'backbone',
    'underscore',
    'text!../templates/project-detail-view-template.html'
], function (Backbone, _, detailTemplate) {

    var ProjectDetailView = Backbone.View.extend({
        initialize: function () {

            var self = this;

            self.render = function (opts) {

                var model = opts.model;
                var $el = opts.el;

                var viewProperties = model.toJSON();
                viewProperties.cid = model.cid;

                var template = _.template(detailTemplate, viewProperties);
                $el.html(template);

                bindClickHandlers(opts);

                slideInDetailView(opts);

                loadSlides(model);
            };

            self.hide = function(opts) {

                unbindClickHandlers();

                var $el = opts.el;
                var animateTime = opts.animateTime;

                $el.animate({
                    left: '100%'
                }, animateTime, function () {
                    $el.hide();
                });
            };

            function bindClickHandlers(opts) {

                var model = opts.model;

                var prevOpts = {};
                _.extend(prevOpts, opts);
                prevOpts.model = model.get('prevProject');
                prevOpts.showPrev = true;

                $('.project-detail-prev').click(function(e) {
                    e.stopPropagation();
                    opts.el.fadeOut(function() {
                        self.render(prevOpts);
                    });
                });

                var nextOpts = {};
                _.extend(nextOpts, opts);
                nextOpts.model = model.get('nextProject');
                nextOpts.showNext = true;

                $('.project-detail-next').click(function(e) {
                    e.stopPropagation();
                    opts.el.fadeOut(function() {
                        self.render(nextOpts);
                    });
                });
            }

            function unbindClickHandlers() {
                $('.project-detail-prev, project-detail-next').unbind('click');
            }

            function slideInDetailView(opts) {

                var $el = opts.el;
                var animateTime = opts.animateTime;

                if (opts.showPrev) {
                    $el.fadeIn();
                } else if (opts.showNext) {
                    $el.fadeIn();
                } else {
                    $el.show();
                    $el.animate({
                        left: '0%'
                    }, animateTime);
                }

            }

            function loadSlides(model) {

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

    //singleton
    return new ProjectDetailView();
});