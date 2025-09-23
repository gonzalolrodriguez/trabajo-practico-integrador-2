import { Router } from "express";
import {
    getProfile,
    login,
    logout,
    register,
    updateProfile,
} from "../controllers/auth.controller.js";
import {
    profileUpdateValidations,
    registerCreateValidations,
} from "../middlewares/validations/auth.validation.js";
import { applyValidation } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const routerAuth = Router();

routerAuth.post(
    "/auth/register",
    registerCreateValidations,
    applyValidation,
    register
);
routerAuth.post("/auth/login", login);

routerAuth.get("/auth/profile", authMiddleware, getProfile);

routerAuth.put(
    "/auth/profile",
    authMiddleware,
    profileUpdateValidations,
    applyValidation,
    updateProfile
);

routerAuth.post("/auth/logout", logout);

export default routerAuth;