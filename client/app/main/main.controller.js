;(function(){
  angular
    .module("mickey")

    .controller("MainController", MainController)

    MainController.$inject = ["$scope", "ProductResource"]

    function MainController($scope, ProductResource){
      var feedbacks = [
        {
          img: "/static/client/assets/images/avatars/man.png",
          text: "Занималась организацией дня Рождения своей любимой доченьки. Заказала шары, которые доставили в нужное время и для моей именинницы. Шары еще долго радовали нас. Всем рекомендую и советую! Теперь праздник только с МИККИ",
          name: "Мария"
        },
        {
          img: "/static/client/assets/images/avatars/man.png",
          text: "Здравствуйте. Хочу сказать спасибо Вам. Заказываем через микки шары уже не в первый раз. Всем рекомендую, нареканий нет, отличный сервис! Спасибо за хорошее настроение!",
          name: "Дарья"
        },
        {
          img: "/static/client/assets/images/avatars/man.png",
          text: "Спасибо большое! Уже второй раз меня выручаете!! Несмотря на то, что заказ был по области, доставили шары имениннице в день заказа!! Просто чудесно!! Буду и дальше пользоваться Вашими услугами и рекомендовать друзьям!! Успехов и процветания!!",
          name: "Диана"
        },
        {
          img: "/static/client/assets/images/avatars/man.png",
          text: "Заказываю не первый раз и не первый год в микки) Очень довольна. Успехов вам, процветания и побольше клиентов! Спасибо, что есть такие замечательные компании) и подарочки ещё дарят что вдвойне приятно!",
          name: "Екатерина"
        },
        {
          img: "/static/client/assets/images/avatars/man.png",
          text: "Доставили все минута в минуту, сердечно вручили, выполнили все мои пожелания к заказу. Юбилярша была в восторге (подруге исполнилось 30 лет). Уже не первый раз пользуюсь Вашими услугами! Все просто супер! Удачи и процветания вашей компании!",
          name: "Александра"
        },
        {
          img: "/static/client/assets/images/avatars/man.png",
          text: "Спасибо за оперативность!!!! Заказали день в день, изыскали возможность привести в срок, хотя было очень мало времени и плохие погодные условия. Пользуемся Вашей фирмой не в первый раз и всегда очень хороший ассортимент и качество товара.",
          name: "Юрий"
        },
        {
          img: "/static/client/assets/images/avatars/man.png",
          text: "Похвалю еще раз с большим удовольствием! Наш букет из шариков привел ребенка в дикий восторг, стоит уже неделю и думаю еще очень долго будет стоять! Спасибо, что Вы есть, процветания Вашей компании!!!!",
          name: "Вероника"
        }
      ]

      ProductResource.getPopularProducts().$promise
        .then(function(response){
          $scope.popularProducts = response.objects
        })
        .finally(function(){
          var uniqueIndexes = []
          $scope.feedbacks = []
          while ($scope.feedbacks.length < 3){
            var index = Math.floor(Math.random() * feedbacks.length)
            if (_.indexOf(uniqueIndexes, index) == -1){
              uniqueIndexes.push(index)
              $scope.feedbacks.push(feedbacks[index])
            }
          }
        })
    }
})()
