;(function(){
  angular
    .module("mickey")

    .directive("datepicker", function(){
      return {
        restrict: "A",
        link: function($scope, element, attrs){
          element.pickadate({
            monthsFull: [
              'Январь', 'Февраль', 'Март', 'Апрель',
              'Май', 'Июнь', 'Июль', 'Август',
              'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            ],
            weekdaysFull: [
              'Воскресень', 'Понедельник', 'Вторник',
              'Среда', 'Четверг', 'Пятница', 'Суббота'
            ],
            weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср',
              'Чт', 'Пт', 'Сб'
            ],
            labelMonthNext: 'След. месяц',
            labelMonthPrev: 'Пред. месяц',
            today: '',
            clear: 'Отчистить',
            close: 'Закрыть',
            min: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
            onSet: function(){
              setTimeout(this.close, 0)
            }
          })
        }
      }
    })
})()
