;(function(){
  angular
    .module("mickey")

    .controller("BallSizesController", BallSizesController)

    BallSizesController.$inject = ["$scope"]

    function BallSizesController($scope){
      $scope.sizes = [
        {title: "1", img: "/static/client/assets/images/sizes/1.jpg"},
        {title: "2", img: "/static/client/assets/images/sizes/2.jpg"},
        {title: "3", img: "/static/client/assets/images/sizes/3.jpg"},
        {title: "4", img: "/static/client/assets/images/sizes/4.jpg"},
        {title: "5", img: "/static/client/assets/images/sizes/5.jpg"},
        {title: "6", img: "/static/client/assets/images/sizes/6.jpg"},
        {title: "7", img: "/static/client/assets/images/sizes/7.jpg"},
        {title: "8", img: "/static/client/assets/images/sizes/8.jpg"},
        {title: "9", img: "/static/client/assets/images/sizes/9.jpg"},
        {title: "10", img: "/static/client/assets/images/sizes/10.jpg"},
        {title: "11", img: "/static/client/assets/images/sizes/11.jpg"}      ]
    }
})()
