;(function(){
  angular
    .module("mickey")

    .service("CategoryResource", CategoryResource)

    CategoryResource.$inject = ["$resource", "API_MARKET"]

    function CategoryResource($resource, API_MARKET){
      var uri = API_MARKET.BASE + API_MARKET.CATEGORIES
      return $resource(uri, {}, {
        getCategories: {
          method: "GET"
        }
      })
    }
})()
