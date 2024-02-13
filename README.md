# Gestión de Carritos, Chats y Productos con WebSockets
Este repositorio contiene código JavaScript para gestionar carritos de compras, mensajes de chat y productos, utilizando una base de datos MongoDB y WebSockets para comunicación en tiempo real.

## Funcionalidades
El código proporciona clases para tres tipos de gestores, cada uno destinado a un propósito específico, y también incluye la funcionalidad de chat en tiempo real y la gestión de productos en tiempo real a través de WebSockets.

* CartManagerDB
- addCart(): Método para agregar un nuevo carrito a la base de datos.
- getCartById(cid): Método para buscar un carrito por su ID en la base de datos.
- addProdToCart(cid, pid): Método para agregar un producto a un carrito existente en la base de datos, junto con su ID de carrito (cid) y el ID de producto (pid).

* ChatManagerDB
- addMessage(data): Método para agregar un nuevo mensaje de chat a la base de datos, utilizando un objeto con la información del usuario y el mensaje.
- getAllMessages(): Método para obtener todos los mensajes de chat almacenados en la base de datos.

* ProductManagerDB
- addProduct(prod): Método para agregar un nuevo producto a la base de datos.
- getProducts(limit): Método para obtener una lista de productos de la base de datos, con la opción de especificar un límite.
- getProductById(id): Método para obtener un producto por su ID en la base de datos.
- updateProduct(id, updatedFields): Método para actualizar un producto existente en la base de datos, proporcionando su ID y los campos actualizados.
- deleteProduct(id): Método para eliminar un producto de la base de datos por su ID.

## Funcionalidades adicionales de WebSockets
- Chat en Tiempo Real: Los usuarios pueden enviar mensajes en tiempo real y ver los mensajes de otros usuarios sin necesidad de recargar la página.
- Gestión de Productos en Tiempo Real: Los cambios en la lista de productos (agregar o eliminar productos) se reflejan automáticamente en la interfaz de usuario de todos los clientes conectados.

## Instrucciones para Ejecutar el Proyecto
Para ejecutar este proyecto en tu máquina local, sigue los siguientes pasos:

1. Clonar el Repositorio
Primero, clona este repositorio en tu máquina local. Puedes hacerlo ejecutando el siguiente comando en tu terminal:

- git clone <https://github.com/MaximilianoAraujo/quintoDesafio-BackEnd.git>

2. Instalar Dependencias
Ve al directorio del proyecto y asegúrate de tener Node.js y npm instalados en tu sistema. Luego, instala las dependencias del proyecto ejecutando el siguiente comando:

- npm install

3. Configurar la Base de Datos
Asegúrate de tener MongoDB instalado y ejecutándose en tu sistema.

4. Conexión a la Base de Datos
Abre el archivo tu_archivo.js y encuentra la función connectDB(). Asegúrate de que la URL de conexión a tu base de datos MongoDB sea correcta. Si es necesario, cámbiala para que coincida con tu configuración de MongoDB.

5. Ejecutar el Servidor
Una vez configurada la base de datos, puedes ejecutar el servidor Node.js. Para hacerlo, ejecuta el siguiente comando en tu terminal:

- npm start
Esto iniciará el servidor y establecerá la conexión con la base de datos MongoDB.

6. Acceder a la Aplicación
Una vez que el servidor esté en funcionamiento, abre tu navegador web y accede a la dirección http://localhost:8080. Aquí encontrarás la interfaz de usuario de la aplicación, donde podrás gestionar carritos de compras, enviar mensajes de chat en tiempo real y administrar productos.





