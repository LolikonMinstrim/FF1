// script.js
const socket = io();

// Ask user for username
const username = prompt('Enter your username:');
socket.emit('new-user', username);

// Handle new user connected
socket.on('user-connected', (connectedUsername) => {
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML += `<p><em>${connectedUsername} joined the chat</em></p>`;
});

// Handle user disconnected
socket.on('user-disconnected', (disconnectedUsername) => {
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML += `<p><em>${disconnectedUsername} left the chat</em></p>`;
});

// Handle sending messages
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    // Send message to server
    socket.emit('chat-message', { username, message });

    // Clear input field
    messageInput.value = '';
}

// Handle receiving messages
socket.on('chat-message', (data) => {
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML += `<p><strong>${data.username}:</strong> ${data.message}</p>`;
});
