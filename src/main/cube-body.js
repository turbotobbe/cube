(function (_, undefined) {

  _.body = function (x, y, width, height, velocity, dencity) {
    return new _.Body(x, y, width, height, velocity, dencity);
  };

  _.Body = function (x, y, width, height, velocity, density) {
    _.Vector.call(this, x, y);
    this._width = width;
    this._height = height;
    this._north = x - (height/2);
    this._south = x + (height/2);
    this._west = y - (width/2);
    this._east = y + (width/2);
    this.velocity = velocity || _.vector(0, 0);
    this.density = density || 1;
  };

  _.extend(_.Body, _.Vector, {
    set x(value) {
      if (this.x !== value) {
        this.__super.x = value;
        this._west = value - (this.width/2);
        this._east = value + (this.width/2);
      }
    },

    set y(value) {
      if (this.y !== value) {
        this.__super.y = value;
        this._north = value - (this.height/2);
        this._south = value + (this.height/2);
      }
    },

    get width() {
      return this._width;
    },
    set width(value) {
      if (this._width !== value) {
        this._width = value;
        this._west = this.x - (value / 2);
        this._east = this.x + (value / 2);
      }
    },

    get height() {
      return this._height;
    },
    set height(value) {
      if (this._height !== value) {
        this._height = value;
        this._north = this.y - (value / 2);
        this._south = this.y + (value / 2);
      }
    },

    get north() {
      return this._north;
    },

    set north(value) {
      if (this._north !== value) {
        this._north = value;
        this._height = this.south - this.north;
        this.y = value - (this.height/2);
      }
    },

    get south() {
      return this._south;
    },

    set south(value) {
      if (this._south !== value) {
        this._south = value;
        this._height = this.south - this.north;
        this.y = value - (this.height/2);
      }
    },

    get west() {
      return this._west;
    },

    set west(value) {
      if (this._west !== value) {
        this._west = value;
        this._width = this.east - this.west;
        this.x = value - (this.width/2);
      }
    },

    get east() {
      return this._east;
    },

    set east(value) {
      if (this._east !== value) {
        this._east = value;
        this._width = this.east - this.west;
        this.x = value - (this.width/2);
      }
    },

    negate: function (clone) {
      var obj = undefined;
      if (clone) {
        obj = this.clone().negate();
      } else {
        this.superDo('negate');
        this._north = this.y - (this.height/2);
        this._south = this.y + (this.height/2);
        this._west = this.x - (this.width/2);
        this._east = this.x + (this.width/2);
        obj = this;
      }
      return obj;
    },

    add: function (vector, clone) {
      var obj = undefined;
      if (clone) {
        obj = this.clone().add(vector);
      } else {
        this.superDo('add', factor);
        this._north = this.y - (this.height/2);
        this._south = this.y + (this.height/2);
        this._west = this.x - (this.width/2);
        this._east = this.x + (this.width/2);
        obj = this;
      }
      return obj;
    },

    subtract: function (vector, clone) {
      var obj = undefined;
      if (clone) {
        obj = this.clone().subtract(vector);
      } else {
        this.superDo('subtract', factor);
        this._north = this.y - (this.height/2);
        this._south = this.y + (this.height/2);
        this._west = this.x - (this.width/2);
        this._east = this.x + (this.width/2);
        obj = this;
      }
      return obj;
    },

    scale: function (factor, clone) {
      var obj = undefined;
      if (clone) {
        obj = this.clone().scale(factor);
      } else {
        this.superDo('scale', factor);
        this._north = this.y - (this.height/2);
        this._south = this.y + (this.height/2);
        this._west = this.x - (this.width/2);
        this._east = this.x + (this.width/2);
        obj = this;
      }
      return obj;
    },

    multiply: function (factor, clone) {
      var obj = undefined;
      if (clone) {
        obj = this.clone().multiply(factor);
      } else {
        this.superDo('multiply', factor);
        this._north = this.y - (this.height/2);
        this._south = this.y + (this.height/2);
        this._west = this.x - (this.width/2);
        this._east = this.x + (this.width/2);
        obj = this;
      }
      return obj;
    },

    divide: function (factor, clone) {
      var obj = undefined;
      if (clone) {
        obj = this.clone().divide(factor);
      } else {
        this.superDo('divide', factor);
        this.__super.divide(factor);
        this._north = this.y - (this.height/2);
        this._south = this.y + (this.height/2);
        this._west = this.x - (this.width/2);
        this._east = this.x + (this.width/2);
        obj = this;
      }
      return obj;
    }

  });

  _.Body.prototype.clone = function () {
    return _.body(this.x, this.y, this.width, this.height, this.velocity.clone(), this.density);
  };

  /**
   * Check if this body covers another body
   * @method covers
   * @param {object} body
   * @returns true if this body covers body, false otherwise
   */
  _.Body.prototype.covers = function (body) {
    if (this.north > body.north) {
      return false;
    } else if (this.south < body.south) {
      return false;
    } else if (this.west > body.west) {
      return false;
    } else if (this.east < body.east) {
      return false;
    }
    return true;
  };

  _.Body.prototype.intersects = function (body) {
    if (this.north > body.south) {
      return false;
    } else if (this.south < body.north) {
      return false;
    } else if (this.west > body.east) {
      return false;
    } else if (this.east < body.west) {
      return false;
    }
    return true;
  };

}(CUBE));
