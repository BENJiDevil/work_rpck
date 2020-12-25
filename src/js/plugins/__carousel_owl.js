var mainSlider = $('#main-slider');
$("#main-slider").owlCarousel({
    loop: true,
    margin: 15,
    mouseDrag: false,
    touchDrag: true,
    dots: false,
    nav: false,
    items: 1,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    onChange: beforeChange
});
function beforeChange(){
    $('#main-slider .owl-item .slide-image').fadeOut('slow');
    setTimeout(function () {
        $('#main-slider .owl-item.active .slide-image').fadeIn('fast');
    },500);

};
$('.main_next-btn').click(function() {
    mainSlider.trigger('next.owl.carousel');
});
$('.main_prev-btn').click(function() {
    mainSlider.trigger('prev.owl.carousel');
});

$("#clients-slider").owlCarousel({
    loop: true,
    margin: 15,
    mouseDrag: false,
    touchDrag: true,
    dots: true,
    nav: true,
    items: 1,
    navText: ['<span class="info-btn-prev"></span>','<span class="info-btn-next"></span>']
});
$(".slider-block").owlCarousel({
    loop: true,
    margin: 15,
    mouseDrag: false,
    touchDrag: true,
    dots: true,
    nav: true,
    navText: ['<span class="info-btn-prev"></span>','<span class="info-btn-next"></span>'],
    items: 1
});
$("#interest-slider").owlCarousel({
    loop: true,
    margin: 21,
    mouseDrag: false,
    touchDrag: true,
    dots: true,
    nav: true,
    navText: ['<span class="info-btn-prev"></span>','<span class="info-btn-next"></span>'],
    items: 4,
    slideBy: 4,
    responsive: {
        0:{
            items: 1,
            slideBy: 1
        },
        576:{
            items: 2,
            slideBy: 2
        },
        768:{
            items: 3,
            slideBy: 3
        },
        961:{
            items: 4
        }
    }
});
