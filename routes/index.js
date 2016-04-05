var express=require('express');
var fs = require('fs');
var execProcess = require("../exec_process.js");
router=express.Router();


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
  var commandString = " -n "+viosname+" -b "+build+" -r "+rootvg+" -e "+mailid;
  console.log(commandString);
  console.log("Command Log");

  function appendObject(obj){
  var configFile = fs.readFileSync('./public/data2.json');
  var config = JSON.parse(configFile);
  config.push(obj);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('./public/data2.json', configJSON);
}

appendObject({"id":"4","viosName":viosname,"build":build,"patch":patch,"emailID":mailid,"date":"5-Apr-2017","status":"FAILED"});

execProcess.result("./ssp_vios_setup_trail"+commandString, function(err, response){
//execProcess.result(" ./SSP_Debug/debug", function(err, response){
  	if(!err){
  		console.log(response);
  	}else {
  		console.log(err);
  	}
  });


});

module.exports = router;
