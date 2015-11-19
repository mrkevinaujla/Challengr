/*

s3Factory.js
handles image upload to s3 bucket

*/

angular.module('App.s3Factory', [])

.factory('s3Factory', ['$http'function ($http) {

  var getSignedRequest = function (file) {
    return $http({
      method: 'GET',
      url: ('/api/s3/sign_s3?file_name=' + file.name + '&file_type' + file.type),
    }).then(function (resp) {
      console.log('receiving from getSignedRequest: ' + resp.data);
      return resp.data;
    });
  };

  var uploadFile = function (file, signedRequest) {
    return $http({
      method: 'PUT',
      url: signedRequest,
      headers: {
        'x-amz-acl': 'public-read'
      },
      data: file
    }).then(function (resp) {
      console.log('receiving from uploadFile to s3: ' + resp.data);
      return resp.data;
    });
  };

  var updatePicture = function(url) {
    return $http({
      method: 'PUT',
      url: '/api/user/',
      data: {
        image
      }
    })
  };

  return {
    getSignedRequest: getSignedRequest,
    uploadFile: uploadFile
  };

}]);
