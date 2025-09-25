import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import starDB from "./src/config/database.js";
import router from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser()); //para poder leer las cookies

// rutas
app.use("/api", router);

app.listen(PORT, async () => {
    await starDB();
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});