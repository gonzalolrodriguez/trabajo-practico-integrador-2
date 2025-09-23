import { Task } from '../models/Task.js'; // o el modelo que estés usando
import jwt from 'jsonwebtoken';

export const ownerOrAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Recurso no encontrado' });

        const isOwner = task.owner.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Acceso denegado: no sos el dueño ni administrador' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error en la verificación de permisos', error: error.message });
    }
};
