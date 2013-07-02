
define([
    'backbone',
    'underscore',
    'text!./templates/resume-template.html',
    '../../common/scripts/app/scroll-manager'
], function(Backbone, _, resumeTemplate, scrollManager) {

    var ResumeView = Backbone.View.extend({
        initialize: function() {

            var self = this;

            self.render = function() {
                var template = _.template(resumeTemplate, {});
                self.$el.html(template);
            };
            self.render();
            makeScrollable();

            function makeScrollable() {
                var $wrapper = $('.res-content-wrapper');
                scrollManager.makeScrollable($wrapper);

                $wrapper.find('img').on('load', function() {
                    scrollManager.refresh();
                });
            }
        }
    });

    return ResumeView;
});