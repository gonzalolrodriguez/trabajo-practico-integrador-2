import { CommentModel } from "../models/comment.model.js";

//crear comentario
export const createComment = async (req, res) => {
    try {
        const { articleId, content } = req.body;
        const author = req.user._id;
        const comment = await CommentModel.create({
            content,
            author,
            article: articleId
        });
        return res.status(201).json({ ok: true, data: comment });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//obtener todos los comentarios
export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find();
        return res.status(200).json({ ok: true, data: comments });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//obtener los comentarios por ID
export const getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await CommentModel.findById(id);
        return res.status(200).json({ ok: true, data: comment });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//actualizar comentario
export const updateComment = async (req, res) => {
    const { id } = req.params;
    try {
        const exists = await CommentModel.findById(id);
        if (!exists) {
            return res.status(404).json({ ok: false, msg: "Comentario no encontrado" });
        }
        const comment = await CommentModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json({ ok: true, data: comment });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//eliminar comentario
export const deletedComment = async (req, res) => {
    const { id } = req.params;
    try {
        const exists = await CommentModel.findById(id);
        if (!exists) {
            return res.status(404).json({ ok: false, msg: "Comentario no encontrado" });
        }
        const comment = await CommentModel.findByIdAndDelete(id);
        return res.status(200).json({ ok: true, data: comment });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};