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

export const articleRouter = Router();

articleRouter.get("/articles"); //Listar artículos publicados. (usuario autenticado)

articleRouter.get("/articles/:id" /*getUserValidation, validate,*/); //Obtener artículo por su id. (usuario autenticado)

articleRouter.get("/articles/user"); //Listar artículos publicados del usuario logueado. (usuario autenticado)

articleRouter.get("/articles/user/:id" /*getUserValidation, validate,*/); //Obtener artículo del usuario logueado por su id. (usuario autenticado)

articleRouter.post("/articles" /*createUserValidation, validate,*/); //Crear artículo. (usuario autenticado)

articleRouter.put("/articles/:id" /*updateUserValidation, validate,*/); //Actualizar artículo (solo autor o admin).

articleRouter.delete("/articles/:id" /*deleteUserValidation, validate,*/); //Eliminación lógica (solo autor o admin).

// Articles Tags
articleRouter.post("/articles-tags" /*deleteUserValidation, validate,*/); //Agregar etiqueta a artículo. (solo autor)
articleRouter.delete(
  "/articles-tags/articleTagId" /*deleteUserValidation, validate,*/,
); // Remover etiqueta de artículo. (solo autor)
