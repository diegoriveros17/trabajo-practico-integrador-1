import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createUserValidation,
  loginUserValidation,
} from "../middlewares/validations/userMiddleware.validation.js";

export const authRouter = Router();

authRouter.post("/login", loginUserValidation, validate, login); // -> Controller para comprobar las credenciaaes

authRouter.post("/register", createUserValidation, validate, register); //-> Controller para registrar un usuario

authRouter.get("/logout", logout); //-> controller para cerrar sesion
