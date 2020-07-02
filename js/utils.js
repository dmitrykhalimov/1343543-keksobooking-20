'use strict';

(function () {

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
    changeInputs: changeInputs,
    isIncludeArray: isIncludeArray
  };
})();
