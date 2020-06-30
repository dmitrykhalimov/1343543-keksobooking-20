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

  var translateAny = function (valueToTranslate) {
    if (valueToTranslate === 'any') {
      return -1;
    }
    return valueToTranslate;
  };

  var translatePriceToText = function (valueToTranslate) {
    for (var i = 0; i < prices.length; i++) {
      if (valueToTranslate < prices[i + 1].limit) {
        return prices[i].name;
      }
    }
    return -1;
  };

  var buildFiltersMap = function () {
    filtersMap = {};
    filtersMap.offer = {};
    filtersMap.offer.type = translateAny(housingType.value);
    filtersMap.offer.price = translateAny(housingPrice.value);
    filtersMap.offer.rooms = Number(translateAny(housingRooms.value));
    filtersMap.offer.guests = Number(translateAny(housingGuests.value));
    filtersMap.offer.features = buildFeaturesArray();
  };

  var returnFlag = 0;

  var checkSimilar = function (similarPin, field) {
    switch (field) {
      case 'type':
      case 'rooms':
      case 'guests': {
        if ((similarPin.offer[field] === filtersMap.offer[field]) || filtersMap.offer[field] === -1) {
          returnFlag++;
        }
        break;
      }
      case 'price': {
        if ((translatePriceToText(similarPin.offer[field]) === filtersMap.offer[field]) || filtersMap.offer[field] === -1) {
          returnFlag++;
        }
        break;
      }
      case 'features': {
        if (window.utils.isIncludeArray(similarPin.offer[field], filtersMap.offer[field])) {
          returnFlag++;
        }
        break;
      }
    }
  };

  var isSimilar = function (similarPin) {
    returnFlag = 0;
    checkSimilar(similarPin, 'type');
    checkSimilar(similarPin, 'rooms');
    checkSimilar(similarPin, 'price');
    checkSimilar(similarPin, 'guests');
    checkSimilar(similarPin, 'features');
    return (returnFlag === 5);
  };

  var isSimilar2 = function (similarPin) {
    returnFlag = 0;
    if ((similarPin.offer.type === filtersMap.offer.type) || filtersMap.offer.type === -1) {
      returnFlag++;
    }

    if ((similarPin.offer.rooms === filtersMap.offer.rooms) || filtersMap.offer.rooms === -1) {
      returnFlag++;
    }
    if ((similarPin.offer.guests === filtersMap.offer.guests) || filtersMap.offer.guests === -1) {
      returnFlag++;
    }
    if (window.utils.isIncludeArray(similarPin.offer.features, filtersMap.offer.features)) {
      returnFlag++;
    }
    return (returnFlag === 5);
  };

  var onFiltersBarChange = function () {
    window.debounce(function () {
      filteredSimilarPins = [];
      if (document.querySelector('.popup')) {
        window.placeCard.closeCard();
      }
      buildFiltersMap();
      var counter = 0;
      for (var i = 0; i < window.pin.mainArray.length; i++) {
        if (counter === window.pin.MAX_PIN_QUANTITY) {
          break;
        }
        if (isSimilar(window.pin.mainArray[i])) {
          filteredSimilarPins.push(window.pin.mainArray[i]);
          counter++;
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
