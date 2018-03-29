//logic for phonetic.pw password generator

//state enum to keep track of which password we are dealing with
var State = {
  e_Email: 1,
  e_Banking: 2,
  e_Shopping: 3
};
//mode enum to keep track of which stage of password scheme tester we are in
var Mode = {
	e_Create: 1,
	e_Enter: 2,
  e_Generating: 4
};

//temporary user
var user = {
	username: "comp3008",
	e_pw: "",
	b_pw: "",
	s_pw: ""
}

//generator html for dynamic loading
var generator = '<div id="generator" class="gen"><p id="password_print">Your password is:</p><div class="block"><center><p id="change">Change</p></center></div><p>Please practice your password: </p><form><input id="practice" type="text" size=10></input></form><div class="block"><center><p id="test">Test</p></center></div><p>When you are finished practicing, click finish.</p><div class="block"><center><p id="finish">Finish</p></center></div></div>'

//global variables
var state;
var mode;
var password;

$(document).ready(function() {

  //global variable instantiation
  state = State.e_Email;
  mode = Mode.e_Create;
  password = '';

  //click handlers
  $('#email').on("click", function() {
      loadGenerator(State.e_Email);
  });
  $('#banking').on("click", function() {
      loadGenerator(State.e_Banking);
  });
  $('#shopping').on("click", function() {
      loadGenerator(State.e_Shopping);
  });
});

/*
name: shuffle
input: order (var [])
output: order (var [])
purpose: copies the elements in the input array and returns a reordered array
*/
function shuffle(order){
  var temp, rand;
  for (i = 0; i < order.length; i++){
    temp = order[i];
    rand = Math.floor(Math.random() * (order.length - 0)) + 0;
    order[i] = order[rand];
    order[rand] = temp;
  }
  return order;
}

/*
name: loadTesters
input: none
output: none
purpose: loads the password testers in the html page in an order based on the input array
*/
function loadTesters(){
  //load in password testers in random order
  var order = [0,1,2];
  order = shuffle(order);
  for (i = 0; i < order.length; i++){
    switch(order[i]){
      case 0:
        $('body').append("<div id='email-test' class='block'><center><h3>Email</h3></center></div>");
        break;
      case 1:
        $('body').append("<div id='banking-test' class='block'><center><h3>Banking</h3></center></div>");
        break;
      case 2:
        $('body').append("<div id='shopping-test' class='block'><center><h3>Shopping</h3></center></div>");
        break;
    }
  }
}

/*
name: loadGenerator
input: s (State.e_num)
output: none
purpose: loads in the password generator in the html page based on the current State of the app
*/
function loadGenerator(s){
  if (s == state && mode == Mode.e_Create){
    mode = Mode.e_Generating;
    switch(s){
      case State.e_Email:
        $('#email').append(generator);
        break;
      case State.e_Banking:
        $('#banking').append(generator);
        break;
      case State.e_Shopping:
        $('#shopping').append(generator);
        break;
    }
    password = generatePassword();
    $('#password_print').append("<p id='password'>" + password +"</p>");
    $('#change').on("click", function() {
  	  password = generatePassword();
      $('#password').text(password);
    });
    $('#test').on("click", function() {
        enterPassword();
    });
    $('#finish').on("click", function() {
      savePassword()
    });
  }
}

/*
name: generartePassword
input: none
output: none
purpose: generates phonetic password
*/
function generatePassword(){
  return Math.random();
}

/*
name: enterPassword
input: none
output: none
purpose: checks if the entered password matches the generated password and alerts the user respectively
*/
function enterPassword(){
	if ($('#practice').val() == password) alert('NICE');
	else alert('U SUCK');
}

/*
name: savePassword
input: none
output: none
purpose: saves the generated password to the user object and resets global variables
*/
function savePassword(){
  switch(state){
    case State.e_Email:
      user.e_pw = password;
      state = State.e_Banking;
      mode = Mode.e_Create;
      break;
    case State.e_Banking:
      user.b_pw = password;
      state = State.e_Shopping;
      mode = Mode.e_Create;
      break;
    case State.e_Shopping:
      user.s_pw = password;
      state = State.e_Email;
      mode = Mode.e_Enter;
      $('body').append("<p>Test your password for:</p>");
      loadTesters();
      break;
  }
  password = '';
  $('#generator').remove();
  console.log(user);
}
