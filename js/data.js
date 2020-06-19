'use strict';

(function () {
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

  var APPARTMENT_TIME = [
    '12:00',
    '13:00',
    '14:00',
  ];

  var APPARTMENT_PICTURES = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var APPARTMENT_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var mainArray = [];

  var createPoint = function (index) {
    var location = {
      x: window.utils.generateRandomNumber(0, 1200),
      y: window.utils.generateRandomNumber(130, 630)
    };
    return {
      author: {
        avatar: generateAvatarLink(index)
      },
      offer: {
        title: TITLE[index],
        address: location.x + ', ' + location.y,
        price: window.utils.generateRandomNumber(1000, 100000),
        type: APPARTMENT_TYPE[window.utils.generateRandomNumber(0, 3)],
        rooms: window.utils.generateRandomNumber(1, 5),
        guests: window.utils.generateRandomNumber(1, 8),
        checkin: APPARTMENT_TIME[window.utils.generateRandomNumber(0, 2)],
        checkout: APPARTMENT_TIME[window.utils.generateRandomNumber(0, 2)],
        features: generateFeatures(),
        description: '',
        pictures: generatePictures()
      },
      location: location
    };
  };

  var generateFeatures = function () {
    var outputArray = window.utils.mixArray(APPARTMENT_FEATURES);
    var numberFeatures = window.utils.generateRandomNumber(1, APPARTMENT_FEATURES.length - 1);

    while (outputArray.length > numberFeatures) {
      outputArray.pop();
    }
    return outputArray;
  };

  var generateAvatarLink = function (number) {
    return AVATAR_NAME_PREFIX + '0' + (number + 1) + AVATAR_NAME_POSTFIX;
  };

  var generatePictures = function () {
    return window.utils.mixArray(APPARTMENT_PICTURES);
  };

  var fillArray = function () {
    for (var i = 0; i < ADS_QUANTITY; i++) {
      mainArray.push(createPoint(i));
    }
  };

  fillArray();

  window.data = {

    mainArray: mainArray
  };

})();
