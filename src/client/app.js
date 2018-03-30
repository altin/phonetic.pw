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
  e_Generating: 3,
  e_Finished: 4
};

//temporary user
var user = {
	username: "comp3008",
	e_pw: "",
	b_pw: "",
	s_pw: "",
  e_login: false,
  b_login: false,
  s_login: false
}

//generator and tester html for dynamic loading
var generator = '<center><div id="generator" class="gen"><p id="password_print">Your password is:</p><div id="buttonStrip"><button type="button" id="change">Change</button><button type="button" id="practice">Practice</button><button type="button" id="accept">Accept</button></div></div></center>'
var tester = '<div id="tester" class="test"><p>Enter your password: </p><form><input id="login" type="text" size=10></input></form><div class="block"><center><p id="enter">Enter</p></center></div></div>'
var practiceField = '<center><div id="practiceField" class="gen"><p>Please practice your password: </p><form><input id="practiceInput" type="text" autocomplete="off" size=10></input></form><div id="practice-buttonStrip"><button type="button" id="hint">Hint</button><button type="button" id="back">Back</button><button type="button" id="enter">Test</button></div></div></center>'
//global variable declaration
var state;
var mode;
var password;
var order;
var order_it;
var attempts;

$(document).ready(function() {

  //global variable instantiation
  state = State.e_Email;
  mode = Mode.e_Create;
  password = '';
  order = [State.e_Email, State.e_Banking, State.e_Shopping];
  order_it = 0;
  attempts = 3;

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
name: loadTester
input: none
output: none
purpose: loads the password testers in the html page in an order based on the global order array
*/
function loadTester(){
  if (mode == Mode.e_Enter){
    switch(state){
      case State.e_Email:
        $('body').append("<div id='email-test' class='block'><center><h3>Email</h3><p>Attempts left: </p><p id='attempt_counter'>3</p></center>" + tester + "</div>");
        password = user.e_pw;
        break;
      case State.e_Banking:
        $('body').append("<div id='banking-test' class='block'><center><h3>Banking</h3><p>Attempts left: </p><p id='attempt_counter'>3</p></center>" + tester + "</div>");
        password = user.b_pw;
        break;
      case State.e_Shopping:
        $('body').append("<div id='shopping-test' class='block'><center><h3>Shopping</h3><p>Attempts left: </p><p id='attempt_counter'>3</p></center>" + tester + "</div>");
        password = user.s_pw;
        break;
    }
    $('#enter').on("click", function() {
      enterPassword();
    });
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
        $('#email').append(practiceField);
        $('#practiceField').hide();
        break;
      case State.e_Banking:
          $('#banking').append(generator);
          $('#banking').append(practiceField);
          $('#practiceField').hide();
        break;
      case State.e_Shopping:
          $('#shopping').append(generator);
          $('#shopping').append(practiceField);
          $('#practiceField').hide();
        break;
    }
    password = generatePassword(5).toUpperCase();
    $('#password_print').append("<p id='password'>" + password +"</p>");

    $('#change').on("click", function() {
  	  password = generatePassword(5).toUpperCase();
      $('#password').text(password);
    });

    $('#enter').on("click", function() {
        enterPassword();
    });

    $('#practice').on("click", function() {
        $("#generator, #buttonStrip").hide();
        $('#practiceField').show();
        $('#practiceInput').focus();
    });
    $('#back').on("click", function() {
        $("#generator, #buttonStrip").show();
        $('#practiceField').hide();
    });

    $('#hint').on("mousedown", function() {
        $('#practiceInput').val(password);
        $('#practiceInput').css('color', 'grey');
    }).on("mouseup", function() {
        $('#practiceInput').val('');
        $('#practiceInput').css('color', 'black');
        $('#practiceInput').focus();
    });

    $('#accept, #done').on("click", function() {
      savePassword();
    });
  }
}

/*
name: enterPassword
input: none
output: none
purpose: checks if the entered password matches the generated password and alerts the user respectively
*/
function enterPassword(){
  if (mode == Mode.e_Generating){
    if ($('#practiceInput').val().toUpperCase() === password) alert('Correct');
	  else alert('Incorrect');
  }else if (mode == Mode.e_Enter){
    attempts--;
    $('#attempt_counter').text(attempts);
    if ($('#login').val().toUpperCase() === password){
      alert('Login Success');
      login();
      closeTester();
      changeState();
      loadTester();
    }else{
      alert('Login Failed');
      if (attempts <= 0){
        alert('No More Attempts!');
        attempts = 3;
        closeTester();
        changeState();
        loadTester();
      }
    }
  }
}

/*
name: changeState
input: none
output: none
purpose: updates the mode and state enum values
*/
function changeState(){
  order_it++;
  if (mode == Mode.e_Generating) mode = Mode.e_Create;
  if (order_it >= order.length) {
    order_it = 0;
    switch (mode){
      case Mode.e_Create:
        mode = Mode.e_Enter;
        break;
      case Mode.e_Enter:
        mode = Mode.e_Finished;
//TEMPORARY LINE FOR DEBUGGING PURPOSES
        console.log(user);
        break;
    }
  }
  state = order[order_it];
}

/*
name: closeTester
input: none
output: none
purpose: closes tester after successful login or exceeded failed attempts
*/
function closeTester(){
  switch(state){
    case State.e_Email:
      $('#email-test').remove();
      break;
    case State.e_Banking:
      $('#banking-test').remove();
      break;
    case State.e_Shopping:
      $('#shopping-test').remove();
      break;
  }
}

/*
name: login
input: none
output: none
purpose: registers successful login
*/
function login(){
  switch(state){
    case State.e_Email:
      user.e_login = true;
      break;
    case State.e_Banking:
      user.b_login = true;
      break;
    case State.e_Shopping:
      user.s_login = true;
      break;
  }
}

/*
name: savePassword
input: none
output: none
purpose: saves the generated password to the user object
*/
function savePassword(){
  $('#generator, #buttonStrip, #practiceField').remove();
  switch(state){
    case State.e_Email:
      user.e_pw = password.toUpperCase();
      $('#email').find("h3").append(" \u2714");
      $('#email').find("h3").css('color', 'lime');
      $('#email').css('opacity', '0.5');
      $('#email').css('cursor', 'context-menu');
      $('#email').css('background-color', '#444');
      changeState();
      break;
    case State.e_Banking:
      user.b_pw = password.toUpperCase();
      $('#banking').find("h3").append(" \u2714");
      $('#banking').find("h3").css('color', 'lime');
      $('#banking').css('opacity', '0.5');
      $('#banking').css('cursor', 'context-menu');
      $('#banking').css('background-color', '#444');
      changeState();
      break;
    case State.e_Shopping:
      user.s_pw = password.toUpperCase();
      $('#shopping').find("h3").append(" \u2714");
      $('#shopping').find("h3").css('color', 'lime');
      $('#shopping').css('opacity', '0.5');
      $('#shopping').css('cursor', 'context-menu');
      $('#shopping').css('background-color', '#444');
      //randomize order array for random orer of testers
      order = shuffle(order);
      changeState();
      $('body').append("<p>Test your password for:</p>");
      loadTester();
      break;
  }
//TEMPORARY LINE FOR DEBUGGING PURPOSES
  console.log(user);
}
