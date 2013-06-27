
define([

], function() {

    var self = {};
    var modalSelector = '.contact-modal';

    var animateTime = 400;
    var thanksDelay = 4000;

    self.init = function() {
        $(document).on('click', '.nav-link-contact', showModal);
        $(document).on('click', '.contact-modal .submit', submitEmail);
    };

    function showModal() {
        $('.modal-wrapper').fadeIn(animateTime);

        $(modalSelector).find('#user-message').val('');
    }

    function flipContactModal() {
        $('.contact-modal').toggleClass('flip');
    }

    function hideModal(callback) {
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
            console.log(data);
            flipContactModal();
            setTimeout(function() {
                hideModal(function() {
                    flipContactModal();
                });
            }, thanksDelay);
        });
    }

    return self;
});