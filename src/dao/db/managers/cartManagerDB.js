import { prodModel } from "../models/products.model.js";
import { cartModel } from "../models/carts.model.js";

export class CartManagerDB {

    // Metodo para agregar un carrito usando el modelo de la base de datos
    async addCart() {
        try {
            const newCart = await cartModel.create({});
            return newCart;
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    // Metodo para buscar un carrito por id usando el modelo de la base de datos
    async getCartById(cid) {
        try {
            const cartByID = await cartModel.findById(cid);
            if (!cartByID) {
                return false
            }
            return cartByID;
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    // Metodo para agregar un producto a un carrito usando el modelo de la base de datos
    async addProdToCart(cid, pid) {
        try {
            const cartFound = await cartModel.findById(cid);

            if (cartFound) {
                const productFound = await prodModel.findById(pid);

                if (productFound) {
                    const existingProduct = cartFound.products.find(product => product.id === pid);

                    if (existingProduct) {
                        existingProduct.quantity += 1;
                    } else {
                        cartFound.products.push({ id: pid, quantity: 1 });
                    }

                    const updatedCart = await cartModel.findByIdAndUpdate(cid, cartFound, { new: true });
                    return updatedCart;
                } else {
                    throw new Error('El producto no fue encontrado');
                }
            } else {
                throw new Error('El carrito no fue encontrado');
            }
        } catch (error) {
            console.error(error.message);
            throw error; 
        }
    }
}