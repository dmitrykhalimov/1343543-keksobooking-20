'use strict';

(function () {
  window.utils = {
    mixArray: function (arr) {
      var j;
      var temp;
      var mixedArray = arr.slice();

      for (var i = mixedArray.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = mixedArray[j];
        mixedArray[j] = mixedArray[i];
        mixedArray[i] = temp;
      }
      return mixedArray;
    },
    generateRandomNumber: function (min, max) {
      var randomNumber = min + Math.random() * (max + 1 - min);
      return Math.floor(randomNumber);
    }
  };
})();
