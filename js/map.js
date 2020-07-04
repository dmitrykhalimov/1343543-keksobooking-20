'use strict';

(function () {
  var MAP_PIN_DEFAULT_X = 570;
  var MAP_PIN_DEFAULT_Y = 375;
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_HEIGHT = 62;
  var MAP_PIN_TICK_HEIGHT = 22;
  var MAP_PIN_TICK_TOP_SHIFT = -5;

  var MapPinLimits = {
    LEFT_X: 0,
    TOP_Y: 130,
    BOTTOM_Y: 630
  };

  var limitRightX = 1200;

  var mainPinX = MAP_PIN_DEFAULT_X + MAP_PIN_WIDTH / 2;
  var mainPinY = MAP_PIN_DEFAULT_Y + MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT;

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapField = document.querySelector('.map__overlay');

  var changeMapStatus = function (method) {
    var classToDo = 'add';
    var isInputsDisabled = true;

    if (method === 'activate') {
      classToDo = 'remove';
      isInputsDisabled = false;
      window.pin.downloadData();
    } else if (method === 'deactivate') {
      isFirstActivation = true;
      mapPinMain.style.left = MAP_PIN_DEFAULT_X + 'px';
      mapPinMain.style.top = MAP_PIN_DEFAULT_Y + 'px';
      mainPinX = MAP_PIN_DEFAULT_X + MAP_PIN_WIDTH / 2;
      mainPinY = MAP_PIN_DEFAULT_Y + MAP_PIN_HEIGHT / 2;
      window.form.updateMapAddress(mainPinX, mainPinY);
      mainPinY = MAP_PIN_DEFAULT_Y + MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT;
    }

    document.querySelector('.map').classList[classToDo]('map--faded');
    document.querySelector('.ad-form').classList[classToDo]('ad-form--disabled');
    window.utils.changeInputs('fieldset', isInputsDisabled);
    window.utils.changeInputs('.map__filter', isInputsDisabled);
  };

  var reinitalizePositions = function () {
    if (mainPinY < MapPinLimits.TOP_Y) {
      mapPinMain.style.top = MapPinLimits.TOP_Y - MAP_PIN_HEIGHT - MAP_PIN_TICK_HEIGHT - MAP_PIN_TICK_TOP_SHIFT + 'px';
      mainPinY = MapPinLimits.TOP_Y;
    } else if (mainPinY > MapPinLimits.BOTTOM_Y) {
      mapPinMain.style.top = MapPinLimits.BOTTOM_Y - MAP_PIN_HEIGHT - MAP_PIN_TICK_HEIGHT - MAP_PIN_TICK_TOP_SHIFT + 'px';
      mainPinY = MapPinLimits.BOTTOM_Y;
    }
    if (mainPinX < MapPinLimits.LEFT_X) {
      mainPinX = MapPinLimits.LEFT_X;
      mapPinMain.style.left = MapPinLimits.LEFT_X - MAP_PIN_WIDTH / 2 + 'px';
    } else if (mainPinX > limitRightX) {
      mainPinX = limitRightX;
      mapPinMain.style.left = limitRightX - MAP_PIN_WIDTH / 2 + 'px';
    }
  };

  var isFirstActivation = true;

  var onMapPinMouseDown = function (evt) {
    if (evt.button === 0 && isFirstActivation) {
      changeMapStatus('activate');
      window.form.updateMapAddress(mainPinX, mainPinY);
      isFirstActivation = false;
    }

    var finishCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      limitRightX = mapField.clientWidth;

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

      if (mainPinY < MapPinLimits.TOP_Y || mainPinY > MapPinLimits.BOTTOM_Y || mainPinX < MapPinLimits.LEFT_X || mainPinX > limitRightX) {
        reinitalizePositions();
      }

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

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

  var onMapPinKeyDown = function (evt) {
    if (evt.key === 'Enter') {
      changeMapStatus('activate');
      mapPinMain.removeEventListener('keydown', onMapPinKeyDown);
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMouseDown);
  mapPinMain.addEventListener('keydown', onMapPinKeyDown);

  window.utils.changeInputs('.map__filter', true);

  window.map = {
    MAP_PIN_DEFAULT_X: MAP_PIN_DEFAULT_X,
    MAP_PIN_DEFAULT_Y: MAP_PIN_DEFAULT_Y,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    changeStatus: changeMapStatus
  };
})();
