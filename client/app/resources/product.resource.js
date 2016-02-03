;(function(){
  angular
    .module("mickey")

    .service("ProductResource", ProductResource)

    ProductResource.$inject = ["$resource", "API_MARKET"]

    function ProductResource($resource, API_MARKET){
      var uri = API_MARKET.BASE + API_MARKET.PRODUCTS + ":id/"
      return $resource(uri, {id: "@id"}, {
        getProducts: {
          method: "GET",
          params: {id: null}
        },
        getPopularProducts: {
          method: "GET",
          params: {id: null, limit: 4, is_popular: true}
        },
        getProduct: {
          method: "GET"
        }
      })
    }
})()
