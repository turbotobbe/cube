/**
 * The Bounds class
 *
 * @class Bounds
 */
(function (_, undefined) {

  _.bounds = function (x, y, width, height) {
    return new _.Bounds(x, y, width, height);
  };

  _.Bounds = function (x, y, width, height) {
    this._vector = _.vector(x, y);
    this._width = width;
    this._height = height;
  };

  _.Bounds.prototype = {

    set x(value) {
      if (this._vector._x !== value) {
        this._vector._x = value;
        this._west = undefined;
        this._east = undefined;
      }
    },

    set y(value) {
      if (this._vector._y !== value) {
        this._vector._y = value;
        this._north = undefined;
        this._south = undefined;
      }
    },

    set width(value) {
      if (this._width !== value) {
        this._width = value;
        this._west = undefined;
        this._east = undefined;
      }
    },

    set height(value) {
      if (this._height !== value) {
        this._height = value;
        this._north = undefined;
        this._south = undefined;
      }
    },

    set north(value) {
      if (this._north !== value) {
        this._north = value;
        this._vector._y = undefined;
        this._height = undefined;
      }
    },

    set south(value) {
      if (this._south !== value) {
        this._south = value;
        this._vector._y = undefined;
        this._height = undefined;
      }
    },

    set west(value) {
      if (this._west !== value) {
        this._west = value;
        this._vector._x = undefined;
        this._width = undefined;
      }
    },

    set east(value) {
      if (this._east !== value) {
        this._east = value;
        this._vector._x = undefined;
        this._width = undefined;
      }
    },

    get x() {
      if (this._vector._x === undefined) {
        this._vector._x = this.west + (this.width / 2);
      }
      return this._vector._x;
    },

    get y() {
      if (this._vector._y === undefined) {
        this._vector._y = this.north + (this.height / 2);
      }
      return this._vector._y;
    },

    get width() {
      if (this._width === undefined) {
        this._width = this.east - this.west;
      }
      return this._width;
    },

    get height() {
      if (this._height === undefined) {
        this._height = this.south - this.north;
      }
      return this._height;
    },

    get north() {
      if (this._north === undefined) {
        this._north = this._vector._y - (this.height / 2);
      }
      return this._north;
    },

    get south() {
      if (this._south === undefined) {
        this._south = this._vector._y + (this.height / 2);
      }
      return this._south;
    },

    get west() {
      if (this._west === undefined) {
        this._west = this._vector._x - (this.width / 2);
      }
      return this._west;
    },

    get east() {
      if (this._east === undefined) {
        this._east = this._vector._x + (this.width / 2);
      }
      return this._east;
    },

    clone: function () {
      var bounds = new _.Bounds();
      bounds._vector = this._vector.clone();
      bounds._height = this._height;
      bounds._width = this._width;
      bounds._north = this._north;
      bounds._south = this._south;
      bounds._west = this._west;
      bounds._east = this._east;
      return bounds;
    },

    get normal() {
      return this._vector.normal();
    },
    set normal(value) {
      this._vector.normal = value;
    },

    get magnitude() {
      return this._vector.magnitude();
    },
    set magnitude(value) {
      this._vector.magnitude = value;
    },
    negate: function (clone) {
      if (!clone) {
        this._north = undefined;
        this._south = undefined;
        this._west = undefined;
        this._east = undefined;
      }
      return this._vector.negate(clone);
    },

    add: function (vector, clone) {
      if (!clone) {
        this._north = undefined;
        this._south = undefined;
        this._west = undefined;
        this._east = undefined;
      }
      return this._vector.add(vector, clone);
    },

    subtract: function (vector, clone) {
      if (!clone) {
        this._north = undefined;
        this._south = undefined;
        this._west = undefined;
        this._east = undefined;
      }
      return this._vector.subtract(vector, clone);
    },

    multiply: function (scalar, clone) {
      if (!clone) {
        this._north = undefined;
        this._south = undefined;
        this._west = undefined;
        this._east = undefined;
      }
      return this._vector.multiply(scalar, clone);
    },

    divide: function (scalar, clone) {
      if (!clone) {
        this._north = undefined;
        this._south = undefined;
        this._west = undefined;
        this._east = undefined;
      }
      return this._vector.divide(scalar, clone);
    },

    dot: function (vector) {
      return this._vector.dot(vector);
    },

    cross: function (vector) {
      return this._vector.cross(clone);
    },

    covers: function (bounds) {
      if (this.north > bounds.north) {
        return false;
      } else if (this.south < bounds.south) {
        return false;
      } else if (this.west > bounds.west) {
        return false;
      } else if (this.east < bounds.east) {
        return false;
      }
      return true;
    },

    intersect: function (bounds) {
      if (this.north > bounds.south) {
        return false;
      } else if (this.south < bounds.north) {
        return false;
      } else if (this.west > bounds.east) {
        return false;
      } else if (this.east < bounds.west) {
        return false;
      }
      return true;
    }

  };

}(CUBE));
