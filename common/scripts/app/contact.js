
define([

], function() {

    var self = {};
    var modalSelector = '.contact-modal';

    var animateTime = 500;
    var thanksDelay = 4000;

    self.init = function() {
        $(document).on('click', '.nav-link-contact', showModal);
        $(document).on('click', '.contact-modal .submit', submitEmail);
    };

    function showModal() {
        $('.modal-wrapper').fadeIn(animateTime);
        $('.modal-background').fadeTo(animateTime, 0.6);

        $(modalSelector).find('#user-message').val('');
    }

    function flipContactModal() {
        $('.contact-modal').toggleClass('flip');
    }

    function hideModal(callback) {
        $('.modal-background').fadeOut(animateTime);
        $('.modal-wrapper').fadeOut(
            animateTime,
            callback);
    }

    function submitEmail() {

        var $btn = $(this);

        var $modal = $(modalSelector);

        var userEmail = $modal.find('#user-email').val();
        var userMessage = $modal.find('#user-message').val();

        var originalBtnText = $btn.text();

        $btn.data('original-text', $btn.text());
        $btn.text('Sending...');

        var mailRequest = $.ajax({
            url: './server/info.php',
            type: 'post',
            data: {
                emailAddress: userEmail,
                message: userMessage
            }
        });

        $.when(mailRequest).done(function(data) {
            flipContactModal();
            setTimeout(function() {
                hideModal(function() {
                    flipContactModal();
                    $btn.text($btn.data('original-text'));
                });
            }, thanksDelay);
        });
    }

    return self;
});