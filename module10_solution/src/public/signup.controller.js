(function () {
    'use strict';
    
    angular.module('public')
    .controller('SignupController', SignupController);
    
    SignupController.$inject = ['$http', 'DataService'];
    function SignupController($http, DataService) {
      let ctrl = this;
      ctrl.email = ""
      ctrl.firstname = ""
      ctrl.lastname = ""
      ctrl.phone = "" 
      ctrl.short_name = ""
      ctrl.favorite = null
      ctrl.failed = false
      ctrl.onBlur = async function () {
        const res = await $http({url: `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${ctrl.short_name[0]}/menu_items/${ctrl.short_name[1]}.json` })
        if (res.data === null) {
          ctrl.failed = true
        } else {
          ctrl.failed = false
        }
      }
      ctrl.onSubmit = async function () {
        const res = await $http({url: `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${ctrl.short_name[0]}/menu_items/${ctrl.short_name[1]}.json` })
        ctrl.favorite = res.data
        await DataService.updateData(ctrl.firstname, ctrl.lastname, ctrl.phone, ctrl.email, ctrl.favorite)
      };
    }
    
    })();
    