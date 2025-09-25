import jwt from "jsonwebtoken";

//Genera y verifica tokens JWT
export const generateToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
        });
    } catch (error) {
        throw new Error("Error generando el token: " + error.message);
    }
};

//Verifica el token JWT
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Error verificando el token: " + error.message);
    }
};