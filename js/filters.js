'use strict';

(function () {
  var prices = [
    {
      limit: 0,
      name: 'low'
    },
    {
      limit: 10000,
      name: 'middle'
    },
    {
      limit: 50000,
      name: 'high'
    },
    {
      limit: Infinity
    }
  ];

  var housingType = document.querySelector('#housing-type');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingPrice = document.querySelector('#housing-price');
  var housingFeatures = document.querySelector('#housing-features');
  var features = housingFeatures.querySelectorAll('.map__checkbox');

  var filtersForm = document.querySelector('.map__filters');
  var filteredSimilarPins = window.pin.mainArray;

  var checkSimilar = function (element, offer) {
    return element.value === 'any' || element.value === offer;
  };

  var translatePriceToText = function (valueToTranslate) {
    for (var i = 0; i < prices.length; i++) {
      if (valueToTranslate < prices[i + 1].limit) {
        return prices[i].name;
      }
    }
    return 'any';
  };

  var checkFeatures = function (offer) {
    var checkedFeatures = [];
    for (var i = 0; i < features.length; i++) {
      if (features[i].checked) {
        checkedFeatures.push(features[i].value);
      }
    }
    return !checkedFeatures.length || window.utils.isIncludeArray(offer.features, checkedFeatures);
  };

  var isSimilar = function (offer) {
    return checkSimilar(housingType, offer.offer['type']) &&
    checkSimilar(housingRooms, String(offer.offer['rooms'])) &&
    checkSimilar(housingPrice, translatePriceToText(offer.offer['price'])) &&
    checkSimilar(housingGuests, offer.offer['guests']) &&
    checkFeatures(offer.offer);
  };

  var onFiltersBarChange = function () {
    window.debounce(function () {
      filteredSimilarPins = [];
      if (document.querySelector('.popup')) {
        window.placeCard.closeCard();
      }
      for (var i = 0; i < window.pin.mainArray.length; i++) {
        if (filteredSimilarPins.length === window.pin.MAX_PIN_QUANTITY) {
          break;
        }
        if (isSimilar(window.pin.mainArray[i])) {
          filteredSimilarPins.push(window.pin.mainArray[i]);
        }
      }
      window.pin.reloadData(filteredSimilarPins);
      window.pin.createSimilar();
    });
  };

  filtersForm.addEventListener('change', onFiltersBarChange);

  var filtersReset = function () {
    filtersForm.reset();
  };

  window.filters = {
    filteredSimilarPins: filteredSimilarPins,
    filtersReset: filtersReset
  };
})();
