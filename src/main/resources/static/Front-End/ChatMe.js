'use strict';

var SubmitDiv = document.querySelector('#submitDiv');
var ContactSection = document.querySelector('#Contact-Section');





var stompClient = null;
var UserName = null;

function connect(event) {
    UserName = document.querySelector('#name').value.trim();

    if(UserName) {
        SubmitDiv.classList.add('hide');
        ContactSection.classList.remove('hide');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, BeConnected, IfError);
    }
    event.preventDefault();
}


function BeConnected() {

    stompClient.subscribe('/topic/public', onMessageReceived);//=========== Add to the Public Topic

    // log username to the server
    stompClient.send("/app/chat.addUser",    //=========== log username to the server
        {},
        JSON.stringify({sender: UserName, type: 'JOIN'})
    )

    connectingElement.classList.add('hide');


}
var MessageInput = document.getElementById('MessageInput');

function SendMessage(e){
    var message = MessageInput.value.trim();
    if(message && stompClient) {
        var chatMessage = {
            sender: UserName,
            content: MessageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.SendMessage", {}, JSON.stringify(chatMessage));
        MessageInput.value = '';
    }
    e.preventDefault();

}

var messageArea = document.getElementById('MessagesUl');


function ReceiveMessage(e){

    var message = JSON.parse(payload.body);
    var li = document.createElement('li');

    if(message.type === 'JOIN') {
        li.classList.add('event-message');
        message.content = message.sender + ' joined!';
    }else if (message.type === 'LEAVE') {
        li.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        li.classList.add('ChatMSG');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = GetColor(message.sender);

        li.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        li.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    li.appendChild(textElement);

    messageArea.appendChild(li);
    messageArea.scrollTop = messageArea.scrollHeight;

}

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function GetColor(messageSender) {
    var cpt = 0;
    for (var i = 0; i < messageSender.length; i++) {
        cpt = 31 * cpt + messageSender.charCodeAt(i);
    }
    var index = Math.abs(cpt % colors.length);
    return colors[index];
}

var UserLoginForm = document.querySelector('#UserLginForm');
var Contact_Form = document.querySelector('#Contact_Form');


UserLoginForm.addEventListener('submit', connect, true)
Contact_Form.addEventListener('submit', SendMessage, true)

function IfError(e){
    connectingElement.textContent = '- PRESS F5 - failed to connect to the WebSocket ';
    connectingElement.style.color = 'red';
}


