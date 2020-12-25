function send_withfile(id) {
    var formData = new FormData($('#'+id+'')[0]);
    var validateCheck = true;
    $('#'+id+'').find('input.required').each(function(){
        if($(this).val() && $(this).val() != ''){
            $(this).removeClass('validate');
        } else {
            $(this).addClass('validate');
            validateCheck = false;
        }
    });
    if (validateCheck) {
        $.ajax({
            type: "POST",
            processData: false,
            contentType: false,
            url: "include/sendfile.php",
            data:  formData,
            success: function(formData) {
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
            error: function(formData, c) {
                alert("Error: Ошибка отправки");
            }
        });
    } else
    {
        $('#'+id+'').find('input').not('.d-none').removeClass('error-input');
        $('#'+id+'').find('.validate').addClass('error-input');
    }
};
/* icon click function */
$(".icon-s-file").click(function () {
    var $i_id = $(this).attr("id");
    var $p_id = $i_id + "_file";
    var $ip_id = $p_id + "_input";
    $('#'+$ip_id+'').click();
    $('#'+$ip_id+'').change(function () {
        $('#'+$p_id+'').text("Файл прикреплен");
    });
});
/* link click function */
$(".link_file").click(function () {
    var $p_id = $(this).attr("id");
    var $i_id = $p_id + "_input";
    $('#'+$i_id+'').click();
    $('#'+$i_id+'').change(function () {
        $('#'+$p_id+'').text("Файл прикреплен");
    });
});