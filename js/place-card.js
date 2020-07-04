'use strict';

(function () {
  var onCardCloseClick = function (evt) {
    evt.preventDefault();
    closeCard();
  };

  var cardPopup = function () {
    return document.querySelector('.popup');
  };

  var closeCard = function () {
    cardPopup().remove();
    window.pin.removeActive();
    document.removeEventListener('keydown', onCardKeyDown);
    document.removeEventListener('click', onCardCloseClick);
  };

  var onCardKeyDown = function (evt) {
    if (evt.key === 'Escape' && cardPopup()) {
      evt.preventDefault();
      closeCard();
    }
  };

  var placeCard = function (advert) {
    if (cardPopup()) {
      closeCard();
    }

    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(window.renderCard.create(advert));
    document.querySelector('.map').insertBefore(fragmentCard, document.querySelector('.map__filters-container'));

    document.addEventListener('keydown', onCardKeyDown);
    document.querySelector('.popup__close').addEventListener('click', onCardCloseClick);
  };

  window.placeCard = {
    place: placeCard,
    close: closeCard,
    popup: cardPopup
  };
})();
