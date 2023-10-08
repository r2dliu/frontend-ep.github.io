(function () {
    'use-strict';
    angular.module("LunchCheck", [])
    .controller("LunchCheckController", function($scope) {
        $scope.list=""
        $scope.showMessage = null
        $scope.color = null
        $scope.border = null
        $scope.checkTooMuch = function () {
            if ($scope.list === "") {
                $scope.showMessage = "Please enter data first"
                $scope.border = "border-red"
                $scope.color = "text-red"
            } else {
                $scope.showMessage = null
                $scope.color = "text-green"
                $scope.border = "border-green"
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