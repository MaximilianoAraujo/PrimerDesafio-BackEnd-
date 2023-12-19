class ProductManager {
    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (title && description && price && thumbnail && code && stock) {

            let confirmCode = this.products.some(product => product.code === code);

            if (confirmCode){
                console.log('El código ingresado ya existe');
                console.log('--------------------');
            } else {

                let newID;
                if (this.products.length === 0) {
                    newID = 1;
                } else {
                    newID = this.products[this.products.length-1].id+1;
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

                this.products.push(newProduct);
                console.log(`El producto ${newProduct.title} se ha agregado exitosamente`);
                console.log('--------------------');
            }

        } else {
            console.log('Todos los campos son obligatorios');
            console.log('--------------------');
        }
    }

    getProducts() {
        console.log('Lista de productos: ');
        console.log(this.products);
        console.log('--------------------');
    }

    getProductById(id) {
        let prodFound = this.products.find(product => product.id === id);

        if (prodFound) {
            console.log(prodFound)
            console.log('--------------------');
        } else {
            console.log('No se encontró el producto')
            console.log('--------------------');
        }
    }
}

const productos = new ProductManager()
productos.getProducts()
productos.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productos.getProducts()
productos.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productos.getProductById(1)
productos.getProductById(4)
// productos.addProduct("Manga - Slam Dunk", "Tomo numero 1", 6000,"url",123,10)
// productos.addProduct("Manga - Dragon ball", "Tomo numero 5", 8800,"url2",234,20)
// productos.getProducts()
// productos.getProductById(2)
