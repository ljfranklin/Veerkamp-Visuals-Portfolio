
define([

], function() {

    var ProjectModel = Backbone.Model.extend({
        defaults: {
            projectName: null,
            previewImg: null,
            tags: null,
            siteLink: null,
            slides: null,
            prevProject: null,
            nextProject: null
        },
        initialize: function() {

        }
    });

    return ProjectModel;
});