(function (DEMO, _, undefined) {

    var game = DEMO.create('demo-walls');
    game.ball = _.circle(_.vector(game.width/20,game.height/2), 20, _.vector(4,6));
    game.ball.center.add(game.ball.velocity);
    console.log([game.ball.box.center.x, game.ball.center.x]);

    game.clear = function() {
        var box = this.ball.box;
        this.context.clearRect(box.west-2, box.north-2, box.width+4, box.height+4);
    };

    game.update = function(dt) {
        var ball = this.ball;
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
    };

    game.paint = function() {
        var ball = this.ball;
        this.context.fillStyle = 'rgba(0,0,255, 0.5)';
        this.context.beginPath();
        this.context.arc(ball.center.x, ball.center.y, ball.radius, 0, 2 * Math.PI);
        this.context.fill();

        this.context.lineWidth = 1;
        this.context.strokeStyle = 'red';
        this.context.strokeRect(ball.box.west, ball.box.north, ball.box.width, ball.box.height);
        this.context.beginPath();
        this.context.moveTo(ball.center.x, ball.center.y);
        this.context.lineTo(ball.center.x+ball.velocity.x, ball.center.y+ball.velocity.y);
        this.context.closePath();
        this.context.stroke();
    };

}(window.DEMO, window.CUBE));
