var map;
function initialize() {
  // 地図を表示する際のオプションを設定
  var mapOptions = {
    center: new google.maps.LatLng(35.6585805, 139.74543289999997),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // Mapオブジェクトに地図表示要素情報とオプション情報を渡し、インスタンス生成
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}
  
function search(){
    var place = document.getElementById('place').value;
    var geocoder = new google.maps.Geocoder();
    // ジオコーディング　検索実行
    geocoder.geocode({"address" : place}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
          
        var lat = results[0].geometry.location.lat();//緯度を取得
        var lng = results[0].geometry.location.lng();//経度を取得
        document.getElementById('lat').value=results[0].geometry.location.lat();
        document.getElementById('lng').value=results[0].geometry.location.lng();
        var ido = document.getElementById('lat')
        ido.innerHTML = lat;
        var keido = document.getElementById('lng')
        keido.innerHTML = lng;
        var mark = {
            lat: lat, // 緯度
            lng: lng // 経度
        };
        marker = new google.maps.Marker({ // マーカーの追加
        position: mark, // マーカーを立てる位置を指定
        map: map // マーカーを立てる地図を指定
        });
          
        map.setCenter(results[0].geometry.location); // 地図の中心を移動
        cnt =0;
    }
    });
}