let locationButton = document.querySelector('#location-btn');
let locationLoader = document.querySelector('#location-loader');
let plzInput = document.querySelector('#plz');
let ortInput = document.querySelector('#ort');
let addressInput = document.querySelector('#adresse');
let landInput = document.querySelector('#land');
let mapDiv = document.querySelector('#map');
let fetchedLocation;

locationButton.addEventListener('click', event => {
  if(!('geolocation' in navigator)) {
    return;
  }

  locationButton.style.display = 'none';
  locationLoader.style.display = 'block';

  navigator.geolocation.getCurrentPosition( position => {
    locationButton.style.display = 'inline';
    locationLoader.style.display = 'none';
    fetchedLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    //console.log('current position: ', fetchedLocation);

    let nominatimURL = 'https://nominatim.openstreetmap.org/reverse';
    nominatimURL += '?format=jsonv2';   // format=[xml|json|jsonv2|geojson|geocodejson]
    nominatimURL += '&lat=' + fetchedLocation.latitude;
    nominatimURL += '&lon=' + fetchedLocation.longitude;

    fetch(nominatimURL)
      .then((res) => {
        //console.log('nominatim res ...', res);
        return res.json();
      })
      .then((data) => {
        console.log('nominatim res.json() ...', data);
        addressInput.value = data.address.road + " " + data.address.house_number;
        plzInput.value = data.address.postcode;
        ortInput.value = data.address.state;
        landInput.value = data.address.country_code;
        //landInput.innerHTML = data.address.country;
      })
      .then( d => {
        locationButton.style.display = 'none';
        locationLoader.style.display = 'none';
        mapDiv.style.display = 'block';

        const map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([fetchedLocation.longitude, fetchedLocation.latitude]),
            zoom: 12
          })
        });

        const layer = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [
              new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([fetchedLocation.longitude, fetchedLocation.latitude]))
              })
            ]
          })
        });

        map.addLayer(layer);

        console.log('map', map)
      })
      .catch( (err) => {
        console.error('err', err)
        //locationInput.value = 'In Berlin';
      });
  }, err => {
    //console.log(err);
    locationButton.style.display = 'inline';
    locationLoader.style.display = 'none';
    alert('Couldn\'t fetch location, please enter manually!');
    fetchedLocation = null;
  }, { timeout: 5000});
});

function initializeLocation() {
  if(!('geolocation' in navigator)) {
    locationButton.style.display = 'none';
  }
}

locationButton.addEventListener('click', initializeLocation )
