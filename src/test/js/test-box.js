var CUBE = require('../../../target/main/js/cube-0.1.0.js');

function assertProp(test, obj, ref) {
    for (var key in ref) {
        test.equal(obj[key], ref[key], 'obj.' + key + ' = ' + ref[key]);
    }
};

function assertCovers(test, obj1, obj2, success) {
    var b1 = CUBE.box(obj1.x, obj1.y, obj1.width, obj1.height)
    var b2 = CUBE.box(obj2.x, obj2.y, obj2.width, obj2.height)
    test.equal(b1.covers(b2), success, JSON.stringify(obj1) + ' covers ' + JSON.stringify(obj2));
};

function assertIntersects(test, obj1, obj2, success) {
    var b1 = CUBE.box(obj1.x, obj1.y, obj1.width, obj1.height)
    var b2 = CUBE.box(obj2.x, obj2.y, obj2.width, obj2.height)
    test.equal(b1.intersects(b2), success, JSON.stringify(obj1) + ' intersects ' + JSON.stringify(obj2));
};

module.exports = {
    basic: function (test) {
        var b = CUBE.box(0, 0, 10, 10);
        assertProp(test, b, {x: 0, y: 0, width: 10, height: 10, west: 0, east: 10, north: 0, south: 10});
        test.done();
    },

    move: function (test) {
        var b = CUBE.box(0, 0, 10, 10);
        b.x = 1;
        assertProp(test, b, {x: 1, y: 0, width: 10, height: 10, west: 1, east: 11, north: 0, south: 10});
        b.y = 1;
        assertProp(test, b, {x: 1, y: 1, width: 10, height: 10, west: 1, east: 11, north: 1, south: 11});
        test.done();
    },

    size: function (test) {
        var b = CUBE.box(0, 0, 10, 10);
        b.width = 20;
        assertProp(test, b, {x: 0, y: 0, width: 20, height: 10, west: 0, east: 20, north: 0, south: 10});
        b.height = 20;
        assertProp(test, b, {x: 0, y: 0, width: 20, height: 20, west: 0, east: 20, north: 0, south: 20});
        test.done();
    },

    coversTrue: function (test) {

        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 0, width: 10, height: 10}, true);

        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 0, width: 10, height: 9}, true);
        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 1, width: 10, height: 9}, true);
        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 1, width: 10, height: 8}, true);

        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 0, width: 9, height: 10}, true);
        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 1, y: 0, width: 9, height: 10}, true);
        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 1, y: 0, width: 8, height: 10}, true);

        test.done();
    },

    coversFalse: function (test) {

        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: -1, y: -1, width: 12, height: 12}, false);

        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: -1, y: 1, width: 8, height: 8}, false);
        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 1, y: 1, width: 10, height: 8}, false);
        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: -1, y: 1, width: 12, height: 8}, false);

        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 1, y: -1, width: 8, height: 8}, false);
        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 1, y: 1, width: 8, height: 10}, false);
        assertCovers(test, {x: 0, y: 0, width: 10, height: 10}, {x: 1, y: -1, width: 8, height: 12}, false);

        test.done();
    },

    intersectsTrue: function (test) {

        assertIntersects(test, {x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 0, width: 10, height: 10}, true);

        assertIntersects(test, {x: 0, y: 0, width: 10, height: 10}, {x: -1, y: 0, width: 10, height: 10}, true);
        assertIntersects(test, {x: 0, y: 0, width: 10, height: 10}, {x: 1, y: 0, width: 10, height: 10}, true);
        assertIntersects(test, {x: 0, y: 0, width: 10, height: 10}, {x: -1, y: 0, width: 12, height: 10}, true);

        test.done();
    }
}