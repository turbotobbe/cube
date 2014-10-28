/**
 * Licenced to me :)
 */

var CUBE = {};

CUBE.extend = function(source, override) {
  var proto = Object.create(source);
  var _super = {};
  var props = Object.getOwnPropertyNames(override);
  for (var i=0; i<props.length; i++){
    var name = props[i];
    // get source desc if any and store in _super
    var sourceDesc = Object.getOwnPropertyDescriptor(source, name);
    if (sourceDesc !== undefined) {
      Object.defineProperty(_super, name, sourceDesc);
    }
    // get override desc
    var overrideDesc = Object.getOwnPropertyDescriptor(override, name);
    if (sourceDesc) {
      if (overrideDesc.set === undefined) {
        overrideDesc.set = sourceDesc.set;
      }
      if (overrideDesc.get === undefined) {
        overrideDesc.get = sourceDesc.get;
      }
    }
    Object.defineProperty(proto, name, overrideDesc);
    Object.defineProperty(proto, '_super', {
      get: function() {
        return _super;
      }
    });
  }
  return proto;
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
