import { matchedData } from "express-validator";

//Middleware para extraer los datos validados
export const matchedDataMiddleware = (req, res, next) => {
    try {
        const dataVadilidada = matchedData(req, { locations: ["body", "params"] });
        if (Object.keys(dataVadilidada).length === 0) {
            return res.status(400).json({ ok: false, msg: "No se enviaron datos" });
        }
        req.data = dataVadilidada;
        next();
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};