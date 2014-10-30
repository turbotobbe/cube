var CUBE = require('../../target/cube-0.1.0.js');
module.exports = {
  magnitude: function(test) {
    var b = CUBE.body(3,4,10,10);
    test.equal(b.center.magnitude, 5, 'b.magnitude = 5');
    test.done();
  },

  move: function(test) {
    var b1 = CUBE.body(1,2,4,4);
    var v1 = CUBE.vector(1,2,6,6);
    b1.center.add(v1);
    test.equal(b1.center.x, 2, 'b1.x = 2');
    test.equal(b1.center.y, 4, 'b1.y = 4');
    test.done();
  },

  morph: function(test) {
    var b = CUBE.body(100,200,10,10);
    test.equal(b.box.north, 195, 'b.box.north = 195');
    test.equal(b.box.south, 205, 'b.box.south = 205');
    test.equal(b.box.west, 95, 'b.box.west = 95');
    test.equal(b.box.east, 105, 'b.box.east = 105');
    b.width *= 2;
    b.height *= 2;
    test.equal(b.box.north, 190, 'b.box.north = 190');
    test.equal(b.box.south, 210, 'b.box.south = 210');
    test.equal(b.box.west, 90, 'b.box.west = 90');
    test.equal(b.box.east, 110, 'b.box.east = 110');
    test.done();
  }


}