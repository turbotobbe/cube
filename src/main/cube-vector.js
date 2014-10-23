/**
 * @class: Vector
 */
(function(_, undefined){

  /**
   * @class Vector
   * @constructor
   * @param x {number} x coordinate.
   * @param y {number} y coordinate.
   */
  _.Vector = function(x, y) {
    this.x = x;
    this.y = y;
    this._magnitude = undefined;
    this._normal = undefined;
  };

  _.Vector.prototype = {

    get x() {
      return this._x;
    },
    set x(value) {
      if (this._x !== value) {
        this._x = value;
        delete this._magnitude;
        delete this._normal;
      }
    },

    get y() {
      return this._y;
    },
    set y(value) {
      if (this._y !== value) {
        this._y = value;
        delete this._magnitude;
        delete this._normal;
      }
    },

    get normal() {
      if (this._normal === undefined) {
        // call get magnitude to cache value since we need it for divide after clone
        this.magnitude;
        var obj = this.clone();
        this._normal = obj.divide(this.magnitude);
      }
      return this._normal;
    },
    set normal(value) {
      throw "Illegal Assignment"
    },

    get magnitude() {
      if (this._magnitude === undefined) {
        this._magnitude = Math.sqrt((this.x*this.x)+(this.y*this.y));
      }
      return this._magnitude;
    },
    set magnitude(value) {
      throw "Illegal Assignment"
    },

    /**
     * Clone this Vector
     *
     * @method clone
     * @returns {object} The Cloned Vector.
     */
    clone: function() {
      var obj = new _.Vector(this.x, this.y);
      obj._magnitude = this._magnitude;
      obj._normal = this._normal;
      return obj;

    },

    /**
     * Negate the Vector.
     *
     * @method negate
     * @param [clone=false] {boolean} Clone this Vector
     */
    negate: function(clone) {
      var obj = clone ? this.clone() : this;
      obj.x = -obj.x;
      obj.y = -obj.y;
      return obj;
    },

    /**
     * Add a Vector to the Vector.
     *
     * @method add
     * @param vector {object} The Vector to add
     * @param [clone=false] {boolean} Clone this Vector
     */
    add: function(vector, clone) {
      var obj = clone ? this.clone() : this;
      obj.x += vector.x;
      obj.y += vector.y;
      return obj;
    },

    subtract: function(vector, clone) {
      var obj = clone ? this.clone() : this;
      obj.x -= vector.x;
      obj.y -= vector.y;
      return obj;
    },

    multiply: function(scalar, clone) {
      var obj = clone ? this.clone() : this;
      obj.x *= scalar;
      obj.y *= scalar;
      return obj;
    },

    divide: function(scalar, clone) {
      var obj = clone ? this.clone() : this;
      obj.x /= scalar;
      obj.y /= scalar;
      return obj;
    },

    dot: function(vector) {
      return _.dot(this, vector);
    },

    cross: function(vector) {
      return _.cross(this, vector);
    }

  };

  _.dot = function(vectorA, vectorB) {
    return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
  };

  _.cross = function(vectorA, vectorB) {
    return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
  };

}(CUBE));
