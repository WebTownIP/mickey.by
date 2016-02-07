;(function(){
  angular
    .module("mickey")

    .controller("CartController", CartController)

    CartController.$inject = ["$http", "$scope",  "$state", "API_MARKET", "AlertService",
      "OrderResource", "session"]

    function CartController($http, $scope, $state, API_MARKET, AlertService, OrderResource, session){
      if (!session.user.isLogged){
        $state.go("login")
      }

      $scope.forms = {}
      $scope.orderInfo = {}
      loadOrdersInCart()

      $scope.deleteAll = deleteAll
      $scope.deleteOrder = deleteOrder
      $scope.purchase = purchase
      $scope.updateOrderCount = updateOrderCount
      $scope.getTotalPrice = getTotalPrice

      function loadOrdersInCart(){
        OrderResource.getOrdersInCart().$promise
          .then(function(response){
              $scope.orders = response.objects
          })
      }

      function deleteOrder(order){
        OrderResource.deleteOrder({id: order.id}).$promise
          .then(function(){
            loadOrdersInCart()
            AlertService.showMessage("Удалено.")
          })
          .catch(function(){
            AlertService.showMessage("Что-то пошло не так. Пожалуйста, попробуйте позже.")
          })
      }

      function deleteAll(){
        OrderResource.deleteOrder().$promise
          .then(function(){
            loadOrdersInCart()
            AlertService.showMessage("Удалено.")
          })
          .catch(function(){
            AlertService.showMessage("Что-то пошло не так. Пожалуйста, попробуйте позже.")
          })
      }

      function purchase(orderInfo){
        var uri = API_MARKET.BASE + API_MARKET.ORDERS + API_MARKET.PURCHASE
        $http.post(uri, orderInfo)
          .then(function(response){
            $scope.orders = []
            AlertService.showMessage("Спасибо. Заказ был зарегистрирован.")
          })
          .catch(function(){
            AlertService.showMessage("Что-то пошло не так. Пожалуйста, попробуйте позже.")
          })
      }

      function updateOrderCount(order){
        var data = {count: order.count}
        OrderResource.updateOrder({id: order.id}, data)
      }

      function getTotalPrice(){
        var totalPrice = 0
        _.each($scope.orders, function(order){
          totalPrice += order.count * (order.product.price - order.product.discount)
        })
        return totalPrice
      }
    }
})()
