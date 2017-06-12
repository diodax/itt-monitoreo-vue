import axios from 'axios';

export default new axios.create({
    // defaults
    //baseURL: 'http://localhost:1337/',
    headers: {'Accept': 'application/json'}
  });
