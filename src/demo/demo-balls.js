(function (DEMO, _, undefined) {

  var game = DEMO.create('demo-balls');
  game.balls = [];
  game.balls.push(_.circle(game.width / 20, game.height / 4, 20, _.vector(-6, -4)));
  game.balls.push(_.circle(game.width / 20 * 19, game.height / 4 * 3, 20, _.vector(4, 6)));

  game.clear = function () {
    for (var i = 0; i < this.balls.length; i++) {
      var bounds = this.balls[i].bounds;
      this.context.clearRect(bounds.west - 2, bounds.north - 2, bounds.width + 4, bounds.height + 4);
    }
  };

  game.update = function (dt) {
    for (var i = 0; i < this.balls.length; i++) {
      var ball = this.balls[i];
      ball.bounds.add(ball.velocity);
      var bounds = ball.bounds;
      if (bounds.west < 0) {
        ball.velocity.x = -ball.velocity.x;
        ball.bounds.x += ball.velocity.x;
      } else if (bounds.east > this.width) {
        ball.velocity.x = -ball.velocity.x;
        ball.bounds.x += ball.velocity.x;
      }
      if (bounds.north < 0) {
        ball.velocity.y = -ball.velocity.y;
        ball.bounds.y += ball.velocity.y;
      } else if (bounds.south > this.height) {
        ball.velocity.y = -ball.velocity.y;
        ball.bounds.y += ball.velocity.y;
      }
    }
    var ballA = this.balls[0];
    var ballB = this.balls[1];
    var radiusAB = ballA.radius + ballB.radius;
    var magnitudeAB = ballA.bounds.subtract(ballB.bounds, true).magnitude;

    if (magnitudeAB < radiusAB) {
      console.log([radiusAB, magnitudeAB]);
    }
  };

  game.paint = function () {
    var ctx = this.context;
    for (var i = 0; i < this.balls.length; i++) {
      var ball = this.balls[i];
      ctx.fillStyle = 'rgba(0,0,255, 0.5)';
      ctx.beginPath();
      ctx.arc(ball.bounds.x, ball.bounds.y, ball.radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.strokeRect(ball.bounds.west, ball.bounds.north, ball.bounds.width, ball.bounds.height);
      ctx.beginPath();
      ctx.moveTo(ball.bounds.x, ball.bounds.y);
      ctx.lineTo(ball.bounds.x + ball.velocity.x, ball.bounds.y + ball.velocity.y);
      ctx.closePath();
      ctx.stroke();
    }
  };

}(window.DEMO, window.CUBE));
