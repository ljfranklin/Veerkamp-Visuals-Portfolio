
define([
    'backbone',
    './ProjectModel',
    'text!./data/projects.json'
], function(Backbone, ProjectModel, projectsJsonText) {

    var projectsJson = JSON.parse(projectsJsonText);

    var ProjectCollection = Backbone.Collection.extend({
        initialize: function() {

            var self = this;

            self.model = ProjectModel;

            buildProjectModels();
            function buildProjectModels() {

                var models = [];

                _.each(projectsJson.projects, function(projectJson) {
                    var model = new ProjectModel({
                        projectJson: projectJson
                    });
                    models.push(model);
                });

                self.reset(models);
            }
        }
    });

    return ProjectCollection;
});