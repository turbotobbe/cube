(function (_, undefined){

  _.box = function(north, south, west, east) {
    return new _.Box(north, south, west, east);
  };

  _.Box = function(north, south, west, east){
    this._north = north;
    this._south = south;
    this._west = west;
    this._east = east;
  };

  _.Box.NORTH = 'north';
  _.Box.SOUTH = 'south';
  _.Box.WEST = 'west';
  _.Box.EAST = 'east';

  _.Box.prototype = {
    get north() {
      return this._north;
    },
    set north(value) {
      if (this._north !== value) {
        this._north = value;
      }
    },
    get south() {
      return this._south;
    },
    set south(value) {
      if (this._south !== value) {
        this._south = value;
      }
    },
    get west() {
      return this._west;
    },
    set west(value) {
      if (this._west !== value) {
        this._west = value;
      }
    },
    get east() {
      return this._east;
    },
    set east(value) {
      if (this._east !== value) {
        this._east = value;
      }
    }
  }
}(CUBE));
