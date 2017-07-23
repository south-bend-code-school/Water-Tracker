(function(){

  $(document).ready(init);

  var config = {
    apiKey: "AIzaSyD3RJpdZjIMFXoUNBDrzJ1pA0xS79cWH0o",
    authDomain: "wt-demo-e44cc.firebaseapp.com",
    databaseURL: "https://wt-demo-e44cc.firebaseio.com",
    projectId: "wt-demo-e44cc",
    storageBucket: "wt-demo-e44cc.appspot.com",
    messagingSenderId: "188622870697"
  };

  function init() {
     console.log('this is here!');
     firebase.initializeApp(config);
     $('#signup').on('click', saveData);
     loadData();
     $('.modal').modal();

  }

  function loadData(){
    console.log('loading data');
    firebase.database().ref("User").once('value', function(snapshot){
      var user = snapshot.val();
      for(var i in user){
        var first_name = user[i].firstname;
        var last_name = user[i].lastname;
        var email = user[i].email;
        var password = user[i].password;
        var gender = user[i].gender;
        var weight = user[i].weight;
        var birthday = user[i].email;
        var height = user[i].height;


        // $('#list').append(
        //   "<h1>"+weight+"</h1>" +
        //   "<h1>"+fname+"</h1>" +
        //   "<h1>"+lname+"</h1>"
        // );

      }
    });

  }

  function saveData(){
    console.log('saving data');
    var fname = $('#first_name').val();
    var lname = $('#last_name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    // var gender = $('#gender').val();
    var weight = $('#weight').val();
    // var birthday = $('birthday').val();
    // var height = $('#height').val();

    var user = {
      weight : weight,
      firstname : fname,
      lastname : lname,
      email : email,
      password : password,
      // gender : gender,
      weight : weight,
      // birthday : birthday,
      // height : height,

    }

    var newUserKey = firebase.database().ref().child("User").push().key;
    var updates = {};
    updates ['/user/' + newUserKey] = user;

    firebase.database().ref().update(updates).then(function(){
      alert("Success!");
      // added this line to create a session variable that will exist with all of our pages.
      sessionStorage.setItem('uid', newUserKey);
      window.location.replace('./home.html');
      // location.assign("./index.html?id="+email);


  }).catch(function(error){
    console.log(error);
  });

}




})();
