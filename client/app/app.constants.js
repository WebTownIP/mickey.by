;(function(){
  angular
    .module("mickey")

    .constant("API_AUTH", {
      BASE: "/api/v1/auth",
      GET_USER: "/session/",
      LOGIN: "/login/",
      LOGOUT: "/logout/",
      REGISTRATION: "/registration/",
      RESET: "/reset_password/",
      USER_PROFILE: "/user_profile/"
    })

    .constant("API_MARKET", {
      BASE: "/api/v1/market",
      CATEGORIES: '/categories/',
      ORDERS: "/orders/",
      PRODUCTS: "/products/",
      PURCHASE: "purchase/"
    })
})()
