import logger from './logger.js'
import http from './http.js'

http.get('http://google.com').then(
  function (value) {
      console.log('Contents: ' + value);
  },
  function (reason) {
      console.error('Something went wrong', reason);
  }
);

console.log('ok, cool');
