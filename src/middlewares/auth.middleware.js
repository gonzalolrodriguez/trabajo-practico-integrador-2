import { verifyToken } from "../helpers/jwt.js";
import { UserModel } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        // Buscar token en cookies y en header Authorization
        let token = req.cookies.token;
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }
        console.log('TOKEN:', token);
        if (!token) {
            return res.status(401).json({ ok: false, msg: "Token no proporcionado" });
        }
        let decoded;
        try {
            console.log('Verificando token...');
            decoded = verifyToken(token);
            console.log('DECODED:', decoded);
        } catch (err) {
            console.error('Error al verificar token:', err);
            return res.status(401).json({ ok: false, msg: 'Token inválido o expirado', error: err.message });
        }
        if (!decoded || !decoded._id) {
            return res.status(401).json({ ok: false, msg: "Token inválido" });
        }
        const user = await UserModel.findOne({ _id: decoded._id, deleted_at: null });
        console.log('USER:', user);
        if (!user) {
            return res.status(401).json({ ok: false, msg: "Usuario no encontrado o eliminado" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};