var express=require('express');
var fs = require('fs');
var configFile = fs.readFileSync('./public/data3.json');
var config = JSON.parse(configFile);
var nodeFile = fs.readFileSync('./public/data4.json');
var nodeList = JSON.parse(nodeFile);
var execProcess = require("../exec_process.js");
router=express.Router();

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    var jsonArr = [];
    for (var i in files){
        console.log(i);
        var name = dir + '/' + files[i];
      //  var name = files[i];
        var text = fs.readFileSync(name,'utf8')
      //  console.log (text);
        jsonArr.push({filename: name , logContent: text});

        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name,text);
        }
    }
    //return files_;
    console.log(jsonArr);
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
  var logDir = req.body.dirNme;
  console.log(logDir);
  res.send(getFiles('SSP_Logs/'+logDir));
  // res.writeHead(200,{"Content-Type":"text/plain"});
  // res.write("Sending Log Response");

})

router.get('/viosList',function(req,res,next){
  console.log("VIOS List  is success");
});

router.post('/form',function(req,res,next){
  console.log("Recieved form data");
  var viosname= req.body.temp.viosName;
  console.log(viosname);
  var mailid= req.body.temp.mailID;
  console.log(mailid);
  var rootvg = req.body.temp.rootvg;
  console.log(rootvg);
  var patch = req.body.temp.patch;
  console.log(patch);
  var build = req.body.temp.build;
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
        cur_time = yyyy+mm+dd+min+sec;
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

console.log(count);
console.log(config);


execProcess.result("./ssp_vios_setup_trail"+commandString, function(err, response){

    console.log("Invoking master script");
  	if(!err){
  		console.log(response);
  	}else {
  		console.log(err);
  	}
  });

  var delay=7000; //7 second

setTimeout(function() {
  //your code to be executed after 7 second
  execProcess.result("./debug", function(err, response){
      //console.log("Invoking Log files folder");
      if(!err){
        var logFilePath = response;
        console.log(logFilePath);
        logFilePath = logFilePath.slice(0,-1);
        //
        for (index = 0; index < viosArray.length; ++index) {
          console.log(viosArray[index]);
        appendObject({"id":"4","viosName":viosArray[index],"build":build,"patch":patch,"emailID":mailid,"date":cur_time,"status":"Running","LogFiles":logFilePath});
         }
      }else {
        console.log(err);
      }
    });

}, delay);



// appendObject({"id":"4","viosName":viosname,"build":build,"patch":patch,"emailID":mailid,"date":cur_time,"status":"Running","LogFiles":logFilePath});

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
       fs.appendFile('NODE_MS_HMC.txt',viosname+" "+ms+" "+hmc+"\n", function (err) {
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

module.exports = router;
