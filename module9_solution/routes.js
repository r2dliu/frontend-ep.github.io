(function () {
    'use strict';
    
    angular.module("MenuApp").config(RoutesConfig)
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home")

    $stateProvider.state("home", {
        url: "/home",
        templateUrl: "src/templates/home.html"
    })

    $stateProvider.state("categories", {
        url: "/categories",
        templateUrl: "src/templates/categories.html",
        controller: 'CategoryController as ctrl',
        resolve: {
            categories: ['MenuDataService', async function (MenuDataService) {
              const response = await MenuDataService.getCategories();
              return response.data || []
            }]
          }
    })

    $stateProvider.state("items", {
        url: "/items/{categoryShortName}",
        templateUrl: "src/templates/items.html",
        controller: 'ItemController as ctrl',
        resolve: {
            items: ['$stateParams', 'MenuDataService', async function ($stateParams, MenuDataService) {
              const response = await MenuDataService.getItemsForCategory($stateParams.categoryShortName);
              return response?.data?.menu_items || []
            }]
          }
    })
    }
})();
