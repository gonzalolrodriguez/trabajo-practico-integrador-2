import { Router } from "express";

import {
    createArticle,
    deletedArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const routerArticle = Router();

routerArticle.post("/articles", authMiddleware, createArticle);
routerArticle.get("/articles", getAllArticles);
routerArticle.get("/articles/:id", getArticleById);
routerArticle.patch("/articles/:id", authMiddleware, updateArticle);
routerArticle.delete("/articles/:id", deletedArticle);