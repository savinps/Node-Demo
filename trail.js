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
console.log("Deleting Old Entry");
console.log(count);
console.log(config);
var script_output;
//var script_output = execProcess.result("./ssp_vios_setup_trail"+commandString);
execProcess.result("./ssp_vios_setup_trail"+commandString, function(err, response){

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
