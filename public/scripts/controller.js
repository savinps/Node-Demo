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

angular.module('mainApp').controller('viosListController', function ($scope) {

    console.log("In ViosList controller");
  //  $scope.data = [];
    $scope.submitForm = function(viosName,ms,hmc) {
      var entryString = viosName+" "+ms+" "+hmc;
      console.log(entryString);
    // // //  $scope.data.push(viosName,ms,hmc);
    // //   console.log($scope.data);
    // //   var vEntry = $scope.data;
      var entryV = JSON.stringify({vEntry:entryString});

      $http({ method: 'POST',
              url: '/viosListp',
              data: entryV
            })
            .then(function(resp){
              var resData=resp.data;
              console.log(resData);
              console.log("posting data");
              // $scope.logDetails = resData;
              //
              //               console.log("http log data")
              //                return (resp.data);
            });
  };
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

  $scope.getLogDetails=function(dirName){
    console.log("Inside Log File Function");
    console.log(dirName);
    $scope.LogFiles = dirName;
    var dirN = JSON.stringify({dirNme:dirName});
    var s = '"something"';
    var result = JSON.parse(s);
    $http({ method: 'POST',
            url: '/historyp',
            data: dirN
          })
          .then(function(resp){
            var resData=resp.data;
            console.log(resData);
            console.log("posting data");
            $scope.logDetails = resData;

                          console.log("http log data")
                           return (resp.data);
          });
    // console.log($scope.LogFiles);
    // obj = JSON.parse(str)
    // $http.post('/historyp',dirName).
    //     success(function(data) {
    //         console.log("posted successfully");
    //     }).error(function(data) {
    //         console.error("error in posting");
    //     })

  //  $http({ method: 'GET',
  //                  url: '/history'
  //                 })
  //                 .then(function(res) {
  //                   var responseData=res.data;
  //                     console.log(responseData);
  //                     $scope.logDetails = responseData;
   //
  //                     console.log("http log data")
  //                     //return (res.data);
   //
  //                 });
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
