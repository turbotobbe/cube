(function (DEMO, _, undefined) {

    var game = DEMO.create('demo-balls');
    game.balls = [];
    game.balls.push(_.circle(_.vector(game.width/20, game.height/4), 20, _.vector(-6,-4)));
    game.balls.push(_.circle(_.vector(game.width/20*19,game.height/4*3), 20, _.vector(4,6)));

    game.clear = function() {
        for (var i=0; i<this.balls.length; i++) {
            var box = this.balls[i].box;
            this.context.clearRect(box.west-2, box.north-2, box.width+4, box.height+4);
        }
    };

    game.update = function(dt) {
        for (var i=0; i<this.balls.length; i++) {
            var ball = this.balls[i];
            ball.center.add(ball.velocity);
            ball.moved();
            var box = ball.box;
            if (box.west < 0) {
                ball.velocity.x = -ball.velocity.x;
                ball.center.x += ball.velocity.x;
                ball.moved();
            } else if (box.east > this.width) {
                ball.velocity.x = -ball.velocity.x;
                ball.center.x += ball.velocity.x;
                ball.moved();
            }
            if (box.north < 0) {
                ball.velocity.y = -ball.velocity.y;
                ball.center.y += ball.velocity.y;
                ball.moved();
            } else if (box.south > this.height) {
                ball.velocity.y = -ball.velocity.y;
                ball.center.y += ball.velocity.y;
                ball.moved();
            }
        }
        var ballA = this.balls[0];
        var ballB = this.balls[1];
        var radiusAB = ballA.radius + ballB.radius;
        var magnitudeAB = ballA.center.subtract(ballB.center, true).magnitude;

        if (magnitudeAB < radiusAB) {
            console.log([radiusAB, magnitudeAB]);
        }
    };

    game.paint = function() {
        var ctx = this.context;
        for (var i=0; i<this.balls.length; i++) {
            var ball = this.balls[i];
            ctx.fillStyle = 'rgba(0,0,255, 0.5)';
            ctx.beginPath();
            ctx.arc(ball.center.x, ball.center.y, ball.radius, 0, 2 * Math.PI);
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'red';
            ctx.strokeRect(ball.box.west, ball.box.north, ball.box.width, ball.box.height);
            ctx.beginPath();
            ctx.moveTo(ball.center.x, ball.center.y);
            ctx.lineTo(ball.center.x+ball.velocity.x, ball.center.y+ball.velocity.y);
            ctx.closePath();
            ctx.stroke();
        }
    };

}(window.DEMO, window.CUBE));
