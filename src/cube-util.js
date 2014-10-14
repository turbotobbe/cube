(function (_, undefined){

  _.rand = function(min, max) {
    return min + Math.random() * (max-min);
  };

}(window.CUBE = window.CUBE || {}));
