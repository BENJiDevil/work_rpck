/* map settings */
var map,
    cord1,
    cord2,
    mapStyle = [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": "0"
                },
                {
                    "color": "#211e20"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#211e20"
                },
                {
                    "lightness": "45"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dedede"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#211e20"
                },
                {
                    "lightness": "20"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffd538"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f2f2f2"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e9e9e9"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#211e20"
                },
                {
                    "lightness": "20"
                }
            ]
        }
    ],
    mapCenter = [55.730462,  37.653121, 55.730462,  37.653121],
    mapMarker = [55.730462,  37.653121],
    markTitle = "Адрес";

function init() {
    if($(window).width() > 640) {
        cord1 = mapCenter[0];
        cord2 = mapCenter[1];
    }
    else{
        cord1 = mapCenter[2];
        cord2 = mapCenter[3];
    }
    var zoomVal = 13;
    var mapOptions = {
        center: new google.maps.LatLng(cord1, cord2),
        zoom: zoomVal,
        gestureHandling: 'auto',
        fullscreenControl: false,
        zoomControl: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        scaleControl: false,
        scrollwheel: false,
        streetViewControl: false,
        draggable: true,
        clickableIcons: false,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },

        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: mapStyle
    };
    var mapElement = document.getElementById('gmap');
    var map = new google.maps.Map(mapElement, mapOptions);
    var locations = [
        {
            "title": markTitle,
            "address": markTitle,
            "desc":"",
            "tel":"",
            "int_tel":"",
            "email":"",
            "web":"",
            "web_formatted":"",
            "open":"",
            "time":"",
            "lat": mapMarker[0],
            "lng": mapMarker[1],
            "vicinity": markTitle,
            "iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}
        }];
    var markers = [];
    var markersPopup = [];
    var markersPopupContent = [];
    for (i = 0; i < locations.length; i++) {
        markers[i] = new google.maps.Marker({
            icon: locations[i].marker,
            position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
            map: map,
            title: locations[i].title,
            address: locations[i].address,
            desc: locations[i].desc,
            tel: locations[i].tel,
            int_tel: locations[i].int_tel,
            vicinity: locations[i].vicinity,
            open: locations[i].open,
            open_hours: locations[i].open_hours,
            photo: locations[i].photo,
            time: locations[i].time,
            email: locations[i].email,
            web: locations[i].web,
            iw: locations[i].iw
        });

        markersPopupContent[i] = locations[i].title;

        markersPopup[i] = new google.maps.InfoWindow({
            content: locations[i].title,
        });

        markers[i].addListener('click', (function(i) {
            return function() {
                markersPopup[i].open(map, markers[i]);
            };
        })(i));
        // markersPopup[i].open(map, markers[i]);

    }
}
if($("div").is("#gmap")){
    google.maps.event.addDomListener(window, 'load', init);
}