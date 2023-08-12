'use strict';

var SubmitDiv = document.querySelector('#submitDiv');
var ContactSection = document.querySelector('#ContactSection');
var MessageInput = document.querySelector('#MessageInput');






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

var connectingElement = document.querySelector('.OnLine');
function BeConnected() {

    stompClient.subscribe('/topic/public', ReceiveMessage);//=========== Add to the Public Topic

    // log username to the server
    stompClient.send("/app/ChatMe.AddUser",    //=========== log username to the server
        {},
        JSON.stringify({sender: UserName, message_type: 'JOIN'})
    )

    connectingElement.classList.add('hide');
}

function IfError(e){
    connectingElement.textContent = '- PRESS F5 - failed to connect to the WebSocket ';
    connectingElement.style.color = 'red';
}

function SendMessage(event){
    var MessageObject = MessageInput.value.trim();

    if(MessageObject && stompClient) {
        var chatMessage = {
            sender: UserName,
            message: MessageObject,
            message_type: 'CHAT'
        };
        stompClient.send("/app/ChatMe.SendMessage", {}, JSON.stringify(chatMessage));
            console.log("MessageObject.message ========================= "+chatMessage.message);

        MessageInput.value = '';
    }
    event.preventDefault();

}

var messageArea = document.getElementById('MessagesUl');


function ReceiveMessage(payload){

    var message = JSON.parse(payload.body);
    console.log("hiiiii iam there  "+payload.body);
    var li = document.createElement('li');

    if(message.message_type === 'JOIN') {
        li.classList.add('EventMessage');
        message.message = message.sender + ' is Online';
    }else if (message.message_type === 'LEAVE') {
        li.classList.add('EventMessage');
        message.message = message.sender + ' Disconnected';
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
    var messageText = document.createTextNode(message.message);/* modifide */
    console.log("++++++++++++ "+message.message);
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

var UserLoginForm = document.querySelector('#UserLoginForm');
var Contact_Form = document.querySelector('#ContactForm');


UserLoginForm.addEventListener('submit', connect, true)
Contact_Form.addEventListener('submit', SendMessage, true)




