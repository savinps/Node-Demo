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

angular.module('mainApp').controller('viosFormCtrl', function($scope, $location) {
  console.log("In viosFormCtrl");
  $scope.submit = function() {
    $location.path('/form');
  }
});

angular.module('mainApp').controller('viosStatusCtrl', function($scope, $location) {
  console.log("In viosStatusCtrl");
  $scope.submit = function() {
    $location.path('/history');
  }
});

angular.module('mainApp').controller('dashBoardCtrl', function($scope, $location) {
  console.log("In dashBoardCtrl");
  $scope.submit = function() {
    $location.path('/home');
  }
});

angular.module('mainApp').controller('viosListCtrl', function($scope, $location) {
  console.log("In viosListCtrl");
  $scope.submit = function() {
    $location.path('/viosList');
  }
});


angular.module('mainApp').controller('logDataCtrl', function($scope, $http) {
  console.log("In logDataCtrl");

  $http.get("data.json").then(function (response) {
      console.log("http success");
      $scope.myData = response.data;
  });

  $http.get("data3.json").then(function (response) {
      console.log("http success");
      $scope.myData2 = response.data;
  });
  $http.get("data4.json").then(function (response) {
      console.log("http success");
      $scope.myData4 = response.data;
  });

  $scope.getLogDetails=function(){
    console.log("Inside Log File Function");
   $http({ method: 'GET',
                   url: '/history'
                  })
                  .then(function(res) {
                      console.log(res.data);
                      $scope.logDetails = res.data;

                      console.log("http log data")
                      return (res.data);

                  });
  }
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
    .when('/viosList', {
      templateUrl: 'pages/viosList.html'
    })
    .when('/home', {
      templateUrl: 'pages/home.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
