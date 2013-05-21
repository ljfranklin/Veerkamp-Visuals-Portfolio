
define([

], function() {

    var ProjectModel = Backbone.Model.extend({
        initialize: function() {

        },
        constructor: function (models, options) {

            Backbone.Collection.prototype.constructor.apply(this, arguments);
            var jsonData = options.jsonData;
            var quoteModels = getQuoteModelsFromJson(jsonData);
            this.reset(quoteModels);
        }
    });

    function getProjectModelFromJson(jsonData) {

    }

    return ProjectModel;
});