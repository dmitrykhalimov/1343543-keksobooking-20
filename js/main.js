'use strict';

var ADS_QUANTITY = 8;

var AVATAR_NAME_PREFIX = 'img/avatars/user';
var AVATAR_NAME_POSTFIX = '.png';

var TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var APPARTMENT_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var TYPE_FLAT = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var APPARTMENT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

var APPARTMENT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var APPARTMENT_PICTURES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PIN_SHIFT_X = 25;
var PIN_SHIFT_Y = 70;

var mainArray = [];

var generateAvatarLink = function (number) {
  return AVATAR_NAME_PREFIX + '0' + (number + 1) + AVATAR_NAME_POSTFIX;
};

var generateRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var mixArray = function (arr) {
  var j;
  var temp;
  var sortedArray = arr.slice();

  for (var i = sortedArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = sortedArray[j];
    sortedArray[j] = sortedArray[i];
    sortedArray[i] = temp;
  }
  return sortedArray;
};

var generatePictures = function () {
  return mixArray(APPARTMENT_PICTURES);
};

var generateFeatures = function () {
  var outputArray = mixArray(APPARTMENT_FEATURES);
  var numberFeatures = generateRandomNumber(1, APPARTMENT_FEATURES.length - 1);

  while (outputArray.length > numberFeatures) {
    outputArray.pop();
  }
  return outputArray;
};

var fillArray = function () {
  for (var i = 0; i < ADS_QUANTITY; i++) {
    mainArray.push(createPoint(i));
  }
};

var createPoint = function (index) {
  var location = {
    x: generateRandomNumber(0, 1200),
    y: generateRandomNumber(130, 630)
  };
  return {
    author: {
      avatar: generateAvatarLink(index)
    },
    offer: {
      title: TITLE[index],
      address: location.x + ', ' + location.y,
      price: generateRandomNumber(1000, 100000),
      type: APPARTMENT_TYPE[generateRandomNumber(0, 3)],
      rooms: generateRandomNumber(1, 5),
      guests: generateRandomNumber(1, 8),
      checkin: APPARTMENT_TIME[generateRandomNumber(0, 2)],
      checkout: APPARTMENT_TIME[generateRandomNumber(0, 2)],
      features: generateFeatures(),
      description: '',
      pictures: generatePictures()
    },
    location: location
  };
};

fillArray();

var changeInputs = function (inputClass, isDisabled) {
  var inputs = document.querySelectorAll(inputClass);
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = isDisabled;
  }
};

changeInputs('fieldset', true);
changeInputs('.map__filter', true);

// generateFragment();

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderAdverts = function (advert) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style.left = Number(advert.location.x - PIN_SHIFT_X) + 'px';
  mapPin.style.top = Number(advert.location.y - PIN_SHIFT_Y) + 'px';
  mapPin.querySelector('img').src = advert.author.avatar;
  mapPin.querySelector('img').alt = advert.offer.title;
  return mapPin;
};

var fragment = document.createDocumentFragment();

var generateFragment = function () {
  for (var i = 0; i < mainArray.length; i++) {
    fragment.appendChild(renderAdverts(mainArray[i]));
  }
};

document.querySelector('.map__pins').appendChild(fragment);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderFeatures = function (features, card) {
  var listFeatures = card.querySelector('.popup__features');
  while (listFeatures.firstChild) {
    listFeatures.removeChild(listFeatures.firstChild);
  }

  for (var i = 0; i < features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + features[i]);
    listFeatures.appendChild(li);
  }
};

var renderPictures = function (pictures, card) {
  var picturesContainer = card.querySelector('.popup__photos');
  picturesContainer.removeChild(picturesContainer.querySelector('.popup__photo'));

  for (var i = 0; i < pictures.length; i++) {
    var picture = document.createElement('img');
    picture.classList.add('popup__photo');
    picture.width = 45;
    picture.height = 50;
    picture.src = pictures[i];
    picture.alt = 'Фотография жилья';
    picturesContainer.appendChild(picture);
  }
};

var generateCapacityString = function (rooms, guests) {
  var roomsString = 'комнат';
  var guestString = 'гостей';
  if (rooms === 1) {
    roomsString += 'а';
  } else if (rooms < 5) {
    roomsString += 'ы';
  }

  if (guests === 1) {
    guestString = 'гостя';
  }

  var capacityString = rooms + ' ' + roomsString + ' для ' + guests + ' ' + guestString;

  return capacityString;
};

var activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  changeInputs('fieldset', false);
  changeInputs('.map__filter', false);
};

var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activateMap();
  }
});

/*
var renderCard = function (advert) {
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = advert.offer.title;
  card.querySelector('.popup__text--address').textContent = advert.offer.address;
  card.querySelector('.popup__text--price').textContent = advert.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = TYPE_FLAT[advert.offer.type];
  card.querySelector('.popup__text--capacity').textContent = (generateCapacityString(advert.offer.rooms, advert.offer.guests));
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  card.querySelector('.popup__description').textContent = advert.offer.description;
  card.querySelector('.popup__avatar').src = advert.author.avatar;

  renderFeatures(advert.offer.features, card);
  renderPictures(advert.offer.pictures, card);

  return card;
};

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderCard(mainArray[0]));

document.querySelector('.map').insertBefore(fragmentCard, document.querySelector('.map__filters-container'));
*/
