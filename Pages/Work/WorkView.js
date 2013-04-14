
define([
    'backbone',
    'underscore',
    'text!./templates/work-template.html',
    './scripts/app/ProjectPreviewView',
    'text!./data/projects.json'
], function(Backbone, _, workTemplate, ProjectPreviewView, projectsJsonRaw) {

    var projectsJson = JSON.parse(projectsJsonRaw);

    var WorkView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {

            var template = _.template(workTemplate, {
                projectPreviewViews: getProjectPreviewViews()
            });
            this.$el.html(template);
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