(function (_, undefined){

  /*
   * Class: Vector
   */

  _.Vector = function(x, y) {
    this.x = x;
    this.y = y;
  };

  _.Vector.prototype.clone = function() {
    return new _.Vector(this.x, this.y);
  };

  _.Vector.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  };

  _.Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  };

  _.Vector.prototype.sub = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  };

  _.Vector.prototype.mul = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  };

  _.Vector.prototype.div = function(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  };

  _.Vector.prototype.rot = function(angle, point) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var dx = (point === undefined) ? 0 : point.x;
    var dy = (point === undefined) ? 0 : point.y;
    var x = this.x;
    this.x = dx + ((x - dx) * cos - (this.y - dy) * sin);
    this.y = dy + ((x - dx) * sin + (this.y - dy) * cos);
    return this;
  };

  _.Vector.prototype.mag = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  };

  _.Vector.prototype.mag2 = function() {
    return (this.x * this.x) + (this.y * this.y);
  };

  _.Vector.prototype.dot = function(vector) {
    return (this.x * vector.x) + (this.y * vector.y);
  };

  _.Vector.prototype.cross = function(vector) {
    return (this.x * vector.y) - (this.y * vector.x);
  };

}(window.CUBE = window.CUBE || {}));
