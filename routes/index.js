var express=require('express');
var fs = require('fs');
var nodemailer = require('nodemailer');
var nl2br = require('nl2br');
var Promise = require('promise');
var configFile = fs.readFileSync('./public/data3.json');
var config = JSON.parse(configFile);
var clusterFile = fs.readFileSync('./public/clusterdata3.json');
var clusterf = JSON.parse(clusterFile);
var nodeFile = fs.readFileSync('./public/data4.json');
var nodeList = JSON.parse(nodeFile);
var execProcess = require("../exec_process.js");
router=express.Router();

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    var jsonArr = [];
  ////////////////////////////////////////
    for (var i in files){
        console.log(i);
        var name = dir + '/' + files[i];
      //  var name = files[i];
        var text = fs.readFileSync(name,'utf8');
      //  console.log (text);
        //var name = nl2br(name);
        //var name =name.replace(/[^a-zA-Z ]/g, "");
        jsonArr.push({filename: name , logContent: text});

        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name,text);
        }
    }
    ////////////////////////////////////////////////////////////////////
    //return files_;
    // for (var i in files){
    //           console.log(i);
    //           var name = dir + '/' + files[i];
    //           //  var name = files[i];
    //           var filename = files[i];
    //           fs.watch(name,function(event, filename) {
    //               if(filename){
    //                   console.log(filename + ' file Changed ...');
    //                   var text = fs.readFileSync(name,'utf8')
    //                   //  console.log (text);
    //                   jsonArr.push({filename: name , logContent: text});
    //               }
    //               else{
    //                   console.log('filename not provided')
    //               }
    //
    //               if (fs.statSync(name).isDirectory()){
    //                 getFiles(name, files_);
    //               } else {
    //                 files_.push(name,text);
    //               }
    //
    //     });
    // }

                                      //     fs.watch(filePath, function(event, filename) {
                                      //   if(filename){
                                      //     console.log('Event : ' + event);
                                      //     console.log(filename + ' file Changed ...');
                                      //     file = fs.readFileSync(filePath);
                                      //     console.log('File content at : ' + new Date() + ' is \n' + file);
                                      //   }
                                      //   else{
                                      //     console.log('filename not provided')
                                      //   }
                                      // });

    ////////////////////////////////////////////////////////////////////////
    //console.log(jsonArr);
    return jsonArr;
}

router.get('/',function(req,res,next){
  console.log("success");
  res.render('index',{
    title:'SSP_Tool - Home',
    classname:'Home'
  });
});


// router.post('/login',function(req,res,next) {
//   var username= req.body.username;
//   console.log(viosname);
//   var password= req.body.password;
//   console.log(mailid);
//
//   if(username=="admin" && password=="abc123")
//   {
//       res.status(200).send("success");
//   }
// });

router.get('/history',function(req,res,next){
  console.log("history is success");
  console.log(getFiles('SSP_Logs'));
  res.send(getFiles('SSP_Logs'));


});

router.post('/historyp',function(req,res,next){
  console.log("Log Directory name");
  console.log(req.body);
  var viosName = req.body.viosName;
    var logDir = req.body.dirN;
  console.log(logDir);
  console.log("Json Array for log files");
  var log_files = getFiles('SSP_Logs/'+logDir);

  for (var i = 0; i < log_files.length; i++){
    // look for the entry with a matching `code` value
    if (log_files[i].filename.indexOf(viosName) == -1){
      console.log(log_files[i].filename);
      log_files.splice(i,1);

    }
  }
  console.log("After splicing");
  console.log(log_files);
  //res.send(getFiles('SSP_Logs/'+logDir));
  res.send(log_files);
  // res.writeHead(200,{"Content-Type":"text/plain"});
  // res.write("Sending Log Response");

})


router.post('/clusterdata',function(req,res,next){
  console.log("Log Directory name");
  console.log(req.body);
  var viosName = req.body.viosName;
    var logDir = req.body.dirN;
  console.log(logDir);
  console.log("Json Array for log files");
  var log_files = getFiles('SSP_Logs/'+logDir);
  res.send(log_files);


})

router.get('/viosList',function(req,res,next){
  console.log("VIOS List  is success");
});
////////////////////////////////////////////////////// Form Post
router.post('/form2',function(req,res,next){
  console.log("Recieved Vios form data");
  console.log(req.body);
  var viosname= req.body.viosName;

  var mailid= req.body.mailID;
  console.log(mailid);
  var rootvg = req.body.rootvg;
  console.log(rootvg);
  var patch = req.body.patch;
  console.log(patch);
  var build = req.body.build;
  console.log(build);
  var commandString = " -n "+'\"'+viosname+'\"'+" -b "+build+" -r "+'\"'+rootvg+'\"'+" -e "+mailid;
  console.log(commandString);
  console.log("Command Log");

  // Current Date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var min = today.getMinutes();
        var sec = today.getSeconds();

        if(dd<10) {
            dd='0'+dd;
        }

        if(mm<10) {
            mm='0'+mm;
        }

        today = mm+'/'+dd+'/'+yyyy;
        cur_time = dd+'/'+mm+'/'+yyyy+'('+min+':'+sec+')';
    console.log(today);
    console.log(cur_time);

  function appendObject(obj){

  config.push(obj);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./public/data3.json', configJSON);
  }
  console.log(config);

  // To find the number of entries of a particular vios in data2.json
  var count =0;
  var viosArray = viosname.split(" ");
  //////////////

/////////////////////////

// iterate over each element in the array
    for (index = 0; index < viosArray.length; ++index) {
      for (var i = 0; i < config.length; i++){
        // look for the entry with a matching `code` value
        if (config[i].viosName == viosArray[index]){
          count= count+1;
          config.splice(i,1);
          i=0;
        }
      }
    }
console.log("Deleting Old Entry");
console.log(count);
console.log(config);
var script_output;
//var script_output = execProcess.result("./ssp_vios_setup_trail"+commandString);
execProcess.result("./ssp_vios_setup_trail -f input_file.txt", function(err, response){

    console.log("Invoking master script");
  	if(!err){
      console.log("success");
  		console.log(response);
      script_output=response;
  	}else {
  		console.log(err);
  	}
  });
  var logFilePath;
  var delay=7000; //7 second
  var flag=0;
setTimeout(function() {
  //your code to be executed after 7 second
  execProcess.result("./debug", function(err, response){
      //console.log("Invoking Log files folder");
      if(!err){
         logFilePath = response;
        console.log("Logs are in below folder");
        console.log(logFilePath);
        logFilePath = logFilePath.slice(0,-1);
        console.log("Vios Names:" + viosArray);
        for (index = 0; index < viosArray.length; ++index) {
          flag=0;
          console.log(viosArray[index]);
          for (var i = 0; i < nodeList.length; i++){
            // look for the entry with a matching `code` value
            if (nodeList[i].node == viosArray[index]){
              flag=1;
              console.log("Entry is present in NODES_MS_HMC.txt file");
              break;

            }
          }

          if (flag==0) {
            console.log(viosArray[index] + "is not present in NODES_MS_HMC.txt file");
          }

        appendObject({"id":"4","viosName":viosArray[index],"build":build,"patch":patch,"emailID":mailid,"date":cur_time,"status":"Running","LogFiles":logFilePath});

      }
    }
      else {
        console.log(err);
      }
    });

}, delay);


console.log("savin:"+logFilePath);
//appendObject({"id":"4","viosName":viosname,"build":build,"patch":patch,"emailID":mailid,"date":cur_time,"status":"Running","LogFiles":logFilePath});
//res.json({'output':'Please Help me'});

var delay=70000; //7 second
setTimeout(function() {
  res.send(script_output);

}, delay);


});


//  Post request for getting Vios list
router.post('/viosListp',function(req,res,next){
  console.log("Recieved VIOS entry Data");
  var viosEntry= req.body.vEntry;
  console.log(req.body.vEntry);
  res.send(viosEntry);
  var temp = viosEntry.split(" ");

   var viosname = temp[0];
   var ms = temp[1];
   var hmc = temp[2];
   console.log(viosname);
   console.log(ms);
   console.log(hmc);

     //// // Removing Old Entries and Writing NODES_MS_HMC.txt

   execProcess.result("./removeNode "+viosname, function(err, response){

       console.log("Removing Obselete VIOS entry");
     	if(!err){
     		var msg = response;
        console.log("here is the msg"+msg);
     	}else {
     		console.log(err);
     	}
     });

     var delay=3000; //second

    setTimeout(function() {
       fs.appendFile('NODES_MS_HMC.txt',viosname+" "+ms+" "+hmc+"\n", function (err) {
      if (err) throw err;
      console.log('It\'s appended!');
         });

      }, delay);

//////////////////// Removing and Writing to VIOS List JSON file
            var delay=2000; //second

        //   setTimeout(function() {
      function appendObject(nodeObj){

      nodeList.push(nodeObj);
      var nodeListJSON = JSON.stringify(nodeList);
      fs.writeFileSync('./public/data4.json', nodeListJSON);
      }
      console.log(nodeList);

      // To find the number of entries of a particular vios in data2.json
      var count =0;

    // iterate over each element in the array
    for (var i = 0; i < nodeList.length; i++){
      // look for the entry with a matching `code` value
      if (nodeList[i].node == viosname){
        count= count+1;
        nodeList.splice(i,1);
        i=0;
      }
    }
    console.log("count="+count);
    console.log(nodeList);
    //
    //
       appendObject({"node":viosname,"MS":ms,"HMC":hmc});
       console.log("After Appending");
       console.log(nodeList);
    //   }, delay);

////////////////////////////////////////////////////////////////////////////////
    // var obj = require("../public/data4.json");
    // console.log(obj);
    //
    // for(var i = 0; i < obj.length; i++)
    // {
    //   if(obj[i].node == viosname)
    //   {
    //     console.log(obj[i]);;
    //     delete obj[i];
    //     console.log("Deleted a row");
    //   }
    // }

      // function appendObject(obj){
      //
      // config.push(obj);
      // var nodeListJSON = JSON.stringify(nodeList);
      // fs.writeFileSync('./public/data4.json', nodeListJSON);
      // }
      //
      //    appendObject({"node":viosname,"MS":ms,"HMC":hmc});
      //    console.log("After Appending");
      //    console.log(nodeList);

 });


 /// Cluster form

 router.post('/clusterForm',function(req,res,next){
   console.log("Recieved Cluster form data");
   console.log(req.body);
   var viosname= req.body.viosName;

   var mailid= req.body.mailID;
   console.log(mailid);
   var rootvg = req.body.rootvg;
   console.log(rootvg);
   var patch = req.body.patch;
   console.log(patch);
   var build = req.body.build;
   console.log(build);
   var repodisk = req.body.repoDisk;
   console.log(repodisk);
   var masternode = req.body.masterNode;
   console.log(masternode);
   var clustername = req.body.clusterName;
   console.log(clustername);



  /// Checking NODES_HMC_MS.txt
  var viosArray = viosname.split(" ");
  var DnodeCount=0;
  var DnodeList = "";


  for (index = 0; index < viosArray.length; ++index) {
    flag=0;
    console.log(viosArray[index]);
    for (var i = 0; i < nodeList.length; i++){
      // look for the entry with a matching `code` value
      if (nodeList[i].node == viosArray[index]){
        flag=1;
        console.log("Entry is present in NODES_MS_HMC.txt file");
        break;

      }
    }

    if (flag==0) {
      console.log(viosArray[index] + "is not present in NODES_MS_HMC.txt file");
      DnodeCount = DnodeCount +1;
      DnodeList = DnodeList + viosArray[index];
    }

  //appendObject({"id":"4","viosName":viosArray[index],"build":build,"patch":patch,"emailID":mailid,"date":cur_time,"status":"Running","LogFiles":logFilePath});

  }

  if (DnodeCount > 0) {

  res.send(DnodeList+ ": not present in NODES_MS_HMC.txt file");
  return;
  }



 ///// Deleting the older input file
   execProcess.result("rm cluster_file.txt", function(err, response){

       console.log("Deleting Cluster File");
      if(!err){
         console.log("success");
      }
       else {
        console.log(err);
      }
     });

 /// Creating input file
 var input_file = "NODES : " + viosname +"\n"
                  + "BUILD : " + build + "\n"
                  +"SSP PATCH : " + patch + "\n"
                  +"ROOTVG DISKS : " + rootvg + "\n"
                  +"EMAIL ID : " + mailid + "\n"
                  +"CLUSTER : " + clustername + "\n"
                  +"NIM MASTER : " + "\n"
                  +"MASTER NODE : " + masternode +"\n"
                  +"REPO DISK : " + repodisk + "\n";
 console.log("Here is the input file \n" + input_file);

 fs.writeFile("cluster_file.txt", input_file, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
 });

   ///// Pinging the NODES
   var ping_output = "UP";
   var delay=10000; //7 second
   setTimeout(function() {
   execProcess.result("./node_ping -n "+'\"'+viosname+'\"' , function(err, response){

       console.log("Pinging the nodes");
      if(!err){
         console.log("success");
         console.log(response);
         ping_output=response;
         res.send(ping_output);
      }
       else {
        console.log(err);
        res.send("Error while running script");
      }
     });

     }, delay);


 });


//// Cluster Form2

router.post('/clusterForm2',function(req,res,next){
  console.log("Recieved Cluster form data");
  console.log(req.body);
  var viosname= req.body.viosName;

  var mailid= req.body.mailID;
  console.log(mailid);
  var rootvg = req.body.rootvg;
  console.log(rootvg);
  var patch = req.body.patch;
  console.log(patch);
  var build = req.body.build;
  console.log(build);
  var repodisk = req.body.repoDisk;
  console.log(repodisk);
  var masternode = req.body.masterNode;
  console.log(masternode);
  var clustername = req.body.clusterName;
  console.log(clustername);


  // Current Date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var min = today.getMinutes();
        var sec = today.getSeconds();

        if(dd<10) {
            dd='0'+dd;
        }

        if(mm<10) {
            mm='0'+mm;
        }

        today = mm+'/'+dd+'/'+yyyy;
        cur_time = dd+'/'+mm+'/'+yyyy+'('+min+':'+sec+')';
    console.log(today);
    console.log(cur_time);

  function appendObject(obj){

  clusterf.push(obj);
  var clusterfJSON = JSON.stringify(clusterf);
  fs.writeFileSync('./public/clusterdata3.json', clusterfJSON);
  }
  console.log(clusterf);

  // To find the number of entries of a particular vios in data2.json
  var count =0;
  var viosArray = viosname.split(" ");
  //////////////

/////////////////////////
//Uncomment it
// // iterate over each element in the array
//     for (index = 0; index < viosArray.length; ++index) {
//       for (var i = 0; i < config.length; i++){
//         // look for the entry with a matching `code` value
//         if (config[i].viosName == viosArray[index]){
//           count= count+1;
//           config.splice(i,1);
//           i=0;
//         }
//       }
//     }
// console.log("Deleting Old Entry");
// console.log(count);
// console.log(config);
var script_output;
//var script_output = execProcess.result("./ssp_vios_setup_trail"+commandString);
console.log("Invoking master script");


appendObject({"clusterName":clustername,"build":build,"patch":patch,"viosName":viosname,"emailID":mailid,"date":cur_time,"status":"Running","LogFiles":"SSP_VIOS_May182016032042"});
res.send("Working fine till now");



});



/////

 router.post('/form10',function(req,res,next){

   console.log(req.body);
   var viosname= req.body.viosName;

   var mailid= req.body.mailID;
   console.log(mailid);
   var rootvg = req.body.rootvg;
   console.log(rootvg);
   var patch = req.body.patch;
   console.log(patch);
   var build = req.body.build;
   console.log(build);
   console.log("Recieved  form2 data");

   // Current Date
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();
         var min = today.getMinutes();
         var sec = today.getSeconds();

         if(dd<10) {
             dd='0'+dd;
         }

         if(mm<10) {
             mm='0'+mm;
         }

         today = mm+'/'+dd+'/'+yyyy;
         cur_time = dd+'/'+mm+'/'+yyyy+'('+min+':'+sec+')';
     console.log(today);
     console.log(cur_time);

   function appendObject(obj){

   config.push(obj);
   var configJSON = JSON.stringify(config);
   fs.writeFileSync('./public/data3.json', configJSON);
   }
   console.log(config);

   // To find the number of entries of a particular vios in data2.json
   var count =0;
   var viosArray = viosname.split(" ");

 // iterate over each element in the array
     for (index = 0; index < viosArray.length; ++index) {
       for (var i = 0; i < config.length; i++){
         // look for the entry with a matching `code` value
         if (config[i].viosName == viosArray[index]){
           count= count+1;
           config.splice(i,1);
           i=0;
         }
       }
     }
 console.log("Deleting Old Entry");
 console.log(count);
 console.log(config);
 var script_output;
 //var script_output = execProcess.result("./ssp_vios_setup_trail"+commandString);
 execProcess.result("./ssp_vios_setup_trail -f input_file.txt", function(err, response){

     console.log("Invoking master script");
    if(!err){
       console.log("success");
      console.log(response);
       script_output=response;
    }else {
      console.log(err);
    }
   });
   var logFilePath;
   var delay=7000; //7 second
   var flag=0;
 setTimeout(function() {
   //your code to be executed after 7 second
   execProcess.result("./debug", function(err, response){
       //console.log("Invoking Log files folder");
       if(!err){
          logFilePath = response;
         console.log("Logs are in below folder");
         console.log(logFilePath);
         logFilePath = logFilePath.slice(0,-1);
         console.log("Vios Names:" + viosArray);
         for (index = 0; index < viosArray.length; ++index) {
           flag=0;
           console.log(viosArray[index]);
           for (var i = 0; i < nodeList.length; i++){
             // look for the entry with a matching `code` value
             if (nodeList[i].node == viosArray[index]){
               flag=1;
               console.log("Entry is present in NODES_MS_HMC.txt file");
               break;

             }
           }

           if (flag==0) {
             console.log(viosArray[index] + "is not present in NODES_MS_HMC.txt file");
           }

         appendObject({"id":"4","viosName":viosArray[index],"build":build,"patch":patch,"emailID":mailid,"date":cur_time,"status":"Running","LogFiles":logFilePath});

       }
     }
       else {
         console.log(err);
       }
     });

 }, delay);


 console.log("savin:"+logFilePath);
 //appendObject({"id":"4","viosName":viosname,"build":build,"patch":patch,"emailID":mailid,"date":cur_time,"status":"Running","LogFiles":logFilePath});
 //res.json({'output':'Please Help me'});

 var delay=50000; //7 second
 setTimeout(function() {
   res.send(script_output);

 }, delay);

 });

 router.post('/form',function(req,res,next){
   console.log("Recieved Vios form data");
   console.log(req.body);
   var viosname= req.body.viosName;

   var mailid= req.body.mailID;
   console.log(mailid);
   var rootvg = req.body.rootvg;
   console.log(rootvg);
   var patch = req.body.patch;
   console.log(patch);
   var build = req.body.build;
   console.log(build);
   var commandString = " -n "+'\"'+viosname+'\"'+" -b "+build+" -r "+'\"'+rootvg+'\"'+" -e "+mailid;
   console.log(commandString);
   console.log("Command Log");

  /// Checking NODES_HMC_MS.txt
  var viosArray = viosname.split(" ");
  var DnodeCount=0;
  var DnodeList = "";


  for (index = 0; index < viosArray.length; ++index) {
    flag=0;
    console.log(viosArray[index]);
    for (var i = 0; i < nodeList.length; i++){
      // look for the entry with a matching `code` value
      if (nodeList[i].node == viosArray[index]){
        flag=1;
        console.log("Entry is present in NODES_MS_HMC.txt file");
        break;

      }
    }

    if (flag==0) {
      console.log(viosArray[index] + "is not present in NODES_MS_HMC.txt file");
      DnodeCount = DnodeCount +1;
      DnodeList = DnodeList + viosArray[index];
    }

  //appendObject({"id":"4","viosName":viosArray[index],"build":build,"patch":patch,"emailID":mailid,"date":cur_time,"status":"Running","LogFiles":logFilePath});

  }

  if (DnodeCount > 0) {

  res.send(DnodeList+ "not present in NODES_MS_HMC.txt file");
  return;
  }



 ///// Deleting the older input file
   execProcess.result("rm input_file.txt", function(err, response){

       console.log("Deleting Input File");
     	if(!err){
         console.log("success");
     	}
       else {
     		console.log(err);
     	}
     });

 /// Creating input file
   var input_file = "NODES : " + viosname +"\n"
                     + "BUILD : " + build + "\n"
                     +"SSP PATCH : " + patch + "\n"
                     +"ROOTVG DISKS : " + rootvg + "\n"
                     +"EMAIL ID : " + mailid + "\n"
                     +"NIM MASTER : " + "\n"
                     +"MASTER NODE : " +"\n"
                     +"REPO DISK : " +"\n";
   console.log("Here is the input file \n" + input_file);

   fs.writeFile("input_file.txt", input_file, function(err) {
       if(err) {
           return console.log(err);
       }

       console.log("The file was saved!");
   });

   ///// Pinging the NODES
   var ping_output = "UP";
   var delay=10000; //7 second
   setTimeout(function() {
   execProcess.result("./node_ping -n "+'\"'+viosname+'\"' , function(err, response){

       console.log("Pinging the nodes");
     	if(!err){
         console.log("success");
         console.log(response);
         ping_output=response;
         res.send(ping_output);
     	}
       else {
     		console.log(err);
        res.send("Error while running script");
     	}
     });

     }, delay);


});



////Cluster Create Post Request

router.post('/clusterCreate',function(req,res,next){
  console.log("Recieved Cluster Creation data");
  console.log(req.body);
  var viosname= req.body.viosName;

  var mailid= req.body.mailID;
  console.log(mailid);
  var rootvg = req.body.rootvg;
  console.log(rootvg);
  var patch = req.body.patch;
  console.log(patch);
  var build = req.body.build;
  console.log(build);
  var repodisk = req.body.repoDisk;
  console.log(repodisk);
  var masternode = req.body.masterNode;
  console.log(masternode);
  var clustername = req.body.clusterName;
  console.log(clustername);

  res.send("Cluster Creation Details are received successfully");

});


module.exports = router;
