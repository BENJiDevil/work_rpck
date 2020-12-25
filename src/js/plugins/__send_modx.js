/* remove message success */
$(document).ready(function() {
    AjaxForm.Message.success = function() {};
});

/* replace complete function on send */
$(document).on('af_complete', function(event, response) {
    if(response.success){
        var magnificPopup = $.magnificPopup.instance;
        magnificPopup.close();
        setTimeout(function() {
            $.magnificPopup.open({
                items: {
                    src: '#thanks_modal'
                },
                type: 'inline',
                fixedContentPos: true,
                fixedBgPos: true,
                closeBtnInside: true,
                midClick: true,
                removalDelay: 300,
                tClose: 'Закрыть',
                mainClass: 'my-mfp-zoom-in',
                image: {
                    tError: 'Невозможно загрузить :('
                },
                ajax: {
                    tError: 'Невозможно загрузить :('
                }
            });
        }, 500);
    }
});