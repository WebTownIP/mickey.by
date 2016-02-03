;(function(){
  angular
    .module("mickey")

    .controller("ProductController", ProductController)

    ProductController.$inject = ["$scope", "AlertService", "API_MARKET",
      "OrderResource", "product"]

    function ProductController($scope, AlertService, API_MARKET, OrderResource, product){
      $scope.product = product

      $scope.makeOrder = makeOrder
      
      function makeOrder(){
        var order = {
          product: API_MARKET.BASE + API_MARKET.PRODUCTS + $scope.product.id + "/"
        }
        OrderResource.createOrder(order).$promise
          .then(function(response){
            $scope.product.is_in_cart = true
            AlertService.showMessage("Товар добавлен в корзину.")
          })
          .catch(function(response){
            AlertService.showMessage("Что-то пошло не так. Пожалуйста, попробуйте позже.")
          })
      }
    }
})()
