(function () {
    'use strict';
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['data'];
    function MyInfoController(data) {
      var ctrl = this;
      ctrl.data = data;
      if (ctrl.data) {
        ctrl.imgsrc = `images/menu/${data["favorite"]["short_name"][0]}/${data["favorite"]["short_name"]}.jpg` 
      }
      console.log(ctrl)
    }
    
    })();
    