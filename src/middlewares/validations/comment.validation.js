import { body } from "express-validator";

export const commentValidations = [
    body("content")
        .isLength({ min: 5, max: 500 })
        .withMessage("El comentario debe tener entre 5 y 500 caracteres"),
    body("author").isMongoId().withMessage("El autor debe ser un ID válido"),
    body("article")
        .optional()
        .isMongoId()
        .withMessage("El artículo debe ser un ID válido"),
];