$(document).ready(function () {
    // SCROLL SCRIPTS 
        $('.scroll-me a').bind('click', function (event) { //just pass scroll-me class and start scrolling
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1000, 'easeInOutQuad');
            event.preventDefault();
        });
});

//Google Maps Init
function init_map() {
    var var_location = new google.maps.LatLng(-22.83395,-45.22665);

    var var_mapoptions = {
      center: var_location,
      zoom: 14
  };

  var var_marker = new google.maps.Marker({
    position: var_location,
    map: var_map,
    title:"Betaup"});

  var var_map = new google.maps.Map(document.getElementById("map-container"),
    var_mapoptions);

  var_marker.setMap(var_map); 

}

google.maps.event.addDomListener(window, 'load', init_map);
