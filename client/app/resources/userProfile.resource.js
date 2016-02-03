;(function(){
  angular
    .module("mickey")

    .service("UserProfileResource", UserProfileResource)

    UserProfileResource.$inject = ["$resource"]

    function UserProfileResource($resource){
      var uri =  "/api/v1/user_profiles/:id/"
      return $resource(uri, {id: "@id"}, {
        getUserProfile: {
          method: "GET"
        },
        updateUserProfile: {
          method: "PATCH"
        },
      })
    }
})()
