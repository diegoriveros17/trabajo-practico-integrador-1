import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/validations/authMiddleware.validation.js";
import { adminMiddleware } from "../middlewares/validations/adminMiddleware.validation.js";
import {
  createTagValidation,
  updateTagValidation,
  validateTagId,
} from "../middlewares/validations/tagMiddleware.validation.js";

export const tagRouter = Router();

// POST /api/tags → Crear etiqueta (solo admin)
tagRouter.post(
  "/tags",
  authMiddleware,
  adminMiddleware,
  createTagValidation,
  validate,
  createTag,
);

// GET /api/tags → Listar todas las etiquetas (usuario autenticado)
tagRouter.get("/tags", authMiddleware, getAllTags);

// GET /api/tags/:id → Obtener etiqueta específica con artículos asociados (solo admin)
tagRouter.get(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  validateTagId,
  validate,
  getTagById,
);

// PUT /api/tags/:id → Actualizar etiqueta (solo admin)
tagRouter.put(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidation,
  validate,
  updateTag,
);

// DELETE /api/tags/:id → Eliminar etiqueta (solo admin)
tagRouter.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  validateTagId,
  validate,
  deleteTag,
);
