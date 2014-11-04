(function (_, undefined) {

    /**
     * Create a new box
     *
     * @static
     * @method box
     * @param x {number} x coordinate.
     * @param y {number} y coordinate.
     * @param width {number} the width.
     * @param height (number} the height;
     * @returns {box} The box
     */
    _.box = function (x, y, width, height) {
        return new _.Box(x, y, width, height);
    };

    /**
     * @class Box
     * @constructor
     * @param x {number}
     * @param y {number}
     * @param width {number}
     * @param height {number}
     */
    _.Box = function (x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._west = this._x;
        this._north = this._y;
        this._east = this._west + this._width;
        this._south = this._north + this._height;
    };

    _.Box.prototype = {

        /**
         * When set, the box is moved
         * @property x
         * @type {number}
         */
        get x() {
            return this._x;
        },
        set x(value) {
            if (this._x !== value) {
                this._x = value;
                this._west = value;
                this._east = value + this._width;
            }
        },

        /**
         * When set, the box is moved
         * @property y
         * @type {number}
         */
        get y() {
            return this._y;
        },
        set y(value) {
            if (this._y !== value) {
                this._y = value;
                this._north = value;
                this._south = this._north + this._height;
            }
        },

        /**
         * When set, the box is resized
         * @property width
         * @type {number}
         */
        get width() {
            return this._width;
        },
        set width(value) {
            if (this._width !== value) {
                this._width = value;
                this._east = this._west + this._width;
            }
        },

        /**
         * When set, the box is resized
         * @property height
         * @type {number}
         */
        get height() {
            return this._height;
        },
        set height(value) {
            if (this._height !== value) {
                this._height = value;
                this._south = this._north + this._height;
            }
        },

        /**
         * When set, the box is resized
         * @property west
         * @type {number}
         */
        get west() {
            return this._west;
        },
        set west(value) {
            if (this._west !== value) {
                this._west = value;
                this._x = value;
                this._width = this._east - this._west;
            }
        },

        /**
         * When set, the box is resized
         * @property east
         * @type {number}
         */
        get east() {
            return this._east;
        },
        set east(value) {
            if (this._east !== value) {
                this._east = value;
                this._width = this._east - this._west;
            }
        },

        /**
         * When set, the box is resized
         * @property north
         * @type {number}
         */
        get north() {
            return this._north;
        },
        set north(value) {
            if (this._north !== value) {
                this._north = value;
                this._y = value;
                this._height = this._south - this._north;
            }
        },

        /**
         * When set, the box is resized
         * @property south
         * @type {number}
         */
        get south() {
            return this._south;
        },
        set south(value) {
            if (this._south !== value) {
                this._south = value;
                this._height = this._south - this._north;
            }
        }
    };

    /**
     * Clone the Box
     * @method clone
     * @returns {box} A cloned box
     */
    _.Box.prototype.clone = function () {
        var obj = _.box(this.x, this.y, this.width, this.height);
        return obj;
    };

    /**
     * Check if this box covers another box
     * @method covers
     * @param {box} box
     * @returns {booolean} true if this box covers the box, false otherwise
     */
    _.Box.prototype.covers = function (box) {
        if (this.west > box.west) {
            return false;
        } else if (this.east < box.east) {
            return false;
        } else if (this.north > box.north) {
            return false;
        } else if (this.south < box.south) {
            return false;
        }
        return true;
    };

    /**
     * Check if this box intersects with another box
     * @method intersects
     * @param {box} box
     * @returns {boolean} true if this box intersects with the box, false otherwise
     */
    _.Box.prototype.intersects = function (box) {
        if (this.west > box.east) {
            return false;
        } else if (this.east < box.west) {
            return false;
        } else if (this.north > box.south) {
            return false;
        } else if (this.south < box.north) {
            return false;
        }
        return true;
    };

}(CUBE));
