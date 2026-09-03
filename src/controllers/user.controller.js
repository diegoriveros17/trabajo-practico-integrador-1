import { UserModel } from "../models/user.model.js";
import { matchedData, param, validationResult } from "express-validator";

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            //   attributes: { exclude: ["password", "id"] },
            //   include: [
            //     {
            //       model: TeamModel,
            //       as: "equipos",
            //       through: { attributes: [] },
            //     },
            //   ],
        });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = matchedData(req, { locations: ["params"] });

        const userExist = await UserModel.findByPk(id);
        if (!userExist) {
            return res.status(404).json({ message: "No existe un usuario registrado con este id" })
        }

        const user = await UserModel.findByPk(id, {
            attributes: { exclude: ["password", "id"] },
            // include: [
            //     {
            //         model: TeamModel,
            //         as: "equipos",
            //         through: { attributes: [] },
            //     },
            // ],
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

export const insertUser = async (req, res) => {
    try {
        const data = matchedData(req);
        const email = data.email;

        const emailExist = await UserModel.findOne({ where: { email } });
        if (emailExist) {
            return res.status(409).json({ message: "Ya existe un usuario registrado con este email" })
        }

        const user = await UserModel.create(data);

        return res.status(201).json({
            message: "Usuario agregado correctamente",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const data = matchedData(req, { locations: ["body"] });
        const { id } = matchedData(req, { locations: ["params"] });

        const userExist = await UserModel.findByPk(id);

        if (!userExist) {
            return res.status(404).json({ message: "No existe un usuario registrado con este id" })
        }

        const user = await userExist.update(data);

        return res.status(200).json({
            message: "Usuario modificado",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = matchedData(req, { locations: ["params"] });

        const userExist = await UserModel.findByPk(id);
        if (!userExist) {
            return res.status(404).json({ message: "No existe un usuario registrado con este id" })
        }

        const user = await userExist.destroy();

        return res.status(200).json({
            message: "Usuario Eliminado",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
