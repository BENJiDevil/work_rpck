function send_form(id) {
    var e = $('#'+id+'').serialize();
    var validateCheck = true;
    $('#'+id+'').find('input.required').each(function(){
        if($(this).val() && $(this).val() != ''){
            $(this).removeClass('validate');
        } else {
            $(this).addClass('validate');
            validateCheck = false;
        }
    });
    if($('#'+id+'').find('input[name="check"]').prop('checked') != true){
        validateCheck = false;
        $('#'+id+'').find('.requires-info').slideDown('fast');
    }
    else{
        $('#'+id+'').find('.requires-info').slideUp('fast');
    }
    if (validateCheck) {
        $.ajax({
            type: "POST",
            url: "include/send.php",
            data: e,
            success: function(e) {
                $('#'+id+'').find('input').not('.d-none').removeClass('error-input');
                var magnificPopup = $.magnificPopup.instance;
                magnificPopup.close();
                setTimeout(function() {
                    $.magnificPopup.open({
                        items: {src: '#thanks_modal'},
                        type: 'inline',
                        fixedContentPos: true,
                        fixedBgPos: true,
                        closeBtnInside: true,
                        midClick: true,
                        tClose: 'Закрыть',
                        mainClass: 'my-mfp-zoom-in'
                    });
                }, 500);
            },
            error: function(e, c) {
                alert("Error: Ошибка отправки");
            }
        });
    } else {
        $('#'+id+'').find('input').not('.d-none').removeClass('error-input');
        $('#'+id+'').find('.validate').addClass('error-input');
    }
}
/* second close button */
/*
$('.close-modal').click(function () {
    var magnificPopup = $.magnificPopup.instance;
    magnificPopup.close();
});
 */