const fetch = require("node-fetch");
const JSAlert = require("js-alert");
const fs = require("fs");
const assert = require('assert');
const assertChai = require('chai');
const axios = require('axios');

class HttpClientHelper {

  async getDataAuthorization(url, username, password) {
    const response = axios.get(url, {
      auth: {
        username: username,
        password: password
      }
    }).then(function (response) {
      if (response.status == 200) {
        console.log(response.data);
      } else {
        JSAlert.alert("HTTP-Error: " + response.status);
      }
    });
    return response.status;
  }

  async getDataById(url = '', data = {}, position = '') {
    const response = await axios.get(url, data)

    if (response.status == 200) {
      var obj = JSON.parse(JSON.stringify(response.config));
      Object.keys(obj).forEach(function (k) {
        if (k === position) {
          console.log(obj[k]);
          assert(obj[k] != null);
        }
      });
    } else {
      JSAlert.alert("HTTP-Error: " + response.status);
    }
  }

  async getDataStatusCode(url = '') {

    const axiosApiInstance = axios.create();

    const UNAUTHORIZED = 401;
    axiosApiInstance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (UNAUTHORIZED === error.response.status) {
        console.log('Perform GET, Unauthorized status data: ');
        console.log(error.response.data);

      } else {
        return Promise.reject(error);
      }
    });

    await axiosApiInstance.get(url)
  }

  async postDataLogHttpStatus(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    if (response.status == 404) {
      console.log('If we perform a POST, Status is: ' + response.status);
      return response.status;
    } else {
      JSAlert.alert("Not te HTTP event we were looking for: " + response.status);
    }
  }

  async postDataOkStatus(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    if (response.status == 200) {
      return response.status;
    } else {
      JSAlert.alert("HTTP-Error: " + response.status);
    }
  }

  async countObjects(url = '') {
    let response = await fetch(url);
    let responseData = await response.text();
    var count = Object.keys(responseData).length;
    console.log('Number of objects: ' + count);
  }

  async verifyGetData(url = '') {
    const expectedResult = 'postman-echo.com';
    fetch(url)
      .then(res => {
        assert.strictEqual(res.status, 200);
        return res.text();
      }).then(text => {
        assert.ok(text.includes(expectedResult));
      })
  }

  async saveCookie(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      var responseCookie = response.headers.get('set-cookie');
      var cookieSubstr = responseCookie.substr(10, 82);
      var cookie = { "cookie": "" + cookieSubstr + "" }
      var data = fs.readFileSync('./people.json');
      var json = JSON.parse(data);
      json.push(cookie);

      fs.writeFile("./people.json", JSON.stringify(json, null, 4), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return;
        };
        console.log("File has been created");
      });

    } else {
      JSAlert.alert("HTTP-Error: " + response.status);
    }
    return cookie;
  }
}

module.exports = HttpClientHelper;