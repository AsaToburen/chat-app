module.exports = function(app, io) {

    app.get('/', function(req, res) {

        res.render('home');

    });

    app.get('/chat/', function(req, res) {

        res.render('chat');

    });

    var chat = io.on('connection', function(socket) {

        socket.on('msg', function(data) {

            // When the server receives a message, it sends it to the other person in the room.
            socket.broadcast.emit('receive', {
                msg: data.msg,
                user: data.user,
                img: data.img
            });
        });
    });
};
