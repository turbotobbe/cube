/**
 * The Circle class
 *
 * @class Circle
 */
(function (_, undefined) {

    _.circle = function(center, radius, velocity, density) {
        return new _.Circle(center, radius, velocity, density);
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
    _.Circle = function (center, radius, velocity, density) {
        this._box = new _.Rect(center, radius*2, radius*2);
        this._center = center;
        this._radius = radius;
        this._velocity = velocity || new _.Vector(0,0);
        this._density = density || 1;
        // this.area = undefined;
        // this.mass = undefined;
    };

    _.Circle.prototype = {

        get center() {
            return this._center;
        },
        set center(value) {
            if (this._center !== value) {
                this._center = value;
                this.box.center = value;
            }
        },

        get radius() {
            return this._radius;
        },
        set radius(value) {
            if (this._radius !== value) {
                this._radius = value;
                this.box.width = value*2;
                this.box.height = value*2;
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

        get box() {
            return this._box;
        },
        set box(value) {
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
            return new _.Circle(this.center.clone(), this.radius, this.velocity.clone(), this.density);
        },

        moved: function() {
            this.box.moved();
        },
        
        multiply: function(scalar) {
            this.radius *= scalar;
            return this;
        },
        divide: function(scalar) {
            this.radius /= scalar;
            return this;
        }

    };

}(CUBE));
