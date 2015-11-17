/*

braintreeFactory.js
handles http request for braintree controller

*/

angular.module('App.braintreeFactory', [] )

.factory('braintreeFactory', ['$http', function($http) {

  var getToken = function(){
    return $http({
      method : 'GET',
      url : '/api/braintree/clientToken'
    })
    .then(function(data){
      return data.data;
    });
  };

  var createCustomer = function(user){
    console.log('create braintree customer...', user);
    return $http({
      method : 'POST',
      url : '/api/braintree/createCustomer',
      data : {user : user},
    })
    .then(function(data){
      return data.data;
    });
  };

  // var checkout = function(payment){
  //   return $http({
  //     method : 'POST',
  //     url : '/api/braintree/checkout',
  //     data : payment
  //   })
  //   .then(function(data){
  //     return data.data;
  //   });
  // };

  return {
    getToken : getToken,
    createCustomer : createCustomer,
    // checkout : checkout
  };

}])