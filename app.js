require('isomorphic-fetch');
var express = require("express");
var Dropbox = require('dropbox');
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
'use strict'
app.use(bodyParser.json());

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




//Upload File
app.post('/db-upload-files', function (request, response) {

  var ACCESS_TOKEN = process.env.accessToken;
  if (ACCESS_TOKEN == undefined) {
    return response.end("Please provide API Key");
  }
  var Base64filedata = request.body.filecontent;
  var filetype = request.body.filetype;
  var filename = request.body.filename;
  
  let filecontent = new Buffer.from(Base64filedata, 'base64');


  var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN, fetch: fetch });
  dbx.filesUpload({ path: '/' + filename+filetype, contents: filecontent })
    .then(function (res) {
      console.log(res);
      response.end('File Uploaded Successfully....');
    })
    .catch(function (error) {
      console.error(error);
      response.end(JSON.stringify(error));
    });


});


//download file
app.post('/db-download-files', function (request, response) {
  "use strict";
  var ACCESS_TOKEN = process.env.accessToken;
  var SHARED_LINK = request.body.url;
  var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN, fetch: fetch });
  dbx.sharingGetSharedLinkFile({url: SHARED_LINK})
    .then(function(data) {
      var binary = data.fileBinary;
      var base64data = Buffer.from(binary, 'binary').toString('base64');
      console.log(data);
      console.log(base64data);
      response.end(JSON.stringify(base64data));
    })
    .catch(function(error) {
      console.error(error);
      response.end(error);
    });
});





app.listen(3000, function () {
  console.log("Working on port 3000");
});