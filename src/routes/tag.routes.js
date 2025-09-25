import { Router } from "express";

import {
    createTag,
    deletedTag,
    getAllTags,
    getTagById,
    updateTag,
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const routerTag = Router();

routerTag.post("/tags", createTag);
routerTag.get("/tags", getAllTags);
routerTag.get("/tags/:id", getTagById);
routerTag.put("/tags/:id", updateTag);
routerTag.delete("/tags/:id", authMiddleware, adminMiddleware, deletedTag);