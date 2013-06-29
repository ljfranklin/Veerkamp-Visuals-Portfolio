
define([

], function() {

    var self = {};
    var modalSelector = '.contact-modal';

    var animateTime = 500;
    var thanksDelay = 2000;

    self.init = function() {
        $(document).on('click', '.nav-link-contact', showModal);
        $(document).on('click', '.modal-background', hideModal);
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
            function() {
                if (typeof callback === 'function') {
                    callback();
                }
            });
    }

    function submitEmail() {

        var $btn = $(this);

        if ($btn.hasClass('disabled')) {
            return;
        }

        var $modal = $(modalSelector);

        var userEmail = $modal.find('#user-email').val();
        var userMessage = $modal.find('#user-message').val();

        var originalBtnText = $btn.text();

        $btn.data('original-text', $btn.text())
            .text('Sending...')
            .addClass('disabled');

        var mailRequest = $.ajax({
            url: './server/contact-form-handler.php',
            type: 'post',
            data: {
                emailAddress: userEmail,
                message: userMessage
            }
        });

        $.when(mailRequest).done(function(result) {

            console.log(result);

            if (result === '1') {
                displayError($btn);
                return;
            }

            flipContactModal();
            setTimeout(function() {
                hideModal(function() {
                    flipContactModal();
                    $btn.text($btn.data('original-text'))
                        .removeClass('disabled');
                });
            }, thanksDelay);
        });
    }

    function displayError($btn) {

        $btn.text('Error, retry')
            .addClass('btn-danger')
            .addClass('disabled');

        setTimeout(function() {

            $btn.text($btn.data('original-text'))
                .removeClass('btn-danger')
                .removeClass('disabled');
        }, 2000);
    }

    return self;
});