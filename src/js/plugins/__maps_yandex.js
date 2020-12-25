/* map settings */
var myMap,
    cord1,
    cord2,
    myPlacemark,
    mapCenter = [59.858928, 30.440097, 59.862753, 30.445612],                           // map center desc/mobile
    mapMarker = [59.858928, 30.440097],                                                 // map marker
    markTitle = "Проспект Александровской фермы 23б";                                   // adress baloon

function init(){
    /* settings on mobile */
    if($(window).width() > 640) {
        cord1 = mapCenter[0];
        cord2 = mapCenter[1];
    }
    else{
        cord1 = mapCenter[2];
        cord2 = mapCenter[3];
    }
    myMap = new ymaps.Map("yamap", {
        center: [cord1, cord2],
        zoom: 16
    });
    myPlacemark = new ymaps.Placemark([mapMarker[0], mapMarker[1]],
        {
            hintContent: markTitle,
            balloonContent: '',
        });
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');                                              // off scroll wheel
    myMap.controls.remove('geolocationControl');                                        // remove controls
    myMap.controls.remove('searchControl');                                             // remove controls searchtool
    myMap.controls.remove('trafficControl');                                            // remove controls traffic
    myMap.controls.remove('typeSelector');                                              // remove controls typetool
    myMap.controls.remove('fullscreenControl');                                         // remove controls fullscreen
    myMap.controls.remove('rulerControl');                                              // remove controls linetool
}
if($("div").is("#yamap")){
    ymaps.ready(init);
}