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

// Cryptographically secure random number generator
// Generates a random key from an object or array
function getRandom(obj) {
    const buffer = new Uint32Array(1);
    window.crypto.getRandomValues(buffer);
    var number = buffer[0] / (0xffffffff + 1);
    var numKeys = Object.keys(obj).length;
    if (Array.isArray(obj)) {
      return obj[Object.keys(obj)[Math.floor(number * numKeys)]];
    } else {
      return Object.keys(obj)[Math.floor(number * numKeys)];
    }
}
// Generate a phonetic password of length 'length'
function phonetize (length) {
  return buildWord(getRandom(table), 1, length)
}
// Optimized tail-recursive algorithm which builds the phonetic passwords
function buildWord (word, currLen, finalLen) {
  if (currLen == finalLen) return word;
    else
      letter = getRandom(table[word.slice(-1)]);
      while (letter === word.slice(-1))
        letter = getRandom(table[word.slice(-1)]);
      return buildWord (word += letter, currLen += 1, finalLen);
}