/**
 * The QuadTree class
 *
 * @class QuadTree
 */
(function (_, undefined) {

    _.QuadTree = function (bounds, level) {
        this.bounds = bounds;
        this.level = level || 0;
        this.objs = [];
    };

    _.QuadTree.prototype = {

        get next() {
            if (this._next === undefined) {
                this._next = this.bounds.clone().scale(0.5);
            }
            return this._next;
        },
        set next(value) {
            throw "Illegal Assignment";
        },

        get nw() {
            if (this._nw === undefined) {
                var bounds = this.next.clone();
                bounds.x -= bounds.width / 2;
                bounds.y -= bounds.height / 2;
                this._nw = new _.QuadTree(bounds, this.level + 1);
            }
            return this._nw;
        },
        set nw(value) {
            throw "Illegal Assignment";
        },

        get ne() {
            if (this._ne === undefined) {
                var bounds = this.next.clone();
                bounds.x += bounds.width / 2;
                bounds.y -= bounds.height / 2;
                this._ne = new _.QuadTree(bounds, this.level + 1);
            }
            return this._ne;
        },
        set ne(value) {
            throw "Illegal Assignment";
        },

        get se() {
            if (this._se === undefined) {
                var bounds = this.next.clone();
                bounds.x += bounds.width / 2;
                bounds.y += bounds.height / 2;
                this._se = new _.QuadTree(bounds, this.level + 1);
            }
            return this._se;
        },
        set se(value) {
            throw "Illegal Assignment";
        },

        get sw() {
            if (this._sw === undefined) {
                var bounds = this.next.clone();
                bounds.x -= bounds.width / 2;
                bounds.y += bounds.height / 2;
                this._sw = new _.QuadTree(bounds, this.level + 1);
            }
            return this._sw;
        },
        set sw(value) {
            throw "Illegal Assignment";
        },

        clear: function () {
            var stack = [this];
            while (stack.length > 0) {
                var quad = stack.pop();
                quad.objs = [];
                if (quad._nw) stack.push(quad._nw);
                if (quad._ne) stack.push(quad._ne);
                if (quad._sw) stack.push(quad._sw);
                if (quad._se) stack.push(quad._se);
            }
            return this;
        },

        insert: function (bounds) {
            var quad = this;
            while (quad !== undefined) {
                if (quad.nw.bounds.covers(bounds)) {
                    quad = quad.nw;
                } else if (quad.ne.bounds.covers(bounds)) {
                    quad = quad.ne;
                } else if (quad.sw.bounds.covers(bounds)) {
                    quad = quad.sw;
                } else if (quad.se.bounds.covers(bounds)) {
                    quad = quad.se;
                } else {
                    bounds.quad = quad;
                    quad.rects.push(bounds);
                    quad = undefined;
                }
            }
            return this;
        },

        update: function (bounds) {
            var quad = bounds.quad;
            var index = quad.rects.indexOf(bounds);
            quad.rects.splice(index, 1);
            bounds.quad = undefined;
            this.insert(bounds);
            return this;
        },

        select: function (bounds) {
            var rects = [];
            var stack = [this];
            while (stack.length >= 0) {
                var quad = stack.pop();
                if (quad.bounds.covers(bounds)) {
                    for (var i = 0; i < quad.rects.length; i++) {
                        if (quad.objs[i] !== bounds && quad.rects[i].intersects(bounds)) {
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
