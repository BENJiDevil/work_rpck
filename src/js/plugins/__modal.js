$('.modal-win').magnificPopup({
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