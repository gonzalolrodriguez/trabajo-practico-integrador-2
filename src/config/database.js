import mongoose from "mongoose";

const starDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected");
        // await mongoose.connection.dropDatabase()
    } catch (error) {
        console.log("Error al conectar a la DB:", error);
        throw new Error(error);
    }
};

export default starDB;