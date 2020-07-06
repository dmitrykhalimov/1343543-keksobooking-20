'use strict';

(function () {
  var onCardCloseClick = function (evt) {
    evt.preventDefault();
    closeCard();
  };

  var cardPopup = null;

  var getCardPopup = function () {
    return cardPopup;
  };

  var closeCard = function () {
    cardPopup.remove();
    cardPopup = null;
    window.pin.removeActive();
    document.removeEventListener('keydown', onCardKeyDown);
    document.removeEventListener('click', onCardCloseClick);
  };

  var onCardKeyDown = function (evt) {
    if (evt.key === 'Escape' && cardPopup) {
      evt.preventDefault();
      closeCard();
    }
  };

  var placeCard = function (advert) {
    if (cardPopup) {
      closeCard();
    }

    cardPopup = window.renderCard.create(advert);
    document.querySelector('.map').insertBefore(cardPopup, document.querySelector('.map__filters-container'));

    document.addEventListener('keydown', onCardKeyDown);
    document.querySelector('.popup__close').addEventListener('click', onCardCloseClick);
  };

  window.placeCard = {
    place: placeCard,
    close: closeCard,
    getCardPopup: getCardPopup
  };
})();
