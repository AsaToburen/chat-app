(function() {

    var socket = io();

    socket.on('connect', function() {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    var msgForm = document.getElementById('msgForm');
    var messageList = document.getElementById('messages');



    msgForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var textarea = document.getElementById('message');

        createMessage(textarea.value);

        socket.emit('msg', {
            msg: textarea.value
        });

        textarea.value = "";
    });


    function createMessage(msg) {

        var li = document.createElement('li');
        var liText = document.createTextNode(msg);
        li.appendChild(liText);
        messageList.appendChild(li);
    }

})();
