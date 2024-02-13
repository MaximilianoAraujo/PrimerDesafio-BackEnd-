import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://maxiaraujo:mewgordita9191@ecommerce.uptvwxe.mongodb.net/ecommerce");
        console.log("DB conectada exitosamente!")
    } catch (error) {
        console.log("Hubo un error al conectar la DB")
    }
}