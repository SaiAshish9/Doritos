

$(document).ready(function() {


  $('.art').click( async function(e){
    if($(this).html()==='Locate'){
      e.preventDefault()
      e.stopPropagation()


      await updateevent($(this));
    }



  })

  $('.marathon').click( async function(e){
    if($(this).html()==='Locate'){
      e.preventDefault()
      e.stopPropagation()

      await updateevent($(this));

    }


  })

  $('.cooking').click(async function(e){
    if($(this).html()==='Locate'){
      e.preventDefault()
      e.stopPropagation()
      await updateevent($(this));
    }


  })




});

function updateevent(like){







  var updateUrl = '/events/' + like.attr('value');
var y=like.attr('value')
  $.ajax({
    method: 'GET',
    url:  '/events/' + like.attr('value') })
  .then(function(data){


mapboxgl.accessToken = 'pk.eyJ1Ijoic2FpYXNoaXNoIiwiYSI6ImNrMWdyNTc4cjA3dzEzb2sxaTlrdzFiOHoifQ.B1JQ-8A43BNcL-0kMxO9Bg';

var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
mapboxClient.geocoding.forwardGeocode({
query:data.address})
.send()
.then(function (response) {
if (response && response.body && response.body.features && response.body.features.length) {
var feature = response.body.features[0];
// $('#geocoder').attr("value",feature.center)
// alert($('#geocoder').attr("value"))



                      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });


                      var map = new mapboxgl.Map({
                      container: 'map',
                      style: 'mapbox://styles/mapbox/streets-v11',
                      center: feature.center,
                      zoom: 10
                      });
                      new mapboxgl.Marker()
                      .setLngLat(feature.center)
                      .addTo(map);

                      new mapboxgl.Popup({
                        offset: 30
                      })
                        .setLngLat(feature.center)
                        .setHTML('<i style="color: #06D85F;" class="fa fa-users" aria-hidden="true"></i>')
                        .addTo(map);


                        var geocoder = new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        mapboxgl: mapboxgl
                        });

                        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


                      map.addControl(new mapboxgl.GeolocateControl({
                      positionOptions: {
                      enableHighAccuracy: true
                      },
                      trackUserLocation: true
                      }));











}})



    $('.'+data.category).attr('href','#popup1');
    $('.'+data.category).html('Display');
$('.googlemapslink').attr('href',`https://www.google.com/maps?q=${data.address}`)
$('.address').html(data.address)
$('.name').html(data.name)
$('.time').html(data.time)




  // $.ajax({
  //   method: 'PUT',
  //   url: updateUrl,
  //   data: updateData
  // })
  // .then(function(data){
  //   // console.log(JSON.stringify(data.likesCount));
  //   // $('.likesnumber').text(+count+1)
  //
  // })
})
}
