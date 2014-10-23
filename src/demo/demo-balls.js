(function (DEMO, _, undefined) {

    var game = DEMO.create('demo-balls');
    game.balls = [];
    game.balls.push(new _.Circle(_.Vector.build(game.width/20,game.height/4), 10, _.Vector.build(-6,-4)));
    game.balls.push(new _.Circle(_.Vector.build(game.width/20*19,game.height/4*3), 10, _.Vector.build(4,6)));

    game.clear = function() {
        for (var i=0; i<this.balls.length; i++) {
            var box = this.balls[i].box();
            this.context.clearRect(box.w-1, box.n-1, box.e-box.w+2, box.s-box.n+2);
        }
    };

    game.update = function(dt) {
        for (var i=0; i<this.balls.length; i++) {
            var ball = this.balls[i];
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
        }
        var ballA = this.balls[0];
        var ballB = this.balls[1];
        var radiusAB = ballA.radius + ballB.radius;
        var vectorAB = _.Vector.clone(ballA.center);
        _.Vector.sub(vectorAB, ballB.center);
        var magnitudeAB = _.Vector.mag(vectorAB);

        if (magnitudeAB < radiusAB) {
            console.log([radiusAB, magnitudeAB]);
        }
    };

    game.paint = function() {
        for (var i=0; i<this.balls.length; i++) {
            var ball = this.balls[i];
            this.context.fillStyle = 'rgba(0,0,255, 0.5)';
            this.context.beginPath();
            this.context.arc(ball.center.x, ball.center.y, ball.radius, 0, 2 * Math.PI);
            this.context.fill();
        }
    };

}(window.DEMO, window.CUBE));
