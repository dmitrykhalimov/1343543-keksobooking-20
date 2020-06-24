'use strict';

(function () {
  var main = document.querySelector('main');

  var openPopup = function (popup) {
    main.appendChild(popup);
  };

  var closePopup = function (popup) {
    popup.remove();
  };

  window.drawPopups = {
    openPopup: openPopup,
    closePopup: closePopup
  };
})();
