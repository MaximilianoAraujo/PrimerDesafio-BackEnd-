import { Router } from "express";

import { ProductManagerDB } from "../dao/db/managers/productManagerDB.js"
const productManagerDB = new ProductManagerDB();

const router = Router();

// Se modifico la ruta para consultar la lista de productos en la base de datos de Mongo.
router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManagerDB.getProducts(limit);
        res.status(200).send({ "Lista de Productos": products });
    } catch (error) {
        res.status(500).send(`Error al obtener los productos: ${error.message}`);
    }
});

// Se modifico la ruta para buscar un producto por id en la base de datos de Mongo
router.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        const productById = await productManagerDB.getProductById(id);
        if (productById) {
            res.status(200).send({ "Producto encontrado": productById });
        } else {
            res.status(404).send({ "Error": "No se encontró el producto. Vea la consola para más detalles" });
        }
    } catch (error) {
        res.status(500).send(`Error al obtener el producto: ${error.message}`);
    }
});

// Se modifico la ruta para POST para agregar un producto en la base de datos de Mongo
router.post("/", async (req, res) => {
    try {
        const prod = await productManagerDB.addProduct(req.body);
        if (prod) {
            res.status(201).send(`Se agrego correctamente el producto con ID: ${prod.id}`)
        } else {
            res.status(400).send({ 'Error': 'No se pudo agregar el producto. Vea la consola para más detalles' })
        }
    } catch (error) {
        res.status(500).send(`Error al añadir un producto: ${error.message}`);
    }
});

// Se modifico la ruta PUT para actualizar un producto en la base de datos de Mongo
router.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const bodyprod = req.body;
        const updatedProduct = await productManagerDB.updateProduct(pid, bodyprod);
        if (updatedProduct) {
            res.status(200).send({ 'Producto Actualizado': updatedProduct});
        } else {
            res.status(404).send({'Error': 'No se pudo actualizar el producto. Vea la consola para más detalles'})
        };
    } catch (error) {
        res.status(500).send(`Error al añadir un producto: ${error.message}`);
    }
});

// Se modifico la ruta DELETE para eliminar un producto en la base de datos de Mongo
router.delete("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const deletedProduct = await productManagerDB.deleteProduct(pid);
        if (deletedProduct) {
            res.status(200).send({ 'Producto eliminado de la lista': deletedProduct});
        } else {
            res.status(404).send({'Error': 'No se pudo eliminar el producto. Vea la consola para más detalles'})
        };
    } catch (error) {
        res.status(500).send(`Error al añadir un producto: ${error.message}`);
    }
});

export { router as productsRouter };