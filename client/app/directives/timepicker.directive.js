;(function(){
  angular
    .module("mickey")

    .directive("timepicker", function(){
      return {
        restrict: 'A',
        link: function($scope, element, attrs){
          element.pickatime({
            format: 'HH:i',
            min: [10, 00],
            max: [22, 00],
            clear: 'Отчистить',
            closeOnSelect: true,
            closeOnClear: true,
            onSet: function() {
              setTimeout(this.close, 0)
            }
          })
        }
      }
    })
})()
