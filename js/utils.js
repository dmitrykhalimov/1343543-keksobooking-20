'use strict';

(function () {

  var generateRandomNumber = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  };

  var changeInputs = function (inputClass, isDisabled) {
    var inputs = document.querySelectorAll(inputClass);
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].disabled = isDisabled;
    }
  };
  var isIncludeArray = function (dataDefault, dataToCompare) {
    return dataToCompare.every(function (element) {
      return dataDefault.indexOf(element) > -1;
    });
  };

  window.utils = {
    generateRandomNumber: generateRandomNumber,
    changeInputs: changeInputs,
    isIncludeArray: isIncludeArray
  };
})();
