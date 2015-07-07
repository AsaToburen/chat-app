
(function(){

var socket = io();

socket.on('connect', function() {
    socket.emit('load');
});

var msgForm = document.getElementById('msgForm');
var messageList = document.getElementById('messages');
var textarea = document.getElementById('message');


msgForm.addEventListener('submit', function(e) {
    e.preventDefault();

    console.log('submitted');

    createChatMessage(textarea.value);

    socket.emit('msg', {
        msg: textarea.value
    });

    textarea.value = "";
});


function createChatMessage(msg) {

    var who = '';

    var li = document.createElement('li');
    var liText = document.createTextNode(msg);
    li.appendChild(liText);


    console.log(li);
    messageList.appendChild(li);

}

})();