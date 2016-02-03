;(function(){
  angular
    .module("mickey")

    .controller("RegistrationController", RegistrationController)

    RegistrationController.$inject = ["$scope", "$state", "session"]

    function RegistrationController($scope, $state, session){
      if (session.user.isLogged){
        $state.go("main")
      }
      $scope.registrate = session.registrate
    }

})()
