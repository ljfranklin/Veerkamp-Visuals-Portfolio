
define([
    'backbone',
    'underscore',
    'text!../templates/project-detail-view-template.html'
], function (Backbone, _, detailTemplate) {

    var ProjectDetailView = Backbone.View.extend({
        initialize: function () {

            var self = this;

            var navAnimateTime = 200;

            self.render = function (opts) {

                var model = opts.model;
                var $el = opts.el;

                var viewProperties = model.toJSON();
                viewProperties.cid = model.cid;

                var template = _.template(detailTemplate, viewProperties);
                //$el.html(template);

                slideInDetailView(opts, template);

                loadSlides(model);

                bindClickHandlers(opts);
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
                $.extend(true, prevOpts, opts);
                prevOpts.model = model.get('prevProject');
                prevOpts.showNext = false;
                prevOpts.showPrev = true;

                $('.project-detail-prev').click(function(e) {
                    e.stopPropagation();
                    self.render(prevOpts);
                });

                var nextOpts = {};
                $.extend(true, nextOpts, opts);
                nextOpts.model = model.get('nextProject');
                nextOpts.showNext = true;
                nextOpts.showPrev = false;

                $('.project-detail-next').click(function(e) {
                    e.stopPropagation();
                    self.render(nextOpts);
                });
            }

            function unbindClickHandlers() {
                $('.project-detail-prev, project-detail-next').unbind('click');
            }

            function slideInDetailView(opts, template) {

                var $el = opts.el;
                var animateTime = opts.animateTime;

                if (opts.showPrev || opts.showNext) {
                    switchProject(opts, template);
                } else {

                    $el.html(template);
                    setupNav();

                    $el.show();
                    $el.animate({
                        left: '0%'
                    }, animateTime);
                }
            }

            function switchProject(opts, template) {

                var $el = $(opts.el.selector);
                var animateTime = opts.animateTime;

                var startingPos = opts.showNext ? '100%' : '-100%';
                var endPos = opts.showNext ? '-100%' : '100%';

                var $newBreakdownArea = $('<div>').addClass('project-breakdown-container');
                $newBreakdownArea.css('left', '0').css('top', startingPos);

                $newBreakdownArea.html(template);
                $newBreakdownArea.insertBefore($el);

                setupNav();

                $newBreakdownArea.show();

                $newBreakdownArea.animate({
                    top: '0%'
                }, animateTime);

                $el.animate({
                    top: endPos
                },
                animateTime,
                function () {
                    $el.remove();
                });
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

            function setupNav() {

                showFirstSpan(true);

                $('.project-nav li').hover(function() {
                    var $li = $(this);
                    var $span = $li.find('span');

                    var $otherSpans = $('.project-nav span').not($span);
                    hideSpan($otherSpans);

                    showSpan($span);
                }, function() {
                    showFirstSpan(false);
                });
            }

            function showFirstSpan(immediate) {

                var time = immediate ? 0 : navAnimateTime;
                var $firstLi = $('.project-nav li:first-child > span');

                showSpan($firstLi);

                var $otherSpans = $('.project-nav span').not($firstLi);
                $otherSpans.stop();
                $otherSpans.animate({
                    width: '0'
                }, time, function() {
                    $(this).hide();
                });
            }

            function hideSpan($span) {
                $span.stop();
                $span.animate({
                    width: '0'
                }, navAnimateTime, function() {
                    $span.hide();
                });
            }

            function showSpan($span) {
                $span.stop();

                $span.show();
                $span.animate({
                    width: '30px'
                }, navAnimateTime);
            }
        }
    });

    //singleton
    return new ProjectDetailView();
});