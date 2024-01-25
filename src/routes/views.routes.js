import { Router } from "express";
import { ProductManager } from "../models/productManager.js";

const productManager = new ProductManager("./src/files/products.json")

const router = Router();

// Se configura una ruta que muestra todos los productos de la lista
router.get('/', async (req, res) => {
    const prods = await productManager.getProducts();
    console.log(prods)
    res.render('home',
        {
            prods: prods,
            style: "home.css",
            title: "Home - Cuarto Desafio"
        });
});

// Se configura una ruta en donde se puede eliminar o agregar un producto. La lista se actualiza en tiempo real
router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts",
        {
            style: "realTimeProducts.css",
            title: "Productos en Tiempo Real - Cuarto Desafio"
        });
});

export { router as viewsRouter }