export const adminMiddleware = async (req, res, next) => {

    //Verificar que el usuario tenga rol de admin
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ ok: false, msg: "Acceso denegado" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};
