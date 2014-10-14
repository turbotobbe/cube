/**
 * Some handy methods
 *
 * @class Util
 */

(function (_, undefined) {

    _.Util = {
        /**
         * Generates a random number between min and max.
         *
         * @method rand
         * @param min {number} Min value
         * @param max {number} Max value
         * @returns {number} The random number
         */
        rand: function (min, max) {
            return min + Math.random() * (max - min);
        }

    };

}(CUBE));
