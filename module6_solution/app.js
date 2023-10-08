(function () {
    'use-strict';
    angular.module("LunchCheck", [])
    .controller("LunchCheckController", function($scope) {
        $scope.list=""
        $scope.showMessage = null
        $scope.checkTooMuch = function () {
            if ($scope.list === "") {

                $scope.showMessage = "Please enter data first"
            } else {
                $scope.showMessage = null
                items = $scope.list.split(",")
                // Filter out empty items: any items that are made up of only whitespace
                // do NOT contribute towards the item count
                items = items.filter((item) => /\S/.test(item));
                if (items.length > 3) {
                    $scope.showMessage = "Too much!"
                } else {
                    $scope.showMessage = "Enjoy!"
                }
            }
        }
    })
})();