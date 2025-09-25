import { ArticleModel } from "../models/article.model.js";

export const createArticle = async (req, res) => {
    try {
        // Obtiene los IDs de los tags por nombre si se envían como strings
        let tagIds = [];
        if (Array.isArray(req.body.tags) && req.body.tags.length > 0) {
            const { TagModel } = await import("../models/tag.model.js");
            // Se busca los tags por nombre
            const foundTags = await TagModel.find({ name: { $in: req.body.tags } });
            tagIds = foundTags.map(tag => tag._id);
        }
        // Agrega el id del usuario autenticado como author
        const articleData = {
            ...req.body,
            author: req.user._id,
            tags: tagIds,
        };
        const article = await ArticleModel.create(articleData);
        return res.status(201).json({ ok: true, data: article });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

// Obtiene todos los articles
export const getAllArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.find();
        return res.status(200).json({ ok: true, data: articles });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

// Obtener artículo por ID
export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await ArticleModel.findById(id);
        return res.status(200).json({ ok: true, data: article });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

// Actualizar Article 
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await ArticleModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json({ ok: true, data: article });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//Eliminar Article
export const deletedArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await ArticleModel.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({ ok: false, msg: "Artículo no encontrado" });
        }
        // Eliminar comentarios relacionados
        const { CommentModel } = await import("../models/comment.model.js");
        await CommentModel.deleteMany({ article: id });
        return res.status(200).json({ ok: true, msg: "Artículo y comentarios eliminados", data: article });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};