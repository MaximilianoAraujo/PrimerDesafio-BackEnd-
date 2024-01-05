import fs from 'fs'

export class ProductManager {
    constructor(path){
        this.path = path;
    }

    // Metodos auxiliares
    fileExist() {
        return fs.existsSync(this.path);
    }

    // Agregue este metodo para evitar el error "Error: ENOENT, no such file or directory" en caso de que se ejecuten los metodos en un orden distinto al que indica el proceso de testing y asi poder tener siempre un array vacio para poder empezar los procesos.
    async ensureFileExists() {
        try {
            if (!this.fileExist()) {
                await fs.promises.writeFile(this.path, "[]");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para agregar un nuevo producto al archivo products.json. Se valida si todos los campos fueron introducidos. Se valida que no se puedan crear productos con un mismo prodID.
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            await this.ensureFileExists();

            if (title && description && price && thumbnail && code && stock) {
                const listProducts = await fs.promises.readFile(this.path, 'utf-8');
                const listProductsToJson = JSON.parse(listProducts);

                const confirmCode = listProductsToJson.some(product => product.code === code);
    
                if (confirmCode){
                    console.log('El código ingresado ya existe');
                    console.log('--------------------');
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
                        price,
                        thumbnail,
                        code,
                        stock
                    };
    
                    listProductsToJson.push(newProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(listProductsToJson, null, "\t"));
                    console.log(`El producto ${newProduct.title} se ha agregado exitosamente`);
                    console.log('--------------------');
                }
    
            } else {
                console.log('Todos los campos son obligatorios');
                console.log('--------------------');
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

            console.log('Lista mostrada en el navegador ');

            return listProductsToJson;
        } catch (error) {
            console.log(error.message);
        }
    }

    // Metodo para obtener un producto en específico de la lista de productos del archivo products.json. Se usa el ID para poder buscar el producto y se valida si el mismo es escontrado o no.
    async getProductById(id) {
        try {
            await this.ensureFileExists();

            const listProducts = await fs.promises.readFile(this.path, 'utf-8');
            const listProductsToJson = JSON.parse(listProducts);

            let prodFound = listProductsToJson.find(product => product.id === id);

            if (prodFound) {
                console.log(prodFound)
                console.log('--------------------');

                return prodFound;
            } else {
                console.log('No se encontró el producto');
                console.log('--------------------');
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // Método para actualizar cualquiera de los valores de los productos. Se utiliza el ID para buscar el producto. Se valida si el producto buscado es encontrado o no.
    async updateProduct(id, updatedFields) {
        try {
            await this.ensureFileExists();

            const listProducts = await fs.promises.readFile(this.path, "utf-8");
            const listProductsToJson = JSON.parse(listProducts);
            const productIndex = listProductsToJson.findIndex(product => product.id === id);

            if (productIndex !== -1) {
                const updatedProduct = { ...listProductsToJson[productIndex], ...updatedFields };
                listProductsToJson[productIndex] = updatedProduct
                
                await fs.promises.writeFile(this.path, JSON.stringify(listProductsToJson, null, "\t"));
                console.log("Producto actualizado:");
                console.log(listProductsToJson);
                console.log('--------------------');
            } else {
                console.log("Producto No Encontrado");
                console.log('--------------------');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para elimitar un producto de la lista. Se uutiliza el ID para buscar el producto. Se valida si el producto a eliminar es encontrado o no.
    async deleteProduct(id) {
        try {
            await this.ensureFileExists();

            const listProducts = await fs.promises.readFile(this.path, "utf-8");
            const listProductsToJson = JSON.parse(listProducts);
            const productIndex = listProductsToJson.findIndex(product => product.id === id);

            if (productIndex !== -1) {
                listProductsToJson.splice(productIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(listProductsToJson, null, "\t"));

                console.log("Producto eliminado de la lista. Lista Actualizada:");
                console.log(listProductsToJson);
                console.log('--------------------');
            } else {
                console.log("Producto No Encontrado");
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}