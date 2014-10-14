/**
 * Class QuadTree
 */
(function (_, undefined) {

    _.QuadTree = function (box, parent, level) {
        this.box = box; // {n:0, s:400, w:0, e:800}
        this.parent = parent;
        this.level = level || 0;
        this.ver = box.n + ((box.s - box.n) / 2);
        this.hor = box.w + ((box.e - box.w) / 2);

        this.nw = undefined;
        this.ne = undefined;
        this.se = undefined;
        this.sw = undefined;

        this.objs = [];
    };

    _.QuadTree.prototype.insert = function (body, box) {

        var b = box || body.box();
        var quad = this;
        while (quad !== undefined) {

            var boxNW = { n: quad.box.n, s: quad.ver, w: quad.box.w, e: quad.hor };
            var boxNE = { n: quad.box.n, s: quad.ver, w: quad.hor, e: quad.box.e };
            var boxSE = { n: quad.ver, s: quad.box.s, w: quad.hor, e: quad.box.e };
            var boxSW = { n: quad.ver, s: quad.box.s, w: quad.box.w, e: quad.hor };

            if (_.QuadTree.contains(boxNW, b)) {
                quad.nw = quad.nw || new _.QuadTree(boxNW, quad, quad.level+1);
                quad = quad.nw;
            } else if (_.QuadTree.contains(boxNE, b)) {
                quad.ne = quad.ne || new _.QuadTree(boxNE, quad, quad.level+1);
                quad = quad.ne;
            } else if (_.QuadTree.contains(boxSE, b)) {
                quad.se = quad.se || new _.QuadTree(boxSE, quad, quad.level+1);
                quad = quad.se;
            } else if (_.QuadTree.contains(boxSW, b)) {
                quad.sw = quad.sw || new _.QuadTree(boxSW, quad, quad.level+1);
                quad = quad.sw;
            } else {
                body.quad = quad; // reference to quad
                quad.objs.push(body);
                quad = undefined;
            }
        }
    };

    _.QuadTree.prototype.update = function (body, box) {

        var b = box || body.box();
        var quad = body.quad;
        quad.remove(body);
        body.quad = undefined;
        this.insert(body);
        /*
        while (quad.parent !== undefined && _.QuadTree.contains(quad.box, b) === false) {
            // find a parent that contains the new bounds
            // stop at the top quad
            quad = quad.parent;
        }
        // insert the new bounds
        quad.insert(body, b);
        */
    };

    _.QuadTree.prototype.remove = function (body) {
        var quad = body.quad;
        var index = quad.objs.indexOf(body);
        if (index >= 0) {
            quad.objs.splice(index, 1);
        }
        body.quad = undefined;
    };

    _.QuadTree.prototype.select = function (body, box) {

        var objs = [];

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

    /*
     * helper methods
     */

    /**
     * Check if boxA fully contains boxB
     * @param boxA
     * @param boxB
     * @returns {boolean}
     */
    _.QuadTree.contains = function (boxA, boxB) {
        return boxA.n < boxB.n && boxA.s > boxB.s && boxA.w < boxB.w && boxA.e > boxB.e;
    };

}(window.CUBE = window.CUBE || {}));