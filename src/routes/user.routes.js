import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/validations/authMiddleware.validation.js";
import { adminMiddleware } from "../middlewares/validations/adminMiddleware.validation.js";
import { validateUserId } from "../middlewares/validations/userMiddleware.validation.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers); // Listar todos los usuarios con sus perfiles. (solo admin)

userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  validateUserId,
  validate,
  getUserById,
); //Obtener usuario específico con perfil y artículos. (solo admin)

userRouter.post("/users", insertUser, authMiddleware); //Crear un usuario con su perfil. (solo admin)

userRouter.put("/users/:id", updateUser, authMiddleware); //Actualizar usuario (solo admin)

userRouter.delete("/users/:id", deleteUser, authMiddleware); //Eliminación lógica de usuario (solo admin).
