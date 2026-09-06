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
];

export const validateUserId = [
  param("id")
    .notEmpty()
    .withMessage("El parametro id no puede ser vacio")
    .isInt()
    .withMessage("El id deber un numero entero positivo"),
];
