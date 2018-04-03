/*******************************************************************************
Course: COMP3008 (Winter 2018), Project 2
Project: Project 2 - Password Scheme
Name: Phonetic.pw
Group Members: Jason Lai, Altin Rexhepaj, Randy Taylor, Devin Waclawik
*******************************************************************************/
// Client for phonetic.pw password testing framework

/*******************************************************************************
Global variable declaration
*******************************************************************************/
var state;
var mode;
var password;
var order;
var order_it;
var attempts;
var failureMessages = ["Try again! You can do it!", "Oops! Don't give up!", "Don't worry, you'll remember!", "It's on the tip of your tongue!", "Mistakes happen. Think harder!", "Not quite. Don't sweat it."]
var successMessages = ["You're a genius!", "Amazing!", "Bingo.", "Great work!", "Correct-o!", "Wow! Teach me your ways.", "Perfect.", "Extraordinary."]
var stateName = ["email", "banking", "shopping"];
var modeName = ["create", "enter", "finished"];
var currState;
var log = "";

// Temporary user
var user = {
    username: "COMP3008",
    e_pw: "",
    b_pw: "",
    s_pw: "",
    e_login: false,
    b_login: false,
    s_login: false
};

// State enum to keep track of which password we are dealing with
var State = {
    e_Email: 1,
    e_Banking: 2,
    e_Shopping: 3
};
// Mode enum to keep track of which stage of password scheme tester we are in
var Mode = {
    e_Create: 1,
    e_Enter: 2,
    e_Finished: 3
};

/*******************************************************************************
Global variable instantiation
*******************************************************************************/
state = State.e_Email;
mode = Mode.e_Create;
password = '';
order = [State.e_Email, State.e_Banking, State.e_Shopping];
order_it = 0;
attempts = 3;

// Generator and tester html for dynamic loading
var generator = '<center><div id="generator" class="gen"><p id="password_print">Your password is:</p><div id="buttonStrip"><button type="button" id="practice">Practice</button><button type="button" id="accept">Accept</button></div></div></center>'
var tester = '<center><div id="tester" class="test"><p>Enter your password: </p><form><input id="login" type="text" size=10 autocomplete="off"></input></form><button type="button" id="enter">Submit</button></center></div></div></center>'
var practiceField = '<center><div id="practiceField" class="gen"><p>Please practice your password: </p><form><input id="practiceInput" type="text" autocomplete="off" size=10"></input></form><div id="practice-buttonStrip"><button type="button" id="hint">Hint</button><button type="button" id="back">Back</button><button type="button" id="enter">Test</button><button type="button" id="accept">Accept</button></div></div></center>'

$(document).ready(function() {
    //load the initial generator
    loadGenerator(State.e_Email);

    /*
    name: shuffle
    input: order (var [])
    output: order (var [])
    purpose: copies the elements in the input array and returns a reordered array
    */
    function shuffle(order) {
        var temp, rand;
        for (i = 0; i < order.length; i++) {
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
    function loadTester() {
        if (mode == Mode.e_Enter) {
            switch (state) {
                case State.e_Email:
                    $('body').append("<div id='email-test' class='block'><center><h3>Email</h3><p id='attemptsLeft'>Attempts Left: </p><p id='attempt_counter'>3</p></center>" + tester + "</div>");
                    password = user.e_pw;
                    currState = 1;
                    logit(getStamp(currState, Mode.e_Enter, "start"));
                    break;
                case State.e_Banking:
                    $('body').append("<div id='banking-test' class='block'><center><h3>Banking</h3><p id='attemptsLeft'>Attempts Left: </p><p id='attempt_counter'>3</p></center>" + tester + "</div>");
                    password = user.b_pw;
                    currState = 2;
                    logit(getStamp(currState, Mode.e_Enter, "start"));
                    break;
                case State.e_Shopping:
                    $('body').append("<div id='shopping-test' class='block'><center><h3>Shopping</h3><p id='attemptsLeft'>Attempts Left: </p><p id='attempt_counter'>3</p></center>" + tester + "</div>");
                    password = user.s_pw;
                    currState = 3;
                    logit(getStamp(currState, Mode.e_Enter, "start"));
                    break;
            }
            //add enter key handler so form is not submitted
            $('#login').keypress(function(e) {
                keyID = e.which;
                if (keyID == 13) {
                    e.preventDefault();
                    enterPassword();
                    return false;
                } else {
                    return true;
                }
            });

            $('#enter').on("click", function() {
                enterPassword();
            });
        }
    }

    /*
    name: loadGenerator
    input: s (State.e_num)
    output: none
    purpose: Loads in the password generator in the html page based on the current State of the app
    */
    function loadGenerator(s) {
        if (s == state && mode == Mode.e_Create) {
            mode = Mode.e_Create;
            // Generate a password of desired length
            password = generatePassword(5).toUpperCase();
            switch (s) {
                case State.e_Email: // The user is on the email password generator section
                    currState = 1;
                    logit(getStamp(currState, Mode.e_Create, "start"));
                    // Dynamically load the password generator UI for the email section
                    $('#email').append(generator);
                    // Dynamically load the practice UI for the password generator UI
                    $('#email').append(practiceField);
                    // Hide the practice UI initially -- Will be toggled on button click
                    $('#practiceField').hide();
                    break;
                case State.e_Banking: // The user is on the banking password generator section
                    currState = 2;
                    logit(getStamp(currState, Mode.e_Create, "start"));
                    $('#banking').append(generator);
                    $('#banking').append(practiceField);
                    $('#practiceField').hide();
                    break;
                case State.e_Shopping: // The user is on the shopping password generator section
                    currState = 3;
                    logit(getStamp(currState, Mode.e_Create, "start"));
                    $('#shopping').append(generator);
                    $('#shopping').append(practiceField);
                    $('#practiceField').hide();
                    break;
            }
            //add enter key handler so form is not submitted
            $('#practiceInput').keypress(function(e) {
                keyID = e.which;
                if (keyID == 13) {
                    e.preventDefault();
                    enterPassword();
                    return false;
                } else {
                    return true;
                }
            });
            // Show the password in the corresponding section by appening it dynamically
            $('#password_print').append("<p id='password'>" + password + "</p>");

            /*******************************************************************
            Click handlers for password generator and practice UI
            *******************************************************************/
            // 'Practice' button: Unhides the practice UI to practice the password
            $('#practice').on("click", function() {
                logit(getStamp(currState, Mode.e_Create, "practice"));
                $("#generator, #buttonStrip").hide();
                $('#practiceField').show();
                $('#practiceInput').focus();
            });

            // 'Accept' button: Save the password for the current category
            $('#accept, #done').on("click", function() {
                logit(getStamp(currState, Mode.e_Create, "passwordSubmitted"));
                savePassword();
            });

            // 'Hint' button: When clicked, the password appears in the input bar
            $('#hint').on("mousedown", function() {
                logit(getStamp(currState, Mode.e_Create, "hint", "start"));
                $('#practiceInput').val(password);
                $('#practiceInput').css('color', 'grey');
            }).on("mouseup", function() {
                logit(getStamp(currState, Mode.e_Create, "hint", "end"));
                $('#practiceInput').val('');
                $('#practiceInput').css('color', 'black');
                $('#practiceInput').focus();
            });

            // 'Test' button in practice UI: Checks if the entered password was correct
            $('#enter').on("click", function() {
                enterPassword();
            });

            // 'Back' button in practice UI: Hides the practice UI, goes back to password generator UI
            $('#back').on("click", function() {
                $("#generator, #buttonStrip").show();
                $('#practiceField').hide();
            });
        }
    }
    /*
    name: enterPassword
    input: none
    output: none
    purpose: checks if the entered password matches the generated password and alerts the user respectively
    */
    function enterPassword() {
        if (mode == Mode.e_Create) {
            var msg;
            if ($('#practiceInput').val().toUpperCase() === password) {
                logit(getStamp(currState, Mode.e_Create, "testpw", "success"));
                msg = successMessages[Math.floor(Math.random() * successMessages.length)];
                $('#practiceField').append("<p id='success'>" + msg + "</p>");
                setTimeout(function() {
                    $('#success').remove();
                }, 1500);
            } else {
                logit(getStamp(currState, Mode.e_Create, "testpw", "fail"));
                msg = failureMessages[Math.floor(Math.random() * failureMessages.length)];
                $('#practiceField').append("<p id='fail'>" + msg + "</p>");
                setTimeout(function() {
                    $('#fail').remove();
                }, 1500);
            }
            $('#practiceInput').val('').focus();
        } else if (mode == Mode.e_Enter) {
            attempts--;
            var msg;
            $('#login').focus();
            $('#attempt_counter').text(attempts);
            if ($('#login').val().toUpperCase() === password) {
                logit(getStamp(currState, Mode.e_Enter, "passwordSubmitted", "success"));
                msg = successMessages[Math.floor(Math.random() * successMessages.length)];
                $('#tester').append("<p id='success'>" + msg + "</p>");
                setTimeout(function() {
                    $('#success').remove();
                }, 1500);
                login();
                closeTester();
                changeState();
                loadTester();
                attempts = 3;
            } else {
                if (attempts > 0) {
                    logit(getStamp(currState, Mode.e_Enter, "passwordSubmitted", "fail"));
                    msg = failureMessages[Math.floor(Math.random() * failureMessages.length)];
                    $('#tester').append("<p id='fail'>" + msg + "</p>");
                    setTimeout(function() {
                        $('#fail').remove();
                    }, 1500);
                } else if (attempts <= 0) {
                    logit(getStamp(currState, Mode.e_Enter, "passwordSubmitted", "fail"));
                    $('#enter').hide();
                    $('#tester').append("<p id='fail'> You ran out of attempts. </p>");
                    setTimeout(function() {
                        $('#fail').remove();
                        attempts = 3;
                        closeTester();
                        changeState();
                        loadTester();
                    }, 1500);
                }
            }
            $('#login').val('').focus();
        }
    }

    /*
    name: changeState
    input: none
    output: none
    purpose: updates the mode and state enum values
    */
    function changeState() {
        order_it++;
        if (mode == Mode.e_Create) mode = Mode.e_Create;
        if (order_it >= order.length) {
            order_it = 0;
            switch (mode) {
                case Mode.e_Create:
                    mode = Mode.e_Enter;
                    break;
                case Mode.e_Enter:
                    mode = Mode.e_Finished;
                    password = 0;
                    logit(getStamp(0, Mode.e_Finished));
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
    function closeTester() {
        switch (state) {
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
    function login() {
        switch (state) {
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
    function savePassword() {
        $('#generator, #buttonStrip, #practiceField').remove();
        switch (state) {
            case State.e_Email:
                user.e_pw = password.toUpperCase();
                $('#email').find("h3").append(" \u2714");
                $('#email').find("h3").css('color', 'lime');
                $('#email').css('opacity', '0.5');
                $('#email').css('cursor', 'context-menu');
                $('#email').css('background-color', '#444');
                changeState();
                loadGenerator(State.e_Banking);
                break;
            case State.e_Banking:
                user.b_pw = password.toUpperCase();
                $('#banking').find("h3").append(" \u2714");
                $('#banking').find("h3").css('color', 'lime');
                $('#banking').css('opacity', '0.5');
                $('#banking').css('cursor', 'context-menu');
                $('#banking').css('background-color', '#444');
                changeState();
                loadGenerator(State.e_Shopping);
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
    }

    /*
    name: getStamp
    input: State (State.e_num), Mode (Mode.e_num), eventName (String), extra (String)
    output: stamp(string)
    purpose: Creates and returns a time stamp with all relevant event details for each event
    */
    function getStamp(State, Mode, eventName, extra = "") {
        var stamp;
        stamp = new Date().toISOString() + ",";
        stamp += user.username + ",";
        stamp += "phonetic.pw" + ",";
        stamp += stateName[State - 1] + ",";
        stamp += modeName[Mode - 1] + ",";
        stamp += eventName + ",";
        stamp += password;
        if (extra !== "") stamp += "," + extra;
        log += stamp + "\n"
        return stamp;
    }

    /*
    name: logit
    input: stamp(string)
    output: none
    purpose: sends a request to the server to log a stamp
    */
    function logit(stamp) {
        $.ajax({
            method: "POST",
            url: "/log",
            data: stamp,
            success: function() {
                console.log("event logged: " + stamp);
            }
        });
    }
});