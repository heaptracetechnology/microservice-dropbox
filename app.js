require('isomorphic-fetch');
var express = require("express");
var Dropbox = require('dropbox');
var bodyParser = require("body-parser");
var HttpStatus = require('http-status-codes');
var app = express();

app.use(bodyParser.json());
var ACCESS_TOKEN = process.env.ACCESS_TOKEN;
var dbx = undefined;

var message = {
  success: "false",
};

app.all('/*', function (request, response, next) {
  response.setHeader('Content-Type', 'application/json');

  if (ACCESS_TOKEN == undefined) {
    message.error = "Please provide ACCESS_TOKEN";
    return response.status(HttpStatus.BAD_REQUEST).send(message);
  }
 dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN, fetch: fetch });
 next();
});

//Get File List
app.get('/list', function (request, response) {
  dbx.filesListFolder({ path: '' })
    .then(function (res) {
      return response.status(HttpStatus.OK).send(res);
    })
    .catch(function (error) {
      message.error = error;
      return response.status(HttpStatus.BAD_REQUEST).send(message);
      
    });
});

//Get Current User Account details
app.get('/userinfo', function (request, response) {
  
  dbx.usersGetCurrentAccount()
    .then(function (res) {
      return response.status(HttpStatus.OK).send(res);
    })
    .catch(function (error) {
      message.error = error;
      return response.status(HttpStatus.BAD_REQUEST).send(message);
     
    });
});

//Upload File
app.post('/upload', function (request, response) {
  
  var Base64filedata = request.body.filecontent;
  var filetype = request.body.filetype;
  var filename = request.body.filename;
  
  let filecontent = new Buffer.from(Base64filedata, 'base64');
  dbx.filesUpload({ path: '/' + filename + filetype, contents: filecontent })
    .then(function (res) {
      return response.status(HttpStatus.OK).send(res);
    })
    .catch(function (error) {
      message.error = error;
      return response.status(HttpStatus.BAD_REQUEST).send(message);
    });
});


//download file with shared url
app.post('/download', function (request, response) {

  var url = request.body.url;
  var path = request.body.path;
  if(url == undefined && path == undefined){
    message.error = "Please provide either PATH or URL";
    return response.status(HttpStatus.BAD_REQUEST).send(message);
  }

  if (path) {
    dbx.filesDownload({ path: path })
      .then(function (data) {
        return response.status(HttpStatus.OK).send(data);
      })
      .catch(function (error) {
        message.error = error;
        return response.status(HttpStatus.BAD_REQUEST).send(message);
      });
  } else if (url) {
    dbx.sharingGetSharedLinkFile({ url: url })
      .then(function (data) {
        return response.status(HttpStatus.OK).send(data);
      })
      .catch(function (error) {
        message.error = error;
      return response.status(HttpStatus.BAD_REQUEST).send(message);
      });
  }
});


app.listen(3000, function () {
  console.log("Working on port 3000");
});