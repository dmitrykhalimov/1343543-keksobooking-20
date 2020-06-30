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
  var filtersForm = document.querySelector('.map__filters');
  var filteredSimilarPins = window.pin.mainArray;
  var filtersMap;

  var buildFiltersMap = function () {
    filtersMap = {};
    filtersMap.offer = {};
    filtersMap.offer.type = housingType.value;
    filtersMap.offer.price = housingPrice.value;
    filtersMap.offer.priceMin = prices[housingPrice.value].min;
    filtersMap.offer.priceMax = prices[housingPrice.value].max;
  };

  var isSimilar = function (similarPin) {
    var returnFlag = 0;
    if ((similarPin.offer.type === filtersMap.offer.type) || filtersMap.offer.type === 'any') {
      returnFlag++;
    }
    if ((similarPin.offer.price <= filtersMap.offer.priceMax && similarPin.offer.price >= filtersMap.offer.priceMin) || filtersMap.offer.price === 'any') {
      returnFlag++;
    }
    return (returnFlag === 2);
  };

  var onFiltersBarChange = function () {
    if (document.querySelector('.popup')) {
      window.placeCard.closeCard();
    }
    buildFiltersMap();
    filteredSimilarPins = window.pin.mainArray;
    filteredSimilarPins = window.pin.mainArray.filter(isSimilar);
    window.pin.reloadData(filteredSimilarPins);
    window.pin.createSimilar();
  };

  filtersForm.addEventListener('change', onFiltersBarChange);

/*
  var onHousingTypeChange = function () {
    filteredSimilarPins = window.pin.mainArray;
    if (housingType.value !== 'any') {
      filteredSimilarPins = window.pin.mainArray.filter(function (similarPin) {
        return similarPin.offer.type === housingType.value;
      });
    }
    window.pin.reloadData(filteredSimilarPins);
    window.pin.createSimilar();
  };
*/
  var filtersReset = function () {
    filtersForm.reset();
  };
/*
  housingType.addEventListener('change', onHousingTypeChange);
*/
  window.filters = {
    filteredSimilarPins: filteredSimilarPins,
    filtersReset: filtersReset
  };
})();
