import { Router } from "express";
import {
    createArticle,
    deletedArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
} from "../controllers/article.controller.js";

export const routerArticle = Router();

routerArticle.post("/articles", createArticle);
routerArticle.get("/articles", getAllArticles);
routerArticle.get("/articles/:id", getArticleById);
routerArticle.put("/articles/:id", updateArticle);
routerArticle.delete("/articles/:id", deletedArticle);