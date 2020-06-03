'use strict';

var AD_TEMPLATE = {
  author: {
    avatar: ''
  },
  offer: {
    title: '',
    address: '',
    price: 0,
    type: '',
    rooms: 0,
    guests: 0,
    checkin: '',
    checkout: '',
    features: [],
    description: '',
    photos: []
  },
  location: {
    x: 0,
    y: 0
  }
};

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

var mainArray = [];

for (var i = 0; i <= 7; i++) {
  mainArray.push(JSON.parse(JSON.stringify(AD_TEMPLATE)));
}

var generateAvatarLink = function (number) {
  return AVATAR_NAME_PREFIX + '0' + (number + 1) + AVATAR_NAME_POSTFIX;
};

var generateRandomNumber = function (min,max) {
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

var generateFeatures = function (i) {
  var outputArray = mixArray(APPARTMENT_FEATURES);
  var numberFeatures = generateRandomNumber(1, APPARTMENT_FEATURES.length - 1);

  while (outputArray.length > numberFeatures) {
    outputArray.pop();
  }
  return outputArray;
};

var fillArray = function () {
  for (var i = 0; i <= 7; i++) {
    mainArray[i].author.avatar = generateAvatarLink(i);
    mainArray[i].offer.title = TITLE[i];
    mainArray[i].location.x = generateRandomNumber(0, 1200);
    mainArray[i].location.y = generateRandomNumber(130, 630);
    mainArray[i].offer.address = mainArray[i].location.x + ', ' + mainArray[i].location.y;
    mainArray[i].offer.price = generateRandomNumber(1000, 1000000);
    var bungalo = generateRandomNumber(0, 3) //убрать потом
    mainArray[i].offer.type = APPARTMENT_TYPE[bungalo];
    mainArray[i].offer.rooms = generateRandomNumber(1, 5);
    mainArray[i].offer.guests = generateRandomNumber(1, 8);
    mainArray[i].offer.checkin = APPARTMENT_TIME[generateRandomNumber(0, 2)];
    mainArray[i].offer.checkout = APPARTMENT_TIME[generateRandomNumber(0, 2)];
    mainArray[i].offer.features = generateFeatures(i);
    mainArray[i].offer.pictures = generatePictures();
  }
};

fillArray();

document.querySelector('.map').classList.remove('map--faded');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderAdverts = function () {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style.left = Number(mainArray[i].location.x - 25) + 'px';
  mapPin.style.top = Number(mainArray[i].location.y - 70) + 'px';
  mapPin.querySelector('img').src = mainArray[i].author.avatar;
  mapPin.querySelector('img').alt = mainArray[i].offer.title;
  return mapPin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderAdverts(mainArray[i]));
}

document.querySelector('.map__pins').appendChild(fragment);

console.log(mainArray);
console.log(fragment);
