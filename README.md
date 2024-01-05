# Tercer Desafio Backend
Este repositorio contiene un proyecto de backend desarrollado en JavaScript utilizando Node.js y Express. El objetivo principal de esta aplicación es gestionar una lista de productos, permitiendo operaciones como agregar, listar, obtener por ID, actualizar y eliminar productos. Además, se utiliza el sistema de archivos para almacenar la información de los productos en un archivo JSON.


## Instalación
1) Clonar el repositorio:
- git clone https://github.com/MaximilianoAraujo/tercerDesafio-BackEnd.git

2) Instalar las dependencias:
- npm install
Configuración del Proyecto

3) Posicionarse en la carpeta "src" que conteniene el archivo app.js:
- cd src

4) Abrir el servidor:
- nodemon app.js

El servidor se iniciará en http://localhost:8080.


## Estructura del Proyecto
- app.js: Archivo principal que configura y ejecuta el servidor Express.
- productManager.js: Contiene la clase ProductManager que gestiona la lógica relacionada con los productos, como agregar, listar, obtener por ID, actualizar y eliminar.
- products.json: Archivo JSON utilizado para almacenar la información de los productos.
Configuración de Express

El servidor Express se configura para escuchar en el puerto 8080. Se han definido dos endpoints:

- GET /products: Devuelve una lista completa de productos. Puede aceptar un parámetro de consulta limit para obtener una lista limitada de productos.

- GET /products/:pid: Devuelve un producto específico según el ID proporcionado en el parámetro de ruta (:pid).


## Uso de la Clase ProductManager
La clase ProductManager proporciona métodos para interactuar con los productos almacenados en products.json. Estos métodos incluyen:

- addProduct(title, description, price, thumbnail, code, stock): Agrega un nuevo producto al archivo products.json.
- getProducts(): Obtiene la lista completa de productos.
- getProductById(id): Obtiene un producto específico por ID.
- updateProduct(id, updatedFields): Actualiza los valores de un producto existente.
- deleteProduct(id): Elimina un producto de la lista.
Ejecución
Inicia la aplicación:


## Dependencias
- Express: Framework web para Node.js que facilita la creación de aplicaciones y servicios RESTful.
- Nodemon: Herramienta que observa cambios en los archivos y reinicia automáticamente la aplicación.
- La aplicación utiliza módulos ES6, por lo que se requiere la configuración "type": "module" en el archivo package.json.


## NOTA ADICIONAL!
Por problemas de directivas de ejecución, no pude correr el servidor usando PowerShell. Para poder ejecutarlo correctamente tuve que usar la terminal de Git Bash