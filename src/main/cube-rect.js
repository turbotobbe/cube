(function (_, undefined) {

  _.rect = function (x, y, width, height, velocity, density) {
    return new _.Rect(x, y, width, height, velocity, density);
  };

  _.Rect = function(x, y, width, height, velocity, density) {
    _.Body.call(this, x, y, width, height, velocity, density);
  };

  _.Rect.prototype = _.extend(_.Body.prototype, {
    set width(value) {
      this._super.width = value;
      this._area = undefined;
      this._mass = undefined;
    }
  });

  _.Rect.prototype.clone = function() {
    var obj = _.Body.clone.call(this);
    obj._area = this._area;
    obj._mass = this._mass;
  };

  _.Rect.prototype.area = function() {
    if (this._area === undefined) {
      this._area = this.width * this.height;
    }
    return this._area;
  };

  _.Rect.prototype.mass = function() {
    if (this._mass === undefined) {
      // this is mass for a cube.
      // introduce volume for correctness
      var volume = 1 * this.width * this.height;
      this._mass = this.density * volume;
    }
    return this._mass;
  };

}(CUBE));
