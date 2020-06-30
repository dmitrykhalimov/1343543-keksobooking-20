'use strict';

(function () {
  var PriceDefault = {
    MIDDLE_MIN: 10000,
    MIDDLE_MAX: 50000,
    LOW_MIN: 0,
    LOW_MAX: 9999,
    HIGH_MIN: 50001,
    HIGH_MAX: Infinity,
  };

  var prices = {
    'middle': {
      min: PriceDefault.MIDDLE_MIN,
      max: PriceDefault.MIDDLE_MAX
    },
    'low': {
      min: PriceDefault.LOW_MIN,
      max: PriceDefault.LOW_MAX
    },
    'high': {
      min: PriceDefault.HIGH_MIN,
      max: PriceDefault.HIGH_MAX
    },
    'any': {}
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var features = housingFeatures.querySelectorAll('.map__checkbox');

  var filtersForm = document.querySelector('.map__filters');
  var filteredSimilarPins = window.pin.mainArray;
  var filtersMap;

  var buildFeaturesArray = function () {
    var checkedFeatures = [];
    for (var i = 0; i < features.length; i++) {
      if (features[i].checked) {
        checkedFeatures.push(features[i].value);
      }
    }
    return checkedFeatures;
  };

  var buildFiltersMap = function () {
    filtersMap = {};
    filtersMap.offer = {};
    filtersMap.offer.type = housingType.value;
    filtersMap.offer.price = housingPrice.value;
    filtersMap.offer.priceMin = prices[housingPrice.value].min;
    filtersMap.offer.priceMax = prices[housingPrice.value].max;
    filtersMap.offer.rooms = housingRooms.value;
    filtersMap.offer.guests = housingGuests.value;
    filtersMap.offer.features = buildFeaturesArray();
  };

  var isSimilar = function (similarPin) {
    var returnFlag = 0;
    if ((similarPin.offer.type === filtersMap.offer.type) || filtersMap.offer.type === 'any') {
      returnFlag++;
    }
    if ((similarPin.offer.price <= filtersMap.offer.priceMax && similarPin.offer.price >= filtersMap.offer.priceMin) || filtersMap.offer.price === 'any') {
      returnFlag++;
    }
    if ((similarPin.offer.rooms === Number(filtersMap.offer.rooms)) || filtersMap.offer.rooms === 'any') {
      returnFlag++;
    }
    if ((similarPin.offer.guests === Number(filtersMap.offer.guests)) || filtersMap.offer.guests === 'any') {
      returnFlag++;
    }
    if (window.utils.isIncludeArray(similarPin.offer.features, filtersMap.offer.features)) {
      returnFlag++;
    }

    return (returnFlag === 5);
  };

  var onFiltersBarChange = function () {
    window.debounce(function () {
      if (document.querySelector('.popup')) {
        window.placeCard.closeCard();
      }
      buildFiltersMap();
      filteredSimilarPins = window.pin.mainArray.filter(isSimilar);
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
