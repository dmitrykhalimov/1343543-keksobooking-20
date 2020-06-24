'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var PIN_SHIFT_X = 25;
  var PIN_SHIFT_Y = 70;

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
      fragment.appendChild(renderAdvert(mainArray[i], i));
    }
  };

  window.backend.sendLoadData('GET', 'https://javascript.pages.academy/keksobooking/data', loadData);

  window.pin = {
    createSimilar: function () {
      document.querySelector('.map__pins').appendChild(fragment);
    },
    mainArray: mainArray
  };
})();
