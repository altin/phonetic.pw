//logic for phonetic.pw password generator

//global variables
var State = {
  e_Email: 1,
  e_Banking: 2,
  e_Shopping: 3,
  e_Generating: 4
};
var Mode = {
	e_Create: 1,
	e_Enter: 2
};

var user = {
	username: "comp3008",
	e_pw: "",
	b_pw: "",
	s_pw: ""
}

var state;
var mode;
var password;

$(document).ready(function() {
  //load in password testers in random order
  var order = [0,1,2];
  order = shuffle(order);
  loadTesters(order);

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
  $('#change').on("click", function() {
	  password = generatePassword();
      $('#password').text(password);
  });
  $('#test').on("click", function() {
      enterPassword();
  });
  $('#finish').on("click", function() {
      user.e_pw = password;
	  password = '';
	  $('#email-gen').hide();
	  console.log(user);
  });

  //hide password generators
  $('#email-gen').hide();
  $('#banking-gen').hide();
  $('#shopping-gen').hide();
});

function shuffle(order){
  var temp, rand;
  for (i = 0; i < order.length; i++){
    temp = order[i];
    rand = Math.floor(Math.random() * (3 - 0)) + 0;
    order[i] = order[rand];
    order[rand] = temp;
  }
  return order;
}

function loadTesters(order){
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

function loadGenerator(s){
  if (s == state && mode == Mode.e_Create){
    state = State.e_Generating;
    switch(s){
      case State.e_Email:
        $('#email-gen').show();
		password = generatePassword();
        $('#email-password').append("<p id='password'>" + password +"</p>");
        break;
      case State.e_Banking:
        $('#banking-gen').show();
        break;
      case State.e_Shopping:
        $('#banking-gen').show();
        break;
    }
  }
}

function generatePassword(){
  return Math.random();
}

function enterPassword(){
	if ($('#practice').val() == password) alert('NICE');
	else alert('U SUCK');
}
