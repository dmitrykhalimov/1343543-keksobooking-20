'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (cb) {
    var lastTimeout = null;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb.apply(null, arguments);
    }, DEBOUNCE_INTERVAL);
  };
})();
