import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
    try {
        const tag = await TagModel.create(req.body);
        return res.status(201).json({ ok: true, data: tag });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const tags = await TagModel.find();
        return res.status(200).json({ ok: true, data: tags });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

export const getTagById = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await TagModel.findById(id);
        return res.status(200).json({ ok: true, data: tag });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

export const updateTag = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await TagModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ ok: true, data: tag });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

export const deletedTag = async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await TagModel.findByIdAndDelete(id);
        return res.status(200).json({ ok: true, data: tag });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};