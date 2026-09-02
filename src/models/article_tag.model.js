import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ArticleTagModel = sequelize.define(
  "Article_Tag",
  {
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Article",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tag",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
  },
);
