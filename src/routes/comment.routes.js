import { Router } from "express";
import {
    createComment,
    deletedComment,
    getAllComments,
    getCommentById,
    updateComment,
} from "../controllers/comment.controller.js";

export const routerComment = Router();

routerComment.post("/comments", createComment);
routerComment.get("/comments", getAllComments);
routerComment.get("/comments/:id", getCommentById);
routerComment.put("/comments/:id", updateComment);
routerComment.delete("/comments/:id", deletedComment);