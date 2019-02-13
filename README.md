# Dropbox services as a microservice
An OMG service access Dropbox

[![Open Microservice Guide](https://img.shields.io/badge/OMG-enabled-brightgreen.svg?style=for-the-badge)](https://microservice.guide)

This microservice is to do operations on Dropbox

## [OMG](hhttps://microservice.guide) CLI

### OMG

* omg validate
```
omg validate
```
* omg build
```
omg build
```
### Test Service

* If Files exists return true else return false.

### CLI
```sh
* Get file list
$ omg run dropboxfilelist -e accessToken=<ACCESS_TOKEN>

*Get user details 
$ omg run dropboxuserdetails -e accessToken=<ACCESS_TOKEN>
```

### Postman
```sh
* RUN with command "npm start"
* POST localhost:3000/db-list-files
```

## License
### [MIT](https://choosealicense.com/licenses/mit/)

## Docker
### Build
```
docker build --rm -f "Dockerfile" -t dropboxmicroservices .
```
### RUN
```
docker run -p 3000:3000 dropboxmicroservices
