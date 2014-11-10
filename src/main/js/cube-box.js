/* global CUBE */
(function (cube, undefined) {
    'use strict';

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
    cube.box = function (x, y, width, height) {
        return new cube.Box(x, y, width, height);
    };

    /**
     * @class Box
     * @constructor
     * @param x {number}
     * @param y {number}
     * @param width {number}
     * @param height {number}
     */
    cube.Box = function (x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._east = this._x + this._width;
        this._south = this._y + this._height;
    };

    cube.Box.prototype = {

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
                this._east = this.x + this.width;
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
                this._south = this.y + this.height;
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
                this._east = this.x + this.width;
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
                this._south = this.y + this.height;
            }
        },

        /**
         * Western border
         * @property west
         * @type {number}
         */
        get west() {
            return this._x;
        },

        /**
         * Eastern border
         * @property east
         * @type {number}
         */
        get east() {
            return this._east;
        },

        /**
         * Northern border
         * @property north
         * @type {number}
         */
        get north() {
            return this._y;
        },

        /**
         * Sothern border
         * @property south
         * @type {number}
         */
        get south() {
            return this._south;
        }
    };

    /**
     * Clone the Box
     * @method clone
     * @returns {box} A cloned box
     */
    cube.Box.prototype.clone = function () {
        return cube.box(this.x, this.y, this.width, this.height);
    };

    /**
     * Check if this box covers another box
     * @method covers
     * @param {box} box
     * @returns {booolean} true if this box covers the box, false otherwise
     */
    cube.Box.prototype.covers = function (box) {
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
    cube.Box.prototype.intersects = function (box) {
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
