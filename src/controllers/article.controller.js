import { matchedData } from "express-validator";
import {
  ArticleModel,
  UserModel,
  TagModel,
  ArticleTagModel,
} from "../models/index.js";

export const createArticle = async (req, res) => {
  try {
    const currentUserId = req.user?.id || req.user?.idUser?.id;
    const { title, content, excerpt, status, user_id } = matchedData(req, {
      locations: ["body"],
    });

    const finalUserId =
      req.user?.role === "admin" && user_id ? user_id : currentUserId;

    const article = await ArticleModel.create({
      title,
      content,
      excerpt,
      status,
      user_id: finalUserId,
    });

    const articleWithAuthor = await ArticleModel.findByPk(article.id, {
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
        {
          model: TagModel,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });

    return res.status(201).json({
      message: "Artículo creado correctamente",
      article: articleWithAuthor,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};

export const getPublishedArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      where: { status: "published" },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
        {
          model: TagModel,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json({
      message: "Artículos publicados",
      articles,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await ArticleModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
        {
          model: TagModel,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });

    if (!article) {
      return res.status(404).json({
        message: "El artículo solicitado no existe",
      });
    }

    return res.status(200).json({
      message: "Artículo obtenido correctamente",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};

export const getMyPublishedArticles = async (req, res) => {
  try {
    const currentUserId = req.user?.id || req.user?.idUser?.id;

    const articles = await ArticleModel.findAll({
      where: {
        user_id: currentUserId,
        status: "published",
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
        {
          model: TagModel,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json({
      message: "Artículos publicados obtenidos correctamente",
      articles,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};

export const getMyArticleById = async (req, res) => {
  try {
    const currentUserId = req.user?.id || req.user?.idUser?.id;
    const { id } = req.params;

    const article = await ArticleModel.findOne({
      where: {
        id,
        user_id: currentUserId,
      },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
        {
          model: TagModel,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });

    if (!article) {
      return res.status(404).json({
        message:
          "No se encontró el artículo solicitado para el usuario logueado",
      });
    }

    return res.status(200).json({
      message: "Artículo del usuario obtenido",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req, { locations: ["body"] });

    const article = await ArticleModel.findByPk(id);
    if (!article) {
      return res.status(404).json({
        message: "El artículo que intenta actualizar no existe",
      });
    }

    await article.update(data);

    const updatedArticle = await ArticleModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email", "role"],
        },
        {
          model: TagModel,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json({
      message: "Artículo actualizado correctamente",
      article: updatedArticle,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await ArticleModel.findByPk(id);
    if (!article) {
      return res.status(404).json({
        message: "El artículo que intenta eliminar no existe",
      });
    }

    await ArticleTagModel.destroy({
      where: { article_id: id },
    });

    await article.destroy();

    return res.status(200).json({
      message: "Artículo y sus etiquetas eliminados",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};
