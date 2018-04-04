/*******************************************************************************
Course: COMP3008 (Winter 2018), Project 2
Project: Project 2 - Password Scheme
Name: Phonetic.pw
Group Members: Jason Lai, Altin Rexhepaj, Randy Taylor, Devin Waclawik

Functions:
  getRandom()    - generates an random key/element from an object/array
  generatePassword() - generates a random password based on the password scheme
  buildWord() - helper function for generatepassword(): builds a "phonetic word" based on the password scheme
  calcPasswordSpace() - calculates the possibility space for a "phonetic word" of 5 letters
  getArray() - helper function for calcPasswordSpace(): gets an array from table  based on its key

*******************************************************************************/
// Password scheme logic script for phonetic.pw password testing framework

// Lookup table which contains all possible combinations of phonetic words
// For each key in the object, the associated array is a list of letters which
// Can come after the key such that it makes a phonetic sound
var table = {}
table.a = ['b','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','y','z'];
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
table.p = ['a','e','i','l','o','r','u'];
table.r = ['a','e','i','o','u'];
table.s = ['a','e','h','i','k','l','n','o','p','r','t','u','w'];
table.t = ['a','e','h','i','l','o','r','u'];
table.u = ['b','d','f','g','j','k','l','m','n','p','r','s','t','v','z'];
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
  tmp += Math.floor(Math.random() * (10 - 0) + 0);
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

/*
name: calcPasswordSpace
input: none
output: phons.size (int)
purpose: calculates the number of total possible passwords for the password scheme
*/
function calcPasswordSpace(){
  var phons = new Set();
  var phon1 = '';
  var phon2 = '';
  var phon3 = '';
  var phon4 = '';
  var phon5 = '';
  var digit = 10;
  for (var i in table){
    var arr2 = getArray(i);
    phon1 = i;
    for (var j in arr2){
      var arr3 = getArray(arr2[j]);
      phon2 = phon1 + arr2[j];
      for (var k in arr3){
        var arr4 = getArray(arr3[k]);
        phon3 = phon2 + arr3[k];
        for (var l in arr4){
          var arr5 = getArray(arr4[l]);
          phon4 = phon3 + arr4[l];
          for (var m in arr5){
            phon5 = phon4 + arr5[m];
            phons.add(phon5);
          }
        }
      }
    }
  }
  return phons.size * digit;
}

/*
name: getArray
input: key
output: table[key] (array)
purpose: Helper function of calcPasswordSpace() to get the array with matching key from table dictionary
*/
function getArray(key){
  var k = '' + key;
  return table[k];
}
