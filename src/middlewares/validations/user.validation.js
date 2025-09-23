import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const idUserValidations = [
    param("id")
        .isMongoId()
        .withMessage("El ID debe ser un ID válido")
        .custom(async (id) => {
            const user = await UserModel.findById(id, { deleted_at: null });
            if (!user) {
                throw new Error("El usuario no existe");
            }
            return true;
        }),
];

export const userUpdateValidations = [
    body("username")
        .optional()
        .notEmpty()
        .withMessage("El nombre de usuario es obligatorio")
        .isLength({ min: 3, max: 20 })
        .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
        .isAlphanumeric()
        .withMessage("El nombre de usuario solo puede contener letras y números")
        .custom(async (username) => {
            const user = await UserModel.findOne({ username });
            if (user) {
                throw new Error("El nombre de usuario ya está en uso");
            }
            return true;
        }),

    body("email")
        .optional()
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("Debe ser un email válido")
        .custom(async (email) => {
            const emailExiste = await UserModel.findOne({ email });
            if (emailExiste) {
                throw new Error("El email ya está en uso");
            }
            return true;
        }),

    body("password")
        .optional()
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        .withMessage(
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
        ),
];