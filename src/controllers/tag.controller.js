import { TagModel } from "../models/tag.model.js";

//crear etiqueta
export const createTag = async (req, res) => {
    try {
        const tag = await TagModel.create(req.body);
        return res.status(201).json({ ok: true, data: tag });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//obtener todas las etiquetas
export const getAllTags = async (req, res) => {
    try {
        const tags = await TagModel.find();
        return res.status(200).json({ ok: true, data: tags });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//obtener etiqueta por id
export const getTagById = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await TagModel.findById(id);
        return res.status(200).json({ ok: true, data: tag });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//actualizar rtiqueta
export const updateTag = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await TagModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ ok: true, data: tag });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//elimina la etiqueta y la remueve de los articulos asociados
export const deletedTag = async (req, res) => {
    const { id } = req.params;
    try {
        // Eliminación de la etiqueta
        const tag = await TagModel.findByIdAndDelete(id);
        if (!tag) {
            return res.status(404).json({ ok: false, msg: "Etiqueta no encontrada" });
        }
        // etiqueta removida de todos los artículos
        const { Article } = await import("../models/article.model.js");
        await Article.updateMany(
            { tags: id },
            { $pull: { tags: id } }
        );
        return res.status(200).json({ ok: true, msg: "Etiqueta eliminada y removida de artículos", data: tag });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};