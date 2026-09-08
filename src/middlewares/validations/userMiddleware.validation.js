import { body, param } from "express-validator";

export const loginUserValidation = [
  body("username").notEmpty().withMessage("El username no puede ser vacio"),
  body("password").notEmpty().withMessage("La password no puede estar vacia"),
];

export const createUserValidation = [
  body("username").notEmpty().withMessage("El username no puede ser vacio"),
  body("email")
    .notEmpty()
    .withMessage("El email no puede estar vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),
  body("password").notEmpty().withMessage("La password no puede estar vacia"),
  body("first_name").notEmpty().withMessage("El nombre no puede ser vacio"),
  body("last_name").notEmpty().withMessage("El apellido no puede ser vacio")
];

export const updateUserValidation = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("El username no puede ser vacio"),
  body("email").optional().isEmail().withMessage("El email debe ser valido"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("La password no puede estar vacia"),
  param("id")
    .notEmpty()
    .withMessage("El id no puede ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero positivo"),
];

export const validateUserId = [
  param("id")
    .notEmpty()
    .withMessage("El parametro id no puede ser vacio")
    .isInt()
    .withMessage("El id deber un numero entero positivo"),
];
