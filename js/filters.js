'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var filtersForm = document.querySelector('.map__filters');

  filtersForm.addEventListener('change', function () {
    if (document.querySelector('.popup')) {
      window.placeCard.closeCard();
    }
  });

  var onHousingTypeChange = function () {
    var filteredSimilarPins = window.pin.mainArray.filter(function (similarPin) {
      return similarPin.offer.type === housingType.value;
    });
    window.pin.reloadData(filteredSimilarPins);
    window.pin.createSimilar();
  };

  housingType.addEventListener('change', onHousingTypeChange);
})();
