import { Router } from "express";
// import {
//   getAllUsers,
//   getUserById,
//   insertUser,
//   updateUser,
//   deleteUser,
// } from "../controllers/user.controller.js";

// import { body } from "express-validator";
// import { validate } from "../middlewares/validate.js";
// import {
//   createUserValidation,
//   deleteUserValidation,
//   getUserValidation,
//   updateUserValidation,
// } from "../middlewares/validations/user.validation.js";

export const userRouter = Router();

userRouter.get("/users", getAllUsers); // Listar todos los usuarios con sus perfiles. (solo admin)

userRouter.get("/users/:id", /*getUserValidation, validate,*/ getUserById); //Obtener usuario específico con perfil y artículos. (solo admin)

userRouter.post("/users", /*createUserValidation, validate,*/ insertUser); //Crear un usuario con su perfil. (solo admin)

userRouter.put("/users/:id", /*updateUserValidation, validate,*/ updateUser); //Actualizar usuario (solo admin)

userRouter.delete("/users/:id", /*deleteUserValidation, validate,*/ deleteUser); //Eliminación lógica de usuario (solo admin).
