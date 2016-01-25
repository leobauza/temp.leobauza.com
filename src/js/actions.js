"use strict";

var Actions = function () {},
    fsTransformQueue = {};

Actions.prototype.fsTransformEnter = function (e) {

  var a = e.data,
      self = a.self;

  if (a.instance.active) {
    if (typeof fsTransformQueue[a.key] === "undefined" || fsTransformQueue[a.key] === false ) {
      fsTransformQueue[a.key] = e;
    } else {
      fsTransformQueue[a.key] = false;
    }
    return;
  } else {
    fsTransformQueue[a.key] = false;
  }

  a.instance.transformToNewString(a.selector, a.endpoint, a.duration)
  .then(function () {
    if (typeof fsTransformQueue[a.key] === "object") {
      self.fsTransformLeave(fsTransformQueue[a.key]);
    }
  });
};

Actions.prototype.fsTransformLeave = function (e) {

  var a = e.data,
      self = a.self;

  if (a.instance.active) {
    if (typeof fsTransformQueue[a.key] === "undefined" || fsTransformQueue[a.key] === false ) {
      fsTransformQueue[a.key] = e;
    } else {
      fsTransformQueue[a.key] = false;
    }
    return;
  } else {
    fsTransformQueue[a.key] = false;
  }

  a.instance.transformToNewString(a.selector, a.endpoint, a.duration).then(function () {
    if (typeof fsTransformQueue[a.key] === "object") {
      self.fsTransformEnter(fsTransformQueue[a.key]);
    }
  });

};

module.exports = new Actions();
