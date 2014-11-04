/**
 * The Circle class
 *
 * @class Circle
 */
(function (_, undefined) {

    _.circle = function (x, y, radius, velocity, density) {
        return new _.Circle(x, y, radius, velocity, density);
    };

    /**
     * Creates a Circle.
     *
     * @class Circle
     * @constructor
     * @param x {number} x coordinate (center).
     * @param y {number} y coordinate (center).
     * @param radius {number} The initial radius.
     * @param [velocity] {vector} The initial Velocity Vector.
     * @param [dencity] {number} The density.
     */
    _.Circle = function (x, y, radius, velocity, density) {
        this._body = _.body(x - radius, y - radius, radius * 2, radius * 2, velocity);
        this._center = _.vector(x,y);
        this._radius = radius;
        this._density = density || 1;
        // area mass

        this._body.box.observe(this, _.Circle.prototype.observeBodyBox);
        this._center.observe(this, _.Circle.prototype.observeCenter);
    };

    _.Circle.prototype = {

        get body() {
            return this._body;
        },
        get center() {
            return this._center;
        },
        get radius() {
            return this._radius;
        },
        set radius(value) {
            if (this._radius !== value) {
                this._radius = value;
                this.body.box.x = this.center.x - this.radius;
                this.body.box.y = this.center.y - this.radius;
                this.body.width = value * 2;
                this.body.height = value * 2;
                this._area = undefined;
                this._volume = undefined;
                this._mass = undefined;
                this.notify([_.RADIUS, _.AREA, _.VOLUME, _.MASS]);
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

    _.Circle.prototype.clone = function () {
        var circle = _.circle(this.body.x, this.body.y, this.radius, this.body.velocity, this.density);
        circle._area = this._area;
        circle._volume = this._volume;
        circle._mass = this._mass;
        return circle;
    };

    _.Circle.prototype.scale = function (scalar, clone) {
        var circle = clone ? this.clone() : this;
        circle.radius *= scalar;
        return circle;
    };

    _.Circle.prototype.observeBodyBox = function (name) {
        if (_.X === name) {
            this.center.x = this.body.box.x + this.radius;
        } else if (_.Y === name) {
            this.center.y = this.body.box.y + this.radius;
        } else if ([_.WIDTH, _.EAST, _.WEST].contains(name)) {
            this.radius = this.body.box.width / 2;
            this._area = undefined;
            this._volume = undefined;
            this._mass = undefined;
        } else if ([_.HEIGHT, _.NORTH, _.SOUTH].contains(name)) {
            this.radius = this.body.box.height / 2;
            this._area = undefined;
            this._volume = undefined;
            this._mass = undefined;
        }
    };

    _.Circle.prototype.observeCenter = function (name) {
        if (_.X === name) {
            this._body.box.x = this.center.x - this.radius;
        } else if (_.Y === name) {
            this._body.box.y = this.center.y - this.radius;
        }
    };
}(CUBE));
