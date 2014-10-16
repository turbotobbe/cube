/**
 * Licenced to me :)
 */

(function(DEMO, _, $, undefined){

  // fix widths of all canvas
  $('canvas').each(function(){
    $(this).width($(this).parent().width());
  });

  DEMO.Game = function(id) {
    this.id = id;
  };

  DEMO.Game.prototype.init = function() {
    console.log('init ' + this.id + " ...");
  };
  DEMO.Game.prototype.halt = function() {
    console.log('halt ' + this.id + " ...");
  };
  DEMO.Game.prototype.resume = function() {
    console.log('resume ' + this.id + " ...");
  };

  DEMO.create = function (id) {
    DEMO.games[id] = new DEMO.Game(id);
    return DEMO.games[id];
  };

  // hook up start and stop
  $('canvas').click(function(e){
    var id = $(this).attr('id');
    DEMO.start(id);
  });

  DEMO.games = [];
  DEMO.start = function(id) {
    var game = DEMO.games[id];
    for (var key in DEMO.games) {
      if (DEMO.games[id] !== DEMO.games[key]) {
        DEMO.games[key].halt();
      }
    }
    DEMO.games[id].toggle();
  };

}(window.DEMO = window.DEMO || {}, window.CUBE, jQuery));
