/* scroll to block */
$("body").on('click', '.go_to', function(e){
    var fixed_offset = 0;
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
    e.preventDefault();
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('#topbtn').fadeIn();
    } else {
        $('#topbtn').fadeOut();
    }
});
$('#topbtn').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 400);
    return false;
});