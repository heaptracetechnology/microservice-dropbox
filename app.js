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





app.listen(3000, function () {
  console.log("Working on port 3000");
});
