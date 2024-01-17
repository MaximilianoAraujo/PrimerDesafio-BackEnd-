import fs from 'fs'

export class ProductManager {
    constructor(path){
        this.path = path;
    }

    // Metodos auxiliares
    fileExist() {
        return fs.existsSync(this.path);
    }

    // Metodo para evitar el error "Error: ENOENT, no such file or directory" y asegurar tener un archivo, aunque no contenga data.
    async ensureFileExists() {
        try {
            if (!this.fileExist()) {
                await fs.promises.writeFile(this.path, "[]");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Metodo para crear un nuevo producto. Se crea con un ID autoincrementable. Se valida por ID que el producto a crear no fue creado previamente.
    async addProduct(title, description, category, price, thumbnail, code, stock) {
        try {
            await this.ensureFileExists();

            if (title && description && category && price && thumbnail && code && stock) {
                const listProducts = await fs.promises.readFile(this.path, 'utf-8');
                const listProductsToJson = JSON.parse(listProducts);

                const confirmCode = listProductsToJson.some(product => product.code === code);
    
                if (confirmCode){
                    console.log('El código ingresado ya existe');
                    return false;
                } else {
    
                    let newID;
                    if (listProductsToJson.length === 0) {
                        newID = 1;
                    } else {
                        newID = listProductsToJson[listProductsToJson.length-1].id+1;
                    }
    
                    const newProduct  = {
                        id: newID,
                        title,
                        description,
                        category,
                        price,
                        thumbnail,
                        code,
                        stock,
                        status: true
                    };
    
                    listProductsToJson.push(newProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(listProductsToJson, null, "\t"));
                    return newProduct;
                }
    
            } else {
                console.log('Todos los campos son obligatorios');
                return false;
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }

    // Metodo para obtener la lista de productos del archivo products.json
    async getProducts() {
        try {
            await this.ensureFileExists();

            const listProducts = await fs.promises.readFile(this.path, 'utf-8');
            const listProductsToJson = JSON.parse(listProducts);

            return listProductsToJson;
        } catch (error) {
            console.log(error.message);
        }
    }

    // Metodo para obtener por ID un producto en específico de la lista de productos.
    async getProductById(id) {
        try {
            await this.ensureFileExists();

            const listProducts = await fs.promises.readFile(this.path, 'utf-8');
            const listProductsToJson = JSON.parse(listProducts);

            let prodFound = listProductsToJson.find(product => product.id === id);

            if (prodFound) {
                return prodFound;
            } else {
                console.log('No se encontró el producto');
                return false
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // Método para actualizar los valores de los productos. Se utiliza el ID para buscar el producto.
    async updateProduct(id, updatedFields) {
        try {
            await this.ensureFileExists();

            const listProducts = await fs.promises.readFile(this.path, "utf-8");
            const listProductsToJson = JSON.parse(listProducts);
            const productIndex = listProductsToJson.findIndex(product => product.id === id);

            if (productIndex !== -1) {
                const updatedProduct = { ...listProductsToJson[productIndex], ...updatedFields };
                
                if (updatedProduct.id !== listProductsToJson[productIndex].id) {
                    console.log("El ID no puede ser modificado")
                    return false;
                }

                listProductsToJson[productIndex] = updatedProduct
                await fs.promises.writeFile(this.path, JSON.stringify(listProductsToJson, null, "\t"));
                return updatedProduct
            } else {
                console.log("Producto No Encontrado");
                return false;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para elimitar un producto de la lista. Se utiliza el ID para buscar el producto.
    async deleteProduct(id) {
        try {
            await this.ensureFileExists();

            const listProducts = await fs.promises.readFile(this.path, "utf-8");
            const listProductsToJson = JSON.parse(listProducts);
            const deletedProd = listProductsToJson.find(product => product.id === id);
            const productIndex = listProductsToJson.findIndex(product => product.id === id);

            if (productIndex !== -1) {
                listProductsToJson.splice(productIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(listProductsToJson, null, "\t"));

                console.log(deletedProd)
                return deletedProd
            } else {
                console.log("Producto No Encontrado");
                return false;
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}