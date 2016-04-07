var express=require('express');
var fs = require('fs');
var configFile = fs.readFileSync('./public/data2.json');
var config = JSON.parse(configFile);
var execProcess = require("../exec_process.js");
router=express.Router();

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        console.log(i);
        var name = dir + '/' + files[i];
        // var text = fs.readFileSync(name,'utf8')
        // console.log (text)
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
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
  console.log(getFiles('SSP_Debug'));
  res.send(getFiles('SSP_Debug'));


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
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;
        cur_time = yyyy+mm+dd+min+sec;
    console.log(today);
    console.log(cur_time);

  function appendObject(obj){

  config.push(obj);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./public/data2.json', configJSON);
  }
  console.log(config);

  // To find the number of entries of a particular vios in data2.json
  var count =0;

// iterate over each element in the array
for (var i = 0; i < config.length; i++){
  // look for the entry with a matching `code` value
  if (config[i].viosName == viosname){
    count= count+1;
    config.splice(i,1);
    i=0;
  }
}
console.log(count);
console.log(config);
appendObject({"id":"4","viosName":viosname,"build":build,"patch":patch,"emailID":mailid,"date":cur_time,"status":"FAILED"});

execProcess.result("./ssp_vios_setup_trail"+commandString, function(err, response){
//execProcess.result(" ./SSP_Debug/debug", function(err, response){
    console.log("Invoking master script");
  	if(!err){
  		console.log(response);
  	}else {
  		console.log(err);
  	}
  });


});

module.exports = router;
