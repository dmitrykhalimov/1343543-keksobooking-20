'use strict';

(function () {
  var MAP_PIN_DEFAULT_X = 570;
  var MAP_PIN_DEFAULT_Y = 375;
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_HEIGHT = 62;
  var MAP_PIN_TICK_HEIGHT = 22;
  var MAP_PIN_TICK_TOP_SHIFT = -5;

  var MAP_PIN_LIMITS = {
    leftX: 0,
    rightX: 1200,
    topY: 130,
    bottomY: 630
  };

  var mainPinX = MAP_PIN_DEFAULT_X + MAP_PIN_WIDTH / 2;
  var mainPinY = MAP_PIN_DEFAULT_Y + MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT;

  var mapPinMain = document.querySelector('.map__pin--main');

  var activateMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.utils.changeInputs('fieldset', false);
    window.utils.changeInputs('.map__filter', false);
    window.pin.createSimilar();
  };

  var reinitalizePositions = function () {
    if (mainPinY < MAP_PIN_LIMITS.topY) {
      mapPinMain.style.top = MAP_PIN_LIMITS.topY - MAP_PIN_HEIGHT - MAP_PIN_TICK_HEIGHT - MAP_PIN_TICK_TOP_SHIFT + 'px';
      mainPinY = MAP_PIN_LIMITS.topY;
    } else if (mainPinY > MAP_PIN_LIMITS.bottomY) {
      mapPinMain.style.top = MAP_PIN_LIMITS.bottomY - MAP_PIN_HEIGHT - MAP_PIN_TICK_HEIGHT - MAP_PIN_TICK_TOP_SHIFT + 'px';
      mainPinY = MAP_PIN_LIMITS.bottomY;
    }
    if (mainPinX < MAP_PIN_LIMITS.leftX) {
      mainPinX = MAP_PIN_LIMITS.leftX;
      mapPinMain.style.left = MAP_PIN_LIMITS.leftX - MAP_PIN_WIDTH / 2 + 'px';
    } else if (mainPinX > MAP_PIN_LIMITS.rightX) {
      mainPinX = MAP_PIN_LIMITS.rightX;
      mapPinMain.style.left = MAP_PIN_LIMITS.rightX - MAP_PIN_WIDTH / 2 + 'px';
    }
  };

  var isFirstActivation = true;

  var onMapPinClick = function (evt) {
    if (evt.button === 0 && isFirstActivation) {
      activateMap();
      window.form.updateMapAddress(mainPinX, mainPinY);
      isFirstActivation = false;
    }

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

      mainPinX = mainPinX - shift.x;
      mainPinY = mainPinY - shift.y;

      if (mainPinY < 130 || mainPinY > 630 || mainPinX < 0 || mainPinX > 1200) {
        //document.removeEventListener('mousemove', onMouseMove);
        reinitalizePositions();
        //document.removeEventListener('mouseup', onMouseUp);
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      window.form.updateMapAddress(mainPinX, mainPinY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.updateMapAddress(mainPinX, mainPinY);

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
