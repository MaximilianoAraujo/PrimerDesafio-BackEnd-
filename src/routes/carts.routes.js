import { Router } from "express";

import { CartManagerDB } from "../dao/db/managers/cartManagerDB.js";
const cartManagerDB = new CartManagerDB();

const router = Router();

// Se modifico la ruta POST para agregar un carrito en la base de datos de Mongo
router.post("/", async (req,res) => {
    try {
        const newCart = await cartManagerDB.addCart();
        res.status(201).send(newCart);
    } catch (error) {
        res.status(500).send(`Error al crear el carrito: ${error.message}`)
    }
});

// Se modifico la ruta para obtener un carrito por id en la base de datos de Mongo
router.get("/:cid", async (req,res) => {
    try {
        const cid = req.params.cid;
        const cartByID = await cartManagerDB.getCartById(cid);
        if(cartByID) {
            res.status(200).send({"Carrito encontrado": cartByID});
        } else {
            res.status(404).send({ "Error": "No se encontró el carrito" });
        }
    } catch (error) {
        res.status(500).send(`Error al obtener el carrito: ${error.message}`)
    }
})

// Se modifico la ruta para agregar un producto a un carrito en la base de datos de Mongo
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
    
        const prodToCart = await cartManagerDB.addProdToCart(cid, pid);
    
        if (prodToCart) {
            res.status(200).send("Producto agregado al carrito correctamente!");
        } else {
            res.status(404).send("No se pudo agregar el producto al carrito. Verifique la consola para mas detalles");
        }
    } catch (error) {
        res.status(500).send(`Error al obtener el producto: ${error.message}`);
    }
});

export { router as cartsRouter};