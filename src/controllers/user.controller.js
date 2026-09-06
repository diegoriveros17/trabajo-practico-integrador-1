import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password", "id"] },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const userExist = await UserModel.findByPk(id);
    if (!userExist) {
      return res
        .status(404)
        .json({ message: "No existe un usuario registrado con este id" });
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
    const { username, password, role, first_name, last_name, user_id } =
      matchedData(req, {
        locations: ["body"],
      });

    if (role === "admin") {
      const passwordHashed = await hashPassword(password);

      const userExist = await UserModel.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: email }],
        },
      });

      if (userExist) {
        return res.status(409).json({
          message: `El nombre de usuario o email ya se encuentra en uso`,
        });
      }

      await UserModel.create({
        username,
        email,
        password: passwordHashed,
        role,
      });

      await ProfileModel.create({
        first_name,
        last_name,
        // biography,
        // avatar_url,
        // birth_date,
        user_id,
      });
      return res
        .status(201)
        .json({ message: `Usuario creado con su perfil correctamente` });
    } else {
      return res
        .status(401)
        .json({ message: `Usuario no autorizado para crear usuarios` });
    }
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

    const { role } = matchedData(req, { locations: ["body"] });

    if (role === "admin") {
      const userExist = await UserModel.findByPk(id);

      if (!userExist) {
        return res
          .status(404)
          .json({ message: "El usuario que intenta modificar no existe" });
      }
      const user = await userExist.update(data);
      return res.status(200).json({
        message: "Usuario modificado",
        user,
      });
    } else {
      return res.status(401).json({ message: `Usuario no autorizado` });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { role } = matchedData(req, { locations: ["body"] });

    if (role === "admin") {
      const { id } = matchedData(req, { locations: ["params"] });

      const userExist = await UserModel.findByPk(id);
      if (!userExist) {
        return res
          .status(404)
          .json({ message: "El usuario que intenta eliminar no existe" });
      }
      await userExist.destroy();
      return res.status(200).json({
        message: "Usuario Eliminado",
      });
    } else {
      return res.status(401).json({ message: `Usuario no autorizado` });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
