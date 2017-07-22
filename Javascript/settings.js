(function() {

  $(document).ready(initialize);

  function initialize() {
    $('#submit').click(pushAlert);
    $('#changePic').click(changePic);
  }

  function changePic() {

    $('#profile').change(function () {
               var file = this.files[0];
               var reader = new FileReader();
               reader.onloadend = function () {
                  $('#profile').css('background-image', 'url("' + this.result + '")');
               }
               if (file) {
                   reader.readAsDataURL(file);
               } else {
               }
            });
}

  function pushAlert() {
    alert('Success! Your profile information has been updated.')
  }

})();
