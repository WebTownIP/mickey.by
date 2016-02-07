;(function(){
  angular
    .module("mickey")

    .directive("map", function(){
      return {
        restrict: 'EA',
        link: function($scope, element, attrs){
          element.css({height: "290px"})
          var initialize = function () {
            var mapCanvas = element
            var mapOptions = {
              center: new google.maps.LatLng(52.425880, 31.013291),
              zoom: 18,
              mapMaker: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false
            }
            var map = new google.maps.Map(mapCanvas[0], mapOptions)
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(52.425880, 31.013291),
              map: map,
              title: "Агентство Аэродизайна 'Микки'"
            })
          }
          google.maps.event.addDomListener(window, "load", initialize)
        }
      }
    })
})()
