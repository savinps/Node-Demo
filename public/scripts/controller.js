var mainApp = angular.module('mainApp', ['ngRoute','ngStorage']);
console.log("In mainApp module");

angular.module('mainApp').filter("myFilter", function(){
    return function(input, test){
        var newArray = [];
        for(var x = 0; x < input.length; x+=2){
             newArray.push(input[x]);
        }
        return newArray;
    }
});

// angular.module('mainApp').directive('markdown', function($window) {
//     var converter = new $window.Showdown.converter();
//     return {
//         restrict: 'E',
//         link: function(scope, element, attrs) {
//             var htmlText = converter.makeHtml(element.text());
//             element.html(htmlText);
//         }
//     }
// });

// angular.module('mainApp').directive("markdown", function ($compile, $http) {
//     var converter = new Showdown.converter();
//     return {
//         restrict: 'E',
//         replace: true,
//         link: function (scope, element, attrs) {
//             if ("src" in attrs) {
//                 $http.get(attrs.src).then(function(data) {
//                     element.html(converter.makeHtml(data.data));
//                 });
//             } else {
//                 element.html(converter.makeHtml(element.text()));
//             }
//         }
//     };
// });



angular.module('mainApp').controller('loginController', function($scope) {
  $scope.message = "You are in login page";

  $http.post('/login', {
        username: user.username,
        password: user.password
    })
    .success(function(data, status, headers, config) {
        done(null, data);

    }).error(function(data, status, header, config) {
        error = "Invalid User name or password!"
        done(error, data);

    });
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

angular.module('mainApp').controller('clusterCreateCtrl', function($scope, $location) {
  console.log("In clusterFormCtrl");
  $scope.submit = function() {
    $location.path('/clusterCreate');
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

angular.module('mainApp').controller('clusterStatusCtrl', function($scope, $location) {
  console.log("In viosStatusCtrl");
  $scope.submit = function() {
    $location.path('/clusterdata');
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
 $scope.viosQueue;
var email;

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
    $rootScope.viosName = $scope.viosName;
    $rootScope.mailID = $scope.mailID;
    $rootScope.build = $scope.build;
    $rootScope.rootvg = $scope.rootvg;
    $rootScope.patch = $scope.patch;


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
            if (resData.indexOf("NODES_MS_HMC") != -1) {
                $scope.stats = resData+"Please create an entry in VIOS List...";
            }
            else {
              console.log("posting data");
              $scope.scriptLogs = resData;
              console.log($scope.scriptLogs);
              $scope.submit();
              $scope.saveData();
            }


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

$scope.loadData =  function() {
  $scope.message = $localStorage.message

}

$scope.confirmation = function() {
  $scope.loadData();
  if($scope.message == "All Nodes are UP\n") {

    $scope.msg = "All Nodes are UP. Do you want to continue with installation procedure?";
  }
  else {
    $scope.msg = $scope.message+" is/are DOWN and will undergo default installation(on hdisk0). Do you want to continue with installation procedure?";
    $rootScope.downnodes = $scope.message;
    console.log("DownNodes:"+ $rootScope.downnodes);
  }

}

console.log("viosQueue:"+ $scope.viosQueue);

$scope.Yes = function() {
  alert("Here we go...");
  $scope.scriptLogs2="";
  if ($scope.scriptLogs2 == "") {

    $scope.stats2 = "Running Master Script... Please wait.."

  }
  console.log("Posting Form2 data");
  //console.log(viosQueue + "  "+ email);
  console.log("viosName using rootScope:"+ $rootScope.viosName);
  $http({ method: 'POST',
          url: '/form2',

          data: {'viosName':$rootScope.viosName, 'mailID':$rootScope.mailID,'build':$rootScope.build,'rootvg':$rootScope.rootvg,'patch':$rootScope.patch }
        })
        .then(function(resp){
          var resData=resp.data;
          console.log(resp);
          console.log("Trying to run Master Script");
          $scope.scriptLogs2 = resData;
          $scope.stats2 = "Logs of Master Script"
          console.log($scope.scriptLogs2);


});

}

$scope.No = function()
{
  //alert("We are exiting...");

      var r = confirm("Do want to proceed with the installation of VIOS which are active?");
      if (r == true) {

          var viosList = $rootScope.viosName;
          var downList = $rootScope.downnodes;
          console.log("NODELIST:",viosList);
          viosList= viosList.replace(downList,'');
          console.log("DOWN NODES:"+downList);
          console.log("UP NODES: "+viosList);

        //   if ($scope.scriptLogs2 == "") {
        //
        //     $scope.stats2 = "Running Master Script... Please wait.."
        //
        //   }
        //   console.log("Posting Form2 data");
        //   //console.log(viosQueue + "  "+ email);
        //   console.log("viosName using rootScope:"+ $rootScope.viosName);
        //   $http({ method: 'POST',
        //           url: '/form2',
        //
        //           data: {'viosName':viosList, 'mailID':$rootScope.mailID,'build':$rootScope.build,'rootvg':$rootScope.rootvg,'patch':$rootScope.patch }
        //         })
        //         .then(function(resp){
        //           var resData=resp.data;
        //           console.log(resp);
        //           console.log("Trying to run Master Script");
        //           $scope.scriptLogs2 = resData;
        //           $scope.stats2 = "Logs of Master Script"
        //           console.log($scope.scriptLogs2);
        //
        //
        // });




      } else {
          console.log("We are exiting..");;
      }

  }



});


//angular.module('mainApp').controller('viosForm2Controller', function($scope, $http, $location,$localStorage) {
//});

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
  $scope.getLogDetails=function(viosName,dirName){
    console.log("Inside Log File Function");
    console.log(dirName);
    $scope.LogFiles = dirName;
    var dirN = JSON.stringify({dirNme:dirName});
    var s = '"something"';
    var result = JSON.parse(s);
    $http({ method: 'POST',
            url: '/historyp',
          //  data: dirN
              data: {'dirN':dirName, 'viosName':viosName}
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

angular.module('mainApp').controller('clusterFormController', function($scope, $http, $location,$localStorage, $rootScope) {
  //console.log("In ViosForm controller");
//  $scope.data = [];
 $scope.viosQueue;
var email;

  $scope.scriptLogs="";
  $scope.strTest = "Checking Logs";
  $scope.getScriptLogs = function() {
    // var entryString = viosName+" "+mailID+" "+build+" "+rootvg+" "+patch;
    //console.log(entryString);
    console.log("In ClusterForm controller ghjgjghjghjgfjfhjfgffhjuf");
    if ($scope.scriptLogs == "") {
      $scope.stats = "Submitting Data.. Please wait.."
    }

    // ////// Storing in Global Variables
    //
    $rootScope.viosName = $scope.viosName;
    $rootScope.mailID = $scope.mailID;
    $rootScope.build = $scope.build;
    $rootScope.rootvg = $scope.rootvg;
    $rootScope.patch = $scope.patch;
    $rootScope.repoDisk = $scope.repoDisk;
    $rootScope.clusterName = $scope.clusterName;
    $rootScope.masterNode = $scope.masterNode;


    // var entryV = JSON.stringify({vEntry:entryString});
    // console.log(entryV);
    $http({ method: 'POST',
            url: '/clusterForm',
          data: {'viosName':$scope.viosName,'mailID':$scope.mailID,'build':$scope.build,'rootvg':$scope.rootvg,'patch':$scope.patch, 'masterNode':$scope.masterNode, 'clusterName':$scope.clusterName, 'repoDisk':$scope.repoDisk}
            //data: {'name':'savin'}
          })
          .then(function(resp){
            var resData=resp.data;
            console.log(resp);
            if (resData.indexOf("NODES_MS_HMC") != -1) {
                $scope.stats = resData+"Please create an entry in VIOS List...";
            }
            else {
              console.log("posting data");
              $scope.scriptLogs = resData;
              console.log($scope.scriptLogs);
              $scope.submit();
              $scope.saveData();
            }


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
  $location.path('/clusterForm2');
}

$scope.loadData =  function() {
  $scope.message = $localStorage.message

}

$scope.confirmation = function() {
  $scope.loadData();
  if($scope.message == "All Nodes are UP\n") {

    $scope.msg = "All Nodes are UP. Do you want to continue with installation procedure?"
  }
  else {
    $scope.msg = $scope.message+" is/are DOWN and will undergo default installation(on hdisk0). Do you want to continue with installation procedure?"
  }

}

console.log("viosQueue:"+ $scope.viosQueue);

$scope.Yes = function() {
  alert("Here we go...");
  $scope.scriptLogs2="";
  if ($scope.scriptLogs2 == "") {

    $scope.stats2 = "Running Master Script... Please wait.."

  }
  console.log("Posting Cluster Form2 data");
  //console.log(viosQueue + "  "+ email);
  console.log("viosName using rootScope:"+ $rootScope.viosName);
  $http({ method: 'POST',
          url: '/clusterForm2',

          data: {'viosName':$rootScope.viosName, 'mailID':$rootScope.mailID,'build':$rootScope.build,'rootvg':$rootScope.rootvg,'patch':$rootScope.patch, 'clusterName':$rootScope.clusterName, 'repoDisk':$rootScope.repoDisk, 'masterNode':$rootScope.masterNode}
        })
        .then(function(resp){
          var resData=resp.data;
          console.log(resp);
          console.log("Trying to run Master Script");
          $scope.scriptLogs2 = resData;
          $scope.stats2 = "Logs of Master Script"
          console.log($scope.scriptLogs2);


});

}

$scope.No = function()
{
  alert("We are exiting...");
}

});



angular.module('mainApp').controller('clusterDataCtrl', function($scope, $http) {
  console.log("In clusterDataCtrl");

  $http.get("data.json").then(function (response) {
      console.log("http success");
      $scope.myData = response.data;
  });

  $http.get("clusterdata3.json").then(function (response) {
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
  $scope.getLogDetails=function(viosName,dirName){
    console.log("Inside Log File Function");
    console.log(dirName);
    $scope.LogFiles = dirName;
    var dirN = JSON.stringify({dirNme:dirName});
    var s = '"something"';
    var result = JSON.parse(s);
    $http({ method: 'POST',
            url: '/clusterdata',
          //  data: dirN
              data: {'dirN':dirName, 'viosName':viosName}
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

/////////////  Cluster Create Controller /////////////////////
angular.module('mainApp').controller('clusterCreateController', function($scope, $http, $location,$localStorage, $rootScope) {


  $scope.scriptLogs="";
  $scope.strTest = "Checking Logs";
  $scope.createcluster = function() {
    // var entryString = viosName+" "+mailID+" "+build+" "+rootvg+" "+patch;
    //console.log(entryString);
    console.log("In Cluster Create controller");
    if ($scope.scriptLogs == "") {
      $scope.stats = "Submitting Data.. Please wait.."
    }

    // ////// Storing in Global Variables
    //
    $rootScope.viosName = $scope.viosName;
    $rootScope.mailID = $scope.mailID;
    $rootScope.poolName = $scope.poolName;
    $rootScope.poolDisk = $scope.poolDisk;
    $rootScope.repoDisk = $scope.repoDisk;
    $rootScope.clusterName = $scope.clusterName;
    $rootScope.masterNode = $scope.masterNode;


    // var entryV = JSON.stringify({vEntry:entryString});
    // console.log(entryV);
    $http({ method: 'POST',
            url: '/clusterCreate',
          data: {'viosName':$scope.viosName,'mailID':$scope.mailID,'poolName':$scope.poolName,'poolDisk':$scope.poolDisk, 'masterNode':$scope.masterNode, 'clusterName':$scope.clusterName, 'repoDisk':$scope.repoDisk}
            //data: {'name':'savin'}
          })
          .then(function(resp){
            var resData=resp.data;
            console.log(resp);
                $scope.scriptLogs = resData;
                $scope.stats = resData+"...Page is under Maintenance...";

              console.log("posting data");





           });

};
//

});

////////// ///// Defining Routes ////////////////////

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
    .when('/clusterForm2', {
      templateUrl: 'pages/clusterForm2.html'
    })
    .when('/clusterdata', {
      templateUrl: 'pages/clusterdata.html'
    })
    .when('/clusterCreate', {
      templateUrl: 'pages/clusterCreate.html'
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
