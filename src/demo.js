(function (_, undefined) {

    _.debug = {
        box: true,
        vel: true,
        grid: true,
        col: true,
        time: true
    };

    var board = document.getElementById('board');
    board.width = window.innerWidth;
    board.height = window.innerHeight;
    board.style['background-color'] = "#AAAAAA";

    var width = board.offsetWidth;
    var height = board.offsetHeight;
    var context = board.getContext('2d');

    var bodies = [];
    var tree = new _.QuadTree({n: 0, s: height, w: 0, e: width});

    for (var i = 0; i < 10; i++) {
        var radius = _.rand(10, 20);
        var x = _.rand(radius * 3, width - (radius * 3));
        var y = _.rand(radius * 3, height - (radius * 3));
        var velocity = new _.Vector(_.rand(-5, 5), _.rand(-5, 5));
        var body = new _.Circle(new _.Vector(x, y), radius, velocity);
        bodies.push(body);
        //tree.insert(body);
    }

    function clear() {
        context.clearRect(0, 0, width, height);
    };

    function update(dt) {
        tree.clear();
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            body.center.add(body.velocity);
            bounce(body);
            tree.insert(body);
            //tree.update(body);
        }
    };

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
    };

    function paint() {

        if (_.debug.time) {
            context.fillStyle = 'black';
            context.fillText(parseInt(time), 10, 20);
        }

        // paint balls
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            context.fillStyle = 'rgba(0,0,255, 0.5)';
            context.beginPath();
            context.arc(body.center.x, body.center.y, body.radius, 0, 2 * Math.PI);
            context.fill();

            if (_.debug.box) {
                var box = body.box();
                context.strokeStyle = 'red';
                context.lineWidth = 1;
                context.strokeRect(box.w, box.n, box.e - box.w, box.s - box.n);
            }

            if (_.debug.vel) {
                var mid = body.center;
                var vel = body.velocity;
                context.strokeStyle = 'red';
                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(mid.x, mid.y);
                context.lineTo(mid.x + vel.x, mid.y + vel.y);
                context.stroke();
                context.closePath();
            }

            if (_.debug.col) {
                var mid = body.center;
                var objs = tree.select(body);
                context.strokeStyle = 'rgba(0,0,255,0.3)';
                context.lineWidth = 1;
                for (var j=0; j<objs.length; j++) {
                    var obj = objs[j];
                    context.beginPath();
                    context.moveTo(mid.x, mid.y);
                    context.lineTo(obj.center.x, obj.center.y);
                    context.stroke();
                    context.closePath();
                }
            }
        }

        if (_.debug.grid) {
            var quads = [tree];
            while (quads.length > 0) {
                var quad = quads.pop();
                var box = quad.box;
                context.strokeStyle = 'rgba(100,100,100,0.3)';
                context.lineWidth = 1;
                context.strokeRect(box.w, box.n, box.e - box.w, box.s - box.n);
                if (quad.nw !== undefined) {
                    quads.push(quad.nw);
                }
                if (quad.ne !== undefined) {
                    quads.push(quad.ne);
                }
                if (quad.se !== undefined) {
                    quads.push(quad.se);
                }
                if (quad.sw !== undefined) {
                    quads.push(quad.sw);
                }
            }
        }
        /*
         var levels = [];
         var closed = [];
         for (var i = 0; i < bodies.length; i++) {
         var body = bodies[i];
         var box = body.box();
         closed.push(body);
         levels.push(body.quad.level);
         context.strokeStyle = 'red';
         context.lineWidth = 1;
         context.strokeRect(box.w, box.n, box.e - box.w, box.s - box.n);
         var candidates = tree.select(body);
         for (var j = 0; j < candidates.length; j++) {
         if (closed.indexOf(candidates[j]) > 0) {
         continue;
         }
         context.strokeStyle = 'rgba(0,100,0,0.5)';
         context.lineWidth = 2;
         context.beginPath();
         context.moveTo(bodies[i].center.x, bodies[i].center.y);
         context.lineTo(candidates[j].center.x, candidates[j].center.y);
         context.closePath();
         context.stroke();
         }
         }
         */
//      console.log(levels);

    };

    var stop = 5000; // 5 sek
    var time = null;

    function frame(now) {
        var dt = (time == null) ? 0 : now - time;
        clear();
        update(dt);
        paint();
        time = now;
        stop -= dt;
        if (stop>0) {
            requestAnimationFrame(frame);
        }
    };
    requestAnimationFrame(frame);

}(window.CUBE));
