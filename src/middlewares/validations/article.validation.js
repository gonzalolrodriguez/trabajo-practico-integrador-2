import { body } from "express-validator";

export const articleValidations = [
    body("title")
        .isLength({ min: 3, max: 200 })
        .withMessage("El título debe tener entre 3 y 200 caracteres"),
    body("content")
        .isLength({ min: 50 })
        .withMessage("El contenido debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isLength({ max: 500 })
        .withMessage("El extracto no puede superar los 500 caracteres"),
    body("status")
        .optional()
        .isIn(["published", "archived"])
        .withMessage("El estado debe ser 'published' o 'archived'"),
    body("author").isMongoId().withMessage("El autor debe ser un ID válido"),
    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags debe ser un array de IDs"),
    body("tags.*")
        .optional()
        .isMongoId()
        .withMessage("Cada tag debe ser un ID válido"),
];