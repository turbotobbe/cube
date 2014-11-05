(function (_, undefined) {

    _.circle = function (x, y, radius, vx, vy) {
        return new _.Circle(x, y, radius, vx, vy);
    };

    /**
     * Creates a Circle.
     *
     * @class Circle
     * @constructor
     * @param x {number} x coordinate (north west).
     * @param y {number} y coordinate (north west).
     * @param radius {number} The initial radius.
     * @param [cx=0] {number} The initial Velocity x.
     * @param [cy=0] {number} The initial Velocity y.
     * @param [density=1] {number} The density.
     */
    _.Circle = function (x, y, radius, vx, vy, density) {
        _.Vector.call(this, x, y);
        this._radius = radius;
        this._velocity = _.vector(vx || 0, vy || 0);
        this._box = _.box(x - radius, y - radius, radius * 2, radius * 2);
        this._density = density || 1;
        this._area = undefined;
        this._volume = undefined;
        this._mass = undefined;
    };
    _.Circle.prototype = Object.create(_.Vector.prototype);
    _.Circle.constructor = _.Vector;

    _.Circle.prototype = {
        set x(value) {
            if (this._x !== value) {
                this._x = value;
                this.box.x = this.x - this.radius;
            }
        },
        set y(value) {
            if (this._y !== value) {
                this._y = value;
                this.box.y = this.y - this.radius;
            }
        },
        get radius() {
            return this._radius;
        },
        set radius(value) {
            if (this._radius !== value) {
                this._radius = value;
                this.box.x = this.x - this.radius;
                this.box.y = this.y - this.radius;
                this.box.width = this.radius * 2;
                this.box.height = this.radius * 2;
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
        var circle = _.circle(this.x, this.y, this.radius, this.velocity.x, this.velocity.y, this.density);
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

}(CUBE));
