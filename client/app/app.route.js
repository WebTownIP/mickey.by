;(function(){
  angular
    .module("mickey")

    .config(RouterConfig)

    RouterConfig.$injector = ["$stateProvider", "$urlRouterProvider"]

    function RouterConfig($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise("/")

      $stateProvider
        .state("main", {
          url: "/",
          templateUrl: "/static/client/assets/views/main/main.html",
          controller: "MainController"
        })

        .state("cart", {
          url: "/cart",
          templateUrl: "/static/client/assets/views/cart/cart.html",
          controller: "CartController"
        })

      /*auth*/
      $stateProvider
        .state("login", {
          url: "/login",
          templateUrl: "/static/client/assets/views/login/login.html",
          controller: "LoginController"
        })

        .state("registration", {
          url: "/registration",
          templateUrl: "/static/client/assets/views/registration/registration.html",
          controller: "RegistrationController"
        })

        .state("reset", {
          url: "/reset_password",
          templateUrl: "/static/client/assets/views/reset/reset.html",
          controller: "ResetController"
        })

        .state("profile", {
          url: "/profile/:id",
          templateUrl: "/static/client/assets/views/profile/userProfile.html",
          controller: "UserProfileController",
          resolve: {
            userProfile: function($state, $stateParams, UserProfileResource){
              var userProfileId = $stateParams.id
              if (userProfileId){
                return UserProfileResource.getUserProfile({id: userProfileId}).$promise
                  .catch(function(){
                    $state.go("login")
                  })
              } else{
                //404
              }
            }
          }
        })

      /*catalog*/
      $stateProvider
        .state("catalog", {
          url: "/catalog",
          abstract: true,
          template: "<ui-view></ui-view>"
        })

        .state("catalog.list", {
          url: "",
          templateUrl: "/static/client/assets/views/catalog/catalog.html",
          controller: "CatalogController"
        })

        .state("catalog.details", {
          url: "/:id",
          templateUrl: "/static/client/assets/views/catalog/productDetails.html",
          controller: "ProductController",
          resolve: {
            product: function($stateParams, ProductResource){
              var productId = $stateParams.id
              if (productId){
                return ProductResource.getProduct({id: productId})
              } else{
                console.log("404")
                //TODO: 404 page
              }
            }
          }
        })

/*
      $stateProvider
        .state("404", {
          url: "/404",
          templateUrl: "/app/views/components/errors/error.404.html"
        })
        .state("403", {
          url: "/403",
          templateUrl: "/app/views/components/errors/error.403.html"
        })
*/
    }
})()
