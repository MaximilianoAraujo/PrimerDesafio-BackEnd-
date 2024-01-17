import { Router } from "express";
import { ProductManager } from '../models/productManager.js';

const productManager = new ProductManager("./src/files/products.json");

const router = Router();

// Se configura una ruta que devuelve una lista completa de los productos. Se usa req.query que devuelve una lista limitada según el valor que se le pasa.
router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getProducts();
        if (limit) {
            const prodsLimit = products.slice(0, limit);
            res.status(200).send(prodsLimit)
        } else {
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(500).send(`Error al obtener los productos: ${error.message}`);
    }
});

// Se configura una ruta que devuelve un producto específico de la lista de productos. Se usa el ID como parametro de búsqueda.
router.get("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const productById = await productManager.getProductById(id);
        if (productById) {
            res.status(200).send({ "Producto encontrado": productById });
        } else {
            res.status(404).send({ "Error": "No se encontró el producto" });
        }
    } catch (error) {
        res.status(500).send(`Error al obtener el producto: ${error.message}`);
    }
});

// Se configura una ruta que agrega un nuevo producto a la lista
router.post("/", async (req, res) => {
    try {
        const bodyProd = req.body;
        const addProd = await productManager.addProduct(bodyProd.title, bodyProd.description, bodyProd.category, bodyProd.price, bodyProd.thumbnail, bodyProd.code, bodyProd.stock);
        console.log(addProd)
        if (addProd) {
            res.status(201).send({ 'Nuevo producto agregado exitosamente!': addProd });
        } else {
            res.status(400).send({ 'Error': 'No se pudo agregar el producto. Vea la consola para más detalles' })
        }
    } catch (error) {
        res.status(500).send(`Error al añadir un producto: ${error.message}`);
    }
});

// Se configura una ruta que actualiza un producto de la lista
router.put("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const bodyprod = req.body;
        const updatedProduct = await productManager.updateProduct(pid, bodyprod);
        if (updatedProduct) {
            res.status(200).send({ 'Producto Actualizado': updatedProduct});
        } else {
            res.status(404).send({'Error': 'No se pudo actualizar el producto. Vea la consola para más detalles'})
        };
    } catch (error) {
        res.status(500).send(`Error al añadir un producto: ${error.message}`);
    }
});

// Se configura una ruta que elimina un producto de la lista
router.delete("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const deletedProduct = await productManager.deleteProduct(pid);
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