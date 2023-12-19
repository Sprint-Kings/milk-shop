const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    define: {
      timestamps: false
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/userModel.js")(sequelize, Sequelize);
db.role = require("../models/roleModel.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshTokenModel.js")(sequelize, Sequelize);
db.products = require("../models/productsModel.js")(sequelize, Sequelize);
db.types = require("../models/typesModel.js")(sequelize, Sequelize);
db.cart = require("../models/cartModel.js")(sequelize, Sequelize);
db.orders = require("../models/ordersModel.js")(sequelize, Sequelize);
db.statuses = require("../models/statusesModel.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});

db.types.hasMany(db.products, {
  foreignKey: 'typeId'
});

db.products.belongsTo(db.types, {
  foreignKey: 'typeId'
});

db.user.hasMany(db.cart, {
  foreignKey: 'userid'
});

db.cart.belongsTo(db.user, {
  foreignKey: 'userid'
});

db.user.hasMany(db.orders, {
  foreignKey: 'userid'
});

db.orders.belongsTo(db.user, {
  foreignKey: 'userid'
});

db.statuses.hasMany(db.orders, {
  foreignKey: 'statusid'
});

db.orders.belongsTo(db.statuses, {
  foreignKey: 'statusid'
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;