const fs = require('fs')

class ProductManager {
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

    async getProducts() {
        try {
            await this.ensureFileExists();

            const listProducts = await fs.promises.readFile(this.path, 'utf-8');
            const listProductsToJson = JSON.parse(listProducts);

            console.log('Lista de productos: ');
            console.log(listProductsToJson);
            console.log('--------------------');
        } catch (error) {
            console.log(error.message);
        }
    }

    async getProductById(id) {
        try {
            await this.ensureFileExists();

            const listProducts = await fs.promises.readFile(this.path, 'utf-8');
            const listProductsToJson = JSON.parse(listProducts);

            let prodFound = listProductsToJson.find(product => product.id === id);

            if (prodFound) {
                console.log(prodFound)
                console.log('--------------------');
            } else {
                console.log('No se encontró el producto');
                console.log('--------------------');
            }
        } catch (error) {
            console.log(error.message)
        }
    }

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


const testingProcess = async () => {
    try {
        const productos = new ProductManager("./products.json");
        await productos.getProducts();
        await productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
        await productos.addProduct("producto prueba2", "Este es un producto prueba2", 200, "Sin imagen", "abc123", 25);
        await productos.addProduct("producto prueba3", "Este es un producto prueba3", 200, "Sin imagen", "abc1234", 25);
        await productos.getProducts();
        await productos.getProductById(1);
        await productos.updateProduct(1, { price: 5000 });
        await productos.deleteProduct(1);
    } catch (error) {
        console.log(error.message);
    }
}

testingProcess();
//Proceso de Testing
// Se creará una instancia de la clase “ProductManager” ✅

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [] ✅

// Se llamará al método “addProduct” con los campos:✅
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE ✅

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado ✅

// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.✅

// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.✅

// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.✅