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

export const tagRouter = Router();

tagRouter.get("/tags", getAllTags); //Listar todas las etiquetas. (usuario autenticado)

tagRouter.get("/tags/:id", /*getUserValidation, validate,*/ getTagById); //Obtener etiqueta específica con artículos asociados (solo admin).

tagRouter.post("/tags", /*createUserValidation, validate,*/ insertTag); //Crear etiqueta (solo admin).

tagRouter.put("/tags/:id", /*updateUserValidation, validate,*/ updateTag); //Actualizar etiqueta (solo admin).

tagRouter.delete("/tags/:id", /*deleteUserValidation, validate,*/ deleteTag); //Eliminar etiqueta (solo admin).
