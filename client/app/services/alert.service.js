;(function(){
  angular
    .module("mickey")

    .service("AlertService", AlertService)

    function AlertService(){
      this.showMessage = showMessage

      function showMessage(message){
        Materialize.toast(message, 4000)
      }
    }
})()
