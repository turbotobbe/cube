/**
 * The QuadTree class.
 *
 * @class QuadTree
 */
(function (_, undefined) {

    /**
     * Create a new QuadTree.
     *
     * @class QuadTree
     * @constructor
     * @param box {object} The outer box
     * @param [level=0] {number} The level if the QuadTree
     */
    _.QuadTree = function (box, level) {
        this.box = box; // TODO clone rect
        this.lev = level || 0;
        this.ver = box.n + ((box.s - box.n) / 2);
        this.hor = box.w + ((box.e - box.w) / 2);

        this.nw = undefined;
        this.ne = undefined;
        this.se = undefined;
        this.sw = undefined;

        this.objs = [];
    };

    /**
     * Insert a body into the QuadTree.
     *
     * @method insert
     * @param body {object} The body to insert.
     * @param [box=body.box()] The bounding box.
     * @returns {QuadTree}
     */
    _.QuadTree.prototype.insert = function (body, box) {

        var b = box || body.box();
        var quad = this;
        while (quad !== undefined) {

            var boxNW = { n: quad.box.n, s: quad.ver, w: quad.box.w, e: quad.hor };
            var boxNE = { n: quad.box.n, s: quad.ver, w: quad.hor, e: quad.box.e };
            var boxSE = { n: quad.ver, s: quad.box.s, w: quad.hor, e: quad.box.e };
            var boxSW = { n: quad.ver, s: quad.box.s, w: quad.box.w, e: quad.hor };

            if (_.QuadTree.contains(boxNW, b)) {
                quad.nw = quad.nw || new _.QuadTree(boxNW, quad.lev + 1);
                quad = quad.nw;
            } else if (_.QuadTree.contains(boxNE, b)) {
                quad.ne = quad.ne || new _.QuadTree(boxNE, quad.lev + 1);
                quad = quad.ne;
            } else if (_.QuadTree.contains(boxSE, b)) {
                quad.se = quad.se || new _.QuadTree(boxSE, quad.lev + 1);
                quad = quad.se;
            } else if (_.QuadTree.contains(boxSW, b)) {
                quad.sw = quad.sw || new _.QuadTree(boxSW, quad.lev + 1);
                quad = quad.sw;
            } else {
                body.quad = quad;
                quad.objs.push(body);
                quad = undefined;
            }
        }
        return this;
    };

    /**
     * Update the body in the QuadTree.
     *
     * @method update
     * @param body {object} The body to update.
     * @param [box=body.box()] The bounding box.
     * @returns {QuadTree}
     */
    _.QuadTree.prototype.update = function (body, box) {
        var b = box || body.box();
        var quad = body.quad;

        // remove previous
        var index = quad.objs.indexOf(body);
        if (index >= 0) {
            quad.objs.splice(index, 1);
        }
        body.quad = undefined;

        // reinsert
        this.insert(body);

        return this;
    };

    /**
     * clear the QuadTree from bodies.
     *
     * @method clear
     * @returns {QuadTree}
     */
    _.QuadTree.prototype.clear = function () {
        var stack = [this];
        while (stack.length > 0) {
            var quad = stack.pop();
            quad.objs = [];
            if (quad.nw) stack.push(quad.nw);
            if (quad.ne) stack.push(quad.ne);
            if (quad.se) stack.push(quad.se);
            if (quad.sw) stack.push(quad.sw);
        }
        return this;
    };

    /*
     _.QuadTree.prototype.remove = function (body) {
     var quad = this.lookup(body);
     var index = quad.objs.indexOf(body);
     if (index >= 0) {
     quad.objs.splice(index, 1);
     }
     body.quad = undefined;
     };
     */

    /**
     * Select the collicion candidates for the body.
     *
     * @method select
     * @param body {object} The body.
     * @param [box=body.box()} The bounding box.
     * @returns {Array} The candidates.
     */
    _.QuadTree.prototype.select = function (body, box) {
        var b = box || body.box();
        var objs = [];
        var stack = [this];
        while (stack.length > 0) {
            var quad = stack.pop();
            if (_.QuadTree.contains(quad.box, b)) {

                for (var i = 0; i < quad.objs.length; i++) {
                    var obj = quad.objs[i];
                    if (obj !== body && _.QuadTree.overlap(obj.box(), b)) {
                        objs.push(obj);
                    }
                }
                //Array.prototype.push.apply(objs, quad.objs);
                if (quad.nw) stack.push(quad.nw);
                if (quad.ne) stack.push(quad.ne);
                if (quad.se) stack.push(quad.se);
                if (quad.sw) stack.push(quad.sw);
            }
        }
        return objs;

        // add up the tree
        var quad = (body.quad === undefined) ? undefined : body.quad.parent;
        while (quad != undefined) {
            objs = Array.prototype.concat.apply(objs, quad.objs);
            quad = quad.parent;
        }

        // add down the tree
        var quads = [body.quad];
        while (quads.length > 0) {
            quad = quads.pop();
            if (quad.nw) quads.push(quad.nw);
            if (quad.ne) quads.push(quad.ne);
            if (quad.se) quads.push(quad.se);
            if (quad.sw) quads.push(quad.sw);
            objs = Array.prototype.concat.apply(objs, quad.objs);
        }

        // remove self reference
        var index = objs.indexOf(body);
        if (index >= 0) {
            objs.splice(index, 1);
        }
        return objs;
    };

    /**
     * Check if box A fully contains box B
     *
     * @method contains
     * @param boxA {object} A box.
     * @param boxB {object} A box.
     * @returns {boolean} True if box A full contains box B. false otherwise.
     */
    _.QuadTree.contains = function (boxA, boxB) {
        return boxA.n < boxB.n && boxA.s > boxB.s && boxA.w < boxB.w && boxA.e > boxB.e;
    };

    /**
     * Check if box A overlap at all with box B
     * @method overlap
     * @param boxA {object} A box.
     * @param boxB {object} A box.
     * @returns {boolean} True if box A overlaps box B. false otherwise.
     */
    _.QuadTree.overlap = function (boxA, boxB) {
        return (boxA.n > boxB.s || boxA.s < boxB.n || boxA.w > boxB.e || boxA.e < boxB.w) === false;
    };
}(CUBE));
