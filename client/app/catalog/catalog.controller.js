;(function(){
  angular
    .module("mickey")

    .controller("CatalogController", CatalogController)

    CatalogController.$inject = ["$scope", "CategoryResource", "ProductResource"]

    function CatalogController($scope, CategoryResource, ProductResource){

      $scope.priceOptions = {
        floor: 10000,
        ceil: 1000000,
        step: 1000,
        onEnd: avoid
      }

      $scope.params = {
        offset: 0,
        limit: 25,
        categories__id__in: [],
        price__gte: $scope.priceOptions.floor,
        price__lte: $scope.priceOptions.ceil
      }

      CategoryResource.getCategories().$promise
        .then(function(response){
          $scope.categories = response.objects
        })

      $scope.products = []
      $scope.categoryFilter = categoryFilter
      $scope.load = load

      function load(){
        if (!$scope.isLoading){
          $scope.isLoading = true
          ProductResource.getProducts($scope.params).$promise
            .then(function(response){
              $scope.isLoadingError = false
              $scope.totalCount = response.meta.total_count
              $scope.params.offset += $scope.params.limit
              $scope.products = $scope.products.concat(response.objects)
            })
            .catch(function(){
              $scope.isLoadingError = true
            })
            .finally(function(){
              $scope.isLoading = false
            })
        }
      }

    function categoryFilter(category){
      var index = _.indexOf($scope.params.categories__id__in, category.id)
      if (index != -1){
        $scope.params.categories__id__in.splice(index, 1)
      } else{
        $scope.params.categories__id__in.push(category.id)
      }
      avoid()
    }

    function avoid(){
      $scope.products = []
      $scope.params.offset = 0
      $scope.load()
    }
  }
})()
