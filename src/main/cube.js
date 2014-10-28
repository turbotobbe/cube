/**
 * Licenced to me :)
 */

var CUBE = {};

CUBE.extend = function (sub, base, override) {

  sub.prototype = Object.create(base.prototype);
  sub.constructor = sub;

  var baseProto = {};
  var props = Object.getOwnPropertyNames(base.prototype);
  for (var i = 0; i < props.length; i++) {
    var propName = props[i];
    var propDesc = Object.getOwnPropertyDescriptor(base.prototype, propName);
    if (propDesc.set !== undefined) {
      propDesc.set = function (value) {
        Object.getOwnPropertyDescriptor(base.prototype, propName).set.call(this.me, value);
      }
    }
    if (propDesc.get !== undefined) {
      propDesc.get = function () {
        return Object.getOwnPropertyDescriptor(base.prototype, propName).get.call(this.me);
      }
    }
    Object.defineProperty(baseProto, propName, propDesc);
  }

  Object.defineProperty(sub.prototype, '__super', {
    enumerable: true,
    get: function() {
      baseProto.me = this;
      return baseProto;
    }
  });

  if (override) {
    var props = Object.getOwnPropertyNames(override);
    for (var i = 0; i < props.length; i++) {
      var propName = props[i];
      var overridePropDesc = Object.getOwnPropertyDescriptor(override, propName);
      var sourcePropDesc = Object.getOwnPropertyDescriptor(base.prototype, propName);
      if (overridePropDesc.set === undefined && sourcePropDesc) {
        overridePropDesc.set = sourcePropDesc.set;
      }
      if (overridePropDesc.get === undefined && sourcePropDesc) {
        overridePropDesc.get = sourcePropDesc.get;
      }
      console.log([propName, overridePropDesc]);
      Object.defineProperty(sub.prototype, propName, overridePropDesc);
    }
  }

  return;
};

// CommonJS module
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = CUBE;
  }
  exports.CUBE = CUBE;
}

// AMD module
if (typeof define === 'function' && define.amd) {
  define('CUBE', [], function () {
    return CUBE;
  });
}

// browser
if (typeof window === 'object' && typeof window.document === 'object') {
  window.CUBE = CUBE;
}
