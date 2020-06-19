'use strict';

var MAP_PIN_TICK_HEIGHT = 22;
var MAP_PIN_TICK_TOP_SHIFT = -5;

window.data.fillArray();

var changeInputs = function (inputClass, isDisabled) {
  var inputs = document.querySelectorAll(inputClass);
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = isDisabled;
  }
};

changeInputs('fieldset', true);
changeInputs('.map__filter', true);

var activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  changeInputs('fieldset', false);
  changeInputs('.map__filter', false);
  window.pin.createSimilar();
};

var mapPinMain = document.querySelector('.map__pin--main');

var onMapPinEnter = function (evt) {
  if (evt.key === 'Enter') {
    activateMap();
    mapPinMain.removeEventListener('keydown', onMapPinEnter);
  }
};

var onMapPinClick = function (evt) {
  if (evt.button === 0) {
    activateMap();
    placeMapAddress(MAP_PIN_WIDTH / 2, MAP_PIN_HEIGHT + MAP_PIN_TICK_HEIGHT + MAP_PIN_TICK_TOP_SHIFT);
    mapPinMain.removeEventListener('mousedown', onMapPinClick);
  }
};

mapPinMain.addEventListener('mousedown', onMapPinClick);
mapPinMain.addEventListener('keydown', onMapPinEnter);
