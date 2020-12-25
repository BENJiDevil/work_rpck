$('.video-link').magnificPopup({
        type: 'iframe',
        preloader: true,
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