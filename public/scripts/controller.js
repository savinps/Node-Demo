var mainApp = angular.module('mainApp', ['ngRoute']);

angular.module('mainApp').controller('loginController', function($scope) {
  $scope.message = "You are in login page";
  //
  // $http.post('/login', {
  //       username: user.username,
  //       password: user.password
  //   })
  //   .success(function(data, status, headers, config) {
  //       done(null, data);
  //
  //   }).error(function(data, status, header, config) {
  //       error = "Invalid User name or password!"
  //       done(error, data);
  //
  //   });
});

angular.module('mainApp').controller('customersCtrl', function($scope, $http) {
  console.log("In customersCtrl");

  $http.get("data.json").then(function (response) {
      console.log("http success");
      $scope.myData = response.data;
  });

  $http.get("data2.json").then(function (response) {
      console.log("http success");
      $scope.myData2 = response.data;
  });

});

mainApp.config(['$routeProvider', function($routeProvider) {
  console.log("Routing in progress");
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html'
    })
    .when('/form', {
      templateUrl: 'pages/form.html'
    })
    .when('/history', {
      templateUrl: 'pages/history.html'
    })
    .when('/home', {
      templateUrl: 'pages/home.html'
    });
}]);
