/**
 * The Vector module
 *
 * @class Vector
 */
(function (_, undefined) {

    _.Vector = {

        /**
         * Build a new Vector.
         *
         * @method build
         * @param x {number} x coordinate
         * @param y {number} y coordinate
         * @returns {Object} A Vector
         */
        build: function (x, y) {
            return { x: x, y: y };
        },

        /**
         * Clone a Vector.
         *
         * @method clone
         * @param vector {object} The Vector to clone.
         * @returns {object} A Vector
         */
        clone: function(vector) {
            return { x: vector.x, y: vector.y };
        },

        /**
         * Negate a Vector.
         *
         * @method neg
         * @param vector {object} The Vector to negate.
         * @param [clone=false] {boolean} Clone Vector.
         * @returns {object} A Vector
         */
        neg: function (vector, clone) {
            var obj = clone ? {x: undefined, y: undefined} : vector;
            obj.x = -vector.x;
            obj.y = -vector.y;
            return obj;
        },

        /**
         * Add vector A and vector B.
         *
         * @method add
         * @param vectorA {object} The Vector to add to.
         * @param vectorB {object} The Vector to add.
         * @param [clone=false] {boolean} Clone Vector A.
         * @returns {object} A Vector
         */
        add: function (vectorA, vectorB, clone) {
            var obj = clone ? {x: undefined, y: undefined} : vectorA;
            obj.x = vectorA.x + vectorB.x;
            obj.y = vectorA.y + vectorB.y;
            return obj;
        },

        /**
         * Subtract vector B from vector A.
         *
         * @method sub
         * @param vectorA {object} The Vector to subtract from.
         * @param vectorB {object} The Vector to subtract.
         * @param [clone=false] {boolean} Clone Vector A.
         * @returns {object} A Vector
         */
        sub: function (vectorA, vectorB, clone) {
            var obj = clone ? {x: undefined, y: undefined} : vectorA;
            obj.x = vectorA.x - vectorB.x;
            obj.y = vectorA.y - vectorB.y;
            return obj;
        },

        /**
         * Multiplies a Vector with a Scalar.
         *
         * @method mul
         * @param vector {object} The Vector to multiply.
         * @param scalar {object} A Scalar to multiply with..
         * @param [clone=false] {boolean} Clone Vector A.
         * @returns {object} A Vector
         */
        mul: function (vector, scalar, clone) {
            var obj = clone ? {x: undefined, y: undefined} : vector;
            obj.x = vector.x * scalar;
            obj.y = vector.y * scalar;
            return obj;
        },

        /**
         * Divide a Vector with a Scalar.
         *
         * @method div
         * @param vector {object} The Vector to divide.
         * @param scalar {number} The scalar to divide with.
         * @param [clone=false] {boolean} Clone Vector A.
         * @returns {object} A Vector
         */
        div: function (vector, scalar, clone) {
            var obj = clone ? {x: undefined, y: undefined} : vector;
            obj.x = vector.x / scalar;
            obj.y = vector.y / scalar;
            return obj;
        },

        /**
         * Get the normal Vector.
         *
         * @method normal
         * @param vector {object} A vector
         * @param [clone=false] {boolean} Clone Vector A.
         * @returns {object} A Vector
         */
        normal: function (vector, clone) {
            var obj = clone ? {x: undefined, y: undefined} : vector;
            var scalar = this.mag(obj);
            return this.div(obj, scalar, clone);
        },

        /**
         * Calculate the magnitude (length) of a Vector.
         *
         * @method mag
         * @param vector {object} A Vector
         * @returns {number} A Scalar
         */
        mag: function (vector) {
            return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
        },

        /**
         * Calculate the dot product of vector A and vector B.
         *
         * @method dot
         * @param vectorA {object} A Vector.
         * @param vectorB {object} A Vector.
         * @returns {number} A Scalar
         */
        dot: function (vectorA, vectorB) {
            return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
        },

        /**
         * Calculate the cross product of vector A and vector B.
         *
         * @method cross
         * @param vectorA {object} A Vector.
         * @param vectorB {object} A Vector.
         * @returns {number} A Scalar
         */
        cross: function (vectorA, vectorB) {
            return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
        }

    };

}(CUBE));
