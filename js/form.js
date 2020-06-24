'use strict';

(function () {

  var TYPE_FLAT_MIN_VALUE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var DISABLED_ROOMS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  document.querySelector('#title').value = 'dsafsdfksadjhfasdjlfhasdkljfhasdlkjfhasdkfjhasdf';
  document.querySelector('#price').value = '9000';
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
    priceInput.setAttribute('min', TYPE_FLAT_MIN_VALUE[typeFlatList.value]);
    priceInput.setAttribute('placeholder', TYPE_FLAT_MIN_VALUE[typeFlatList.value]);
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  typeFlatList.addEventListener('change', onTypeFlatChange);

  submitButton.addEventListener('click', function () {
    if (!DISABLED_ROOMS[roomsNumber.value].includes(guestsNumber.value)) {
      guestsNumber.setCustomValidity('Выбрано некорректное количество мест');
    } else {
      guestsNumber.setCustomValidity('');
    }
  });

  roomsNumber.addEventListener('change', function () {
    for (var j = 0; j < guestsNumber.options.length; j++) {
      guestsNumber[j].disabled = !DISABLED_ROOMS[roomsNumber.value].includes(guestsNumber.options[j].value);
    }
  });

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

  var fullReset = function () {
    formAdvert.reset();
    window.map.changeMapStatus('deactivate');
    window.pin.removeSimilar();
    window.pin.reloadData();
  };

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    fullReset();
  });

  var onSend = function () {
    createPopup('success');
    fullReset();
  };

  var onError = function () {
    createPopup('error');
  };

  var onFormSubmit = function (evt) {
    window.backend.sendLoadData('POST', 'https://javascript.pages.academy/keksobooking', onSend, onError, new FormData(formAdvert));
    evt.preventDefault();
  };

  formAdvert.addEventListener('submit', onFormSubmit);

  window.form = {
    updateMapAddress: updateMapAddress
  };

  window.utils.changeInputs('fieldset', true);
})();
