import express from "express";
import { ProductManagerDB } from "./dao/db/managers/productManagerDB.js";
import { ChatManagerDB } from "./dao/db/managers/chatManager.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { engine } from 'express-handlebars';
import __dirname from "./utils.js";
import path from "path"
import { Server } from "socket.io";
import { createServer } from 'node:http';
import { connectDB } from "./dao/db/index.js";

//Configuración del server
const productManagerDB = new ProductManagerDB();
const chatManagerDB = new ChatManagerDB();

const port = 8080;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

const server = createServer(app);

const io = new Server(server);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "/views"));

// rutas importadas desde products.routes.js, carts.routes.js y Views
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//Uso de websocket - socket.io / Se modifico para que funcione con la base de datos de Mongo
io.on("connection", async (socket) => {
    console.log("Cliente conectado", socket.id);

    //Cuando se carga la página de productos o el chat, automaticamente se cargan los respectivos datos en pantalla
    const prodList = await productManagerDB.getProducts();
    socket.emit('listProducts', prodList);
    const allMessages = await chatManagerDB.getAllMessages();
    io.sockets.emit('allMessages', allMessages);

    //Socket para poder agragar un producto y mostrarlo en la lista en tiempo real
    socket.on('AddNewProduct', async (data) => {
        try {
            const { title, description, category, price, code, stock } = data.prod;

            if (!title || !description || !category || !price || !code || !stock) {
                throw new Error('Por favor complete todos los campos');
            }

            await productManagerDB.addProduct(data.prod);
            socket.emit("successMessage", "El producto fue agregado a la lista!");

            const prodList = await productManagerDB.getProducts();
            io.emit('listProducts', prodList);
        } catch (error) {
            console.error(error);
            socket.emit("errorMessage", "No se pudo agregar el producto. Vea la consola del servidor para más detalles.");
        }
    });

    //Socket para poder eliminar un producto
    socket.on("deleteProduct", async (id) => {
        await productManagerDB.deleteProduct(id);

        const prodList = await productManagerDB.getProducts();
        io.emit('listProducts', prodList);
    });

    //Socket para poder enivar un mensaje en el chat y mostrarlo en tiempo real
    socket.on('sendMessage', async (data) => {
        await chatManagerDB.addMessage(data);
        const allMessages = await chatManagerDB.getAllMessages();
        io.sockets.emit('allMessages', allMessages);
    })
})

//Apertura del server y conexión a la DB
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}...`)
    connectDB()
});

