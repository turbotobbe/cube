/**
 * @class Vector
 */
(function (_, undefined) {

  _.vector = function (x, y) {
    return new _.Vector(x, y);
  };

  /**
   * @class Vector
   * @constructor
   * @param x {number} x coordinate.
   * @param y {number} y coordinate.
   */
  _.Vector = function (x, y) {
    this._x = x;
    this._y = y;
  };

  _.Vector.prototype = {
    /**
     * The x coordinate
     * @property x
     * @type {number}
     */
    get x () {
      return this._x;
    },
    set x (value) {
      if (this._x !== value) {
        this._x = value;
        this._magnitude = undefined;
        this._normal = undefined;
      }
    },

    /**
     * The y coordinate
     * @property y
     * @type {number}
     */
    get y() {
      return this._y;
    },
    set y(value) {
      if (this._y !== value) {
        this._y = value;
        this._magnitude = undefined;
        this._normal = undefined;
      }
    }

  };

  /**
   * Clone the vector
   * @method clone
   * @returns {object} A cloned vector
   */
  _.Vector.prototype.clone = function () {
    var obj = _.vector();
    obj._x = this._x;
    obj._y = this._y;
    obj._magnitude = this._magnitude;
    obj._normal = this._normal;
    return obj;
  };

  /**
   * Negate the Vector.
   *
   * @method negate Negate this Vector
   * @param [clone=false] {boolean} Clone a new vector
   * @returns {object} This or a cloned vector.
   */
  _.Vector.prototype.negate = function (clone) {
    var obj = clone ? this.clone() : this;
    obj.x = -obj.x;
    obj.y = -obj.y;
    return obj;
  };

  _.Vector.prototype.add = function (vector, clone) {
    var obj = clone ? this.clone() : this;
    obj.x += vector.x;
    obj.y += vector.y;
    return obj;
  };

  _.Vector.prototype.subtract = function (vector, clone) {
    var obj = clone ? this.clone() : this;
    obj.x -= vector.x;
    obj.y -= vector.y;
    return obj;
  };

  _.Vector.prototype.scale = function (factor, clone) {
    var obj = clone ? this.clone() : this;
    obj.x *= factor;
    obj.y *= factor;
    return obj;
  };

  _.Vector.prototype.multiply = function (factor, clone) {
    var obj = clone ? this.clone() : this;
    obj.x *= factor;
    obj.y *= factor;
    return obj;
  };

  _.Vector.prototype.divide = function (factor, clone) {
    var obj = clone ? this.clone() : this;
    obj.x /= factor;
    obj.y /= factor;
    return obj;
  };

  /**
   * Get the magnitude (length)
   * @method magnitude
   * @returns {number}
   */
  _.Vector.prototype.magnitude = function () {
    if (this._magnitude === undefined) {
      this._magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    return this._magnitude;
  };

  /**
   * Get the normal vector
   * @method normal
   * @returns {object}
   */
  _.Vector.prototype.normal = function () {
    if (this._normal === undefined) {
      this._normal = this.divide(this.magnitude, true);
    }
    return this._normal;
  };

  _.Vector.prototype.dot = function (vector) {
    return (this.x * vector.x) + (this.y * vector.y);
  };

  _.Vector.prototype.cross = function (vector) {
    return (this.x * vector.y) - (this.y * vector.x);
  };

}(CUBE));
