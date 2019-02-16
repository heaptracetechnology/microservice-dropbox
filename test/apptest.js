const expect = require('chai').expect;
var request = require('request');
const nock = require('nock');

describe('list', function () {

    beforeEach(() => {
        nock('http://localhost:3000')
            .get('/list')
            .reply(200, [{ ".tag": "file", "name": "Get Started with Dropbox Paper.url", "path_lower": "/get started with dropbox paper.url", "path_display": "/Get Started with Dropbox Paper.url", "id": "id:OFrW8ySQPcAAAAAAAAAACQ", "client_modified": "2019-02-12T07:30:26Z", "server_modified": "2019-02-12T07:30:26Z", "rev": "0120000000125142bd0", "size": 240, "content_hash": "f40c1228343d7e2a632281c986dbb7af3491b9b63ddfd0eb10fee2c913f6cfa7" }, { ".tag": "file", "name": "Get Started with Dropbox.pdf", "path_lower": "/get started with dropbox.pdf", "path_display": "/Get Started with Dropbox.pdf", "id": "id:OFrW8ySQPcAAAAAAAAAACg", "client_modified": "2019-02-12T07:30:26Z", "server_modified": "2019-02-12T07:30:26Z", "rev": "0130000000125142bd0", "size": 1102331, "content_hash": "f7ad488deb7d81790340ecd676fe6e47f0a6064fb99b982685b752d58611c1cb" }, { ".tag": "file", "name": "dbMicroFiles.docx", "path_lower": "/dbmicrofiles.docx", "path_display": "/dbMicroFiles.docx", "id": "id:OFrW8ySQPcAAAAAAAAAACw", "client_modified": "2019-02-12T10:21:28Z", "server_modified": "2019-02-12T10:22:06Z", "rev": "0180000000125142bd0", "size": 11023, "content_hash": "cdecc9cba7b50fa383d9258a610da6cf23d9b0ce6b89e7a70060a5bfddb7fb43" }])
    });

    it('Get Dropbox Files', function (done) {
        request.get({
            url: 'http://localhost:3000/list',
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


describe('Validate API key', function () {

    beforeEach(() => {
        nock('http://localhost:3000')
            .get('/list')
            .reply(200, 'Please provide API Key')
    });

    it('Not valid API token', function (done) {
        request.get({
            url: 'http://localhost:3000/list',
        }, function (error, response) {
            expect(response.body).to.equal('Please provide API Key');
        });
        done();
    });
});


describe('Get user account details', function () {

    beforeEach(() => {
        nock('http://localhost:3000')
            .get('/userinfo')
            .reply(200,{"account_id":"dbid:AADzPUkRnzu3-LNWYS8M0IEacs6A7w4","name":{"given_name":"John","surname":"K","familiar_name":"John","display_name":"John S","abbreviated_name":"JS"},"email":"john@gmail.com","email_verified":true,"disabled":false,"country":"US","locale":"en","referral_link":"https://db.tt/p3sIvNiHnJ","is_paired":false,"account_type":{".tag":"basic"},"root_info":{".tag":"user","root_namespace_id":"4917046224","home_namespace_id":"4917046224"}} )
    });

    it('User Account details', function (done) {

        request.get({
            url: 'http://localhost:3000/userinfo',
        }, function (error, response) {

            var res = JSON.parse(response.body);
            expect(typeof res).to.equal('object');
            expect(res.name.given_name).to.equal("John");
            expect(res.account_id).to.equal('dbid:AADzPUkRnzu3-LNWYS8M0IEacs6A7w4');
            expect(res.referral_link).to.equal('https://db.tt/p3sIvNiHnJ');
        });
        done();
    });
});





describe('Upload Files', function () {

    beforeEach(() => {
        nock('http://localhost:3000')
            .post('/upload')
            .reply(200,{"name": "Demo-test.txt","path_lower": "/demo-test.txt","path_display": "/Demo-test.txt","id": "id:JJL3Z2ePOKAAAAAAAAAAEA","client_modified": "2019-02-14T12:18:12Z","server_modified": "2019-02-14T12:18:12Z","rev": "01110000000125ed2260","size": 757,"content_hash": "273b76fe8ce27b8a54301f0bc5fd1ab37ceae69dc8d56db9f74bbfbd71910889"})
    });

    it('Upload Files', function (done) {

        request.post({
            url: 'http://localhost:3000/upload',
        }, function (error, response) {
            var res = JSON.parse(response.body);
            expect(typeof res).to.equal('object');
            expect(res.name).to.equal("Demo-test.txt");
            expect(res.id).to.equal('id:JJL3Z2ePOKAAAAAAAAAAEA');
            expect(res.rev).to.equal('01110000000125ed2260');
        });
        done();
    });
});



describe('Download File', function () {

    beforeEach(() => {
        nock('http://localhost:3000')
            .post('/download')
            .reply(200,{"name": "Demo-test.txt","path_lower": "/demo-test.txt","path_display": "/Demo-test.txt","id": "id:JJL3Z2ePOKAAAAAAAAAAEA","client_modified": "2019-02-14T12:18:12Z","server_modified": "2019-02-14T12:18:12Z","rev": "01110000000125ed2260","size": 757,"content_hash": "273b76fe8ce27b8a54301f0bc5fd1ab37ceae69dc8d56db9f74bbfbd71910889"})
    });

    it('Download Files', function (done) {

        request.post({
            url: 'http://localhost:3000/download',
        }, function (error, response) {

            var res = JSON.parse(response.body);
            expect(typeof res).to.equal('object');
            expect(res.name).to.equal("Demo-test.txt");
            expect(res.id).to.equal('id:JJL3Z2ePOKAAAAAAAAAAEA');
        });
        done();
    });
});