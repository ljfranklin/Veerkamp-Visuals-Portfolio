define([

], function() {

    var my = {};
    var PageRouter = Backbone.Router.extend({
        routes: {
            ":page": "getPage",
            "": "getHome"
        }
    });

    my.init = function() {


        var router = new ReportRouter();
        router.on('route:getPage', loadReport);
        router.on('route:getHome', function () {
            loadPage('Home');
        });

        Backbone.history.start();
    };

    function loadPage(pageName) {

    }

    return my;
});