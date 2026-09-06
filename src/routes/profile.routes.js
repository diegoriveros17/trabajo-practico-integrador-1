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

export const profileRouter = Router();

profileRouter.get("/profile", ); //Listar todas las etiquetas. (usuario autenticado)

profileRouter.get("/profile/:id", /*getUserValidation, validate,*/ ); //Obtener etiqueta específica con artículos asociados (solo admin).

profileRouter.post("/profile", /*createUserValidation, validate,*/ ); //Crear etiqueta (solo admin).

profileRouter.put(
  "/profile/:id",
  /*updateUserValidation, validate,*/ ,
); //Actualizar etiqueta (solo admin).

profileRouter.delete(
  "/profile/:id",
  /*deleteUserValidation, validate,*/ ,
); //Eliminar etiqueta (solo admin).
