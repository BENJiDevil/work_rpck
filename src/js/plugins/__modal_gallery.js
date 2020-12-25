$('.gallery-block').each(function() {
    $(this).magnificPopup({
        delegate: 'a',
        preload: [0,2],
        type: 'image',
        tClose: 'Закрыть',
        tLoading: 'Загрузка...',
        mainClass: 'my-mfp-zoom-in',
        gallery: {
            enabled: true,
            tPrev: 'Назад',
            tNext: 'Вперед',
            tCounter: '' // markup of counter || '%curr% of %total%'
        },
        image: {
            tError: 'Невозможно загрузить :('
        },
        ajax: {
            tError: 'Невозможно загрузить :('
        }
    });
});