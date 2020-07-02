'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var avatarPlace = document.querySelector('.ad-form-header__preview img');

  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var photoPlace;
  var photoContainer = document.querySelector('.ad-form__photo');

  var onAvatarLoad = function () {
    updatePhoto(avatarInput, avatarPlace);
  };

  var createPhoto = function () {
    var photo = document.createElement('img');

    photo.width = '40';
    photo.height = '44';
    photo.alt = 'Фотография квартиры';
    photoContainer.appendChild(photo);
    photoPlace = photoContainer.querySelector('img');
  };

  var onPhotoLoad = function () {
    if (!photoContainer.querySelector('img')) {
      createPhoto();
    }
    updatePhoto(photoInput, photoPlace);
  };

  var updatePhoto = function (fileChooser, preview) {

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarInput.addEventListener('change', onAvatarLoad);
  photoInput.addEventListener('change', onPhotoLoad);
})();
