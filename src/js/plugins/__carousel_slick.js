$('#slickSlider-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    vertical: true,
    asNavFor: '#slickSlider-thumb',
});

$('#slickSlider-thumb').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '#slickSlider-main',
    vertical: true,
    dots: false,
    focusOnSelect: true,
    nextArrow: '<span class="slick-arrow-btn next-btn"></span>',
    prevArrow: '<span class="slick-arrow-btn prev-btn"></span>',
    responsive: [
        {
            breakpoint: 575,
            settings: {
                vertical: false
            }
        },
    ]

});

// Remove active class from all thumbnail slides
$('#slickSlider-thumb .slide-item').removeClass('slide-active');
// Set active class to first thumbnail slides
$('#slickSlider-thumb .slide-item').eq(0).addClass('slide-active');
// On before slide change match active thumbnail to current slide
$('#slickSlider-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var mySlideNumber = nextSlide;
    $('#slickSlider-thumb .slide-item').removeClass('slide-active');
    $('#slickSlider-thumb .slide-item').eq(mySlideNumber).addClass('slide-active');
});