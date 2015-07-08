(function() {

    var socket = io();

    socket.on('connect', function() {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    var userData = {
        name: ''
    };

    var userInfoForm = document.getElementById('userInfo');
    var msgForm = document.getElementById('msgForm');
    var messageList = document.getElementById('messages');


    //get users name and clear input after submitted

    userInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var nameInput = document.getElementById('userName');
        userData.name = nameInput.value;
        nameInput.value = '';
    });

    //listen for users submitting a message

    msgForm.addEventListener('submit', function(e) {

        e.preventDefault();

        var textarea = document.getElementById('message');

        createMessage(textarea.value, userData.name);

         var newMsg = {user: userData.name, msg: textarea.value};

        socket.emit('msg', newMsg);

        textarea.value = "";
    });


    //when data is recieved create message

    socket.on('receive', function(data) {

        createMessage(data.msg, data.user);

    });


    function createMessage(msg, userName) {

        var msgContent = document.createElement('li');
        var msgName = document.createElement('h2');
        var msgText = document.createElement('p');

        var newName = document.createTextNode(userName);
        var newText = document.createTextNode(msg);

        msgName.appendChild(newName);
        msgText.appendChild(newText);

        msgContent.appendChild(msgName);
        msgContent.appendChild(msgText);

        messageList.appendChild(msgContent);
    }

})();
