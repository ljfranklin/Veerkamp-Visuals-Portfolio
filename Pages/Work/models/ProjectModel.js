
define([

], function() {

    var ProjectModel = Backbone.Model.extend({
        defaults: {
            projectName: null,
            previewImg: null
        },
        initialize: function() {

        }
    });

    return ProjectModel;
});