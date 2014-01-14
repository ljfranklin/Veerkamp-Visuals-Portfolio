
define([
    'backbone',
    'underscore',
    'text!./templates/resume-template.html'
], function(Backbone, _, resumeTemplate) {

    var ResumeView = Backbone.View.extend({
        initialize: function() {

            var self = this;

            self.render = function() {
                var template = _.template(resumeTemplate, {});
                self.$el.html(template);
            };
            self.render();
        }
    });

    return ResumeView;
});