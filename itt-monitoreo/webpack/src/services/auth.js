import router from '../router/index';
import api from './api';
import base64 from 'base-64';

// TODO: i dont need these consts either
// URL and endpoint constants
const API_URL = 'http://localhost:1337';
const LOGIN_URL = API_URL + '/login';
const SIGNUP_URL = API_URL + '/register';

export default {

  // TODO: deprecate dis
  // User object will let us check authentication status
  // user: {
  //   authenticated: false,
  //   username: null,
  //   authdata: null
  // },

  // Send a request to the login URL and save the returned token
  login(creds) {
    return new Promise(function(fulfill, reject) {
      api.post('/login', creds)
        .then(function(res) {
          //console.log('before encoding');
          var encodedData = base64.encode(res.data.username + ':' + res.data.password);
          //console.log('before default header');
          api.defaults.headers.common['Authorization'] = 'Basic ' + encodedData;
          //console.log('before setting this.user');
          var user = {
            authenticated: true,
            username: res.data.username,
            authdata: encodedData
          };
          //console.log('before setting local storage');
          localStorage.setItem('user', user);
          fulfill(res);
        }).catch(function(err) {
          reject(err);
        });
    });
  },

  signup(creds) {
    return new Promise(function(fulfill, reject) {
      api.post('/register', creds)
        .then(function(res) {
          var encodedData = base64.encode(res.data.username + ':' + res.data.password);
          api.defaults.headers.common['Authorization'] = 'Basic ' + encodedData;
          var user = {
            authenticated: true,
            username: res.data.username,
            authdata: encodedData
          };
          localStorage.setItem('user', user);
          fulfill(res);
        }).catch(function(err) {
          reject(err);
        });
    });
  },

  // To log out, we just need to remove the token
  logout() {
    if (window.localStorage) {
      window.localStorage.removeItem('user');
    }
    api.defaults.headers.common.Authorization = '';
    // this.user = {
    //   authenticated: false,
    //   username: null,
    //   authdata: null
    // };
  },

  loggenIn() {
    var auth = localStorage.getItem('user');
    if (auth) {
      return true;
    } else {
      return false;
    }
  },

  //TODO: deprecate dis
  // checkAuth() {
  //   var auth = localStorage.getItem('user');
  //   if (auth) {
  //     this.user = auth;
  //   } else {
  //     this.user = {
  //       authenticated: false,
  //       username: null,
  //       authdata: null
  //     };
  //   }
  // },

  // TODO: not sure if I even need this
  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    var user = localStorage.getItem('user');
    return {
      'Authorization': 'Basic ' + user.authdata
    };
  }

};
