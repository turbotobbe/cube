/**
 * Licenced to me :)
 */

var CUBE = {};

CUBE.extend = function (sub, base, override) {

  console.log(['extend', sub, base]);
  sub.prototype = Object.create(base.prototype);
  sub.constructor = sub;
/*
  var baseProto = {};
  var props = Object.getOwnPropertyNames(base.prototype);
  for (var i = 0; i < props.length; i++) {
    var propName = props[i];
    var propDesc = Object.getOwnPropertyDescriptor(base.prototype, propName);
    console.log(['propDesc', propDesc]);
    if (propDesc.set !== undefined) {
      propDesc.set = function (value) {
        console.log(['set', propName, value]);
        Object.getOwnPropertyDescriptor(base.prototype, propName).set.call(this.me, value);
      }
    }
    if (propDesc.get !== undefined) {
      propDesc.get = function () {
        console.log(['get', propName]);
        return Object.getOwnPropertyDescriptor(base.prototype, propName).get.call(this.me);
      }
    }
    if (propDesc.value !== undefined) {
      var value = propDesc.value;
      propDesc.value = function() {
        return value.call(this.me);
      }
    }
    Object.defineProperty(baseProto, propName, propDesc);
  }
  */
/*
  Object.defineProperty(sub.prototype, '__super', {
    enumerable: true,
    get: function() {
      baseProto.me = this;
      return baseProto;
    }
  });
*/
  if (override) {
    var props = Object.getOwnPropertyNames(override);
    for (var i = 0; i < props.length; i++) {
      var propName = props[i];
      var overridePropDesc = Object.getOwnPropertyDescriptor(override, propName);
      var sourcePropDesc = Object.getOwnPropertyDescriptor(base.prototype, propName);
      if (overridePropDesc.set === undefined && sourcePropDesc && sourcePropDesc.set) {
        overridePropDesc.set = sourcePropDesc.set;
      }
      if (overridePropDesc.get === undefined && sourcePropDesc && sourcePropDesc.get) {
        overridePropDesc.get = sourcePropDesc.get;
      }
      console.log([propName, overridePropDesc]);
      Object.defineProperty(sub.prototype, propName, overridePropDesc);
    }
  }

  sub.prototype.superDo = function(propName) {
    var desc = Object.getOwnPropertyDescriptor(base.prototype, propName);
    console.log(['do', arguments, desc]);
    if (desc.value) {
      return desc.value;
    } else if (arguments.length > 1) {
      return desc.call(this, arguments.slice(1));
    } else {
      return desc.call(this);
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
