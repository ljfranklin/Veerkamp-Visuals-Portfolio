
define([
    './router'
], function(router) {
    var my = {};

    my.init = function() {
        console.log("init");
        router.init();
    };

    return my;
});