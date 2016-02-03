;(function(){
  angular
    .module("mickey")

    .controller("ResetController", ResetController)

    ResetController.$inject = ["$scope", "$state", "session"]

    function ResetController($scope, $state, session){
      if (session.user.isLogged){
        $state.go("main")
      }
      $scope.reset = session.reset
    }
})()
