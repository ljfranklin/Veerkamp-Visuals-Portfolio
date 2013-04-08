define([
    'require'
], function(require) {

    var my = {};
    var PageRouter = Backbone.Router.extend({
        routes: {
            ":page": "getPage",
            "": "getHome"
        }
    });

    my.init = function() {

        var router = new PageRouter();
        router.on('route:getPage', loadPage);
        router.on('route:getHome', function () {
            loadPage('Home');
        });

        Backbone.history.start();
    };

    function loadPage(pageName) {
        var viewScript = '/Pages/' + pageName + '/' + pageName + 'View';
        require([viewScript], function(PageView) {

            var contentArea = $('.main-content');
            var fadeTime = 200;

            contentArea.fadeOut(fadeTime, function() {
                var view = new PageView({
                    el: contentArea
                });
                contentArea.fadeIn(fadeTime);
            });
        });
    }

    return my;
});