(function () {
  "use-strict";
  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .filter('custom', CustomFilter)
    .service("MenuSearchService", MenuSearchService)
    .directive('foundItem', FoundItem);
  
  FoundItem.$inject = []

  function FoundItem() {
    var ddo = {
      template: "{{item.name}} {{item.short_name}} {{item.description}}"
    }

    return ddo
  } 

  NarrowItDownController.$inject = ["$scope", "MenuSearchService"];
  MenuSearchService.$inject = ["$http"]

  function CustomFilter() {
    return function (input) {
        // change input
        input = input || ""
        return `$$$${input}`;
    }
  }

  function MenuSearchService($http) {
    this.getMatchedMenuItems = async function (searchTerm) {
      return $http({url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json" }).then(function(response) {
        const menuItems = Object.entries(response.data).reduce((menuItems, [key, val]) => {
          return [...menuItems, ...val["menu_items"]]
        }, [])
        filtered = menuItems.filter((menuItem) => menuItem.description.includes(searchTerm))
        return filtered
      })
    }
  }

  function NarrowItDownController($scope, MenuSearchService) {
    $scope.found = []
    this.searchQuery = ""
    $scope.nothing = ""

    this.getMatched = function () {
      MenuSearchService.getMatchedMenuItems(this.searchQuery).then((result) => {
        $scope.$apply(function () {
          $scope.found = result
        });
        if (!this.found || !this.found.length) {
          $scope.$apply(function () {
            $scope.nothing = "Nothing found"
          });
        } else {
          $scope.$apply(function () {
            $scope.nothing = ""
          });
        }
      });
    }

    this.removeItem = function (index) {
      $scope.found.splice(index, 1);
    }
  }
})();
