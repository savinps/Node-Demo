var mainApp = angular.module('mainApp', ['ngRoute','ngStorage']);

angular.module('mainApp').filter("myFilter", function(){
    return function(input, test){
        var newArray = [];
        for(var x = 0; x < input.length; x+=2){
             newArray.push(input[x]);
        }
        return newArray;
    }
});



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

angular.module('mainApp').controller('clusterFormCtrl', function($scope, $location) {
  console.log("In clusterFormCtrl");
  $scope.submit = function() {
    $location.path('/clusterForm');
  }
});

angular.module('mainApp').controller('viosForm2Ctrl', function($scope, $location) {
  console.log("In viosForm2Ctrl");
  $scope.submit = function() {
    $location.path('/form2');
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

angular.module('mainApp').controller('viosFormController', function($scope, $http, $location,$localStorage, $rootScope) {
  //console.log("In ViosForm controller");
//  $scope.data = [];
  $scope.scriptLogs="";
  $scope.strTest = "Checking Logs";
  $scope.getScriptLogs = function() {
    // var entryString = viosName+" "+mailID+" "+build+" "+rootvg+" "+patch;
    //console.log(entryString);
    console.log("In ViosForm controller ghjgjghjghjgfjfhjfgffhjuf");
    if ($scope.scriptLogs == "") {
      $scope.stats = "Submitting Data.. Please wait.."
    }

    // ////// Storing in Global Variables
    //
    // $rootScope.viosName = $scope.viosName;
    // $rootScope.viosName
    // $rootScope.viosName
    // $rootScope.viosName
    // $rootScope.viosName
    // $rootScope.viosName


    // var entryV = JSON.stringify({vEntry:entryString});
    // console.log(entryV);
    $http({ method: 'POST',
            url: '/form',
          data: {'viosName':$scope.viosName,'mailID':$scope.mailID,'build':$scope.build,'rootvg':$scope.rootvg,'patch':$scope.patch}
            //data: {'name':'savin'}
          })
          .then(function(resp){
            var resData=resp.data;
            console.log(resp);
            console.log("posting data");
            $scope.scriptLogs = resData;
            console.log($scope.scriptLogs);
            $scope.submit();
            $scope.saveData();

            // localStorage.setItem("scriptLogs",resData);
            // var value=localStorage.getItem("lastname");
            // console.log("got folder value"+ value);

    //         if ($scope.scriptLogs)
    //         substring = "SSP";
    //         console.log(string.indexOf(substring) > -1);
    //         // $scope.logDetails = resData;
    //         //
    //         //               console.log("http log data")
    //         //                return (resp.data);
           });
    // // $http.post('/viosListp',entryV).
    // //     success(function(data) {
    //         console.log("posted successfully");
    //     }).error(function(data) {
    //         console.error("error in posting");
    //     })
  //  $location.path('/form2');
};
//
$scope.saveData =  function() {
  $localStorage.message = $scope.scriptLogs;
  console.log("Printing local storage");
  console.log($localStorage.message);
}

$scope.submit = function() {
  $location.path('/form2');
}



});


angular.module('mainApp').controller('viosForm2Controller', function($scope, $http, $location,$localStorage) {

  $scope.loadData =  function() {
    $scope.message = $localStorage.message
  }

});

angular.module('mainApp').controller('viosListController', function ($scope,$http) {

    console.log("In ViosList controller");
  //  $scope.data = [];
    $scope.submitForm = function(viosName,ms,hmc) {
      var entryString = viosName+" "+ms+" "+hmc;
      console.log(entryString);

      var entryV = JSON.stringify({vEntry:entryString});
      console.log(entryV);
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
      // $http.post('/viosListp',entryV).
      //     success(function(data) {
      //         console.log("posted successfully");
      //     }).error(function(data) {
      //         console.error("error in posting");
      //     })
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
  $scope.print_log=function(index) {
    console.log($scope.logDetails);
    alert("Index is "+index);
  }
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
    .when('/clusterForm', {
      templateUrl: 'pages/clusterForm.html'
    })
    .when('/viosList', {
      templateUrl: 'pages/viosList.html'
    })
    .when('/form2', {
      templateUrl: 'pages/form2.html'
    })
    .when('/home', {
      templateUrl: 'pages/home.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
