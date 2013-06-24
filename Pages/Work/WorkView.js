
define([
    'backbone',
    'underscore',
    'text!./templates/work-template.html',
    './models/ProjectCollection',
    './views/ProjectPreviewView'
], function(Backbone, _, workTemplate, ProjectCollection, ProjectPreviewView) {

    var WorkView = Backbone.View.extend({
        initialize: function() {

            var self = this;

            var projectCollection = new ProjectCollection();

            self.render = function() {
                var template = _.template(workTemplate, {});
                self.$el.html(template);

                renderProjectPreviewViews();
            };
            self.render();

            function renderProjectPreviewViews() {

                var $previewContainer = self.$el.find('.work-content-area');
                var prevYear = null;

                projectCollection.forEach(function(projectModel) {
                    var projectPreviewView = new ProjectPreviewView({
                        model: projectModel,
                        el: $previewContainer
                    });

                    var year = projectModel.get('year');
                    if (year !== prevYear) {
                        renderYear(year, $previewContainer);
                        prevYear = year;
                    }

                    projectPreviewView.render();
                });
            }

            function renderYear(year, $el) {
                var $yearContainer = $('<div>')
                    .addClass('year-container')
                    .html(year);
                $el.append($yearContainer);
            }
        }
    });

    return WorkView;
});