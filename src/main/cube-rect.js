(function (_, undefined) {

  _.rect = function (x, y, width, height, velocity, density) {
    return new _.Rect(x, y, width, height, velocity, density);
  };

  _.Rect = function(x, y, width, height, velocity, density) {
    _.Body.call(this, x, y, width, height, velocity, density);
  };

  _.extend(_.Rect, _.Body, {
    set width(value) {
      this.__super.width = value;
      this._area = undefined;
      this._mass = undefined;
    },
    set height(value) {
      this.__super.height = value;
      this._area = undefined;
      this._mass = undefined;
    },
    set north(value) {
      this.__super.north = value;
      this._area = undefined;
      this._mass = undefined;
    },
    set south(value) {
      this.__super.south = value;
      this._area = undefined;
      this._mass = undefined;
    },
    set west(value) {
      this.__super.west = value;
      this._area = undefined;
      this._mass = undefined;
    },
    set east(value) {
      this.__super.east = value;
      this._area = undefined;
      this._mass = undefined;
    }
  });

  _.Rect.prototype.clone = function() {
    var obj = _.Body.clone.call(this);
    obj._area = this._area;
    obj._mass = this._mass;
    return obj;
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
