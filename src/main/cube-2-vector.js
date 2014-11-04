(function(_, undefined){

  _.Box = function(x, y, width, height) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
//    this._west = x;
    this._east = x + width;
//    this._north = y;
    this._south = y + height;
  };
  _.Box.prototype = {
    get x() {
      return this._x;
    },
    set x(value) {
      if (this._x !== value) {
        this._x = value;
//        this._west = this.x;
        this._east = this.west + this.width;
      }
    },
    get y() {
      return this._y;
    },
    set y(value) {
      if (this._y !== value) {
        this._y = value;
//        this._north = this.y;
        this._south = this.north + this.height;
      }
    },
    get width() {
      return this._width;
    },
    set width(value) {
      if (this._width !== value) {
        this._width = value;
        this._east = this.west + this.width;
      }
    },
    get height() {
      return this._height;
    },
    set height(value) {
      if (this._height !== value) {
        this._height = value;
        this._south = this.north + this.height;
      }
    },
    get west() {
      return this._x;
    },
    get east() {
      return this._east;
    },
    get north() {
      return this._y;
    },
    get south() {
      return this._south;
    }
  };

  _.Vector = function() {
    this._x = x;
    this._y = y;
  };
  _.Vector.prototype = {
    get x() {
      return this._x;
    },
    set x(value) {
      if (this._x !== value) {
        this._x = value;
      }
    },
    get y() {
      return this._y;
    },
    set y(value) {
      if (this._y !== value) {
        this._y = value;
      }
    }
  }

  _.Circle = function(x, y, radius, vx, vy) {
    _.Vector.call(this, x, y);
    this._radius = radius;
    this._velocity = vx && vy ? new _.Vector(vx, vy) : new _.Vector(0, 0);
    this._box = new _.Box(x - radius, x + radius, radius * 2, radius * 2);
  };
  _.Circle.prototype = Object.create(_.Vector.prototype);
  _.Circle.constructor = _.Vector;
  _.Circle.prototype = {
    set x(value) {
      if (this._x !== value) {
        this._x = value;
        // TODO update Circle
        this.box.x = this.x - this.radius;
      }
    },
    set y(value) {
      if (this._y !== value) {
        this._y = value;
        // TODO update Circle
        this.box.y = this.y - this.radius;
      }
    },
    get radius() {
      return this._radius;
    },
    set radius(value) {
      if (this._radius !== value) {
        this._radius = value;
        // TODO update Circle
        this.box.width = this.radius * 2;
        this.box.height = this.radius * 2;
      }
    },
    get velocity() {
      return this._velocity;
    },
    set velocity(value) {
      if (this._velocity !== value) {
        this._velocity = value;
        // TODO update Circle
      }
    }
  };

  _.Rect = function(x, y, width, height, vx, vy) {
    _.Vector.call(this, x, y);
    this._width = width;
    this._height = height;
    this._velocity = vx && vy ? new _.Vector(vx, vy) : new _.Vector(0, 0);
    this._box = new _.Box(x, y, width, height);
  };
  _.Rect.prototype = Object.create(_.Vector.prototype);
  _.Rect.constructor = _.Vector;
  _.Rect.prototype = {
    set x(value) {
      if (this._x !== value) {
        this._x = value;
        // TODO update Rect
        this.box.x = this.x;
      }
    },
    set y(value) {
      if (this._y !== value) {
        this._y = value;
        // TODO update Rect
        this.box.y = this.y;
      }
    },
    get width() {
      return this._width;
    },
    set width(value) {
      if (this._width !== value) {
        this._width = value;
        // TODO update Rect
        this.box.width = this.width;
      }
    },
    get height() {
      return this._height;
    },
    set height(value) {
      if (this._height !== value) {
        this._height = value;
        // TODO update Rect
        this.box.height = this.height;
      }
    },
    get velocity() {
      return this._velocity;
    },
    set velocity(value) {
      if (this._velocity !== value) {
        this._velocity = value;
        // TODO update Rect
      }
    }
  };

}(CUBE));
