import { body, param } from "express-validator";
import { ArticleModel, TagModel, UserModel } from "../../models/index.js";

export const validateArticleId = [
  param("id")
    .notEmpty()
    .withMessage("El ID del artículo es obligatorio")
    .isInt()
    .withMessage("El ID del artículo debe ser un número entero positivo"),
];

export const createArticleValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("El extracto (excerpt) no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado solo puede ser 'published' o 'archived'"),
  body("user_id")
    .optional()
    .isInt()
    .withMessage("user_id debe ser un entero válido")
    .custom(async (user_id, { req }) => {
      const user = await UserModel.findByPk(user_id);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      // Si no es admin, debe coincidir con el usuario autenticado
      const dataUser = req.userData.idUser;
      // console.log(dataUser)
      if (dataUser.role !== "admin" && user_id !== dataUser.id) {
        throw new Error("El usuario no coincide con el usuario autenticado");
      }
      return true;
    }),
];

export const updateArticleValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del artículo es obligatorio")
    .isInt()
    .withMessage("El ID del artículo debe ser un número entero positivo"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El contenido no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("El extracto no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado solo puede ser 'published' o 'archived'"),
];

export const createArticleTagValidation = [
  body("article_id")
    .notEmpty()
    .withMessage("El article_id es obligatorio")
    .isInt()
    .withMessage("article_id debe ser un número entero positivo"),
  body("tag_id")
    .notEmpty()
    .withMessage("El tag_id es obligatorio")
    .isInt()
    .withMessage("tag_id debe ser un número entero positivo"),
];

export const validateArticleTagId = [
  param("articleTagId")
    .notEmpty()
    .withMessage("articleTagId es obligatorio")
    .isInt()
    .withMessage("articleTagId debe ser un número entero positivo"),
];
