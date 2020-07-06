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
  var filteredSimilarPins = window.pin.adverts;

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
    var checkedFeatures = [].filter.call(features, function (feature) {
      return feature.checked;
    }).map(function (feature) {
      return feature.value;
    });
    return !checkedFeatures.length || window.utils.isIncludeArray(offer.features, checkedFeatures);
  };

  var isSimilar = function (offer) {
    return checkSimilar(housingType, offer['type']) &&
    checkSimilar(housingRooms, String(offer['rooms'])) &&
    checkSimilar(housingPrice, translatePriceToText(offer['price'])) &&
    checkSimilar(housingGuests, String(offer['guests'])) &&
    checkFeatures(offer);
  };

  var onFiltersFormChange = function () {
    window.debounce(function () {
      filteredSimilarPins = [];
      if (window.placeCard.getCardPopup()) {
        window.placeCard.close();
      }
      for (var i = 0; i < window.pin.adverts.length; i++) {
        if (filteredSimilarPins.length === window.pin.MAX_PIN_QUANTITY) {
          break;
        }
        if (isSimilar(window.pin.adverts[i].offer)) {
          filteredSimilarPins.push(window.pin.adverts[i]);
        }
      }
      window.pin.reloadData(filteredSimilarPins);
      window.pin.createSimilar();
    });
  };

  filtersForm.addEventListener('change', onFiltersFormChange);

  var resetFilters = function () {
    filtersForm.reset();
  };

  window.filters = {
    filteredSimilarPins: filteredSimilarPins,
    reset: resetFilters
  };
})();
