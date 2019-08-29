# _Dropbox_ OMG Microservice

[![Open Microservice Guide](https://img.shields.io/badge/OMG%20Enabled-👍-green.svg?)](https://microservice.guide)

This microservice is to do operations on Dropbox. It is a cloud storage service used for upload and download files.

## Direct usage in [Storyscript](https://storyscript.io/):

##### Get file list
```coffee
>>> dropbox list
{"entries": ["listOfFiles"],"has_more": false}
```
##### Get user details
```coffee
>>> dropbox userInfo
{"account_id": "accountID","name": {"userDetails"},"email": "abc@example.com","email_verified":true,"disabled": false,"country": "IN","locale": "en-GB","referral_link": "https://db.tt/jT8XcB5sfJwww","is_paired": false,"account_type": {".tag": "basic"},"root_info": {"rootInfo"}}
```
##### Upload file
```coffee
>>> dropbox upload fileName:'fileName' fileContent:'base64Data' fileType:'fileExtension'
{"name": "fileName","path_display": "/fileName","id": "fieID","client_modified": "modifiedDate","server_modified": "modifiedDate","size": "fileSize","is_downloadable": true,"content_hash":"hashContent"}
```
##### Download file with url
```coffee
>>> dropbox download url:'urlOfFile'
{".tag":"file","url":"fileURL","id":"fileID","name":"fileName","link_permissions":{"permissionDetails"},"preview_type":"text","client_modified": "modifiedDate","server_modified": "modifiedDate","size": "fileSize","fileBinary": {"type": "Buffer","data": ["bufferData"]}}
```
##### Download file with path
```coffee
>>> dropbox download path:'pathOfFile'
{".tag":"file","path_lower":"lowerCasePath","path_display":"displayPath","id":"fileID","name":"fileName","link_permissions":{"permissionDetails"},"preview_type":"text","client_modified": "modifiedDate","server_modified": "modifiedDate","size": "fileSize","fileBinary": {"type": "Buffer","data": ["bufferData"]}}
```

Curious to [learn more](https://docs.storyscript.io/)?

✨🍰✨

## Usage with [OMG CLI](https://www.npmjs.com/package/omg)

##### Get file list
```shell
$ omg run list -e ACCESS_TOKEN=<ACCESS_TOKEN>
```
##### Get user details
```shell
$ omg run userInfo -e ACCESS_TOKEN=<ACCESS_TOKEN>
```
##### Upload file
```shell
$ omg run upload -a fileName=<FILENAME> -a fileContent=<Base64FileData> -a fileType=<FILE_TYPE> -e ACCESS_TOKEN=<ACCESS_TOKEN>
```
##### Download file with url
```shell
$ omg run download -a url=<URL> -e ACCESS_TOKEN=<ACCESS_TOKEN> 
```
##### Download file with path
```shell
$ omg run download -a path=<PATH> -e ACCESS_TOKEN=<ACCESS_TOKEN> 
```

**Note**: The OMG CLI requires [Docker](https://docs.docker.com/install/) to be installed.

## License
[MIT License](https://github.com/omg-services/dropbox/blob/master/LICENSE).
