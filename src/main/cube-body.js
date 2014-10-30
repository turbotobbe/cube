(function (_, undefined) {

  /**
   * Create a new body
   *
   * @static
   * @method body
   * @param x {number} x coordinate.
   * @param y {number} y coordinate.
   * @returns {object} The body
   */
  _.body = function (x, y, width, height, velocity, density) {
    return new _.Body(x, y, width, height, velocity, density);
  };

  /**
   * @class Body
   * @constructor
   * @param x {number} x coordinate.
   * @param y {number} y coordinate.
   * @param width {number} body width
   * @param height {number} body height
   * @param [velocity={0,0}] {vector} body velosity
   * @param [density=0] {number} body density
   */
  _.Body = function (x, y, width, height, velocity, density) {
    this._center = _.vector(x, y);
    var diffWidth = width / 2;
    var diffHeight = height / 2;
    this._box = _.box(x - diffWidth, x + diffWidth, y - diffHeight, y + diffHeight);
    this._velocity = velocity ? velocity.clone() : _.vector(0,0);
    this._density = density || 1;

    this._box.observe(this, _.Body.prototype.observeBox);
    this._center.observe(this, _.Body.prototype.observeCenter);
  };

  _.Body.prototype = {

    get center() {
      return this._center;
    },

    get box() {
      return this._box;
    }
  };

  /**
   * Clone the body
   * @method clone
   * @returns {body} A cloned body
   */
  _.Body.prototype.clone = function () {
    return _.body(this.center.x, this.center.y, this.width, this.height, this.velocity, this.density);
  };

  _.Body.prototype.observeCenter = function (name) {
    if (name === _.Vector.X) {
      var diffWidth = this.box.width / 2;
      this.box.west = this.center.x - diffWidth;
      this.box.east = this.center.x + diffWidth;
    } else if (name === _.Vector.Y) {
      var diffHeight = this.box.height / 2
      this.box.north = this.center.y - diffHeight;
      this.box.south = this.center.y + diffHeight;
    }
  };

  _.Body.prototype.observeBox = function (name) {
    if (name === _.Box.WEST) {
      this.center.x = this.box.west + (this.box.width / 2);
    } else if (name === _.Box.EAST) {
      this.center.x = this.box.west + (this.box.width / 2);
    } else if (name === _.Box.NORTH) {
      this.center.y = this.box.north + (this.box.height / 2);
    } else if (name === _.Box.SOUTH) {
      this.center.y = this.box.north + (this.box.height / 2);
    }
  };

}(CUBE));
