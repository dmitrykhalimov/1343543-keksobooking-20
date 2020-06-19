'use strict';

(function () {
  var ADS_QUANTITY = 8;

  window.data = {
    fillArray: function () {
      for (var i = 0; i < ADS_QUANTITY; i++) {
        mainArray.push(createPoint(i));
      }
    }
  };
})();
