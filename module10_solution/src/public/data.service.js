(function () {
  'use strict';
  
  angular.module('public')
  .service('DataService', DataService);
    
  function DataService() {
    var service = this;
    
    service.data = null
    service.updateData = function (firstname, lastname, phone, email, favorite) {
      console.log("wow")
      service.data = {}
      service.data.firstname = firstname
      service.data.lastname = lastname
      service.data.phone = phone
      service.data.email = email
      service.data.favorite = favorite
    };
  }
  
  })();
  