import fs from 'fs'
import { ProductManager } from './productManager.js';

const productManager = new ProductManager("./src/files/products.json");

export class CartManager {
    constructor(path){
        this.path = path;
    }

    // Metodos auxiliares
    fileExist() {
        return fs.existsSync(this.path);
    }

    async ensureFileExists() {
        try {
            if (!this.fileExist()) {
                await fs.promises.writeFile(this.path, "[]");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Metodo para crear un nuevo carrito. Se crea con un ID autoincrementable.
    async addCart() {
        try {
            await this.ensureFileExists();

            const listCarts = await fs.promises.readFile(this.path, 'utf-8');
            const listCartsToJson = JSON.parse(listCarts);

            let newID;
            if (listCartsToJson.length === 0 ) {
                newID = 1;
            } else {
                newID = listCartsToJson[listCartsToJson.length - 1].id + 1;
            }

            const newCart = {
                id: newID,
                products: []
            };
            
            listCartsToJson.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(listCartsToJson, null, "\t"));
            return newCart;

        } catch (error) {
            console.log(error.message);
        }
        
    }

    // Método para obtener un carrito por su ID
    async getCartById(id) {
        try {
            await this.ensureFileExists();

            const listCarts = await fs.promises.readFile(this.path, 'utf-8');
            const listCartsToJson = JSON.parse(listCarts);

            let cartFound = listCartsToJson.find(cart => cart.id === id);

            if (cartFound) {
                return cartFound;
            } else {
                console.log('No se encontró el carrito');
                return false
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para añadir un producto del array de productos a un carrito en específico. 
    async addProdToCart(cid, pid) {
        try {
            await this.ensureFileExists();

            const listCarts = await fs.promises.readFile(this.path, 'utf-8');
            const listCartsToJson = JSON.parse(listCarts);
            let cartFound = listCartsToJson.find(cart => cart.id === cid);

            if (cartFound) {
                const findProd = await productManager.getProductById(pid);

                if (findProd) {
                    const prodIndex = cartFound.products.findIndex(product => product.id === pid);

                    if (prodIndex !== -1) {
                        cartFound.products[prodIndex].quantity += 1;
                    } else {
                        const addProd = {
                            id: pid,
                            quantity: 1
                        };
                        cartFound.products.push(addProd);
                    }

                    await fs.promises.writeFile(this.path, JSON.stringify(listCartsToJson, null, "\t"));
                    return listCartsToJson;
                } 
            } else {
                console.log("ERROR! Carrito No Encontrado");
                return false  
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}