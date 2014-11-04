/**
 * The Rect class
 *
 * @class Rect
 */
(function (_, undefined) {

    _.rect = function (x, y, width, height, velocity, density) {
        return new _.Rect(x, y, width, height, velocity, density);
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
     * @param [velocity] {vector} The initial Velocity Vector.
     * @param [dencity] {number} The density.
     */
    _.Rect = function (x, y, width, height, velocity, density) {
        this._body = _.body(x, y, width, height, velocity);
        this._anchor = _.vector(x,y);
        this._width = width;
        this._height = height;
        this._density = density || 1;
        // area mass

        this._body.box.observe(this, _.Rect.prototype.observeBodyBox);
        this._anchor.observe(this, _.Rect.prototype.observeAnchor);
    };

    _.Rect.prototype = {

        get body() {
            return this._body;
        },
        get anchor() {
            return this._anchor;
        },
        get width() {
            return this._width;
        },
        set width(value) {
            if (this._width !== value) {
                this._width = value;
                this.body.box.width = this.width;
                this._area = undefined;
                this._volume = undefined;
                this._mass = undefined;
                this.notify([_.WIDTH, _.AREA, _.VOLUME, _.MASS]);
            }
        },
        get height() {
            return this._height;
        },
        set height(value) {
            if (this._height !== value) {
                this._height = value;
                this.body.box.height = this.height;
                this._area = undefined;
                this._volume = undefined;
                this._mass = undefined;
                this.notify([_.HEIGHT, _.AREA, _.VOLUME, _.MASS]);
            }
        },

        get density() {
            return this._density;
        },
        set density(value) {
            if (this._density !== value) {
                this._density = value;
                this._mass = undefined;
                this.notify([_.DENSITY, _.MASS]);
            }
        },

        get area() {
            if (this._area === undefined) {
                this._area = Math.PI * this.radius * this.radius;
            }
            return this._area;
        },

        get volume() {
            if (this._volume === undefined) {
                this._volume = this.area * this.radius * 4 / 3;
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

    _.Rect.prototype.clone = function () {
        var rect = _.rect(this.body.x, this.body.y, this.width, this.height, this.body.velocity, this.density);
        rect._area = this._area;
        rect._volume = this._volume;
        rect._mass = this._mass;
        return rect;
    };

    _.Rect.prototype.scale = function (scalar, clone) {
        var rect = clone ? this.clone() : this;
        this.width *= scalar;
        rect.height *= scalar;
        return rect;
    };

    _.Rect.prototype.observeBodyBox = function (name) {
        if (_.X === name) {
            this.anchor.x = this.body.box.x;
        } else if (_.Y === name) {
            this.anchor.y = this.body.box.y;
        } else if ([_.WIDTH, _.EAST, _.WEST].contains(name)) {
            this._width = this.body.box.width;
            this._area = undefined;
            this._volume = undefined;
            this._mass = undefined;
        } else if ([_.HEIGHT, _.NORTH, _.SOUTH].contains(name)) {
            this._width = this.body.box.width;
            this._area = undefined;
            this._volume = undefined;
            this._mass = undefined;
        }
    };

    _.Rect.prototype.observeAnchor = function (name) {
        if (_.X === name) {
            this._body.box.x = this.anchor.x;
        } else if (_.Y === name) {
            this._body.box.y = this.anchor.y;
        }
    };
}(CUBE));
