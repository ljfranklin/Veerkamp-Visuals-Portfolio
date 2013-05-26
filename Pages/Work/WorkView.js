
define([
    'backbone',
    'underscore',
    'text!./templates/work-template.html',
    './scripts/app/ProjectPreviewView'
], function(Backbone, _, workTemplate, ProjectPreviewView) {

    var projectsJson = JSON.parse(projectsJsonRaw);

    var WorkView = Backbone.View.extend({
        initialize: function() {

            var self = this;

            self.render = function() {

                var template = _.template(workTemplate, {});
                this.$el.html(template);
            };
            self.render();
        }
    });

    function getProjectPreviewViews() {
        var views = [];

        _.each(projectsJson.projects, function(project) {
            var projectPreviewView = new ProjectPreviewView({
                projectJson: project
            });
            views.push(projectPreviewView.render());
        });

        return views;
    }

    return WorkView;
});