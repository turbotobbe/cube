(function (_, undefined) {

    var board = document.getElementById('board');
    //board.width = window.innerWidth;
    //board.height = window.innerHeight;
    board.style['background-color'] = "#AAAAAA";

    var width = board.offsetWidth;
    var height = board.offsetHeight;
    var context = board.getContext('2d');

    var velBalls = _.Vector.build(_.Util.rand(-1, 1), _.Util.rand(-1, 1));
    var velRects =  _.Vector.neg(velBalls, true);

    var iconBalls = new _.Circle(_.Vector.build(width / 2, height / 2), 30, velBalls);
    iconBalls.label = "Balls";
    iconBalls.href = "balls.html";

    var iconRects = new _.Circle(_.Vector.build(width / 2, height / 2), 30, velRects);
    iconRects.label = "Rects";
    iconRects.href = "rects.html";

    var bodies = [];
    bodies.push(iconBalls);
    bodies.push(iconRects);

    var tree = new _.QuadTree({n: 0, s: height, w: 0, e: width});
    for (var i = 0; i < bodies.length; i++) {
        tree.insert(bodies[i]);
    }

    function clear() {
        context.clearRect(0, 0, width, height);
    }

    function update(dt) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            _.Vector.add(body.center, body.velocity);
            bounce(body);
            tree.update(body);
        }
    }

    function bounce(body) {
        var box = body.box();
        if (box.w < 0) {
            body.velocity.x = -body.velocity.x;
            body.center.x += body.velocity.x;
        } else if (box.e > width) {
            body.velocity.x = -body.velocity.x;
            body.center.x += body.velocity.x;
        }
        if (box.n < 0) {
            body.velocity.y = -body.velocity.y;
            body.center.y += body.velocity.y;
        } else if (box.s > height) {
            body.velocity.y = -body.velocity.y;
            body.center.y += body.velocity.y;
        }
    }

    function paint() {

        // paint balls
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            context.strokeStyle = 'rgba(0,0,0, 0.3)';
            context.lineWidth = 5;
            context.beginPath();
            context.arc(body.center.x, body.center.y, body.radius, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();

            var tw = context.measureText(body.label).width;
            context.font = "10pt Courier";
            context.textAlign = 'middle';
            context.lineWidth = 1;
            context.strokeText(body.label, body.center.x-(tw/2), body.center.y+5);
        }
    }

    var time = null;

    function frame(now) {
        var dt = (time == null) ? 0 : now - time;
        clear();
        update(dt);
        paint();
        time = now;
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

}(window.CUBE));
