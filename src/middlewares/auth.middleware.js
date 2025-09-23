import { verifyToken } from "../helpers/jwt.helpers.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ ok: false, msg: "Token no proporcionado" });
        }
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};