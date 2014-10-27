(function(_, undefined){

  _.rect = function(x, y, width, height, velocity, density) {
    return new _.Rect(x, y, width, height, velocity, density);
  };

  _.Rect = function(x, y, width, height, velocity, density) {
    this._bounds = new _.bounds(x, y, width, height);
    this._velocity = velocity || new _.Vector(0,0);
    this._density = density || 1;
  };

  _.Rect.prototype = {

    get x() {
        return this.bounds.x;
    },
    set x(value) {
        this.bounds.x = value;
    },
    get y() {
        return this.bounds.y;
    },
    set y(value) {
        this.bounds.y = value;
    },
    get width() {
      return this.bounds.width;
    },
    set width(value) {
      this.bounds.width = value;
    },
    get height() {
      return this.bounds.height;
    },
    set height(value) {
      this.bounds.height = value;
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

    get bounds() {
        return this._bounds;
    },
    set bounds(value) {
        throw "Illegal Assignment";
    },

    get area() {
        if (this._area === undefined) {
            this._area = this.width * this.height;
        }
        return this._area;
    },
    set area(value) {
        throw "Illegal Assignment";
    },

    get mass() {
        if (this._mass === undefined) {
            // this is mass for a cube.
            // introduce volume for correctness
            var volume = 1 * this.width * this.height;
            this._mass = this.density * volume;
        }
        return this._mass;
    },
    set mass(value) {
        throw "Illegal Assignment";
    },

    clone: function() {
      var rect = _.rect();
      rect._bounds = this._bounds.clone();
      rect._velocity = this._velocity.clone();
      rect._density = this._density;
      return rect;
    },
    scale: function(scalar, clone) {
        var rect = clone ? this.clone() : this;
        rect.width *= scalar;
        rect.height *= scalar;
    }

  };

}(CUBE));
