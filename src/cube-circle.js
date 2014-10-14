(function (_, undefined){

  /**
   * Class: Circle
   */
  _.Circle = function(center, radius, velocity) {
    this.center = center;
    this.radius = radius;
    this.velocity = velocity || new _.Vector(0,0);
  };

  _.Circle.prototype.box = function() {
    return {
      w: this.center.x - this.radius,
      n: this.center.y - this.radius,
      e: this.center.x + this.radius,
      s: this.center.y + this.radius
    };
  };

}(window.CUBE = window.CUBE || {}));
