const HttpClientHelper = require('./client/HttpClientHelper');
const helper = new HttpClientHelper();
var json = require('../people.json');
const { assert } = require('chai');
const url = ('https://postman-echo.com/post');
const url2 = ('https://postman-echo.com/stream/10');
const url3 = ('https://postman-echo.com/get');
const url4 = ('https://postman-echo.com/status/401');
const url5 = ('https://postman-echo.com/basic-auth');
var positionId = '1';
const username = 'postman'
const password = 'password'


describe('Backend Automated Test', () => {

    it('First test: Status 200', async () => {
        helper.postDataOkStatus(url, json).then(status => {
            assert.equal(status, 200);
        });
    });

    it('Second test: Save cookie', async () => {
        helper.saveCookie(url, json)
    });

    it('Third test: Validate “host” parameter to “postman-echo.com” in first object', async () => {
        //There is an issue with axios and fetch when I try to parse response to .json, could extract response only as text 
        helper.verifyGetData(url2);
    });

    it('Fourth Test: Count all the objects in the response', async () => {
        helper.countObjects(url2);
    });

    it('Fifth Test: object with “id”=1', async () => {
        helper.getDataById(url3, json, positionId);
    });

    it('Sixth Test:POST request HTTP response code', async () => {

        //The task emphasizes to perform a POST if so, then:
        helper.postDataLogHttpStatus(url4, json).then(status => {
            assert.equal(status, 404);
        });

        //If you meant GET, then:
        helper.getDataStatusCode(url4);
    });

    it('Seventh Test: basic authentication enabled ', async () => {
        helper.getDataAuthorization(url5, username, password).then(status => {
            assert.equal(status, 200);
        });
    });
})

