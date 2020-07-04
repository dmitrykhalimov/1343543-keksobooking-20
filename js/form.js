'use strict';

(function () {

  var typeFlatMinValue = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var disabledRooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeFlatList = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var submitButton = document.querySelector('.ad-form__submit');
  var roomsNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var resetButton = document.querySelector('.ad-form__reset');


  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  var onTypeFlatChange = function () {
    priceInput.setAttribute('min', typeFlatMinValue[typeFlatList.value]);
    priceInput.setAttribute('placeholder', typeFlatMinValue[typeFlatList.value]);
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  typeFlatList.addEventListener('change', onTypeFlatChange);

  submitButton.addEventListener('click', function () {
    if (!disabledRooms[roomsNumber.value].includes(guestsNumber.value)) {
      guestsNumber.setCustomValidity('Выбрано некорректное количество мест');
    } else {
      guestsNumber.setCustomValidity('');
    }
  });

  roomsNumber.addEventListener('change', function () {
    [].forEach.call(guestsNumber.options, function (option) {
      option.disabled = !disabledRooms[roomsNumber.value].includes(option.value);
    });
  });

  var guestsStatusReset = function () {
    [].forEach.call(guestsNumber.options, function (option) {
      option.disabled = false;
    });
  };

  var updateMapAddress = function (valueX, valueY) {
    var fieldAddress = document.querySelector('#address');
    fieldAddress.value = ((valueX + ', ' + valueY));
  };

  updateMapAddress(window.map.MAP_PIN_DEFAULT_X + window.map.MAP_PIN_WIDTH / 2, window.map.MAP_PIN_DEFAULT_Y + window.map.MAP_PIN_HEIGHT / 2);

  var main = document.querySelector('main');

  var createPopup = function (nameFunction) {
    var popupTemplate = document.querySelector('#' + nameFunction).content.querySelector('.' + nameFunction);
    var popup = popupTemplate.cloneNode(true);

    var closePopup = function () {
      document.querySelector('.' + nameFunction).removeEventListener('click', onPopupClick);
      document.removeEventListener('keydown', onPopupEsc);
      document.querySelector('.' + nameFunction).remove();
    };

    var onPopupClick = function () {
      closePopup();
    };

    var onPopupEsc = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closePopup();
      }
    };

    popup.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onPopupEsc);

    main.appendChild(popup);
  };

  var formAdvert = document.querySelector('.ad-form');

  var resetAllData = function () {
    formAdvert.reset();
    if (window.placeCard.popup()) {
      window.placeCard.close();
    }
    window.filters.filteredSimilarPins = window.pin.adverts;
    window.filters.reset();
    guestsStatusReset();
    window.map.changeStatus('deactivate');
    window.images.reset();
    window.pin.removeSimilar();
    window.pin.reloadData(window.filters.filteredSimilarPins);
  };

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetAllData();
  });

  var onSend = function () {
    createPopup('success');
    resetAllData();
  };

  var onError = function () {
    createPopup('error');
  };

  var onFormSubmit = function (evt) {
    window.backend.sendLoadData('POST', 'https://javascript.pages.academy/keksobooking', onSend, onError, new FormData(formAdvert));
    evt.preventDefault();
  };

  formAdvert.addEventListener('submit', onFormSubmit);

  window.utils.changeInputs('fieldset', true);

  window.form = {
    updateMapAddress: updateMapAddress
  };
})();
