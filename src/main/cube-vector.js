(function (_, undefined) {

    /**
     * Create a new vector
     *
     * @static
     * @method vector
     * @param x {number} x coordinate.
     * @param y {number} y coordinate.
     * @returns {vector} The vector
     */
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
        get x() {
            return this._x;
        },
        set x(value) {
            if (this._x !== value) {
                this._x = value;
                this._magnitude = undefined;
                this._normal = undefined;
                this.notify(_.Vector.X);
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
                this.notify(_.Vector.Y);
            }
        },

        /**
         * The magnitude (length)
         * @property magnitude
         * @type {number}
         */
        get magnitude() {
            if (this._magnitude === undefined) {
                this._magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));
            }
            return this._magnitude;
        },

        /**
         * The normal vector (magnitude 1)
         * @property normal
         * @type {vector}
         */
        get normal() {
            if (this._normal === undefined) {
                this._normal = this.divide(this.magnitude, true);
            }
            return this._normal;
        }
    };

    /**
     * Clone the Vector
     * @method clone
     * @returns {vector} A cloned vector
     */
    _.Vector.prototype.clone = function () {
        var obj = _.vector(this.x, this.y);
        obj._magnitude = this._magnitude;
        obj._normal = this._normal;
        return obj;
    };

    /**
     * Negate the vector.
     *
     * @method negate
     * @param [clone=false] {boolean}
     * @returns {vector}
     */
    _.Vector.prototype.negate = function (clone) {
        var obj = clone ? this.clone() : this;
        obj.x = -obj.x;
        obj.y = -obj.y;
        return obj;
    };

    /**
     * Add a vector to this vector.
     *
     * @method add
     * @param vector {vector}
     * @param [clone=false] {boolean}
     * @returns {vector}
     */
    _.Vector.prototype.add = function (vector, clone) {
        var obj = clone ? this.clone() : this;
        obj.x += vector.x;
        obj.y += vector.y;
        return obj;
    };

    /**
     * Subtract a vector from this vector.
     *
     * @method subtract
     * @param vector {vector}
     * @param [clone=false] {boolean}
     * @returns {vector}
     */
    _.Vector.prototype.subtract = function (vector, clone) {
        var obj = clone ? this.clone() : this;
        obj.x -= vector.x;
        obj.y -= vector.y;
        return obj;
    };

    /**
     * Scale this vector with a factor.
     *
     * @method scale
     * @param factor {number}
     * @param [clone=false] {boolean}
     * @returns {vector}
     */
    _.Vector.prototype.scale = function (factor, clone) {
        var obj = clone ? this.clone() : this;
        obj.x *= factor;
        obj.y *= factor;
        return obj;
    };

    /**
     * Multiply this vector with a factor.
     *
     * @method multiply
     * @param factor {number}
     * @param [clone=false] {boolean}
     * @returns {vector}
     */
    _.Vector.prototype.multiply = function (factor, clone) {
        var obj = clone ? this.clone() : this;
        obj.x *= factor;
        obj.y *= factor;
        return obj;
    };

    /**
     * Divide this vector with a factor.
     *
     * @method divide
     * @param factor {number}
     * @param [clone=false] {boolean}
     * @returns {vector}
     */
    _.Vector.prototype.divide = function (factor, clone) {
        var obj = clone ? this.clone() : this;
        obj.x /= factor;
        obj.y /= factor;
        return obj;
    };

    /**
     * Calculate the dot product of this vector and another.
     *
     * @method dot
     * @param vector {vector}
     * @returns {vector}
     */
    _.Vector.prototype.dot = function (vector) {
        return (this.x * vector.x) + (this.y * vector.y);
    };

    /**
     * Calculate the cross product of this vector and another.
     *
     * @method cross
     * @param vector {vector}
     * @returns {vector}
     */
    _.Vector.prototype.cross = function (vector) {
        return (this.x * vector.y) - (this.y * vector.x);
    };

}(CUBE));
