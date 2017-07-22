(function() {
  $(document).ready(function() {
    var select = '';
    for (i=1;i<=12;i++){
        select += '<option val=' + i + '>' + i + '</option>';
    }
    $('#Inches').html(select);
    var select = '';
    for (i=1;i<=12;i++){
        select += '<option val=' + i + '>' + i + '</option>';
    }
    $('#Month').html(select);
    var select = '';
    for (i=1;i<=8;i++){
        select += '<option val=' + i + '>' + i + '</option>';
    }
    $('#Feet').html(select);
    var select = '';
    for (i=1;i<=31;i++){
        select += '<option val=' + i + '>' + i + '</option>';
    }
    $('#Day').html(select);
    var select = '';
    for (i=1945;i<=2017;i++){
        select += '<option val=' + i + '>' + i + '</option>';
    }
    $('#Year').html(select);
      $('select').material_select();

    });

})();
