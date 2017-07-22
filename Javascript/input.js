(function(){

  $(document).ready(initialize);

  function initialize() {
    $('#submit').click(config);
    $('.modal').modal();

  }

  function config() {
    var currentWater = $('#water').val();
    var exercise = $('#exercise').val();
    var exerciseT = exercise * 24;
    var total = (currentWater * 0.5) + (exercise * 24);

    console.log(total);

    $("#totalOz").append('That is Great! You drank '+currentWater+' already! Now it is recommended that you drink an additional 24 ounces for every hour of exercise. In you case, you should drink an additional '+exerciseT+' ounces of water.');

  }


})();
