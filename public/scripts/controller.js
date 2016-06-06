var mainApp = angular.module('mainApp', ['ngRoute','ngStorage','angularjs-dropdown-multiselect','ngTable','wt.responsive']);
//console.log("In mainApp module");

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



angular.module('mainApp').controller('loginController', function($scope,$http,$window) {
  $scope.message = "You are in login page";


  // $http.post('/', {
  //       username: $scope.username,
  //       password: $scope.password
  //   })
  //   .success(function(data, status, headers, config) {
  //       done(null, data);
  //
  //   }).error(function(data, status, header, config) {
  //       error = "Invalid User name or password!"
  //       done(error, data);
  //
  //   });
$scope.getLogin = function() {

  $http({ method: 'POST',
          url: '/',

          data: {'username':$scope.username, 'password':$scope.password}
        })
        .then(function(resp){
          var resData=resp.data;
          console.log(resData);
            //$location.path('/home');
            $window.location.href = location.hostname'htt+p://omaha01.isst.aus.stglabs.ibm.com:8080/home#/';
        });

}


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
  var jsonArr = [];

  $http.get("build.json").then(function (response) {
      console.log("Got build data");
      $scope.myData = response.data;

      console.log($scope.myData);
  });

  $http.get("data4.json").then(function (response) {
      console.log("Got vios list data");
      $scope.viosData = response.data;

      console.log($scope.viosData);


      for (var i = 0; i < $scope.viosData.length; i++) {
    jsonArr.push({
        id: i,
        label: $scope.viosData[i].node
    });
}

  console.log("JSON Array:");
  console.log(jsonArr);

  });

/// Multi select parameter

      $scope.example13model = [];
              // $scope.example13data =  [
              //     {id: 1, label: "David"},
              //     {id: 2, label: "Jhon"},
              //     {id: 3, label: "Lisa"},
              //     {id: 4, label: "Nicole"},
              //     {id: 5, label: "Danny"}];

      $scope.example13data = jsonArr;
      console.log("Multiselect Data");
      console.log($scope.example13data);
              $scope.example13settings = {
                  smartButtonMaxItems: 10,
                  smartButtonTextConverter: function(itemText, originalItem) {
                      if (itemText === 'Jhon') {
                      return 'Jhonny!';
                      }

                      return itemText;
                  }
              };


////////

console.log("New VIOS list:"+$scope.example13model);


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
    $rootScope.viosName='';
    //$rootScope.viosName = $scope.viosName;
    $rootScope.mailID = $scope.mailID;
    $rootScope.build = $scope.build.build;
    $rootScope.rootvg = $scope.rootvg;
    $rootScope.patch = $scope.patch;
    console.log("Build:"+$rootScope.build);
    console.log("Updated VIOS LIST:");


    for (var i = 0; i < $scope.example13model.length; i++){
      console.log($scope.example13model[i].id);
      for (var j = 0; j < jsonArr.length; j++){

          if($scope.example13model[i].id == jsonArr[j].id){

            $rootScope.viosName = $rootScope.viosName+jsonArr[j].label+" ";
            console.log($rootScope.viosName);

          }

      }

   }

$rootScope.viosName=$rootScope.viosName.trim();


    $http({ method: 'POST',
            url: '/form',
          data: {'viosName':$rootScope.viosName,'mailID':$scope.mailID,'build':$rootScope.build,'rootvg':$scope.rootvg,'patch':$scope.patch}
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



           });

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
  $scope.message = $localStorage.message[0].pingData;
   $scope.message2 = $localStorage.message[0].backData;
}
$rootScope.downnodes='';
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
  console.log($rootScope.downnodes);

  var viosList = $rootScope.viosName;
  var downList = $rootScope.downnodes;
  console.log("NODELIST:",viosList);
  viosList = viosList.trim();
  downList = downList.trim();

  var res = downList.split(" ");

  for (i=0; i < res.length; i++)
  {
    viosList= viosList.replace(res[i],'');
  }
  viosList = viosList.trim();
  console.log("DOWN NODES:"+downList);
  console.log("UP NODES: "+viosList);

  if ($rootScope.downnodes=='' || viosList=='' )
  {
    alert("You are exiting from the installation procedure");

    $scope.stats2 =" Installation Process Terminated!!!"

  }else {

    var r = confirm("Do want to proceed with the installation of VIOS which are active?");
    if (r == true) {


        $scope.stats2 = "We are going ahead with the installation of nodes("+viosList+") which are up. Please wait for the further updates."
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
  /////////////////////////////////////////////////////////
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

              data: {'viosName':viosList, 'mailID':$rootScope.mailID,'build':$rootScope.build,'rootvg':$rootScope.rootvg,'patch':$rootScope.patch }
            })
            .then(function(resp){
              var resData=resp.data;
              console.log(resp);
              console.log("Trying to run Master Script");
              $scope.scriptLogs2 = resData;
              $scope.stats2 = "Logs of Master Script"
              console.log($scope.scriptLogs2);


    });




    } else {
        console.log("We are exiting..");;
        $scope.stats2 =" Installation Process Terminated..."
    }


  }


  }



});


//angular.module('mainApp').controller('viosForm2Controller', function($scope, $http, $location,$localStorage) {
//});

angular.module('mainApp').controller('viosListController', function ($scope,$http) {

    console.log("In ViosList controller");
    $scope.submitMessage = function()
    {
      console.log("Creating submit message");
      $scope.submitMsg ="Entry is created successfully.Kindly refresh the page."
      console.log($scope.submitMsg);
    }
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


angular.module('mainApp').controller('logDataCtrl', function($scope, $http, $filter, ngTableParams) {
  console.log("In logDataCtrl");


  $scope.toggle = true;


  $http.get("data.json").then(function (response) {
      console.log("http success");
      $scope.myData = response.data;
  });

  var tableArr = [];
  $http.get("data3.json").then(function (response) {
      console.log("http success");
      $scope.myData2 = response.data;

      for (var i = 0; i < $scope.myData2.length; i++) {
          tableArr.push({
              "id": i,
              "viosName": $scope.myData2[i].viosName,
              "build": $scope.myData2[i].build,
              "emailID": $scope.myData2[i].emailID,
              "date": $scope.myData2[i].date,
              "status": $scope.myData2[i].status,
              "LogFiles": $scope.myData2[i].LogFiles



          });
      }

      // tableArr=$scope.myData2;
      //console.log($scope.myData2);
      console.log("Table Array");
      console.log(tableArr);

      $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: tableArr.length,
                    getData: function ($defer, params) {
                      $scope.data = params.sorting() ? $filter('orderBy')(tableArr, params.orderBy()) : tableArr;
                      $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.data);
                    }
                });


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
    $scope.nodename = viosName;
    console.log($scope.nodename);
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


///// Home Controller

angular.module('mainApp').controller('homeController', function($scope, $http, $location,$localStorage, $rootScope) {
  var jsonArr = [];

  $http.get("data3.json").then(function (response) {
      console.log("Got build data");
      $scope.myData = response.data;
      console.log("Status data");
      console.log($scope.myData);

      var percent;

      // for (var i=$scope.myData.length-4; i < $scope.myData.length; i++) {
      //   // console.log("count:"+i);
      //   // console.log($scope.myData[i].status);
      //   jsonArr.push({
      //         id: i,
      //         "label": $scope.myData[i].viosName,
      //         "stat": $scope.myData[i].status,
      //         "percentage": percent
      //     });
      //
      // }
      // console.log("Stat array");
      // console.log(jsonArr);

      for (var i=$scope.myData.length-4; i < $scope.myData.length; i++) {
          var stat;
          stat = $scope.myData[i].status;
          if (stat.indexOf("INVALID") != -1) {
            percent = 0;
          }

        else  if ($scope.myData[i].status.indexOf("Backup") != -1) {
          percent =10;
        }
        else  if ($scope.myData[i].status.indexOf("NIM") != -1) {
          percent =25;
        }
        else  if ($scope.myData[i].status.indexOf("Installation") != -1) {
          percent =50;
        }

        else  if ($scope.myData[i].status.indexOf("Up after Install") != -1) {
          percent =60;
        }
        else  if ($scope.myData[i].status.indexOf("Down after Install") != -1) {
          percent =60;
        }
        else  if ($scope.myData[i].status.indexOf("PostConfig Done") != -1) {
          percent =80;
        }
        else  if ($scope.myData[i].status.indexOf("Up after PostConfig") != -1) {
          percent =85;
        }
        else  if ($scope.myData[i].status.indexOf("Down after PostConfig") != -1) {
          percent =85;
        }
        else  if ($scope.myData[i].status.indexOf("Restore") != -1) {
          percent =95;
        }
        else  if ($scope.myData[i].status.indexOf("SUCCESS") != -1) {
          percent =100;
        }




        jsonArr.push({
            id: i,
            "label": $scope.myData[i].viosName,
            "status": $scope.myData[i].status,
            "percentage": percent
        });
      }
      $scope.statusdata = [];
      $scope.statusdata = jsonArr;
      console.log("Status Array is");
      console.log($scope.statusdata);
  });


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
