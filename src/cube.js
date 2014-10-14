/**
 * Licenced to me :)
 */

var CUBE = {};

// CommonJS module
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = CUBE;
    }
    exports.Matter = Matter;
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
