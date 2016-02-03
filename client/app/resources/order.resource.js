;(function(){
  angular
    .module("mickey")

    .service("OrderResource", OrderResource)

    OrderResource.$inject = ["$resource", "API_MARKET"]

    function OrderResource($resource, API_MARKET){
      var uri = API_MARKET.BASE + API_MARKET.ORDERS + ":id/"
      return $resource(uri, {id: "@id"}, {
        getOrders: {
          method: "GET",
          params: {id: null}
        },
        getOrdersInCart: {
          method: "GET",
          params: {id: null, is_in_cart: true, limit: 0}
        },
        createOrder: {
          method: "POST"
        },
        updateOrder: {
          method: "PATCH"
        },
        deleteOrder: {
          method: "DELETE"
        }
      })
    }
})()
