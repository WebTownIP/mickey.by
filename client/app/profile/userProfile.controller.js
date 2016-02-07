;(function(){
  angular
    .module("mickey")

    .controller("UserProfileController", UserProfileController)

    UserProfileController.$inject = ["$http", "$scope", "AlertService", "userProfile", "UserProfileResource"]

    function UserProfileController($http, $scope, AlertService, userProfile, UserProfileResource){
      $scope.userProfile = {
        id: userProfile.id,
        phone_number: userProfile.phone_number,
        user: {
          id: userProfile.user.id,
          first_name: userProfile.user.first_name,
          last_name: userProfile.user.last_name
        }
      }

      $scope.saveProfile = saveProfile
      $scope.savePassword = savePassword

      function saveProfile(userProfile){
        UserProfileResource.updateUserProfile({id: userProfile.id}, userProfile).$promise
          .then(function(){
            AlertService.showMessage("Профиль обновлен.")
          })
          .catch(function(){
            AlertService.showMessage("Что-то пошло не так. Пожалуйста, попробуйте позже.")
          })
      }

      function savePassword(passwords){
        if (passwords.new_password != passwords.confirm_password){
          AlertService.showMessage("Подтвердите пароль.")
          return
        }
        var uri = "/api/v1/user_profiles/change_password/"
        $http.post(uri, passwords)
          .then(function(response){
            AlertService.showMessage("Пароль изменен.")
          })
          .catch(function(){
            AlertService.showMessage("Старный пароль введен некорректно.")
          })
      }
    }
})()
