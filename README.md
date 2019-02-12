# Dropbox File Listing as a microservice
An OMG service to get the list of all Files from dropbox account.

[![Open Microservice Guide](https://img.shields.io/badge/OMG-enabled-brightgreen.svg?style=for-the-badge)](https://microservice.guide)

This microservice's goal is fetch all the files from dropbox user account.

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
$ omg run dropboxfilelist -e accessToken=<ACCESS_TOKEN>
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
docker build --rm -f "Dockerfile" -t dropboxfilelist .
```
### RUN
```
docker run -p 3000:3000 dropboxfilelist
```