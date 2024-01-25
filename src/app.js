import express from "express";
import { ProductManager } from "./models/productManager.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { engine } from 'express-handlebars';
import __dirname from "./utils.js";
import path from "path"
import { Server } from "socket.io";
import { createServer } from 'node:http';

//Configuración del server
const productManager = new ProductManager("./src/files/products.json");

const port = 8080;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

const server = createServer(app);

const io = new Server(server);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "/views"));

// rutas importadas desde products.routes.js y carts.routes.js
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


//Uso de websocket - socket.io
io.on("connection", async (socket) => {
    console.log("Cliente conectado", socket.id);

    socket.on('AddNewProduct', async (data) => {
        const addProd = await productManager.addProduct(data.title, data.description, data.category, data.price, data.thumbnail, data.code, data.stock);

        if (addProd) {
            socket.emit("successMessage", "El producto fue agregado a la lista!")
        } else {
            socket.emit("errorMessage", "No se pudo agregar el producto. Vea la consola del servidor para mas detalles.")
        }
    })

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
    });

    const prodList = await productManager.getProducts();
    socket.emit('listProducts', prodList);
})

server.listen(port, ()=> console.log(`Servidor escuchando en el puerto ${port}...`));

