const expect = require('chai').expect;
var request = require('request');
const nock = require('nock');

describe('db-list-files', function () {

    beforeEach(() => {
        nock('http://localhost:3000')
            .get('/db-list-files')
            .reply(200, [{ ".tag": "file", "name": "Get Started with Dropbox Paper.url", "path_lower": "/get started with dropbox paper.url", "path_display": "/Get Started with Dropbox Paper.url", "id": "id:OFrW8ySQPcAAAAAAAAAACQ", "client_modified": "2019-02-12T07:30:26Z", "server_modified": "2019-02-12T07:30:26Z", "rev": "0120000000125142bd0", "size": 240, "content_hash": "f40c1228343d7e2a632281c986dbb7af3491b9b63ddfd0eb10fee2c913f6cfa7" }, { ".tag": "file", "name": "Get Started with Dropbox.pdf", "path_lower": "/get started with dropbox.pdf", "path_display": "/Get Started with Dropbox.pdf", "id": "id:OFrW8ySQPcAAAAAAAAAACg", "client_modified": "2019-02-12T07:30:26Z", "server_modified": "2019-02-12T07:30:26Z", "rev": "0130000000125142bd0", "size": 1102331, "content_hash": "f7ad488deb7d81790340ecd676fe6e47f0a6064fb99b982685b752d58611c1cb" }, { ".tag": "file", "name": "dbMicroFiles.docx", "path_lower": "/dbmicrofiles.docx", "path_display": "/dbMicroFiles.docx", "id": "id:OFrW8ySQPcAAAAAAAAAACw", "client_modified": "2019-02-12T10:21:28Z", "server_modified": "2019-02-12T10:22:06Z", "rev": "0180000000125142bd0", "size": 11023, "content_hash": "cdecc9cba7b50fa383d9258a610da6cf23d9b0ce6b89e7a70060a5bfddb7fb43" }])
    });

    it('Get Dropbox Files', function (done) {

        request.get({
            url: 'http://localhost:3000/db-list-files',
        }, function (error, response) {

            var res = JSON.parse(response.body);
            expect(typeof res).to.equal('object');
            expect(res.length).to.equal(3)
            expect(res[0][".tag"]).to.equal('file');
            expect(res[0].name).to.equal('Get Started with Dropbox Paper.url');


        });
        done();
    });


});


describe('db-list-files', function () {

    beforeEach(() => {
        nock('http://localhost:3000')
            .get('/db-list-files')
            .reply(200, 'Please provide API Key')
    });

    it('Not valid API token', function (done) {
        request.get({
            url: 'http://localhost:3000/db-list-files',
        }, function (error, response) {
            expect(response.body).to.equal('Please provide API Key');
        });
        done();
    });


});