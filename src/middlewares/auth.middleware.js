import { verifyToken } from "../helpers/jwt.js";
import { UserModel } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        // Busca el token en cookies y en header Authorization
        let token = req.cookies.token;
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if (!token) {
            return res.status(401).json({ ok: false, msg: "Token no proporcionado" });
        }

        let decoded = verifyToken(token);

        try {
            decoded = verifyToken(token);
        } catch (err) {
            console.error('Error al verificar token:', err);
            return res.status(401).json({ ok: false, msg: 'Token inválido o expirado', error: err.message });
        }

        //Verifica que el token tenga un _id
        if (!decoded || !decoded._id) {
            return res.status(401).json({ ok: false, msg: "Token inválido" });
        }

        //Busca el usuario en la base de datos y verifica que no esté eliminado
        const user = await UserModel.findOne({ _id: decoded._id, deleted_at: null });
        console.log('USER:', user);
        if (!user) {
            return res.status(401).json({ ok: false, msg: "Usuario no encontrado o eliminado" });
        } req.user = user;

        next();

    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};