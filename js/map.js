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

  var isFirstActivation = true;

  var mainPinX = MAP_PIN_DEFAULT_X + MAP_PIN_WIDTH / 2;
  var mainPinY = MAP_PIN_DEFAULT_Y + MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT;

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

    var startCoordsToKeep = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.form.updateMapAddress(mainPinX + (startCoords.x - startCoordsToKeep.x), mainPinY + (startCoords.y - startCoordsToKeep.y));
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.updateMapAddress(mainPinX + (startCoords.x - startCoordsToKeep.x), mainPinY + (startCoords.y - startCoordsToKeep.y));

      mainPinX = mainPinX + (startCoords.x - startCoordsToKeep.x);
      mainPinY = mainPinY + (startCoords.y - startCoordsToKeep.y);

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
