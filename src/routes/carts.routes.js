import { Router } from "express";
import { CartManager } from "../models/cartManager.js";

const cartManager = new CartManager("./src/files/carts.json");

const router = Router();

// Se configura una ruta POST que crea un nuevo carrito.
router.post("/", async (req,res) => {
    try {
        const newCart = await cartManager.addCart();
        res.status(201).send(newCart);
    } catch (error) {
        res.status(500).send(`Error al crear el carrito: ${error.message}`)
    }
});

// Se configura una ruta GET que busca un carrito por su ID y muestra sus productos
router.get("/:cid", async (req,res) => {
    try {
        const cid = parseInt(req.params.cid);
        const cartByID = await cartManager.getCartById(cid);
    
        if(cartByID) {
            res.status(200).send({"Carrito encontrado": cartByID});
        } else {
            res.status(404).send({ "Error": "No se encontró el carrito" });
        }
    } catch (error) {
        res.status(500).send(`Error al obtener el carrito: ${error.message}`)
    }
})

// Se configura una ruta POST que la cual añade un producto especifico al carrito seleccionado
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
    
        const prodToCart = await cartManager.addProdToCart(cid, pid);
    
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