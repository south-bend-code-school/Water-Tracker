(function(){

  $(document).ready(initialize);

  // THINGS I FIXED:

  // Check out database.js to see how I created a session variable on line 80.
  // This makes it so that the userID is stored in our browser as long as the
  // session exists. This should let us be able to track who a user is from page
  // to page without having a login.

  // I made it so that a date is stored in the database. I haven't fully tested
  // it, but it was the best way to track water intake for 1 day. Everyday you
  // start at 0 oz of water...correct?

  // I also made it so that when someone exercises, the amount of water that they
  // should have is subtracted from the current water intake. Check out the next
  // block of of comments to see what issues this brings up.

  // You all should walk thru some of the basic math in the function called
  // "checkTotal". There is actually some math in there and you guys have done
  // something pretty cool that I am not sure you realize you have done...You've
  // created an algorithm.

  // I removed the modal script on input.js and put it into database.js - I did
  // this because it was the only functionality that existed in that js script
  // and you were calling two pages for no reason.

  // I also changed the name of the id of the submit button on input.html. It was
  // called #submit, and I changed it to #submitButton. This is an issue that isn't
  // going to make much sense right now, but sometimes having something called
  // "submit" in your code can mess up the way events or functions are called later.

  // ============================

  // TODO:

  // Negative water intake happens when someone works out but doesn't drink enough
  // water. The script that runs at the bottom of the screen gets a little off when
  // that happens.

  // One of the images that you have saved doesn't have the water in the outline
  // of the body. You could probably switch that out fairly quickly.

  // ============================

  // LESSONS TO TAKE AWAY:

  // Logic is HARD! Thinking thru these things isn't always easy, but it really
  // takes your app to the next level. That's why this skill is valuable. Not
  // everyone can think like this.

  // It is okay not to have everything finished right now. You just need to be
  // able to talk about why you did what you did, and what you are still working
  // on as well as the reasons why you have been having problems or issues while
  // you are working on it.

  var uid;
  var todaysDate;

  var config = {
    apiKey: "AIzaSyD3RJpdZjIMFXoUNBDrzJ1pA0xS79cWH0o",
    authDomain: "wt-demo-e44cc.firebaseapp.com",
    databaseURL: "https://wt-demo-e44cc.firebaseio.com",
    projectId: "wt-demo-e44cc",
    storageBucket: "wt-demo-e44cc.appspot.com",
    messagingSenderId: "188622870697"
  };

  function initialize() {
    firebase.initializeApp(config);
    // created a function to find the session variable for our uid
    findUid();
    // created a function to determine if this date is already in the db or if we need to add it.
    getDate();
    $('#submitButton').click(configure);
    $('.modal').modal();
  }

  // This is the function to find the session var
  function findUid(){
    uid = sessionStorage['uid'];
  }

  // This function gets the current date, makes sure the user hasn't alreday logged
  // any water use for this date, and then makes a new date entry if they have not, or
  // adds addtional water to the current date's entry.
  function getDate(){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newdate = year + "-" + month + "-" + day;

    firebase.database().ref('user/'+uid+'/date/'+newdate).on('value', function(snapshot){
      if(snapshot.val() !== null){
        todaysDate = newdate;
      } else {
        saveNewDate(newdate);
      }
    });

    findPercentFull(newdate);
  }

  function findPercentFull(newdate){
    firebase.database().ref('user/'+uid+'/date/'+newdate).on('value',function(snapshot){
      var percent = snapshot.val().percentFull
      var imgNum = Math.ceil(percent/5)*5;
      console.log('image name:'+imgNum);
      $('#bodyImage').attr('src', '../images/body_'+imgNum+'_.png');
    });
  }

  // this function creates a new entry for today's date.
  function saveNewDate(newdate){
    var date = {
      percentFull: 0
    }
    var updates = {};
    updates['user/'+uid+'/date/'+newdate] = date;
    return firebase.database().ref().update(updates);
  }


  function configure() {
    var water = $('#water').val();
    var exercise = $('#exercise').val();
    var exerciseT = exercise * 24;
    var currentWater = (water * 0.5) - (exercise * 24);

    $("#totalOz").append('That is Great! You drank '+water+' already! Now it is recommended that you drink an additional 24 ounces for every hour of exercise. In your case, you should drink an additional '+exerciseT+' ounces of water.');

    checkTotal(currentWater);
  }

  function checkTotal(currentWater){
    firebase.database().ref('user/' + uid).once('value').then(function(snapshot){
      var user = snapshot.val();
      var weight = user.weight;
      var totalWater = weight * 0.5;
      firebase.database().ref('user/'+uid+'/date/'+todaysDate).once('value').then(function(snapshot){
        var userDate = snapshot.val();
        var thisPercent = currentWater*100/totalWater;
        var updatedPercent = thisPercent + (userDate.percentFull);
        saveNewPercent(updatedPercent);
      });
    });
  }

  function saveNewPercent(updatedPercent){
    update = {
      percentFull : updatedPercent
    }
    var updates = {};
    updates['user/'+uid+'/date/'+todaysDate] = update;
    return firebase.database().ref().update(updates);
  }


})();
