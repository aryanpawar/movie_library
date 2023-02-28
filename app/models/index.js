const Sequelize = require("sequelize");

const sequelize = new Sequelize("movie_library", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});

const db = {
  User: require("./user")(sequelize, Sequelize.DataTypes),
  Movie: require("./movie")(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].hasOwnProperty("associate")) {
    db[modelName].associate(db);
  }
});

// (async () => {
//   await sequelize.sync({alter: true})
// })();

db.sequelize = sequelize;
module.exports = db;
