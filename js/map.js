'use strict';

(function () {
  var MAP_PIN_DEFAULT_X = 570;
  var MAP_PIN_DEFAULT_Y = 375;
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_HEIGHT = 62;
  var MAP_PIN_TICK_HEIGHT = 22;
  var MAP_PIN_TICK_TOP_SHIFT = -5;

  var mainPinX = MAP_PIN_DEFAULT_X + MAP_PIN_WIDTH / 2;
  var mainPinY = MAP_PIN_DEFAULT_Y + MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT;

  var currentX = mainPinX;
  var currentY = mainPinY;

  var mapPinMain = document.querySelector('.map__pin--main');

  var activateMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.utils.changeInputs('fieldset', false);
    window.utils.changeInputs('.map__filter', false);
    window.pin.createSimilar();
  };

  var reinitalizePositions = function () {
    mapPinMain.style.top = MAP_PIN_DEFAULT_Y + 'px';
    mapPinMain.style.left = MAP_PIN_DEFAULT_X + 'px';
    mainPinX = MAP_PIN_DEFAULT_X + MAP_PIN_WIDTH / 2;
    mainPinY = MAP_PIN_DEFAULT_Y + MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT;

    currentX = mainPinX;
    currentY = mainPinY;
  };

  var isFirstActivation = true;

  var onMapPinClick = function (evt) {
    if (evt.button === 0 && isFirstActivation) {
      activateMap();
      window.form.updateMapAddress(mainPinX, mainPinY);
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

      currentX = mainPinX + (finishCoords.x - startCoords.x);
      currentY = mainPinY + (finishCoords.y - startCoords.y);

      if (currentY < 130 || currentY > 630 || currentX < 0 || currentX > 1200) {
        reinitalizePositions();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      window.form.updateMapAddress(currentX, currentY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.updateMapAddress(currentX, currentY);

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
