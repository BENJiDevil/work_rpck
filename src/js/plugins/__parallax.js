if($(window).width() >=1200) {
    $(".parallax-layer").parallax(
        {mouseport: $(".parallax-viewport")},
        {xparallax: '25px', yparallax: '15px'},
        {xparallax: '15px', yparallax: '35px'},
        {xparallax: '125px', yparallax: '215px'}
    );
}