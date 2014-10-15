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

    var c1 = new _.Circle(_.Vector.build(40,40), 40, _.Vector.build(11,10));
    var c2 = new _.Circle(_.Vector.build(240,240), 30, _.Vector.build(-5,-5));
    bodies.push(c1);
    bodies.push(c2);
    tree.insert(c1);
    tree.insert(c2);
    /*
    for (var i = 0; i < 2; i++) {
        var radius = _.rand(20, 20);
        var x = 100 + 60 * i;//_.rand(radius * 3, width - (radius * 3));
        var y = 100 + 60*i; //_.rand(radius * 3, height - (radius * 3));
        var velocity = _.Vector.build(_.rand(-2, 2), _.rand(-2, 2));
        var body = new _.Circle(_.Vector.build(x, y), radius, velocity);
        bodies.push(body);
        tree.insert(body);
    }
    */

    function clear() {
        context.clearRect(0, 0, width, height);
    };

    function update(dt) {
//        tree.clear();
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            _.Vector.add(body.center, body.velocity);
            bounce(body);
            collide(body);
            //tree.insert(body);
            tree.update(body);
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

    function collide(body) {
        var objs = tree.select(body);
        for (var j = 0; j < objs.length; j++) {
            var obj = objs[j];

            var dn = _.Vector.sub(body.center, obj.center, true);
            var sr = body.radius + obj.radius;
            var dx = _.Vector.mag(dn);

            if (dx < sr) {
                console.log(['hit', dx, sr]);

                // http://www.adambrookesprojects.co.uk/project/canvas-collision-elastic-collision-tutorial/
                var normal = _.Vector.normal(_.Vector.sub(obj.center, body.center, true));
                var tangent = _.Vector.build(-normal.y, normal.x);

                var bodyScalarNormal = _.Vector.dot(normal, body.velocity);
                var objScalarNormal = _.Vector.dot(normal, obj.velocity);

                var bodyScalarTangent = _.Vector.dot(tangent, body.velocity);
                var objScalarTangent = _.Vector.dot(tangent, obj.velocity);

                /*
                var m1 = body.mass();
                var m2 = obj.mass();
                var sm = m1 + m2;

                dn.normalize();

                var dt = _.Vector.build(dn.y, -dn.x);
                var mt = dn.clone().mul(body.radius + obj.radius - dx);

                body.center.add(mt.clone().mul(m2/sm));
                obj.center.add(mt.clone().mul(-m1/sm));

                var v1 = dn.clone().mul(body.velocity.dot(dn)).mag();
                var v2 = dn.clone().mul(obj.velocity.dot(dn)).mag();

                var cr = 1;

                body.velocity = dt.clone().mul(body.velocity.dot(dt));
                body.velocity.add(dn.clone().mul((cr * m2 * (v2 - v1) + m1 * v1 + m2 * v2) / sm));

                obj.velocity = dt.clone().mul(obj.velocity.dot(dt));
                obj.velocity.add(dn.clone().mul((cr * m1 * (v1 - v2) + m2 * v2 + m1 * v1) / sm));
                */
            }
            /*
            var m1 = 2 * Math.PI * body.radius;
            var v1 = body.velocity.clone();
            var m2 = 2 * Math.PI * obj.radius;
            var v2 = obj.velocity.clone();
            */
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
                for (var j = 0; j < objs.length; j++) {
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
        if (stop > 0) {
            requestAnimationFrame(frame);
        }
    };
    requestAnimationFrame(frame);

}(window.CUBE));
