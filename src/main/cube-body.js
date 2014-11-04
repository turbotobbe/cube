(function (_, undefined) {

    /**
     * Create a new body
     *
     * @static
     * @method body
     * @param x {number} x coordinate.
     * @param y {number} y coordinate.
     * @param width {number} body width
     * @param height {number} body height
     * @returns {body} The body
     */
    _.body = function (x, y, width, height, velocity) {
        return new _.Body(x, y, width, height, velocity);
    };

    /**
     * @class Body
     * @constructor
     * @param x {number} x coordinate.
     * @param y {number} y coordinate.
     * @param width {number} body width
     * @param height {number} body height
     * @param [velocity={0,0}] {vector} body velocity
     */
    _.Body = function (x, y, width, height, velocity) {
        this._box = _.box(x, y, width, height);
        this._velocity = velocity ? velocity.clone() : _.vector(0, 0);
    };

    _.Body.prototype = {

        get box() {
            return this._box;
        },
        get velocity() {
            return this._velocity;
        },
        set velocity(value) {
            if (this._velocity != value) {
                this._velocity = value;
                this.notify([_.VELOCITY]);
            }
        }
    };

    /**
     * Clone the body
     * @method clone
     * @returns {body} A cloned body
     */
    _.Body.prototype.clone = function () {
        return _.body(this.box.x, this.box.y, this.box.width, this.box.height, this.velocity);
    };
/*
    _.Body.prototype.observeCenter = function (name) {
        if (name === _.X) {
            this.box.x = this.center.x - (this.box.width / 2);
        } else if (name === _.Y) {
            this.box.y = this.center.y - (this.box.height / 2);
        }
    };

    _.Body.prototype.observeBox = function (name) {
        if ([_.X, _.WIDTH, _.EAST, _.WEST].contains(name)) {
            this.center.x = this.box.x + (this.box.width / 2);
        } else if ([_.Y, _.HEIGHT, _.NORTH, _.SOUTH].contains(name)) {
            this.center.y = this.box.y + (this.box.height / 2);
        }
    };
*/
}(CUBE));
