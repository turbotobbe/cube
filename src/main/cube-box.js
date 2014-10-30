(function (_, undefined){

  _.box = function(west, east, north, south) {
    return new _.Box(west, east, north, south);
  };

  _.Box = function(west, east, north, south){
    this._west = west;
    this._east = east;
    this._north = north;
    this._south = south;
    this._width = this._east - this._west
    this._height = this._south - this._north;
  };

  _.Box.WEST = 'west';
  _.Box.EAST = 'east';
  _.Box.NORTH = 'north';
  _.Box.SOUTH = 'south';
  _.Box.WIDTH = "width";
  _.Box.HEIGHT = "height";

  _.Box.prototype = {
    get west() {
      return this._west;
    },
    set west(value) {
      if (this._west !== value) {
        this._west = value;
        this._width = this._east - this._west;
      }
    },
    get east() {
      return this._east;
    },
    set east(value) {
      if (this._east !== value) {
        this._east = value;
        this._width = this._east - this._west;
      }
    },
    get north() {
      return this._north;
    },
    set north(value) {
      if (this._north !== value) {
        this._north = value;
        this._height = this._south - this._north;
      }
    },
    get south() {
      return this._south;
    },
    set south(value) {
      if (this._south !== value) {
        this._south = value;
        this._height = this._south - this._north;
      }
    },
    get width() {
      return this._width;
    },
    set width(value) {
      if (this._width !== value) {
        var diff = (value - this._width)/2;
        this._west -= diff;
        this._east += diff;
        this._width = this._east - this._west;
      }
    },
    get height() {
      return this._height;
    },
    set height(value) {
      if (this._height !== value) {
        var diff = (value - this._height)/2;
        this._north -= diff;
        this._south += diff;
        this._height = this._east - this._west;
      }
    }
  };

  /**
   * Check if this box covers another box
   * @method covers
   * @param {object} box
   * @returns true if this box covers box, false otherwise
   */
  _.Box.prototype.covers = function (box) {
    if (this.west > box.west) {
      return false;
    } else if (this.east < box.east) {
      return false;
    } else if (this.north > box.north) {
      return false;
    } else if (this.south < box.south) {
      return false;
    }
    return true;
  };

  _.Box.prototype.intersects = function (box) {
    if (this.west > box.east) {
      return false;
    } else if (this.east < box.west) {
      return false;
    } else if (this.north > box.south) {
      return false;
    } else if (this.south < box.north) {
      return false;
    }
    return true;
  };

}(CUBE));
