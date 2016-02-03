;(function(){
  angular
    .module("mickey")

    .controller("LoginController", LoginController)

    LoginController.$inject = ["$scope", "$state", "session"]

    function LoginController($scope, $state, session){
      if (session.user.isLogged){
        $state.go("main")
      }
      $scope.login = session.login
    }
})()
