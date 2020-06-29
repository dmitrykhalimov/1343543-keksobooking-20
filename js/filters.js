'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var filtersForm = document.querySelector('.map__filters');
  var filteredSimilarPins = window.pin.mainArray;

  filtersForm.addEventListener('change', function () {
    if (document.querySelector('.popup')) {
      window.placeCard.closeCard();
    }
  });

  var onHousingTypeChange = function () {
    filteredSimilarPins = window.pin.mainArray.filter(function (similarPin) {
      return similarPin.offer.type === housingType.value;
    });
    window.pin.reloadData(filteredSimilarPins);
    window.pin.createSimilar();
  };

  var filtersReset = function () {
    filtersForm.reset();
  };

  housingType.addEventListener('change', onHousingTypeChange);

  window.filters = {
    filteredSimilarPins: filteredSimilarPins,
    filtersReset: filtersReset
  };
})();
