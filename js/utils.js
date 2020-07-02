'use strict';

(function () {
  window.utils = {
    generateRandomNumber: function (min, max) {
      var randomNumber = min + Math.random() * (max + 1 - min);
      return Math.floor(randomNumber);
    },
    changeInputs: function (inputClass, isDisabled) {
      var inputs = document.querySelectorAll(inputClass);
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = isDisabled;
      }
    },
    isIncludeArray: function (dataDefault, dataToCompare) {
      return dataToCompare.every(function (element) {
        return dataDefault.indexOf(element) > -1;
      });
    }
  };
})();
