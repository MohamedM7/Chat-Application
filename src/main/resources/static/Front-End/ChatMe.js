'use strict';

var SubmitDiv = document.querySelector('#submitDiv');
var ContactSection = document.querySelector('#Contact-Section');




var stompClient = null;
var UserName = null;

function connect(event) {
    UserName = document.querySelector('#name').value.trim();

    if(UserNamesername) {
        SubmitDiv.classList.add('hidden');
        ContactSection.classList.remove('hidden');

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

function SendMessage(e){

}

function ReceiveMessage(e){

}

function IfError(e){
    connectingElement.textContent = '- PRESS F5 - failed to connect to the WebSocket ';
    connectingElement.style.color = 'red';
}


