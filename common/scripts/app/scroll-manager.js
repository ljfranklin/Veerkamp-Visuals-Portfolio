define([
    './is-mobile',
    '../vendor/iscroll-lite'
], function (isMobile) {

    var self = {};

    var scrollItems = [];

    self.makeScrollable = function ($el) {

        if (useScrollPlugin() === false) {
            return;
        }

        scrollItems.push(
            new iScroll($el[0], {
                hScroll:false})
        );
    };

    self.refresh = function() {

        if (useScrollPlugin() === false) {
            return;
        }

        $.each(scrollItems, function() {
            var item = this;
            item.refresh();
        });
    }

    function useScrollPlugin() {
        return supportsOverflow() === false &&
            isMobilePlatform();
    }

    function supportsOverflow() {
        return typeof $("body")[0]
            .style["-webkit-overflow-scrolling"] !== "undefined";
    }

    function isMobilePlatform() {
        return isMobile.any();
    }

    return self;
});