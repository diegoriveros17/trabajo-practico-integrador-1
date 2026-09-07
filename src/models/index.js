import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";
import { ArticleTagModel } from "./article_tag.model.js";

// Relación 1 a 1  User <-> Profile
// User -> Profile ('profile')
UserModel.hasOne(ProfileModel, {
    foreignKey: "user_id",
    as: "profile",
    onDelete: "CASCADE",
});
// Profile -> User ('user')
ProfileModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "user",
});

// Relación 1 muchos : User -> Article
// User -> Article ('articles')
UserModel.hasMany(ArticleModel, {
    foreignKey: "user_id",
    as: "articles",
    onDelete: "CASCADE",
});
// Article -> User ('author')
ArticleModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "author",
});

export {
    UserModel,
    ProfileModel,
    ArticleModel,
    TagModel,
    ArticleTagModel,
};