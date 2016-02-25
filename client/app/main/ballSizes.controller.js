;(function(){
  angular
    .module("mickey")

    .controller("BallSizesController", BallSizesController)

    BallSizesController.$inject = ["$scope"]

    function BallSizesController($scope){
      $scope.sizes = [
        {title: "3 дюйма, 7 см", img: "/static/client/assets/images/sizes/1.jpg"},
        {title: "5 дюймов, 12 см", img: "/static/client/assets/images/sizes/2.jpg"},
        {title: "10 дюймов, 25 см", img: "/static/client/assets/images/sizes/3.jpg"},
        {title: "10 дюймов, 25 см", img: "/static/client/assets/images/sizes/4.jpg"},
        {title: "12 дюймов, 30 см", img: "/static/client/assets/images/sizes/5.jpg"},
        {title: "17 дюймов, 40 см", img: "/static/client/assets/images/sizes/6.jpg"},
        {title: "18 дюймов, 45см", img: "/static/client/assets/images/sizes/7.jpg"},
        {title: "18 дюймов, 45см", img: "/static/client/assets/images/sizes/8.jpg"},
        {title: "18 дюймов, 45см", img: "/static/client/assets/images/sizes/9.jpg"},
        {title: "24 дюйма, 60см", img: "/static/client/assets/images/sizes/10.jpg"},
        {title: "32 дюйма, 80см", img: "/static/client/assets/images/sizes/11.jpg"}      ]
    }
})()
