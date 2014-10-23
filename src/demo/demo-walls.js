(function (DEMO, _, undefined) {

    var game = DEMO.create('demo-walls');
    game.ball = new _.Circle(_.Vector.build(game.width/20,game.height/2), 10, _.Vector.build(4,6));

    game.clear = function() {
        var box = this.ball.box();
        this.context.clearRect(box.w, box.n, box.e-box.w, box.s-box.n);
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

}(window.DEMO, window.CUBE));
