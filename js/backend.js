'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

  var drawError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: wheat; width: 500px; top: 250px; color: blue';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var serverQuery = function (method, link, onLoad) {
    var URL = link;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        drawError('Ошибка загрузки данных. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      drawError('Произошла ошибка соединения');
    });

    xhr.send();
  };

  window.backend = {
    serverQuery: serverQuery
  };
})();
