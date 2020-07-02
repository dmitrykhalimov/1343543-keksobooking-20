'use strict';

(function () {
  var PIN_SHIFT_X = 25;
  var PIN_SHIFT_Y = 70;
  var MAX_PIN_QUANTITY = 5;

  var fragment = document.createDocumentFragment();
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderAdvert = function (advert) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style.left = Number(advert.location.x - PIN_SHIFT_X) + 'px';
    mapPin.style.top = Number(advert.location.y - PIN_SHIFT_Y) + 'px';
    mapPin.querySelector('img').src = advert.author.avatar;
    mapPin.querySelector('img').alt = advert.offer.title;
    mapPin.addEventListener('click', function () {
      if (document.querySelector('.map__pin--active')) {
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      mapPin.classList.add('map__pin--active');
      window.placeCard.place(advert);
    });
    return mapPin;
  };

  var adverts = [];

  var loadData = function (receivedData) {
    for (var i = 0; i < receivedData.length; i++) {
      if (receivedData[i].offer) {
        adverts.push(receivedData[i]);
      }
    }
    updateArray(adverts);
  };

  var updateArray = function (dataToRender) {
    removeSimilar();
    var maxLength = MAX_PIN_QUANTITY;
    if (dataToRender.length < MAX_PIN_QUANTITY) {
      maxLength = dataToRender.length;
    }

    for (var i = 0; i < maxLength; i++) {
      fragment.appendChild(renderAdvert(dataToRender[i]));
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
    adverts: adverts,
    reloadData: updateArray,
    MAX_PIN_QUANTITY: MAX_PIN_QUANTITY
  };
})();
