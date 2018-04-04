/*******************************************************************************
Course: COMP3008 (Winter 2018), Project 2
Project: Project 2 - Password Scheme
Name: Phonetic.pw
Group Members: Jason Lai, Altin Rexhepaj, Randy Taylor, Devin Waclawik

Functions:
  getRandom()    - generates an random key/element from an object/array
  generatePassword() - generates a random password based on the password scheme
  buildWord() - builds a "phonetic" word based on the password scheme

*******************************************************************************/
// Password scheme logic script for phonetic.pw password testing framework

// Lookup table which contains all possible combinations of phonetic words
// For each key in the object, the associated array is a list of letters which
// Can come after the key such that it makes a phonetic sound
var table = {}
table.a = ['b','d','f','g','h','i','j','k','l','m','n','p','r','s','t','v','w','y','z'];
table.b = ['a','e','i','o','r','u'];
table.c = ['a','e','h','i','l','o','r','u'];
table.d = ['a','e','i','o','r','u'];
table.e = ['b','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','y','z'];
table.f = ['a','e','i','l','o','r','u'];
table.g = ['a','e','i','k','l','o','r','u'];
table.h = ['a','e','i','o','u'];
table.i = ['b','d','f','g','j','k','l','m','n','p','r','s','t','v'];
table.j = ['a','e','i','o','u'];
table.k = ['a','e','i','l','o','r','s','u'];
table.l = ['a','e','i','o','u'];
table.m = ['a','e','i','o','r','u'];
table.n = ['a','e','i','o','r','u'];
table.o = ['b','d','f','g','j','k','l','m','n','p','r','s','t','v','w','z'];
table.p = ['a','e','h','i','l','o','r','u'];
table.r = ['a','e','i','o','u'];
table.s = ['a','e','h','i','k','l','n','o','p','r','t','u','w'];
table.t = ['a','e','h','i','k','l','o','r','s','u'];
table.u = ['b','d','f','g','h','j','k','l','m','n','p','r','s','t','v','z'];
table.v = ['a','e','i','o','u'];
table.w = ['a','e','i','o','u'];
table.y = ['a','i','o'];
table.z = ['a','e','i','o','u'];

/*
name: getRandom
input: object/array
output: object/array
purpose: Generates a cryptographically random key/element from an object or array
*/
function getRandom(obj) {
  const buffer = new Uint32Array(1);
  // Use crypto pseudo-random number generator
  window.crypto.getRandomValues(buffer);
  var number = buffer[0] / (0xffffffff + 1);
  var numKeys = Object.keys(obj).length;
  if (Array.isArray(obj)) {
    return obj[Object.keys(obj)[Math.floor(number * numKeys)]];
  } else {
    return Object.keys(obj)[Math.floor(number * numKeys)];
  }
}

/*
name: generatePassword
input: length (integer)
output: word (string)
purpose: Generates a phonetic password of desired length
*/
function generatePassword (length) {
  var tmp = buildWord(getRandom(table), 1, length);
  tmp += Math.floor(Math.random() * (6 - 1) + 1);
  tmp += Math.floor(Math.random() * (6 - 1) + 1);
  return tmp;
}

/*
name: buildWord
input: word, current length, final length (word, currLen, finalLen)
output: word (string)
purpose: Helper function of generatePassword(): tail-recursive algorithm which
builds the phonetic passwords
*/
function buildWord (word, currLen, finalLen) {
  if (currLen == finalLen) return word; // Return once we reach the right length
  else{
    letter = getRandom(table[word.slice(-1)]);
    while (letter === word.slice(-1)) // No repetition of letters
    letter = getRandom(table[word.slice(-1)]);
    // Recusively build the rest of the word using the previous letter
    return buildWord (word += letter, currLen += 1, finalLen);
  }
}
