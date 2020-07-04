'use strict';

(function () {
  var typeFlat = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var ROOMS_QUANTITY_SINGLE = 1;
  var ROOMS_QUANTITY_MAX_MUTIPLE = 5;
  var GUESTS_QUANTITY_SINGLE = 1;

  var POPUP_PHOTO_WIDTH = 45;
  var POPUP_PHOTO_HEIGHT = 50;

  var renderFeatures = function (features, card) {
    var listFeatures = card.querySelector('.popup__features');
    while (listFeatures.firstChild) {
      listFeatures.removeChild(listFeatures.firstChild);
    }

    for (var i = 0; i < features.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + features[i]);
      listFeatures.appendChild(li);
    }
  };

  var renderPictures = function (pictures, card) {
    var picturesContainer = card.querySelector('.popup__photos');
    picturesContainer.removeChild(picturesContainer.querySelector('.popup__photo'));

    for (var i = 0; i < pictures.length; i++) {
      var picture = document.createElement('img');
      picture.classList.add('popup__photo');
      picture.width = POPUP_PHOTO_WIDTH;
      picture.height = POPUP_PHOTO_HEIGHT;
      picture.src = pictures[i];
      picture.alt = 'Фотография жилья';
      picturesContainer.appendChild(picture);
    }
  };

  var generateCapacityString = function (rooms, guests) {
    var roomsString = 'комнат';
    var guestString = 'гостей';
    if (rooms === ROOMS_QUANTITY_SINGLE) {
      roomsString += 'а';
    } else if (rooms < ROOMS_QUANTITY_MAX_MUTIPLE) {
      roomsString += 'ы';
    }

    if (guests === GUESTS_QUANTITY_SINGLE) {
      guestString = 'гостя';
    }

    var capacityString = rooms + ' ' + roomsString + ' для ' + guests + ' ' + guestString;

    return capacityString;
  };

  var createCard = function (advert) {
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__title').textContent = advert.offer.title;
    card.querySelector('.popup__text--address').textContent = advert.offer.address;
    card.querySelector('.popup__text--price').textContent = advert.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = typeFlat[advert.offer.type];
    card.querySelector('.popup__text--capacity').textContent = (generateCapacityString(advert.offer.rooms, advert.offer.guests));
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__description').textContent = advert.offer.description;
    card.querySelector('.popup__avatar').src = advert.author.avatar;

    renderFeatures(advert.offer.features, card);
    renderPictures(advert.offer.photos, card);

    return card;
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  window.renderCard = {
    create: createCard
  };
})();
