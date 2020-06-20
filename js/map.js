'use strict';

(function () {
  var MAP_PIN_DEFAULT_X = 570;
  var MAP_PIN_DEFAULT_Y = 375;
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_HEIGHT = 62;
  var MAP_PIN_TICK_HEIGHT = 22;
  var MAP_PIN_TICK_TOP_SHIFT = -5;

  var mapPinMain = document.querySelector('.map__pin--main');

  var activateMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.utils.changeInputs('fieldset', false);
    window.utils.changeInputs('.map__filter', false);
    window.pin.createSimilar();
  };

  //console.log('Старт!');
  //console.log(mapPinMain.style.top);
  //console.log(mapPinMain.style.left);
  var isFirstActivation = true;

  var mainPinX = MAP_PIN_DEFAULT_X + MAP_PIN_WIDTH / 2;
  var mainPinY = MAP_PIN_DEFAULT_Y + MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT;

  var onMapPinClick = function (evt) {
    if (evt.button === 0 && isFirstActivation) {
      activateMap();
      window.form.updateMapAddress(mainPinX, mainPinY);
      console.log('Старт');
      console.log(mainPinX);
      console.log(mainPinY);
      isFirstActivation = false;
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var finishCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: finishCoords.x - moveEvt.clientX,
        y: finishCoords.y - moveEvt.clientY
      };

      finishCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentX = mainPinX + (finishCoords.x - startCoords.x);
      var currentY = mainPinY + (finishCoords.y - startCoords.y);

      if (currentY < 130 || currentY > 630) {
        mapPinMain.style.top = MAP_PIN_DEFAULT_Y + 'px';
        mapPinMain.style.left = MAP_PIN_DEFAULT_X + 'px';
        mainPinX = MAP_PIN_DEFAULT_X + MAP_PIN_WIDTH / 2;
        mainPinY = MAP_PIN_DEFAULT_Y + MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT;
        console.log('Бздыщ!');
        console.log(mainPinX);
        console.log(mainPinY);
        window.form.updateMapAddress(mainPinX, mainPinY);
        currentX = mainPinX;
        currentY = mainPinY;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      window.form.updateMapAddress(currentX, currentY);
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      console.log('currentY: ' + currentY, 'currentPos: ' + mapPinMain.style.top);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.updateMapAddress(mainPinX + (finishCoords.x - startCoords.x), mainPinY + (finishCoords.y - startCoords.y));

      mainPinX = mainPinX + (finishCoords.x - startCoords.x);
      mainPinY = mainPinY + (finishCoords.y - startCoords.y);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMapPinEnter = function (evt) {
    if (evt.key === 'Enter') {
      activateMap();
      mapPinMain.removeEventListener('keydown', onMapPinEnter);
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinClick);
  mapPinMain.addEventListener('keydown', onMapPinEnter);
  window.map = {
    MAP_PIN_DEFAULT_X: MAP_PIN_DEFAULT_X,
    MAP_PIN_DEFAULT_Y: MAP_PIN_DEFAULT_Y,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
  };

  window.utils.changeInputs('.map__filter', true);
})();
