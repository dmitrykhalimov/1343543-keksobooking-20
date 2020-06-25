'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

  var drawError = function (errorMessage) {
    var node = document.createElement('div');
    node.className = 'message__error';
    node.style = 'z-index: 100; margin: 0 auto; padding-left: 200px; padding-top: 10px; text-align: center; background-color: wheat; width: 500px; height: 180px; top: 250px; color: blue; left: 0; right: 0; position: absolute;';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    var picture = document.createElement('img');
    picture.src = 'img/on-error.png';
    picture.style = 'left: 10px; top: 10px; width: 150px; position: absolute';

    node = document.querySelector('.message__error');
    node.appendChild(picture);
  };

  var sendLoadData = function (method, link, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка загрузки данных! Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения!');
    });

    xhr.open(method, link);
    xhr.send(data);
  };

  window.backend = {
    sendLoadData: sendLoadData,
    drawError: drawError
  };
})();
