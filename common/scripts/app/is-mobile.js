define([

], function() {

    var isMobile = {
        Android: function() {
            return (navigator.userAgent.match(/Android/i) !== null);
        },
        BlackBerry: function() {
            return (navigator.userAgent.match(/BlackBerry/i) !== null);
        },
        iOS: function() {
            return (navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null);
        },
        Opera: function() {
            return (navigator.userAgent.match(/Opera Mini/i) !== null);
        },
        Windows: function() {
            return (navigator.userAgent.match(/IEMobile/i) !== null);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    return isMobile;
});