var http = {
  get: function(url) {
    return new Promise( function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(new Error(request.statusText));
        }
      }
      request.onerror = function () {
        reject(new Error(
          'XMLHttpRequest Error: '+request.statusText));
      };
      request.open('GET', url);
      request.send();
    });
  }
};

export default http;


