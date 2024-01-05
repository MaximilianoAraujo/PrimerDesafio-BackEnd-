// Por el error "Warning: To load an ES module, set "type": "module" in the package.json" tuve que importar express (y fs) de esta manera, y agregar "type:"module" en el archivo package.json"
import express from "express";
import { ProductManager } from './files/productManager.js';

// Se importa express poder crear un server y ponerlo a escuchar, asi también la clase ProductManager para poder crear una nueva instancia.
const productManager = new ProductManager("./files/products.json");

const port = 8080;

const app = express();

app.listen(port, ()=> console.log(`Servidor escuchando en el puerto ${port}...`));

app.use(express.urlencoded({extended:true}));

// Se configura una ruta que devuelve una lista completa de los productos. Se usa req.query que devuelve una lista limitada según el valor que se le pasa.
app.get("/products", async (req,res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getProducts();
        if (limit) {
            const prodsLimit = products.slice(0,limit);
            res.send({"Lista limitada": prodsLimit})
        } else {
            res.send({"Lista completa": products});
        }
    } catch (error) {
        res.send(`Error al obtener los productos: ${error.message}`);
    }
});

// Se configura una ruta que devuelve un producto específico de la lista de productos. Se usa el ID como parametro de búsqueda. Se valida si el producto existe o no.
app.get("/products/:pid", async (req,res) => {
    try {
        const id = parseInt(req.params.pid);
        const productById = await productManager.getProductById(id);
        if (productById) {
            res.send({"Producto encontrado": productById});
        } else {
            res.send({"Mensaje":"No se encontró el producto"});
        }
    } catch (error) {
        res.send(`Error al obtener el producto: ${error.message}`);
    }
});