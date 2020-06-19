'use strict';

(function () {
  var MAP_PIN_DEFAULT_X = 570;
  var MAP_PIN_DEFAULT_Y = 375;
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_HEIGHT = 62;
  var MAP_PIN_TICK_HEIGHT = 22;
  var MAP_PIN_TICK_TOP_SHIFT = -5;

  var activateMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.utils.changeInputs('fieldset', false);
    window.utils.changeInputs('.map__filter', false);
    window.pin.createSimilar();
  };

  var onMapPinClick = function (evt) {
    if (evt.button === 0) {
      activateMap();
      window.form.placeMapAddress(MAP_PIN_WIDTH / 2, MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT);
      mapPinMain.removeEventListener('mousedown', onMapPinClick);
    }
  };

  var onMapPinEnter = function (evt) {
    if (evt.key === 'Enter') {
      activateMap();
      mapPinMain.removeEventListener('keydown', onMapPinEnter);
    }
  };

  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', onMapPinClick);
  mapPinMain.addEventListener('keydown', onMapPinEnter);
  window.map = {
    createSimilar: function () {

    },
    MAP_PIN_DEFAULT_X: MAP_PIN_DEFAULT_X,
    MAP_PIN_DEFAULT_Y: MAP_PIN_DEFAULT_Y,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
  };

  window.utils.changeInputs('.map__filter', true);
})();
