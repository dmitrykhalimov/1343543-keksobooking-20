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
    /* mapPin.addEventListener('click', function () {
      placeCard(numberCard);
    }); */
    return mapPin;
  };

  var generateFragment = function () {
    for (var i = 0; i < window.mainArray.length; i++) {
      fragment.appendChild(renderAdvert(window.mainArray[i], i));
    }
  };

  window.pin = {
    createSimilar: function () {
      generateFragment();
      document.querySelector('.map__pins').appendChild(fragment);
    },
    anode: 'catode',
  };
})();
