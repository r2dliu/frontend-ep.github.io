(function () {
  "use-strict";
  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .filter('custom', CustomFilter)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService", "customFilter"];

  function CustomFilter() {
    return function (input) {
        // change input
        input = input || ""
        return `$$$${input}`;
    }
  }

  function ShoppingListCheckOffService() {
    var shoppingItems = {
      cookies: { quantity: 10, pricePerItem: 1},
      apples: { quantity: 9, pricePerItem: 2},
      bananas: { quantity: 8, pricePerItem: 3},
      steaks: { quantity: 7, pricePerItem: 4},
      bagels: { quantity: 6, pricePerItem: 5}
    };
    let boughtItems = {};

    this.buyItem = function (item, quantity, price) {
      boughtItems[item] = { quantity: quantity, pricePerItem: price};
      delete shoppingItems[item];
    };

    this.getShoppingItems = function () {
      return shoppingItems;
    };

    this.getBoughtItems = function () {
      return boughtItems;
    };
  }

  function AlreadyBoughtController(ShoppingListCheckOffService, customFilter) {
    this.items = ShoppingListCheckOffService.getBoughtItems();
    this.isNothingBought = function () {
      return Object.keys(this.items).length === 0
    };

    this.totalCost = function (quantity, price) {
        return customFilter(quantity * price)
    }
  }

  function ToBuyController(ShoppingListCheckOffService) {
    this.items = ShoppingListCheckOffService.getShoppingItems();
    this.everythingBought = null;

    this.buyItem = function (item, quantity, price) {
      ShoppingListCheckOffService.buyItem(item, quantity, price);
    };

    this.isEverythingBought = function () {
      return Object.keys(this.items).length === 0
    };
  }
})();
