const socketClient = io();

// Función para agregar un producto al sistema usando websocket
const addProd = () => {
    let prod = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        price: document.getElementById('price').value,
        // thumbnail: document.getElementById('thumbnail').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value
    }

    socketClient.emit('AddNewProduct', {prod});

    const formElement = document.getElementById('productForm');
    formElement.reset();

    return false
};

// Evento para mostrar en pantalla todos los productos de la lista
socketClient.on("listProducts", (data) => {
    let productsElements = "";
    data.forEach(element => {
        productsElements +=
            `<div class="list">
                <p>Producto: ${element.title}</p>
                <p>Precio: ${element.price}</p>
                <p>Código: ${element.code} || Stock: ${element.stock}</p>
                <button class="delProd" onClick="deleteProd('${element._id}')">Eliminar producto</button>
            </div>`
    });

    listProd.innerHTML = productsElements
});

// Función para tomar el ID de un producto y emitirlo para una posterior eliminación
const deleteProd = (id) => {
    if (confirm("¿Quieres confirmar la eliminación de este producto de la lista?")) {
        socketClient.emit("deleteProduct", id);
    }
}

// Evento para mostrar un mensaje si el producto no se agrega
socketClient.on("errorMessage", (message) => {
    const infoMessage = document.getElementById("infoMessage");
    infoMessage.innerHTML = `${message}`
});

// // Evento para mostrar un mensaje si el producto agrega
socketClient.on("successMessage", (message) => {
    const infoMessage = document.getElementById("infoMessage");
    infoMessage.innerHTML = `${message}`
})