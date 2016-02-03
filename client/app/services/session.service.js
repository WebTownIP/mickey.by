;(function(){
  angular
    .module("mickey")

    .service("session", session)

    session.$inject = ["$http", "$rootScope", "$state", "API_AUTH", "AlertService"]

    function session($http, $rootScope, $state, API_AUTH, AlertService){
      var self = this
      this.user = {}

      this.getUser = getUser
      this.login = login
      this.logout = logout
      this.registrate = registrate
      this.reset = reset

      function getUser(){
        return $http.get(API_AUTH.BASE + API_AUTH.GET_USER)
          .then(function(response){
            self.user.isLogged = true
            self.user.info = response.data.user
          })
      }

      function login(user){
        var uri = API_AUTH.BASE + API_AUTH.LOGIN
        return $http.post(uri, user)
          .then(function(response){
            self.user.isLogged = true
            self.user.info = response.data.user
            $state.go("main")
          })
          .catch(function(){
            AlertService.showMessage("Неправильный логин или пароль.")
          })
      }

      function logout(){
        return $http.get(API_AUTH.BASE + API_AUTH.LOGOUT)
          .then(function(){
            self.user.isLogged = false
            self.user.info = null
            $state.go("main")
          })
      }

      function registrate(user){
        var uri = API_AUTH.BASE + API_AUTH.REGISTRATION
        return $http.post(uri, user)
          .then(function(){
            $state.go("login") 
          })
          .catch(function(){
            AlertService.showMessage("Введенный email уже зарегистрирован.")
          })
      }

      function reset(user){
        var uri = API_AUTH.BASE + API_AUTH.RESET
        return $http.post(uri, user)
          .then(function(){
            AlertService.showMessage("Новый пароль был отправлен на ваш email.")
            $state.go("login")
          })
          .catch(function(){
            AlertService.showMessage("Неправильный email.")
          })
      }
    }
})()
