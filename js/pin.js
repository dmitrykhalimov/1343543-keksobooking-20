'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var PIN_SHIFT_X = 25;
  var PIN_SHIFT_Y = 70;
  var MAX_PIN_QUANITIY = 5;

  var renderAdvert = function (advert, numberCard) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style.left = Number(advert.location.x - PIN_SHIFT_X) + 'px';
    mapPin.style.top = Number(advert.location.y - PIN_SHIFT_Y) + 'px';
    mapPin.querySelector('img').src = advert.author.avatar;
    mapPin.querySelector('img').alt = advert.offer.title;
    mapPin.addEventListener('click', function () {
      window.placeCard.placeCard(numberCard);
    });
    return mapPin;
  };

  var mainArray = [];

  var loadData = function (receivedData) {
    for (var i = 0; i < receivedData.length; i++) {
      mainArray.push(receivedData[i]);
    }
    updateArray(mainArray);
  };

  var updateArray = function (arrayToRender) {
    removeSimilar();
    var maxLength = MAX_PIN_QUANITIY;
    if (arrayToRender.length < MAX_PIN_QUANITIY) {
      maxLength = arrayToRender.length;
    }

    for (var i = 0; i < maxLength; i++) {
      fragment.appendChild(renderAdvert(arrayToRender[i], i));
    }
  };

  var removeSimilar = function () {
    var similarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < similarPins.length; i++) {
      similarPins[i].remove();
    }
  };

  var createSimilar = function () {
    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.backend.sendLoadData('GET', 'https://javascript.pages.academy/keksobooking/data', loadData, window.backend.drawError);

  window.pin = {
    createSimilar: createSimilar,
    removeSimilar: removeSimilar,
    mainArray: mainArray,
    reloadData: updateArray
  };
})();
