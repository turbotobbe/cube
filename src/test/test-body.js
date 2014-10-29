var CUBE = require('../../target/cube-0.1.0.js');
module.exports = {
  magnitude: function(test) {
    var b = CUBE.body(3,4,10,10);
    test.equal(b.magnitude, 5, 'b.magnitude = 5')
    test.done();
  },

  negate: function(test) {
    var b1 = CUBE.body(1,2,10,10);
    var b2 = b1.negate(true);
    test.equal(b1.x, 1, 'b1.x = 1');
    test.equal(b1.y, 2, 'b1.y = 2');
    test.equal(b2.x, -1, 'b1.x = -1');
    test.equal(b2.y, -2, 'b1.y = -2');
    b1.negate();
    test.equal(b1.x, -1, 'b1.x = -1');
    test.equal(b1.y, -2, 'b1.y = -2');
    test.done();
  },

}