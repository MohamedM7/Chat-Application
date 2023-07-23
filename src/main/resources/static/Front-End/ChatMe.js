'use strict';

var SubmitDiv = document.querySelector('#submitDiv');
var ContactSection = document.querySelector('#Contact-Section');




var stompClient = null;
var UserName = null;

function connect(event) {
    UserName = document.querySelector('#name').value.trim();

    if(UserNamesername) {
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
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        MessageInput.value = '';
    }
    e.preventDefault();

}

function ReceiveMessage(e){
    
    var message = JSON.parse(payload.body);
    var li = document.createElement('li');

    if(message.type === 'JOIN') {
        li.classList.add('event-message');
        message.content = message.sender + ' joined!';
    }

}

function IfError(e){
    connectingElement.textContent = '- PRESS F5 - failed to connect to the WebSocket ';
    connectingElement.style.color = 'red';
}


