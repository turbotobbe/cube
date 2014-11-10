/**
 * Licenced to me :)
 */

(function (DEMO, _, $, undefined) {

    var o = _.rect(1, 1, 1, 1);
    console.log(o.area());
    o.width = 2;
    console.log(o.area());
    o.height = 2;
    console.log(o.area());

    DEMO.games = {};
    DEMO.runs = [];

    // fix widths of all canvas
    $('canvas').each(function () {
        var width = $(this).parent().width();
        var height = width * 9 / 16;
        $(this).prop({width: width, height: height});
    });

    DEMO.Game = function (id) {
        this.id = id;
        this.canvas = document.getElementById(this.id);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context = this.canvas.getContext('2d');
        this.time = null;
    };

    DEMO.create = function (id) {
        DEMO.games[id] = new DEMO.Game(id);
        return DEMO.games[id];
    };

    DEMO.frame = function (now) {
        for (var i = 0; i < DEMO.runs.length; i++) {
            var game = DEMO.runs[i];
            var dt = (game.time == null) ? 0 : now - game.time;
            game.clear();
            game.update(dt);
            game.paint();
            game.time = now;
        }
        requestAnimationFrame(DEMO.frame);
    };

    requestAnimationFrame(DEMO.frame);

    // hook up start and stop
    $('canvas').click(function (e) {
        var id = $(this).attr('id');
        var game = DEMO.games[id];
        var index = DEMO.runs.indexOf(game);
        if (index < 0) {
            DEMO.runs.push(game);
        } else {
            DEMO.runs.splice(index);
        }
    });

}(window.DEMO = window.DEMO || {}, window.CUBE, jQuery));
