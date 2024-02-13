import { Router } from "express";
import { ProductManagerDB } from "../dao/db/managers/productManagerDB.js";

const productManagerDB = new ProductManagerDB()

const router = Router();


// Se configura una ruta que muestra todos los productos de la lista de la base de datos
router.get('/', async (req, res) => {
    const prods = await productManagerDB.getProducts();
    res.render('home',
        {
            prods: prods,
            style: "home.css",
            title: "Home - Quinto Desafio"
        });
});

// Se configura una ruta en donde se puede eliminar o agregar un producto. La lista se actualiza en tiempo real
router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts",
        {
            style: "realTimeProducts.css",
            title: "Productos en Tiempo Real - Quinto Desafio"
        });
});

// Se configura una ruta para el chat
router.get("/chat", (req,res) => {
    res.render("chat", 
    {
        style: "chat.css",
        title: "Chat - Quinto Desafio"
    });
});

export { router as viewsRouter }