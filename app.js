require('isomorphic-fetch');
var express = require("express");
var multer = require('multer');
var Dropbox = require('dropbox');
var bodyParser = require("body-parser");
var request = require("request");
var document = require("document");
var fs = require("fs");
var app = express();
app.use(bodyParser.json());
var UPLOAD_TEMP_FOLDER = './uploads/';
var ACCESS_TOKEN = 'qSTlcZ-zpyAAAAAAAAAAC1sbJNW8xkPfZGupS6DAoiEBtSqHiuTdrKeD1gVfbaDp';

//Get File List
app.get('/db-list-files', function (request, response) {

  var ACCESS_TOKEN = process.env.accessToken;
  if (ACCESS_TOKEN == undefined) {
    return response.end("Please provide API Key");
  }

  var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN, fetch: fetch });
  dbx.filesListFolder({ path: '' })
    .then(function (res) {
      var result = res.entries;
      console.log(result);
      response.end(JSON.stringify(result));
    })
    .catch(function (error) {
      console.error("error :: ", error);
      response.end(JSON.stringify(error));
    });
});

//Get Current User Account details
app.get('/db-get-useraccount', function (request, response) {

  var ACCESS_TOKEN = process.env.accessToken;
  if (ACCESS_TOKEN == undefined) {
    return response.end("Please provide API Key");
  }

  var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN, fetch: fetch });
  dbx.usersGetCurrentAccount()
    .then(function (res) {
      var result = res;
      console.log(result);
      response.end(JSON.stringify(result));
    })
    .catch(function (error) {
      console.error("error :: ", error);
      response.end(JSON.stringify(error));
    });
});




app.post('/db-upload-files', function (request, response) {

  var type = '.txt'
 var tempoutputpath = `${__dirname}\\temp.txt`;
 var ACCESS_TOKEN = process.env.accessToken;
 var ACCESS_TOKEN = 'qSTlcZ-zpyAAAAAAAAAAC1sbJNW8xkPfZGupS6DAoiEBtSqHiuTdrKeD1gVfbaDp';
  if (ACCESS_TOKEN == undefined) {
    return response.end("Please provide API Key");
  }
  var fpath =`${__dirname}\\my.txt`
  var Base64filedata = fs.readFileSync(fpath, { encoding: "base64" });
  // var wrt = fs.writeFile(tempoutputpath, Base64filedata, 'base64', function(err) {
  //   console.log(err);
  // });
  
     var filedata = fs.readFileSync(tempoutputpath, { encoding: "binary" });

    //  var binary = Buffer.from(Base64filedata,'base64');
    //  fs.writeFileSync('mydata', buff);
    //         console.log("mydata : ",buff);


// fs.unlink(tempoutputpath, (err) => {
//   if (err) throw err;
//   console.log('successfully deleted /tmp/hello');
// });
// var filename = process.argv.filename;
// var filecontent = process.argv.filecontent;




  var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN, fetch: fetch });
  dbx.filesUpload({ path: '/' + 'new11.txt', contents: filedata })
    .then(function (response) {
      //var results = document.getElementById('results');
      //results.appendChild(document.createTextNode('File uploaded!'));
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });


});

app.listen(3000, function () {
  console.log("Working on port 3000");
});