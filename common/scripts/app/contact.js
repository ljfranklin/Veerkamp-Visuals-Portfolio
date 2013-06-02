
define([

], function() {

    var self = {};

    self.init = function() {
        $(document).on('click', '.contact-link', showModal);
    };

    function showModal() {
        $('.contact-modal').modal('show');
    }

    return self;

});