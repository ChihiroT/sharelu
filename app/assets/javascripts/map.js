var map;
  function initMap() {
    var target = document.getElementById('gmap');
    var lat = parseFloat(document.getElementById('lat').textContent);
    var lng = parseFloat(document.getElementById('lng').textContent);
    var center = new google.maps.LatLng(lat, lng);
    
    map = new google.maps.Map(target, {
      center: center,
      zoom: parseInt(document.getElementById('zoom').textContent)
    });
   
    var marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      title: document.getElementById('tooltip').textContent,
      animation: google.maps.Animation.DROP
    });
  }