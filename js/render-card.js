'use strict';

(function () {
  var TYPE_FLAT = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

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
      picture.width = 45;
      picture.height = 50;
      picture.src = pictures[i];
      picture.alt = 'Фотография жилья';
      picturesContainer.appendChild(picture);
    }
  };

  var generateCapacityString = function (rooms, guests) {
    var roomsString = 'комнат';
    var guestString = 'гостей';
    if (rooms === 1) {
      roomsString += 'а';
    } else if (rooms < 5) {
      roomsString += 'ы';
    }

    if (guests === 1) {
      guestString = 'гостя';
    }

    var capacityString = rooms + ' ' + roomsString + ' для ' + guests + ' ' + guestString;

    return capacityString;
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  window.renderCard = {
    createCard: function (advert) {
      var card = cardTemplate.cloneNode(true);

      card.querySelector('.popup__title').textContent = advert.offer.title;
      card.querySelector('.popup__text--address').textContent = advert.offer.address;
      card.querySelector('.popup__text--price').textContent = advert.offer.price + ' ₽/ночь';
      card.querySelector('.popup__type').textContent = TYPE_FLAT[advert.offer.type];
      card.querySelector('.popup__text--capacity').textContent = (generateCapacityString(advert.offer.rooms, advert.offer.guests));
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
      card.querySelector('.popup__description').textContent = advert.offer.description;
      card.querySelector('.popup__avatar').src = advert.author.avatar;

      renderFeatures(advert.offer.features, card);
      renderPictures(advert.offer.photos, card);

      return card;
    }
  };
})();
