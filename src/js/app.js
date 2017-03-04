"use strict";

var Fs = require('./modules/fancyStrings');
var actions = require("./actions");

/**
 * DOM Manipulations
 */
(function ($el) {

  if (!$el.length) { return; }

  var data = $el.data(),
      duration = data.duration,
      fs = new Fs($el.text()),
      active = false;

  (function interval (dest) {
    active = !active;
    setTimeout(function () {

      if (active) {
        $el.addClass("-active");
      } else {
        $el.removeClass("-active");
      }

      fs.transformToNewString($el, dest, duration).then(function (previousString) {
          interval(previousString);
      });
    }, data.interval);

  })(data.dest);


})($("#brand"));


$('[data-fs]').each(function (k, v) {
  var $v = $(v),
      $data = $v.data(),
      fs = $data.fs,
      t = $data.t || 20,
      instance = new Fs(fs);

  instance.scrambleAndUnscramble($v, t, k * 50);

});

$('[data-fsTransform]').each(function (k, v) {

  var $v = $(v),
      $data = $v.data(),
      origin = $v.text(),
      instance = new Fs(origin);

  $v
  .on("mouseenter", {
    selector: $v,
    endpoint: $data.fstransform,
    instance: instance,
    key: k,
    duration: $data.duration,
    self: actions
  }, actions.fsTransformEnter)
  .on("mouseleave", {
    selector: $v,
    endpoint: origin,
    instance: instance,
    key: k,
    duration: $data.duration,
    self: actions
  }, actions.fsTransformLeave);

});
