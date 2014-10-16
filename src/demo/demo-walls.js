(function (DEMO, _, undefined) {

    var game = DEMO.create('demo-walls');

    game.canvas = document.getElementById(game.id);
    game.width = game.canvas.width;
    game.height = game.canvas.height;
    game.context = game.canvas.getContext('2d');
    game.ball = new _.Circle(_.Vector.build(game.width/20,game.height/2), 10, _.Vector.build(4,6));
    game.time = null;
    game.running = false;
    console.log([game.width, game.height]);
    game.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height);
    };

    game.update = function(dt) {
        var ball = this.ball;
        _.Vector.add(ball.center, ball.velocity);
        var box = ball.box();
        if (box.w < 0) {
            ball.velocity.x = -ball.velocity.x;
            ball.center.x += ball.velocity.x;
        } else if (box.e > this.width) {
            ball.velocity.x = -ball.velocity.x;
            ball.center.x += ball.velocity.x;
        }
        if (box.n < 0) {
            ball.velocity.y = -ball.velocity.y;
            ball.center.y += ball.velocity.y;
        } else if (box.s > this.height) {
            ball.velocity.y = -ball.velocity.y;
            ball.center.y += ball.velocity.y;
        }
    };

    game.paint = function() {
        var ball = this.ball;
        this.context.fillStyle = 'rgba(0,0,255, 0.5)';
        this.context.beginPath();
        this.context.arc(ball.center.x, ball.center.y, ball.radius, 0, 2 * Math.PI);
        this.context.fill();
    };

    game.frame = function(now) {
        var dt = (this.time == null) ? 0 : now - this.time;
        game.clear();
        game.update(dt);
        game.paint();
        game.time = now;
        if (game.running) {
            requestAnimationFrame(game.frame);
        }
    };

    game.halt = function() {
        this.running = false;
    };

    game.toggle = function() {
        this.running = !this.running;
        if (this.running) {
            requestAnimationFrame(game.frame);
        }
    };

    requestAnimationFrame(game.frame);
}(window.DEMO, window.CUBE));
