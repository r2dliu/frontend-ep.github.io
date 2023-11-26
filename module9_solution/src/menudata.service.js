(function () {
    'use strict';
    
    angular.module('data')
    .service('MenuDataService', MenuDataService);
    
    
    MenuDataService.$inject = ['$http']
    function MenuDataService($http) {
      var service = this;
    
      service.getCategories = function () {
        return $http({url: "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json" })
      };

      service.getItemsForCategory = function (categoryShortName) {
        return $http({url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + categoryShortName + ".json" })
      };
    }
    
    })();
    