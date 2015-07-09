(function() {

    var socket = io();

    socket.on('connect', function() {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    var userData = {
        name: '',
        img: '../images/default-avatar.png'
    };

    var otherData = {
        name: '',
        img: ''
    };

    //cropping file image upload

    var uploadBtn = document.getElementById('userUpload');

    uploadBtn.addEventListener('click', function(e) {

        e.preventDefault();

        filepicker.setKey("AhxfMjnORKi1EMgCdW5ERz");

        filepicker.pick({
            mimetype: 'image/*',
            /* Images only */
            maxSize: 150 * 150 * 5,
            imageMax: [150, 150],
            /* 150x150px */
            cropRatio: 1 / 1,
            /* Perfect squares */
            services: ['*'] /* All available third-parties */
        }, function(blob) {
            console.log(blob);
            userData.img = blob.url;
            if (blob.url !== '') {
                uploadBtn.style.backgroundColor = '#66CDAA';
            }
        });
    });


    var userInfoForm = document.getElementById('userInfo');
    var msgForm = document.getElementById('msgForm');
    var messageList = document.getElementById('messages');


    //get users name and clear input after submitted

    userInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var nameInput = document.getElementById('userName');

        userData.name = nameInput.value;

        console.log(userData);

        if (userData.name == null || userData.name == '') {
            alert("Please enter a name");
            return false;
        } else if (userData.img == '') {
            alert("Please upload an image or avatar");
            return false;
        }

        // clear name input and hide the login display

        nameInput.value = '';
        var loginSection = document.getElementById('login');
        var chatSection = document.getElementById('chat');
        loginSection.style.display = 'none';
        chatSection.style.display = 'block';

        //add the users name to the display
        var aside = document.getElementById('aside');
        var userTitle = document.createElement('h1');
        var newName = document.createTextNode('Hi ' + userData.name);
        userTitle.appendChild(newName);
        aside.appendChild(userTitle);
    });

    //listen for users submitting a message

    msgForm.addEventListener('submit', function(e) {

        e.preventDefault();

        var textarea = document.getElementById('message');

        createMessage(textarea.value, userData.name, userData.img);

        var newMsg = {
            user: userData.name,
            msg: textarea.value,
            img: userData.img
        };

        socket.emit('msg', newMsg);

        textarea.value = "";
    });


    //when data is recieved create message

    socket.on('receive', function(data) {

        createMessage(data.msg, data.user, data.img);

    });

    function addOtherName() {
        var aside = document.getElementById('aside');
        var otherEl = document.createElement('p');
        var otherTitle = document.createTextNode('You are now chatting with ' + otherData.name);
        otherEl.appendChild(otherTitle);
        aside.appendChild(otherEl);
    }


    function createMessage(msg, userName, imgUrl) {

        var msgItem = document.createElement('li');
        var msgName = document.createElement('h2');
        var msgText = document.createElement('p');
        var msgImg = document.createElement('img');

        var newName = document.createTextNode(userName);
        var newText = document.createTextNode(msg);
        msgImg.setAttribute('src', imgUrl);


        msgName.appendChild(newName);
        msgText.appendChild(newText);

        msgItem.appendChild(msgImg);
        msgItem.appendChild(msgText);
        msgItem.appendChild(msgName);



        if (userName === userData.name) {
            userName = 'You';
            msgItem.className = 'user';
        } else {
            otherData.name = userName;
            msgItem.className = 'other';
            addOtherName();
        }

        messageList.appendChild(msgItem);

        console.log(messageList.childNodes);
    }

})();
