
define([
    'backbone',
    'underscore',
    './ProjectModel',
    'text!../data/projects.json'
], function(Backbone, _, ProjectModel, projectsJsonText) {

    var projectsJson = JSON.parse(projectsJsonText);

    var ProjectCollection = Backbone.Collection.extend({
        initialize: function() {

            var self = this;

            self.model = ProjectModel;

            buildProjectModels();
            function buildProjectModels() {

                var models = [];

                var prevProject = null;
                _.each(projectsJson.projects, function(projectJson) {
                    var model = new ProjectModel({
                        projectName: projectJson.projectName,
                        previewImg: projectJson.previewImg,
                        tags: projectJson.tags,
                        siteLink: projectJson.siteLink,
                        slides: projectJson.slides,
                        year: projectJson.year,
                        prevProject: prevProject,
                        nextProject: null
                    });

                    if (prevProject) {
                        prevProject.set('nextProject', model);
                    }

                    prevProject = model;

                    models.push(model);
                });

                var firstModel = models[0];
                var lastModel = models[models.length - 1];
                firstModel.set('prevProject', lastModel);
                lastModel.set('nextProject', firstModel);

                self.reset(models);
            }
        }
    });

    return ProjectCollection;
});