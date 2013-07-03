
define([
    'backbone',
    'underscore',
    'text!../templates/project-detail-view-template.html',
    '../../../common/scripts/app/scroll-manager'
], function (Backbone, _, detailTemplate, scrollManager) {

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

                slideInDetailView(opts, template);

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

                    loadSlides(opts.model, $el);
                    setupNav();
                    scrollToTop($el);

                    $el.show();
                    $el.animate({
                        left: '0%'
                    }, animateTime);

                    scrollManager.makeScrollable($el);
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
                scrollToTop($newBreakdownArea);

                $newBreakdownArea.show();

                scrollManager.makeScrollable($newBreakdownArea);

                loadSlides(opts.model, $newBreakdownArea);

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

            function loadSlides(model, $el) {

                var slidesSrc = model.get('slides');

                var loadedImgs = [];
                _.each(slidesSrc, function(src, index) {
                    var img = new Image();
                    img.onload = function () {
                        loadedImgs[index] = img;
                        if (loadedImgs.length === slidesSrc.length) {
                            displaySlides(loadedImgs, $el);
                        }
                    };
                    img.src = src;
                });
            }

            function displaySlides(loadedImgs, $el) {

                var $slideContainer = $el.find('.project-slides-container');

                var $spinner = $el.find('.icon-spinner');
                $spinner.hide();

                _.each(loadedImgs, function(img) {
                    var $wrapper = $('<div>').addClass('project-slide');
                    $wrapper.append(img);

                    $slideContainer.append($wrapper);
                });
                scrollManager.refresh();
            }

            function setupNav() {

                showFirstSpan(true);

                $('.project-nav li').hover(function() {
                    var $li = $(this);
                    var $span = $li.find('.nav-inner');

                    var $otherSpans = $('.project-nav .nav-inner').not($span);
                    hideSpan($otherSpans);

                    showSpan($span);
                }, function() {
                    showFirstSpan(false);
                });
            }

            function showFirstSpan(immediate) {

                var time = immediate ? 0 : navAnimateTime;
                var $firstLi = $('.project-nav li:first-child .nav-inner');

                showSpan($firstLi);

                var $otherSpans = $('.project-nav .nav-inner').not($firstLi);
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
                    width: '62px'
                }, navAnimateTime);
            }

            function scrollToTop($el) {
                var animateTime = 500;

                var $btn = $el.find('.scroll-up');
                $btn.click(function() {
                    scrollManager.scrollToTop($el, animateTime);
                });
            }
        }
    });

    //singleton
    return new ProjectDetailView();
});