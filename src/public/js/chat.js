const socketClient = io();

const messageForm = document.getElementById('messageForm');
const messageContainer = document.getElementById('message-container');

//Validación para que los usuarios siempre tengan un nombre antes de usar el chat
let user = prompt("Ingrese su nombre de usuario")
while (!user || !user.trim()) {
    user = prompt("Debe ingresar un nombre de usuario")
}

// Funcion para enviar un mensaje
function sendMessage() {
    const message = document.getElementById("message").value.trim();

    if (!message) {
        return false
    }

    socketClient.emit('sendMessage', { user, message });
    document.getElementById("message").value = "";
}

//Evento para mandar el mensaje clickeando el botón Enviar
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessage();
});

//Evento para mandar el mensaje al tocar Enter
messageForm.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

//Evento para mostar la lista de mensajes en el chat
socketClient.on("allMessages", (data) => {
    let msgs = "";
    data.forEach(elem => {
        msgs +=
            `<div class="divMessage">
                <strong>${elem.user}:</strong> ${elem.message}<br/>
            </div>`
    });
    messageContainer.innerHTML = msgs;

    messageContainer.scrollTop = messageContainer.scrollHeight;
});

