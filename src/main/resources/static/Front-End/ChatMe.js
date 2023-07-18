var SubmitDiv = document.querySelector('#submitDiv');
var ContactSection = document.querySelector('#Contact-Section');




var stompClient = null;
var UserName = null;

function connect(event) {
    UserNamesername = document.querySelector('#name').value.trim();

    if(UserNamesername) {
        SubmitDiv.classList.add('hidden');
        ContactSection.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {


}



function onError(){


}