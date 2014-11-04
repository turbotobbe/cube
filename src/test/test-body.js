var CUBE = require('../../target/cube-0.1.0.js');

function assertBox(test, box, west, east, north, south) {
    var height = south - north;
    var width = east - west;
    test.equal(box.west, west, 'box.west = ' + west);
    test.equal(box.east, east, 'box.east = ' + east);
    test.equal(box.width, width, 'box.width = ' + width);
    test.equal(box.north, north, 'box.north = ' + north);
    test.equal(box.south, south, 'box.south = ' + south);
    test.equal(box.height, height, 'box.height = ' + height);
};

function assertVector(test, vector, x, y) {
    var magnitude = Math.sqrt((x * x) + (y * y));
    var normalX = x / magnitude;
    var normalY = y / magnitude;
    test.equal(vector.x, x, 'vector.x = ' + x);
    test.equal(vector.y, y, 'vector.y = ' + y);
    test.equal(vector.magnitude, magnitude, 'vector.magnitude = ' + magnitude);
    test.equal(vector.normal.x, normalX, 'vector.normal.x = ' + normalX);
    test.equal(vector.normal.y, normalY, 'vector.normal.y = ' + normalY);
};

module.exports = {};
/*
var x = {
    basic: function (test) {
        var b = CUBE.body(100, 200, 10, 20);
        assertBox(test, b.box, 95, 105, 190, 210);
        assertVector(test, b.center, 100, 200);
        test.done();
    },

    move: function (test) {
        var b = CUBE.body(100, 200, 10, 20);
        b.center.add(CUBE.vector(10, 20));
        assertBox(test, b.box, 105, 115, 210, 230);
        assertVector(test, b.center, 110, 220);
        test.done();
    },

    morph: function (test) {
        var b = CUBE.body(100, 200, 10, 10);
        test.equal(b.box.north, 195, 'b.box.north = 195');
        test.equal(b.box.south, 205, 'b.box.south = 205');
        test.equal(b.box.west, 95, 'b.box.west = 95');
        test.equal(b.box.east, 105, 'b.box.east = 105');
        b.box.width *= 2;
        b.box.height *= 2;
        test.equal(b.box.north, 190, 'b.box.north = 190');
        test.equal(b.box.south, 210, 'b.box.south = 210');
        test.equal(b.box.west, 90, 'b.box.west = 90');
        test.equal(b.box.east, 110, 'b.box.east = 110');
        test.done();
    }


}
    */