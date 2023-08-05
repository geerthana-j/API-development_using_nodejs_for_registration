const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('practice', 'odoo', '123456', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',

});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    tableName: 'User',
    freezeTableName: true,
    timestamps: false,
});

module.exports = User;