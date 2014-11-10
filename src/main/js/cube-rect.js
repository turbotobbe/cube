/* global CUBE */
(function (cube, undefined) {
    'use strict';
    
    cube.rect = function (x, y, width, height, vx, vy, density) {
        return new cube.Rect(x, y, width, height, vx, vy, density);
    };

    /**
     * Creates a Rect.
     *
     * @class Rect
     * @constructor
     * @param x {number} x coordinate (center).
     * @param y {number} y coordinate (center).
     * @param width {number} The initial width
     * @param height {number} The initial height.
     * @param [cx=0] {number} The initial Velocity x.
     * @param [cy=0] {number} The initial Velocity y.
     * @param [density=1] {number} The density.
     */
    cube.Rect = function (x, y, width, height, vx, vy, density) {
        cube.Vector.call(this, x, y);
        this._width = width;
        this._height = height;
        this._velocity = cube.vector(vx || 0, vy || 0);
        this._box = cube.box(x, y, width, height);
        this._density = density || 1;
        this._area = undefined;
        this._volume = undefined;
        this._mass = undefined;
    };
    cube.Rect.prototype = Object.create(cube.Vector.prototype);
    cube.Rect.constructor = cube.Vector;

    cube.Rect.prototype = {
        set x(value) {
            if (this._x !== value) {
                this._x = value;
                this.box.x = this.x;
            }
        },
        set y(value) {
            if (this._y !== value) {
                this._y = value;
                this.box.y = this.y;
            }
        },
        get width() {
            return this._width;
        },
        set width(value) {
            if (this._width !== value) {
                this._width = value;
                this.box.width = this.width;
                this._area = undefined;
                this._volume = undefined;
                this._mass = undefined;
            }
        },
        get height() {
            return this._height;
        },
        set height(value) {
            if (this._height !== value) {
                this._height = value;
                this.box.height = this.height;
                this._area = undefined;
                this._volume = undefined;
                this._mass = undefined;
            }
        },
        get velocity() {
            return this._velocity;
        },
        set velocity(value) {
            if (this._velocity !== value) {
                this._velocity = value;
            }
        },
        get density() {
            return this._density;
        },
        set density(value) {
            if (this._density !== value) {
                this._density = value;
                this._mass = undefined;
            }
        },
        get area() {
            if (this._area === undefined) {
                this._area = this.width * this.height;
            }
            return this._area;
        },
        get volume() {
            if (this._volume === undefined) {
                // could be some other depth [min(abs(width),abs(height))+abs(width-height)]
                this._volume = this.area * 1;
            }
            return this._volume;
        },
        get mass() {
            if (this._mass === undefined) {
                // this is mass for a sphere.
                // introduce volume for correctness
                this._mass = this.density * this.volume;
            }
            return this._mass;
        }
    };

    cube.Rect.prototype.clone = function () {
        var rect = cube.rect(this.x, this.y, this.width, this.height, this.velocity.x, this.velocity.y, this.density);
        rect._area = this._area;
        rect._volume = this._volume;
        rect._mass = this._mass;
        return rect;
    };

    cube.Rect.prototype.scale = function (scalar, clone) {
        var rect = clone ? this.clone() : this;
        this.width *= scalar;
        rect.height *= scalar;
        return rect;
    };
}(CUBE));
