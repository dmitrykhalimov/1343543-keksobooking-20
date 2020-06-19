'use strict';

var TYPE_FLAT_MIN_VALUE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};

var DISABLED_ROOMS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var MAP_PIN_DEFAULT_X = 570;
var MAP_PIN_DEFAULT_Y = 375;
var MAP_PIN_WIDTH = 62;
var MAP_PIN_HEIGHT = 62;
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

var placeMapAddress = function (shiftX, shiftY) {
  var fieldAddress = document.querySelector('#address');
  fieldAddress.value = (MAP_PIN_DEFAULT_X + shiftX) + ', ' + (MAP_PIN_DEFAULT_Y + shiftY);
};

placeMapAddress(MAP_PIN_WIDTH / 2, MAP_PIN_HEIGHT / 2);

mapPinMain.addEventListener('mousedown', onMapPinClick);
mapPinMain.addEventListener('keydown', onMapPinEnter);

var roomsNumber = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');

roomsNumber.addEventListener('change', function () {
  for (var j = 0; j < guestsNumber.options.length; j++) {
    guestsNumber[j].disabled = !DISABLED_ROOMS[roomsNumber.value].includes(guestsNumber.options[j].value);
  }
});

var submitButton = document.querySelector('.ad-form__submit');

submitButton.addEventListener('click', function () {
  if (!DISABLED_ROOMS[roomsNumber.value].includes(guestsNumber.value)) {
    guestsNumber.setCustomValidity('Выбрано некорректное количество мест');
  } else {
    guestsNumber.setCustomValidity('');
  }
});
/*
var placeCard = function (numberCard) {
  if (document.querySelector('.popup')) {
    closeCard();
  }

  var fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(window.renderCard.createCard(window.mainArray[numberCard]));
  document.querySelector('.map').insertBefore(fragmentCard, document.querySelector('.map__filters-container'));

  document.addEventListener('keydown', onCardEsc);
  document.querySelector('.popup__close').addEventListener('click', onCardCloseClick);
};
*/
/*
var closeCard = function () {
  document.querySelector('.popup').remove();
  document.removeEventListener('keydown', onCardEsc);
  document.removeEventListener('click', onCardCloseClick);
};

var onCardEsc = function (evt) {
  if (evt.key === 'Escape' && document.querySelector('.popup')) {
    evt.preventDefault();
    closeCard();
  }
};
*/
/*
var onCardCloseClick = function (evt) {
  evt.preventDefault();
  closeCard();
};*/

var typeFlatList = document.querySelector('#type');
var priceInput = document.querySelector('#price');

var onTypeFlatChange = function () {
  priceInput.setAttribute('min', TYPE_FLAT_MIN_VALUE[typeFlatList.value]);
  priceInput.setAttribute('placeholder', TYPE_FLAT_MIN_VALUE[typeFlatList.value]);
};

typeFlatList.addEventListener('change', onTypeFlatChange);

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var onTimeInChange = function () {
  timeOut.value = timeIn.value;
};

var onTimeOutChange = function () {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);


