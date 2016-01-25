"use strict";

var utils = require("../utils");
    // _ = require("underscore");

/**
 * @doc module
 * @name FancyString
 * @description
 *  Mess with paragraphs. (Depends on jQuery).
 */
var FancyString = function (string) {
  // constructor
  var self = this;
  self.string = string;
  self.active = false;
};

FancyString.prototype.scrambleAndUnscramble = function ($target, t, d) {

  // Do stuff;
  var self = this,
      offset = 8,
      rotatedString = utils.stringRotator(self.string, -offset),
      stringArr = rotatedString.split(''),
      stringProgression = [],
      timeout = t || 20,
      delay = d || 0,
      cachedString = self.string;

  self.string = rotatedString;
  $target.html(rotatedString);

  setTimeout(function () {
    self.transformToNewString($target, cachedString, t);
  }, delay);

  // (function rotateLetter (k, i) {
  //   var v = stringArr[k];
  //
  //   if (v !== " ") {
  //     stringArr[k] = utils.letterRotator(v, 1);
  //     $target.html(stringArr.join(""));
  //     i += 1;
  //   } else {
  //     i += offset;
  //   }
  //
  //   setTimeout(function () {
  //     if (i < (offset + k)) {
  //       rotateLetter(k, i);
  //     } else if (k < stringArr.length - 1) {
  //       k += 1;
  //       i = 0;
  //       rotateLetter(k, i);
  //     }
  //   }, timeout);
  //
  // })(0, 0);

};

FancyString.prototype.transformToNewString = function ($target, dest, t) {

  dest = (typeof dest === "number")? dest + "" : dest;

  var self = this,
      timeout = t || 20,
      originArr = self.string.split(""),
      destArr = dest.split(""),
      stringDifference = utils.stringDifferenceArray(originArr, destArr),
      uppercaseArr = utils.uppercaseArr(destArr),
      longestArr = (destArr.length > originArr.length) ? destArr : originArr,
      d = $.Deferred(function () {
        // console.log("what do I do here?");
      });

  // Set active to true to prevent anything acting on the string.
  self.active = true;

  (function rotateLetter (k, i) {
    var v = originArr[k],
        offset = (stringDifference[k] < 0) ? stringDifference[k] * -1 : stringDifference[k];

    // Account for spaces in origin and destination being longer.
    if (v === " ") {
      v = "a";
      i += 1;
    } else if (typeof v === "undefined") {
      v = "a";
    }

    // Account for spaces in destination and origin being longer.
    if (offset === " ") {
      originArr[k] = " ";
      offset = 0;
    } else if (typeof destArr[k] === "undefined") {
      originArr[k] = "";
    } else {
      // account for the letter being the same or a space
      if (stringDifference[k] !== 0) {
        originArr[k] = (stringDifference[k] < 0) ? utils.letterRotator(v, 1) : utils.letterRotator(v, -1);
      } else {
        originArr[k] = v;
      }
    }

    if (uppercaseArr[k]) {
      originArr[k] = originArr[k].toUpperCase();
    } else {
      originArr[k] = originArr[k].toLowerCase();
    }

    $target.html(originArr.join(""));
    i += 1;

    setTimeout(function () {
      if (i < offset) {
        rotateLetter(k, i);
      } else if (k < longestArr.length - 1) {
        k += 1;
        i = 0;
        rotateLetter(k, i);
      } else {
        // Turn off active, set string to destination string, and resolve.
        var previousString = self.string;
        self.active = false;
        self.string = dest;
        d.resolve(previousString);
      }
    }, timeout);

  })(0, 0);

  return d;


};

//Exports the page module for app.js to use
module.exports = FancyString;
