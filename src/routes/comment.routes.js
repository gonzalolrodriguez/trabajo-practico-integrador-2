import { Router } from "express";

import {
    createComment,
    deletedComment,
    getAllComments,
    getCommentById,
    updateComment,
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const routerComment = Router();

routerComment.post("/comments", authMiddleware, createComment);
routerComment.get("/comments", getAllComments);
routerComment.get("/comments/:id", getCommentById);
routerComment.put("/comments/:id", updateComment);
routerComment.delete("/comments/:id", deletedComment);