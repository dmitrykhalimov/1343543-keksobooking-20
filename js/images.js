'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var avatarPlace = document.querySelector('.ad-form-header__preview img');

  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var photoPlace = document.querySelector('.ad-form__photo img');

  var onAvatarLoad = function () {
    updatePhoto(avatarInput, avatarPlace);
  };

  var onPhotoLoad = function () {
    updatePhoto(photoInput, photoPlace);
  };

  var updatePhoto = function (selectedInput, imagePlace) {

    var file = selectedInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePlace.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarInput.addEventListener('change', onAvatarLoad);
  photoInput.addEventListener('change', onPhotoLoad);

  var imagesReset = function () {
    avatarPlace.src = 'img/muffin-grey.svg';
    photoPlace.src = '';
  };

  window.images = {
    imagesReset: imagesReset
  };
})();
