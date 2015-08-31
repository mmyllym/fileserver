/*Define dependencies.*/

var express = require("express");
var multer  = require('multer');
var app=express();
var done=false;
var filepath = require('path');

/* Declare static folders for uploaded images */
app.use(express.static('public'));

/*Configure the multer.*/

 app.use(multer({ dest: './public/',
  rename: function (fielsdname, filename) {

	 return filename+Date.now();
   },
 onFileUploadStart: function (file) {
   console.log(file.originalname + ' is starting ...')
},
 onFileUploadComplete: function (file) {
   console.log(file.fieldname + ' uploaded to  ' + file.path)
   filepath = file.name;
   done=true;
}
}));

/*Handling routes.*/

 app.get('/',function(req,res){
       res.sendfile('index.html');
});

 app.post('/api/photo',function(req,res){
   if(done==true){
     console.log(req.files);

     //res.send('<img src="' + req.baseUrl + filepath + '" >');
	 res.end(filepath);
	 
   }
});

/*Run the server.*/
 app.listen(3000,function(){
     console.log("Working on port 3000");
});