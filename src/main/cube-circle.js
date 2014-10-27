/**
 * The Circle class
 *
 * @class Circle
 */
(function (_, undefined) {

    _.circle = function(x, y, radius, velocity, density) {
        return new _.Circle(x, y, radius, velocity, density);
    };

    /**
     * Creates a Circle.
     *
     * @class Circle
     * @constructor
     * @param center {object} The initial position.
     * @param radius {number} The initial radius.
     * @param [velocity] {object} The initial Velocity Vector.
     */
    _.Circle = function (x, y, radius, velocity, density) {
        this._bounds = new _.bounds(x, y, radius*2, radius*2);
        this._radius = radius;
        this._velocity = velocity || new _.Vector(0,0);
        this._density = density || 1;
        // area mass
    };

    _.Circle.prototype = {

        get x() {
            return this.bounds.x;
        },
        set x(value) {
            this.bounds.x = value;
        },
        get y() {
            return this.bounds.y;
        },
        set y(value) {
            this.bounds.y = value;
        },

        get radius() {
            return this._radius;
        },
        set radius(value) {
            if (this._radius !== value) {
                this._radius = value;
                this.bounds.width = value*2;
                this.bounds.height = value*2;
                this._area = undefined;
                this._mass = undefined;
            }
        },

        get velocity() {
            return this._velocity;
        },
        set velocity(value) {
            if (this._velocity != value) {
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

        get bounds() {
            return this._bounds;
        },
        set bounds(value) {
            throw "Illegal Assignment";
        },

        get area() {
            if (this._area === undefined) {
                this._area = Math.PI * this.radius * this.radius;
            }
            return this._area;
        },
        set area(value) {
            throw "Illegal Assignment";
        },

        get mass() {
            if (this._mass === undefined) {
                // this is mass for a sphere.
                // introduce volume for correctness
                var volume = Math.PI * 4 / 3 * this.radius * this.radius * this.radius;
                this._mass = this.density * volume; 
            }
            return this._mass;
        },
        set mass(value) {
            throw "Illegal Assignment";
        },

        clone: function() {
            var circle = _.circle();
            circle._bounds = this._bounds.clone();
            circle._radius = this._radius;
            circle._velocity = this._velocity.clone();
            circle._density = this._density;
            circle._area = this._area;
            circle._mass = this._mass;
        },

        scale: function(scalar, clone) {
            var circle = clone ? this.clone() : this;
            circle.radius *= scalar;
            return circle;
        }
    };

}(CUBE));
