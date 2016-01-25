"use strict";

var _ = require("underscore");

/**
 * Utility functions (shared code).
 */
var alphabet = "abcdefghijklmnopqrstuvwxyz.,0123456789@";

/**
 * Rotates a given letter by a given offset.
 * @param  (string) letter
 *   A single character.
 * @param  (integer) offset
 *   Offset by which to rotate the character.
 *
 * @return (string)
 *   A letter.
 */
function letterRotator (letter, offset) {

  var output,
      letterToLower = letter.toLowerCase(),
      alphabetArr = alphabet.split(""),
      letterIndex = alphabet.indexOf(letterToLower),
      offsetIndex = letterIndex - offset;

  if (offsetIndex < 0) {
    offsetIndex = alphabetArr.length + offsetIndex;
  }

  if (offsetIndex > (alphabetArr.length - 1)) {
    offsetIndex = offsetIndex - alphabetArr.length;
  }

  if (letter !== alphabetArr[letterIndex]) {
    output = alphabetArr[offsetIndex].toUpperCase();
  } else {
    output = alphabetArr[offsetIndex];
  }

  return output;

}

/**
 * Rotates each letter in a string by the given offset MINUS it's position.
 * @param  (string) string
 *   String to change.
 * @param  (integer) offset
 *   Base value by which to rotate each character.
 *
 * @return (string)
 *   Rotated string.
 */
function stringRotator (string, offset) {

  var stringArr = string.split("");
  _.each(stringArr, function (v, k) {
    if (v === " ") { return; }
    stringArr[k] = letterRotator(v, offset - k);
  });

  return stringArr.join("");

}

/**
 * Generates an array of the differences between 2 given arrays.
 * @param  (array) arr
 *   First array.
 * @param  (array) destArr
 *   Second array.
 *
 * @return (array)
 *   Differences map.
 */
function stringDifferenceArray (arr, destArr) {

  var output = [],
      alphabetArr = alphabet.split("");

  _.each(destArr, function (v, k) {
    var destIndex = alphabetArr.indexOf(v.toLowerCase()),
        originIndex = (arr[k]) ? alphabetArr.indexOf(arr[k].toLowerCase()) : 0, // i think its one and not zero...
        diff = (destIndex === -1) ? " " : destIndex - originIndex;

    if (originIndex === -1 && destIndex === 0) {
      diff = 0; // a's are special?
    }

    output.push(diff);

  });

  return output;

}

/**
 * Returns an array of bools (true if letter is uppercase, false if it is not).
 * @param  (array) arr
 *   Array to be evaluated.
 *
 * @return (array)
 *   Uppercase map.
 */
function uppercaseArr (arr) {

  var output = [];

  _.each(arr, function (v, k) {
    if (alphabet.indexOf(v) === -1 && v !== " ") {
      output.push(true);
    } else {
      output.push(false);
    }
  });

  return output;

}

module.exports = {
  letterRotator: letterRotator,
  stringRotator: stringRotator,
  stringDifferenceArray: stringDifferenceArray,
  uppercaseArr: uppercaseArr
};
