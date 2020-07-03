'use strict';

(function () {

  var changeInputs = function (inputClass, isDisabled) {
    var inputs = document.querySelectorAll(inputClass);
    inputs.forEach(function (el) {
      el.disabled = isDisabled;
    });
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
