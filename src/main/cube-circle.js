/**
 * The Circle class
 *
 * @class Circle
 */
(function (_, undefined) {

    /**
     * Creates a Circle.
     *
     * @class Circle
     * @constructor
     * @param center {object} The initial position.
     * @param radius {number} The initial radius.
     * @param [velocity] {object} The initial Velocity Vector.
     */
    _.Circle = function (center, radius, velocity) {
        this.center = _.Vector.clone(center);
        this.radius = radius;
        this.velocity = _.Vector.clone(velocity) || _.Vector.build(0,0);
    };

    /**
     * Bounding box of the Circle.
     *
     * @method box
     * @returns {object} The bounding box.
     */
    _.Circle.prototype.box = function () {
        return {
            w: this.center.x - this.radius,
            n: this.center.y - this.radius,
            e: this.center.x + this.radius,
            s: this.center.y + this.radius
        };
    };

    /**
     * Mass of this Circle.
     *
     * @method mass
     * @returns {number} The mass of the Circle.
     */
    _.Circle.prototype.mass = function() {
        return 2*Math.PI*this.radius;
    };

}(CUBE));
