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
    this._width = width;
    this._height = height;
    var h2 = this._height / 2;
    var w2 = this._width / 2;
    this._box = _.box(y - h2, y + h2, x - w2, x + w2);
    this._velocity = velocity ? velocity.clone() : _.vector(0,0);
    this._density = density || 1;

    this._box.observe(this, _.Body.prototype.observeBox);
    this._center.observe(this, _.Body.prototype.observeCenter);
  };

  _.Body.prototype = {

    get width() {
      return this._width;
    },
    set width(value) {
      if (this._width !== value) {
        this._width = value;
        this.box.west = this.center.x - (this._width/2);
        this.box.east = this.center.x + (this._width/2);
      }
    },

    get height() {
      return this._height;
    },
    set height(value) {
      if (this._height !== value) {
        this._height = value;
        this.box.north = this.center.y - (this._height/2);
        this.box.south = this.center.y + (this._height/2);
      }
    },

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
      this.box.west = this.center.x - (this.width / 2);
      this.box.east = this.center.x + (this.width / 2);
    } else if (name === _.Vector.Y) {
      this.box.north = this.center.y - (this.height / 2);
      this.box.south = this.center.y + (this.height / 2);
    }
  };

  _.Body.prototype.observeBox = function (name) {
    if (name === _.Box.NORTH) {
      this.height = this.box.south - this.box.north;
      this.center.y = this.box.north + (this.height / 2);
    } else if (name === _.Box.SOUTH) {
      this.height = this.box.south - this.box.north;
      this.center.y = this.box.north + (this.height / 2);
    } else if (name === _.Box.WEST) {
      this.width = this.box.east - this.box.west;
      this.center.x = this.box.west + (this.width / 2);
    } else if (name === _.Box.EAST) {
      this.width = this.box.east - this.box.west;
      this.center.x = this.box.west + (this.width / 2);
    }
  };

  /**
   * Check if this body covers another body
   * @method covers
   * @param {object} body
   * @returns true if this body covers body, false otherwise
   */
  _.Body.prototype.covers = function (body) {
    if (this.north > body.north) {
      return false;
    } else if (this.south < body.south) {
      return false;
    } else if (this.west > body.west) {
      return false;
    } else if (this.east < body.east) {
      return false;
    }
    return true;
  };

  _.Body.prototype.intersects = function (body) {
    if (this.north > body.south) {
      return false;
    } else if (this.south < body.north) {
      return false;
    } else if (this.west > body.east) {
      return false;
    } else if (this.east < body.west) {
      return false;
    }
    return true;
  };

}(CUBE));
