
define([

], function() {

    var self = {};
    var modalSelector = '.contact-modal';

    self.init = function() {
        $(document).on('click', '.contact-link', showModal);
        $(document).on('click', '.contact-modal .submit', submitEmail);
    };

    function showModal() {
        $(modalSelector).modal('show');

        $(modalSelector).find('#user-message').val('');
    }

    function submitEmail() {

        var $btn = $(this);

        var $modal = $(modalSelector);

        var userEmail = $modal.find('#user-email').val();
        var userMessage = $modal.find('#user-message').val();

        var originalBtnText = $btn.text();

        $btn.text('Sending...');

        setTimeout(function() {
            console.log(userEmail + ' - ' + userMessage);
            $modal.modal('hide');
            $btn.text(originalBtnText);
        }, 2000);
    }

    return self;
});