;(function(){
  angular
    .module("mickey")

    .controller("MainController", MainController)

    MainController.$inject = ["$scope", "ProductResource"]

    function MainController($scope, ProductResource){
      ProductResource.getPopularProducts().$promise
        .then(function(response){
          $scope.popularProducts = response.objects
        })
    }
})()
