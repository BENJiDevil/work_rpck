var wow = new WOW(
    {
        boxClass:     'wow',      // animated element css class
        animateClass: 'animated', // animation css class
        offset:       0,          // distance to the element when triggering the animation
        mobile:       false,      // trigger animations on mobile devices
        live:         true        // act on asynchronously loaded content
    }
);
wow.init();