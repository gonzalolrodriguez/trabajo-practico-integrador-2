import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.js";
import { generateToken } from "../helpers/jwt.js";

//Registro del usuario
export const register = async (req, res) => {
    try {
        const data = matchedData(req, { locations: ["body"] });

        const passwordHash = await hashPassword(data.password);

        const profile = data.profile || {};
        const user = await UserModel.create({
            username: data.username,
            email: data.email,
            password: passwordHash,
            role: data.role,
            profile: {
                firstName: profile.firstName || profile.first_name,
                lastName: profile.lastName || profile.last_name,
                biography: profile.biography,
                avatarUrl: profile.avatarUrl || profile.avatar_url,
                birthDate: profile.birthDate || profile.birth_date,
            },
        });
        return res
            .status(201)
            .json({ ok: true, msg: "Usuario creado", data: user });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//login del usuario
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email, deleted_at: null }).select("+password");
        if (!user) {
            return res.status(404).json({ ok: false, msg: "Credenciales inválidas" });
        }

        const passwordExiste = await comparePassword(password, user.password);
        if (!passwordExiste) {
            return res.status(404).json({ ok: false, msg: "Credenciales inválidas" });
        }

        const token = generateToken({ _id: user._id, role: user.role });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        });

        return res.status(200).json({ ok: true, msg: "Login exitoso" });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: error.message || "Internal server error" });
    }
};

//obtener perfil del usuario
export const getProfile = async (req, res) => {
    try {
        console.log('REQ.USER:', req.user);
        if (!req.user) {
            return res.status(404).json({ ok: false, msg: "Usuario no encontrado o eliminado" });
        }
        return res.status(200).json({ ok: true, data: req.user.profile });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//actualizar el perfil del usuario
export const updateProfile = async (req, res) => {
    try {
        const data = matchedData(req, { locations: ["body"] });
        const user = await UserModel.findByIdAndUpdate(
            req.user._id,
            {
                profile: {
                    firstName: data.profile.firstName,
                    lastName: data.profile.lastName,
                    biography: data.profile.biography,
                    avatarUrl: data.profile.avatarUrl,
                    birthDate: data.profile.birthDate,
                },
            },
            { new: true }
        ).select("profile -_id");
        return res.status(200).json({ ok: true, data: user });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Internal server error" });
    }
};

//logout del usuario
export const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ ok: true, msg: "Logout exitoso" });
};