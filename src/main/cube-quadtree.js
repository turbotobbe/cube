(function(_, undefined){

  _.QuadTree = function(rect, level) {
    this.rect = rect;
    this.level = level || 0;
    this.rects = [];
    // this.next = undefined;
    // this.nw = undefined;
    // this.ne = undefined;
    // this.sw = undefined;
    // this.se = undefined;
  };

  _.QuadTree.prototype = {

    get rect() {
      return this._rect;
    },
    set rect(value) {
      throw "Illegal Assignment";
    },

    get level() {
      return this._level;
    },
    set level(value) {
      throw "Illegal Assignment";
    },

    get rects() {
      return this._rects;
    },
    set rects(value) {
      throw "Illegal Assignment";
    },

    get next() {
      if (this._next === undefined) {
        this._next = this.rect.clone().divide(2);
      }
      return this._next;
    },
    set next(value) {
      throw "Illegal Assignment";
    },

    get nw() {
      if (this._nw === undefined) {
        var rect = this.next.clone();
        rect.x -= rect.width / 2;
        rect.y -= rect.height / 2;
        this._nw = new _.QuadTree(rect, this.level+1);
      }
      return this._nw;
    },
    set nw(value) {
      throw "Illegal Assignment";
    },

    get ne() {
      if (this._ne === undefined) {
        var rect = this.next.clone();
        rect.x += rect.width / 2;
        rect.y -= rect.height / 2;
        this._ne = new _.QuadTree(rect, this.level+1);
      }
      return this._ne;
    },
    set ne(value) {
      throw "Illegal Assignment";
    },

    get se() {
      if (this._se === undefined) {
        var rect = this.next.clone();
        rect.x += rect.width / 2;
        rect.y += rect.height / 2;
        this._se = new _.QuadTree(rect, this.level+1);
      }
      return this._se;
    },
    set se(value) {
      throw "Illegal Assignment";
    },

    get sw() {
      if (this._sw === undefined) {
        var rect = this.next.clone();
        rect.x -= rect.width / 2;
        rect.y += rect.height / 2;
        this._sw = new _.QuadTree(rect, this.level+1);
      }
      return this._sw;
    },
    set sw(value) {
      throw "Illegal Assignment";
    },

    clear: function() {
      var stack = [this];
      while (stack.length > 0) {
        var quad = stack.pop();
        quad.rects = [];
        if (quad._nw) stack.push(quad._nw);
        if (quad._ne) stack.push(quad._ne);
        if (quad._sw) stack.push(quad._sw);
        if (quad._se) stack.push(quad._se);
      }
      return this;
    },

    insert: function(rect) {
      var quad = this;
      while (quad !== undefined) {
        if (quad.nw.rect.covers(rect)) {
          quad = quad.nw;
        } else if (quad.ne.rect.covers(rect)) {
          quad = quad.ne;
        } else if (quad.sw.rect.covers(rect)) {
          quad = quad.sw;
        } else if (quad.se.rect.covers(rect)) {
          quad = quad.se;
        } else {
          rect.quad = quad;
          quad.rects.push(rect);
          quad = undefined;
        }
      }
      return this;
    },

    update: function(rect) {
      var quad = rect.quad;
      var index = quad.rects.indexOf(rect);
      quad.rects.splice(index, 1);
      rect.quad = undefined;
      this.insert(rect);
      return this;
    },

    select: function(rect) {
      var rects = [];
      var stack = [this];
      while (stack.length >= 0) {
        var quad = stack.pop();
        if (quad.rect.covers(rect)) {
          for (var i=0; i<quad.rects.length; i++) {
            if (quad.rects[i] !== rect && quad.rects[i].intersects(rect)) {
              rects.push(quad.rects[i]);
            }
          }
          if (quad._nw) stack.push(quad._nw);
          if (quad._ne) stack.push(quad._ne);
          if (quad._sw) stack.push(quad._sw);
          if (quad._se) stack.push(quad._se);
        }
      }
      return rects;
    }
  };
}(CUBE));
