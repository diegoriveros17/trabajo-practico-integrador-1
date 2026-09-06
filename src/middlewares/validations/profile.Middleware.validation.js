import { body, param } from "express-validator";

export const createProfileValidation = [
  body("first_name").notEmpty().withMessage("El nomnbre no puede ser vacio"),
  body("last_name").notEmpty().withMessage("El apellido no puede estar vacio"),
  body("user_id")
    .notEmpty()
    .withMessage("El id no puede ser vacio")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un numero entero positivo"),
];
