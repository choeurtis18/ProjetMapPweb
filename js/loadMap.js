$(document).ready(function(){
    var map;

    /* initialisation de la fonction initmap */
    function initmap(){
        map = L.map('map').setView([47.0, 3.0], 6);
        let link = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        L.tileLayer(link, {
            maxZoom: 7,
            minZoom: 5,
            tileSize: 512,
            zoomOffset: -1
            
        }).addTo(map);
    }
    /* Initialisation de la carte */
    initmap();

    
/////////////////////////////////////////////////////////////////////////////////////////////
    /* Creation d'un tableau qui va contenir les donnees des regions*/
    var tableau = [
        [45.4695797,    4.4502821,  'Auvergne-Rhone-Alpes'],
        [47.280513,     4.999437,   'Bourgogne-Franche-Comte'],
        [48.202047,     -2.932644,  'Bretagne'],
        [47.499998,     1.749997,   'Centre-Val-de-Loire'],
        [42.200604,     9.092893,   'Corse'],
        [48.580002,     5.950000,   'Grand-Est'],
        [50.047503,     2.363062,   'Haut-de-france'],
        [48.999870,     0.171253,   'Normandie'],
        [48.7099198,    2.6000411,  'Ile-De-France'],
        [45.399044,     0.2995785,   'Nouvelle-Aquitaine'],
        [43.545911,     1.998862,    'Occitanie'],
        [47.7632836,    -0.3299687, 'Pays-de-la-loire'],
        [43.9351691,    6.0679194,  "Provence-Alpes-Cote-D-Azur"] 
    ];

    /* On boucle sur le tableau pour y placer les points */
    for (i = 0; i < tableau.length; i++) {
                
        var regionName = tableau[i][2];
        /*
        * On va creer un cercle sur la carte pour chaque point
        */
        var circleLocation = new L.LatLng(tableau[i][0], tableau[i][1]),
        circleOptions = {
            id: regionName,
        };
        
        // on ajoute le cercle a la carte
        var circle = new L.Circle(circleLocation, 25000, circleOptions);
        map.addLayer(circle);

        // on ajoute une class et un id au path du svg
        circle._container.firstElementChild.classList.add("region");
        circle._container.firstElementChild.id = regionName;
        
    }

});