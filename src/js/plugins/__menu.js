/* mobile menu function */
$(".hamburger").click(function () {
    $(".header__menu").slideToggle("fast");
    if ($('.hamburger').hasClass("is-active")) {
        $('.hamburger').removeClass('is-active');
    } else {
        $('.hamburger').addClass('is-active');
    }
});
$(document).click(function (e) {
    var container = $(".hamburger");
    if (container.has(e.target).length === 0 && e.target.className != 'hamburger hamburger--slider is-active' ) {
        if ($('.hamburger').hasClass("is-active")) {
            $('.hamburger').removeClass('is-active');
            $(".header__menu").slideToggle("fast");
        }
    }
});
/* hover function */
$('.main-menu .submenu-link').hover(
    function () {
        $(this).find('.submenu').stop().slideDown('fast');
    },
    function () {
        $(this).find('.submenu').stop().slideUp('fast');
    }
);