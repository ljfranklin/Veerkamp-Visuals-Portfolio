
define([
    './router',
    './contact'
], function(router, contact) {
    var my = {};

    my.init = function() {
        router.init();

        contact.init();
    };

    return my;
});