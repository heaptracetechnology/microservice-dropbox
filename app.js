require('isomorphic-fetch'); 
var express = require("express");
var Dropbox = require('dropbox');
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
app.use(bodyParser.json());



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

app.get('/db-upload-files', function (request, response) {

  var ACCESS_TOKEN = process.env.accessToken;
  if (ACCESS_TOKEN == undefined) {
    return response.end("Please provide API Key");
  }

//TODO NEED TO COMPETE
  dbx.filesUpload({path: '/' + request.file.name, contents: request.file.content})
          .then(function(response) {
            var results = document.getElementById('results');
            results.appendChild(document.createTextNode('File uploaded!'));
            console.log(response);
          })
          .catch(function(error) {
            console.error(error);
  });


});

app.listen(3000, function () {
  console.log("Working on port 3000");
});