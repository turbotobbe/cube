(function(_, undefined){

  _.Box = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  _.Box.prototype = {

    get x() {
      return this.x;
    },
    set x(value) {
      if (this._x !== value) {
        this._x = value;
      }
    },

    get y() {
      return this.y;
    },
    set y(value) {
      if (this._y !== value) {
        this._y = value;
      }
    },

    get width() {
      return this.width;
    },
    set width(value) {
      if (this._width !== value) {
        this._width = value;
      }
    },

    get height() {
      return this.height;
    },
    set height(value) {
      if (this._height !== value) {
        this._height = value;
      }
    },

    get north() {
      return this.y;
    },
    set north(value) {
      this.y = value;
    }
    get south() {
      return this.y + this.height;
    },
    set south(value) {
      this.y = value - this.height;
    }
    get west() {
      return this.x;
    },
    set west(value) {
      this.x = value;
    },
    get east() {
      return this.x + this.width;
    },
    set east(value) {
      this.x = value - this.height;
    }
  };
}(CUBE));
