import { prodModel } from "../models/products.model.js"

export class ProductManagerDB {

    // Metodo para agregar un producto usando el modelo de la base de datos
    async addProduct(prod) {
        try {
            const prodToAdd = await prodModel.create(prod);
            if (!prodToAdd || prodToAdd._id) {
                return false;
            }
            return prodToAdd;
        } catch (error) {
            console.log(error.message);
            throw error
        }      
    }

    // Metodo para obtener la lista de productos usando el modelo de la base de datos
    async getProducts(limit) {
        try {
            let productsList;
            if (limit) {
                productsList = await prodModel.find().limit(limit).lean();
            } else {
                productsList = await prodModel.find().lean();
            }
            return productsList;
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    // Metodo para obtener un producto por ID usando el modelo de la base de datos
    async getProductById(id) {
        try {
            const prodByID = await prodModel.findById(id);
            if(!prodByID){
                return false
            }
            return prodByID;
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    // Metodo para actualizar un producto buscado por ID usando el modelo de la base de datos
    async updateProduct(id, updatedFields) {
        try {
            const updateProdByID = await prodModel.findByIdAndUpdate(id, updatedFields, { new: true });
            if(!updateProdByID){
                return false
            }
            return updateProdByID;
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    // Metodo para eliminar un producto buscado por ID usando el modelo de la base de datos
    async deleteProduct(id) {
        try {
            const deleteProdByID = await prodModel.findByIdAndDelete(id);
            if(!deleteProdByID){
                return false
            }
            return deleteProdByID;
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }
}