(function(_, undefined){

  _.rect = function(center, width, height) {
    return new _.Rect(center, width, height);
  };

  _.Rect = function(center, width, height) {
    this.center = center;
    this.width = width;
    this.height = height;
    // this._north = undefined;
    // this._south = undefined;
    // this._west = undefined;
    // this._east = undefined;
  };

  _.Rect.prototype = {

    get center() {
      if (this._center === undefined) {
        var x = this.west + ((this.east - this.west) / 2);
        var y = this.north + ((this.south - this.north) / 2);
        this._center = new _.Vector(x, y);
      }
      return this._center;
    },
    set center(value) {
      if (this._center !== value) {
        this._center = value;
        this._north = undefined;
        this._south = undefined;
        this._west = undefined;
        this._east = undefined;
      }
    },

    get width() {
      if (this._width === undefined) {
        this._width = this.east - this.west;
      }
      return this._width;
    },
    set width(value) {
      if (this._width !== value) {
        this._width = value;
        this._west = undefined;
        this._east = undefined;
      }
    },

    get height() {
      if (this._height === undefined) {
        this._height = this.south - this.north;
      }
      return this._height;
    },
    set height(value) {
      if (this._height !== value) {
        this._height = value;
        this._north = undefined;
        this._south = undefined;
      }
    },

    get north() {
      if (this._north === undefined) {
        this._north = this.center.y - (this.height / 2);
      }
      return this._north;
    },
    set north(value) {
      if (this._north !== value) {
        this._north = value;
      }
    },

    get south() {
      if (this._south === undefined) {
        this._south = this.center.y + (this.height / 2);
      }
      return this._south;
    },
    set south(value) {
      if (this._south !== value) {
        this._south = value;
      }
    },

    get west() {
      if (this._west === undefined) {
        this._west = this.center.x - (this.width / 2);
      }
      return this._west;
    },
    set west(value) {
      if (this._west !== value) {
        this._west = value;
      }
    },

    get east() {
      if (this._east === undefined) {
        this._east = this.center.x + (this.width / 2);
      }
      return this._east;
    },
    set east(value) {
      if (this._east !== value) {
        this._east = value;
      }
    },

    clone: function() {
      return new _.Rect(this.center.clone(), this.width, this.height);
    },
    moved: function() {
      this._north = undefined;
      this._south = undefined;
      this._west = undefined;
      this._east = undefined;
    },
    multiply: function(scalar) {
      this.width *= scalar;
      this.height *= scalar;
      return this;
    },
    divide: function(scalar) {
      this.width /= scalar;
      this.height /= scalar;
      return this;
    },

    covers: function(rect) {
      if (this.north > rect.north) {
        return false;
      } else if (this.south < rect.south) {
        return false;
      } else if (this.west > rect.west) {
        return false;
      } else if (this.east < rect.east) {
        return false;
      }
      return true;
    },

    intersect: function(rect) {
      if (this.north > rest.south) {
        return false;
      } else if (this.south < rest.north) {
        return false;
      } else if (this.west > rest.east) {
        return false;
      } else if (this.east < rest.west) {
        return false;
      }
      return true;
    }

  };

}(CUBE));
