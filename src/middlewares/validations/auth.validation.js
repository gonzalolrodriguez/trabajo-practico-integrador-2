import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const registerCreateValidations = [
    body("username")
        .notEmpty()
        .withMessage("El nombre de usuario es obligatorio")
        .isLength({ min: 3, max: 20 })
        .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
        .isAlphanumeric()
        .withMessage("El nombre de usuario solo puede contener letras y números")
        .custom(async (username) => {
            const user = await UserModel.findOne({ username, deleted_at: null });
            if (user) {
                throw new Error("El nombre de usuario ya está en uso");
            }
            return true;
        }),

    body("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("Debe ser un email válido")
        .custom(async (email) => {
            const emailExiste = await UserModel.findOne({ email, deleted_at: null });
            if (emailExiste) {
                throw new Error("El email ya está en uso");
            }
            return true;
        }),

    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        .withMessage(
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
        ),

    body("role")
        .optional()
        .isIn(["user", "admin"])
        .withMessage("El rol debe ser 'user' o 'admin'"),

    body("profile.first_name")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .isAlpha("es-ES", { ignore: " " })
        .withMessage("El nombre solo puede contener letras"),

    body("profile.last_name")
        .notEmpty()
        .withMessage("El apellido es obligatorio")
        .isLength({ min: 2, max: 30 })
        .withMessage("El apellido debe tener entre 2 y 30 caracteres")
        .isAlpha("es-ES", { ignore: " " })
        .withMessage("El apellido solo puede contener letras"),

    body("profile.biography")
        .optional()
        .isLength({ max: 500 })
        .withMessage("La biografía no puede superar los 500 caracteres"),

    body("profile.avatar_url")
        .optional()
        .isURL()
        .withMessage("El avatar debe ser una URL válida"),

    body("profile.birth_date")
        .optional()
        .isISO8601()
        .withMessage(
            "La fecha de nacimiento debe tener el siguiente formato: YYYY-MM-DD"
        ),
];

export const profileUpdateValidations = [
    body("profile.first_name")
        .optional()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .isAlpha("es-ES", { ignore: " " })
        .withMessage("El nombre solo puede contener letras"),

    body("profile.last_name")
        .optional()
        .notEmpty()
        .withMessage("El apellido es obligatorio")
        .isLength({ min: 2, max: 30 })
        .withMessage("El apellido debe tener entre 2 y 30 caracteres")
        .isAlpha("es-ES", { ignore: " " })
        .withMessage("El apellido solo puede contener letras"),

    body("profile.biography")
        .optional()
        .isLength({ max: 500 })
        .withMessage("La biografía no puede superar los 500 caracteres"),

    body("profile.avatar_url")
        .optional()
        .isURL()
        .withMessage("El avatar debe ser una URL válida"),

    body("profile.birth_date")
        .optional()
        .isISO8601()
        .withMessage(
            "La fecha de nacimiento debe tener el siguiente formato: YYYY-MM-DD"
        ),
];