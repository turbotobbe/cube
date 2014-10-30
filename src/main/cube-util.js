/**
 * Some handy methods
 *
 * @class Util
 */

(function (_, undefined) {

  /**
   * Generates a random number between min and max.
   *
   * @method rand
   * @param min {number} Min value
   * @param max {number} Max value
   * @returns {number} The random number
   */
  _.rand = function (min, max) {
    return min + (Math.random() * (max - min));
  };

  _.superGet = function(propName) {
    var desc = Object.getOwnPropertyDescriptor(arguments.callee()._super.prototype, propName);
    return desc.get.call(this);
  };

  _.superSet = function(propName) {
    var desc = Object.getOwnPropertyDescriptor(arguments.callee()._super.prototype, propName);
    return desc.set.call(this);
  };

  _.superCall = function(propName) {
    var desc = Object.getOwnPropertyDescriptor(arguments.callee()._super.prototype, propName);
    console.log(arguments);
//    return desc.value.call(arguments.callee(), arguments.slice(1));
    return 'yalla';
  };

  _.observe = function(subject, fn) {
    console.log(['observe', subject, fn]);
    /*
    subject._observers = subject._observers || [];
    subject._observers.push({
      me: arguments.callee(),
      fn: fn
    });
    */
  };

  _.notify = function(subject, name) {
    if (subject._observers) {
      for (var i=0; i<subject._observers.length; i++) {
        var observer = subject._observers[i];
        observer.fn.call(observer.me, name);
      }
    }
  };
}(CUBE));
