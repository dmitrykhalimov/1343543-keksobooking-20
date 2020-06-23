'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

  var drawError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; width: 500px; top: 250px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var load = function (onLoad) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        drawError('Ошибка загрузки данных. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.send();
  };
  /*
  var save = function (data, onLoad, onError) {
    var URL = 'https://javascript.pages.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad();
      } else {
        onError('Ошибка отправки данных на сервер. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
*/
  window.backend = {
    load: load,
    //  save: save,
    drawError: drawError
  };
})();
