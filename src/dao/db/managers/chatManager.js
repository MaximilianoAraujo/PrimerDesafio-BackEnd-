import { chatModel } from "../models/chat.model.js";

export class ChatManagerDB {

    // Metodo para crear un objeto que contiene el usuario y el mensaje escrito en la base de datos
    async addMessage(data) {
        try {
            const newMessage = await chatModel.create(data);
            return newMessage;
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    // Metodo para obtener el array de mensajes de la base de datos
    async getAllMessages() {
        try {
            const getMessages = await chatModel.find();
            return getMessages;
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }
}