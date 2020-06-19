'use strict';

(function () {
  var onCardCloseClick = function (evt) {
    evt.preventDefault();
    closeCard();
  };

  var closeCard = function () {
    document.querySelector('.popup').remove();
    document.removeEventListener('keydown', onCardEsc);
    document.removeEventListener('click', onCardCloseClick);
  };

  var onCardEsc = function (evt) {
    if (evt.key === 'Escape' && document.querySelector('.popup')) {
      evt.preventDefault();
      closeCard();
    }
  };

  window.placeCard = {
    placeCard: function (numberCard) {
      if (document.querySelector('.popup')) {
        closeCard();
      }

      var fragmentCard = document.createDocumentFragment();
      fragmentCard.appendChild(window.renderCard.createCard(window.mainArray[numberCard]));
      document.querySelector('.map').insertBefore(fragmentCard, document.querySelector('.map__filters-container'));

      document.addEventListener('keydown', onCardEsc);
      document.querySelector('.popup__close').addEventListener('click', onCardCloseClick);
    }
  };
})();
