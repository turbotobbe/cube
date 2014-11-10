/* global CUBE */
(function (cube, undefined) {
    'use strict';

    cube.X = 'x';
    cube.Y = 'y';
    cube.WEST = 'west';
    cube.EAST = 'east';
    cube.NORTH = 'north';
    cube.SOUTH = 'south';
    cube.WIDTH = 'width';
    cube.HEIGHT = 'height';
    cube.RADIUS = 'radius';
    cube.VELOCITY = 'velocity';
    cube.DENSITY = 'density';
    cube.AREA = 'area';
    cube.VOLUME = 'volume';
    cube.MASS = 'mass';

    /**
     * Generates a random number between min and max.
     *
     * @method rand
     * @param min {number} Min value
     * @param max {number} Max value
     * @returns {number} The random number
     */
    cube.rand = function (min, max) {
        return min + (Math.random() * (max - min));
    };

    cube.superGet = function (propName) {
        var desc = Object.getOwnPropertyDescriptor(arguments.callee()._super.prototype, propName);
        return desc.get.call(this);
    };

    cube.superSet = function (propName) {
        var desc = Object.getOwnPropertyDescriptor(arguments.callee()._super.prototype, propName);
        return desc.set.call(this);
    };

    cube.superCall = function (propName) {
        //var desc = Object.getOwnPropertyDescriptor(arguments.callee()._super.prototype, propName);
        console.log([propName, arguments]);
//    return desc.value.call(arguments.callee(), arguments.slice(1));
        return 'yalla';
    };

    cube.observe = function (subject, fn) {
        console.log(['observe', subject, fn]);
        /*
         subject._observers = subject._observers || [];
         subject._observers.push({
         me: arguments.callee(),
         fn: fn
         });
         */
    };

    cube.notify = function (subject, name) {
        if (subject._observers) {
            for (var i = 0; i < subject._observers.length; i++) {
                var observer = subject._observers[i];
                observer.fn.call(observer.me, name);
            }
        }
    };
}(CUBE));
