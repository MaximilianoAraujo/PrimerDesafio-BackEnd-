import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
// Se importa express poder crear un server y ponerlo a escuchar, asi también la clase ProductManager para poder crear una nueva instancia.

const port = 8080;

const app = express();

app.use(express.json());

// rutas importadas desde products.routes.js y carts.routes.js
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(port, ()=> console.log(`Servidor escuchando en el puerto ${port}...`));