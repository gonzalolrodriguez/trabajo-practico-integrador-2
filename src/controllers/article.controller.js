import { ArticleModel } from "../models/article.model.js";

export const createArticle = async (req, res) => {
    try {
        const article = await ArticleModel.create(req.body);
        return res.status(201).json({ ok: true, data: article });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

export const getAllArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.find();
        return res.status(200).json({ ok: true, data: articles });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await ArticleModel.findById(id);
        return res.status(200).json({ ok: true, data: article });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

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

export const deletedArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await ArticleModel.findByIdAndDelete(id);
        return res.status(200).json({ ok: true, data: article });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};