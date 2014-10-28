/**
 * The Body class
 *
 * @class Body
 */
(function (_, undefined) {

  _.body = function (x, y, width, height, velocity, dencity) {
    return new _.Body(x, y, width, height, velocity, dencity);
  };

  _.Body = function (x, y, width, height, velocity, density) {
    this._vector = _.vector(x, y);
    this._width = width;
    this._height = height;
    this.velocity = velocity || _.vector(0,0);
    this.density = density || 1;
  };

  _.Body.prototype = {

    get x() {
      if (this._vector.x === undefined) {
        this._vector.x = this.west + (this.width / 2);
      }
      return this._vector.x;
    },
    set x(value) {
      if (this._vector.x !== value) {
        this._vector.x = value;
        this._west = undefined;
        this._east = undefined;
      }
    },

    get y() {
      if (this._vector.y === undefined) {
        this._vector.y = this.north + (this.height / 2);
      }
      return this._vector._y;
    },
    set y(value) {
      if (this._vector.y !== value) {
        this._vector.y = value;
        this._north = undefined;
        this._south = undefined;
      }
    },

    get width() {
      if (this._width === undefined) {
        this._width = this.east - this.west;
      }
      return this._width;
    },
    set width(value) {
      if (this._width !== value) {
        this._width = value;
        this._west = undefined;
        this._east = undefined;
      }
    },

    get height() {
      if (this._height === undefined) {
        this._height = this.south - this.north;
      }
      return this._height;
    },
    set height(value) {
      if (this._height !== value) {
        this._height = value;
        this._north = undefined;
        this._south = undefined;
      }
    },

    get north() {
      if (this._north === undefined) {
        this._north = this._vector.y - (this.height / 2);
      }
      return this._north;
    },

    set north(value) {
      if (this._north !== value) {
        this._north = value;
        this._vector.y = undefined;
        this._height = undefined;
      }
    },

    get south() {
      if (this._south === undefined) {
        this._south = this._vector.y + (this.height / 2);
      }
      return this._south;
    },

    set south(value) {
      if (this._south !== value) {
        this._south = value;
        this._vector.y = undefined;
        this._height = undefined;
      }
    },

    get west() {
      if (this._west === undefined) {
        this._west = this._vector.x - (this.width / 2);
      }
      return this._west;
    },

    set west(value) {
      if (this._west !== value) {
        this._west = value;
        this._vector.x = undefined;
        this._width = undefined;
      }
    },

    get east() {
      if (this._east === undefined) {
        this._east = this._vector.x + (this.width / 2);
      }
      return this._east;
    },

    set east(value) {
      if (this._east !== value) {
        this._east = value;
        this._vector.x = undefined;
        this._width = undefined;
      }
    }
  };

  _.Body.prototype.clone = function () {
    var body = _.body();
    body._vector = this._vector.clone();
    body._height = this._height;
    body._width = this._width;
    body._north = this._north;
    body._south = this._south;
    body._west = this._west;
    body._east = this._east;
    return body;
  };

  _.Body.prototype.negate = function (clone) {
    if (!clone) {
      this._north = undefined;
      this._south = undefined;
      this._west = undefined;
      this._east = undefined;
    }
    return this._vector.negate(clone);
  };

  _.Body.prototype.add = function (vector, clone) {
    if (!clone) {
      this._north = undefined;
      this._south = undefined;
      this._west = undefined;
      this._east = undefined;
    }
    return this._vector.add(vector, clone);
  };

  _.Body.prototype.subtract = function (vector, clone) {
    if (!clone) {
      this._north = undefined;
      this._south = undefined;
      this._west = undefined;
      this._east = undefined;
    }
    return this._vector.subtract(vector, clone);
  };

  _.Body.prototype.scale = function (factor, clone) {
    if (!clone) {
      this._north = undefined;
      this._south = undefined;
      this._west = undefined;
      this._east = undefined;
    }
    return this._vector.scale(factor, clone);
  };

  _.Body.prototype.multiply = function (factor, clone) {
    if (!clone) {
      this._north = undefined;
      this._south = undefined;
      this._west = undefined;
      this._east = undefined;
    }
    return this._vector.multiply(factor, clone);
  };

  _.Body.prototype.divide = function (factor, clone) {
    if (!clone) {
      this._north = undefined;
      this._south = undefined;
      this._west = undefined;
      this._east = undefined;
    }
    return this._vector.divide(factor, clone);
  };

  _.Body.prototype.magnitude = function () {
    return this._vector.magnitude();
  };

  _.Body.prototype.normal = function (vector) {
    return this._vector.normal();
  };

  _.Body.prototype.dot = function (vector) {
    return this._vector.dot(vector);
  };

  _.Body.prototype.cross = function (vector) {
    return this._vector.cross(vector);
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
