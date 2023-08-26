var socket = io.connect('http://' + document.domain + ':' + location.port);

function openChatWindow(room) {
    var chatWindow = window.open("", room, "width=400, height=500");
    chatWindow.document.write('<html><head><title>' + room + '</title></head><body>');
    chatWindow.document.write('<div id="messages"></div>');
    chatWindow.document.write('<input id="inputMessage" type="text" placeholder="Type a message">');
    chatWindow.document.write('<button id="sendMessage">Send</button>');
    chatWindow.document.write('</body></html>');

    socket.on('message', function(data) {
        console.log("Received message", data); // Debugging line
        if (data.room === room) {
            var messagesDiv = chatWindow.document.getElementById('messages');
            var newMessage = chatWindow.document.createElement('div');
            newMessage.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
            messagesDiv.appendChild(newMessage);
        }
    });

    chatWindow.document.getElementById('sendMessage').addEventListener('click', function() {
        var inputMessage = chatWindow.document.getElementById('inputMessage');
        var message = inputMessage.value;
        if (message.trim() !== '') {
            console.log("Sending message", message, room); // Debugging line
            socket.emit('message', {'message': message, 'room': room, 'username': 'YourUsername'});
            inputMessage.value = '';
        }
    });
}




