var CUBE = require('../../target/cube-0.1.0.js');
module.exports = {
    clone: function (test) {
        var v1 = CUBE.vector(1, 2);
        test.equal(v1.x, 1, 'v1.x = 1');
        test.equal(v1.y, 2, 'v1.y = 2');
        var v2 = v1.clone();
        v2.x = 3;
        test.equal(v1.x, 1, 'v1.x = 1');
        test.equal(v2.x, 3, 'v2.x = 3');
        test.done();
    },

    magnitude: function (test) {
        var v = CUBE.vector(3, 4);
        test.equal(v.magnitude, 5, 'v.magnitude = 5')
        test.done();
    },

    normal: function (test) {
        var v = CUBE.vector(3, 4);
        test.equal(v.normal.x, 0.6, 'v.normal.x = 0.6');
        test.equal(v.normal.y, 0.8, 'v.normal.y = 0.4');
        test.equal(v.normal.magnitude, 1, 'v.normal.magnitude = 1')
        test.done();
    },

    negate: function (test) {
        var v1 = CUBE.vector(1, 2);
        var v2 = v1.negate(true);
        test.equal(v1.x, 1, 'v1.x = 1');
        test.equal(v1.y, 2, 'v1.y = 2');
        test.equal(v2.x, -1, 'v1.x = -1');
        test.equal(v2.y, -2, 'v1.y = -2');
        v1.negate();
        test.equal(v1.x, -1, 'v1.x = -1');
        test.equal(v1.y, -2, 'v1.y = -2');
        test.done();
    },

    add: function (test) {
        var v1 = CUBE.vector(1, 2);
        var v2 = CUBE.vector(1, 2);
        v1.add(v2);
        test.equal(v1.x, 2, 'v1.x = 2');
        test.equal(v1.y, 4, 'v1.y = 4');
        test.done();
    },

    subtract: function (test) {
        var v1 = CUBE.vector(3, 6);
        var v2 = CUBE.vector(1, 2);
        v1.subtract(v2);
        test.equal(v1.x, 2, 'v1.x = 2');
        test.equal(v1.y, 4, 'v1.y = 4');
        test.done();
    },

    scale: function (test) {
        var v1 = CUBE.vector(4, 6);
        v1.scale(2);
        test.equal(v1.x, 8, 'v1.x = 8');
        test.equal(v1.y, 12, 'v1.y = 12');
        v1.scale(0.5);
        test.equal(v1.x, 4, 'v1.x = 4');
        test.equal(v1.y, 6, 'v1.y = 6');
        test.done();
    },

    multiply: function (test) {
        var v1 = CUBE.vector(4, 6);
        v1.multiply(2);
        test.equal(v1.x, 8, 'v1.x = 8');
        test.equal(v1.y, 12, 'v1.y = 12');
        test.done();
    },

    divide: function (test) {
        var v1 = CUBE.vector(4, 6);
        v1.divide(2);
        test.equal(v1.x, 2, 'v1.x = 2');
        test.equal(v1.y, 3, 'v1.y = 3');
        test.done();
    },

    dot: function (test) {
        var v1 = CUBE.vector(2, 3);
        var v2 = CUBE.vector(4, 6);
        test.equal(v1.dot(v2), 26, 'v1.dot(v2) = 26');
        test.done();
    },

    cross: function (test) {
        var v1 = CUBE.vector(2, 1);
        var v2 = CUBE.vector(3, 4);
        test.equal(v1.cross(v2), 5, 'v1.cross(v2) = 5');
        test.done();
    }
}